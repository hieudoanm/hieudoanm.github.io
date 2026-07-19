#include <arpa/inet.h>
#include <ctype.h>
#include <errno.h>
#include <netinet/in.h>
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#define MAX_LINE 8192
#define BUCKETS 128

typedef struct Entry {
  char *key;
  char *value;
  struct Entry *next;
} Entry;

typedef struct {
  Entry *buckets[BUCKETS];
  pthread_rwlock_t lock;
} DB;

static unsigned long hash(const char *str) {
  unsigned long h = 5381;
  int c;
  while ((c = *str++))
    h = ((h << 5) + h) + c;
  return h;
}

DB *db_new(void) {
  DB *db = calloc(1, sizeof(DB));
  pthread_rwlock_init(&db->lock, NULL);
  return db;
}

void db_set(DB *db, const char *key, const char *value) {
  unsigned long idx = hash(key) % BUCKETS;

  pthread_rwlock_wrlock(&db->lock);

  Entry *e = db->buckets[idx];
  while (e) {
    if (strcmp(e->key, key) == 0) {
      free(e->value);
      e->value = strdup(value);
      pthread_rwlock_unlock(&db->lock);
      return;
    }
    e = e->next;
  }

  e = malloc(sizeof(Entry));
  e->key = strdup(key);
  e->value = strdup(value);
  e->next = db->buckets[idx];
  db->buckets[idx] = e;

  pthread_rwlock_unlock(&db->lock);
}

char *db_get(DB *db, const char *key) {
  unsigned long idx = hash(key) % BUCKETS;

  pthread_rwlock_rdlock(&db->lock);

  Entry *e = db->buckets[idx];
  while (e) {
    if (strcmp(e->key, key) == 0) {
      char *val = strdup(e->value);
      pthread_rwlock_unlock(&db->lock);
      return val;
    }
    e = e->next;
  }

  pthread_rwlock_unlock(&db->lock);
  return NULL;
}

int db_del(DB *db, const char *key) {
  unsigned long idx = hash(key) % BUCKETS;

  pthread_rwlock_wrlock(&db->lock);

  Entry *e = db->buckets[idx];
  Entry *prev = NULL;

  while (e) {
    if (strcmp(e->key, key) == 0) {
      if (prev)
        prev->next = e->next;
      else
        db->buckets[idx] = e->next;
      free(e->key);
      free(e->value);
      free(e);
      pthread_rwlock_unlock(&db->lock);
      return 1;
    }
    prev = e;
    e = e->next;
  }

  pthread_rwlock_unlock(&db->lock);
  return 0;
}

void db_keys(DB *db, char *buf, size_t size) {
  buf[0] = '\0';

  pthread_rwlock_rdlock(&db->lock);

  size_t pos = 0;
  int first = 1;

  for (int i = 0; i < BUCKETS; i++) {
    Entry *e = db->buckets[i];
    while (e) {
      if (!first) {
        if (pos < size - 1)
          buf[pos++] = ' ';
      }
      size_t klen = strlen(e->key);
      if (pos + klen < size - 1) {
        memcpy(buf + pos, e->key, klen);
        pos += klen;
      }
      first = 0;
      e = e->next;
    }
  }

  buf[pos] = '\0';
  pthread_rwlock_unlock(&db->lock);
}

void db_free(DB *db) {
  for (int i = 0; i < BUCKETS; i++) {
    Entry *e = db->buckets[i];
    while (e) {
      Entry *next = e->next;
      free(e->key);
      free(e->value);
      free(e);
      e = next;
    }
  }
  pthread_rwlock_destroy(&db->lock);
  free(db);
}

typedef struct {
  int fd;
  DB *db;
} ConnArg;

static void handle_connection(int fd, DB *db);

void *handle_connection_thread(void *arg) {
  ConnArg *a = (ConnArg *)arg;
  handle_connection(a->fd, a->db);
  free(arg);
  return NULL;
}

static void handle_connection(int fd, DB *db) {
  FILE *in = fdopen(dup(fd), "r");
  FILE *out = fdopen(fd, "w");

  if (!in || !out) {
    if (in)
      fclose(in);
    if (out)
      fclose(out);
    close(fd);
    return;
  }

  char line[MAX_LINE];

  while (fgets(line, sizeof(line), in)) {
    line[strcspn(line, "\r\n")] = '\0';

    if (line[0] == '\0')
      continue;

    char *save;
    char *cmd = strtok_r(line, " ", &save);
    if (!cmd)
      continue;

    if (strcasecmp(cmd, "PING") == 0) {
      fprintf(out, "PONG\n");
      fflush(out);

    } else if (strcasecmp(cmd, "SET") == 0) {
      char *key = strtok_r(NULL, " ", &save);
      if (!key) {
        fprintf(out, "ERR usage: SET key value\n");
        fflush(out);
        continue;
      }

      char *p = key + strlen(key) + 1;
      while (*p == ' ')
        p++;

      if (*p == '\0') {
        fprintf(out, "ERR usage: SET key value\n");
        fflush(out);
        continue;
      }

      db_set(db, key, p);
      fprintf(out, "OK\n");
      fflush(out);

    } else if (strcasecmp(cmd, "GET") == 0) {
      char *key = strtok_r(NULL, " ", &save);
      if (!key || strtok_r(NULL, " ", &save) != NULL) {
        fprintf(out, "ERR usage: GET key\n");
        fflush(out);
        continue;
      }

      char *val = db_get(db, key);
      if (val) {
        fprintf(out, "%s\n", val);
        free(val);
      } else {
        fprintf(out, "(nil)\n");
      }
      fflush(out);

    } else if (strcasecmp(cmd, "DEL") == 0) {
      char *key = strtok_r(NULL, " ", &save);
      if (!key || strtok_r(NULL, " ", &save) != NULL) {
        fprintf(out, "ERR usage: DEL key\n");
        fflush(out);
        continue;
      }

      if (db_del(db, key))
        fprintf(out, "1\n");
      else
        fprintf(out, "0\n");
      fflush(out);

    } else if (strcasecmp(cmd, "KEYS") == 0) {
      char keys[8192];
      db_keys(db, keys, sizeof(keys));
      fprintf(out, "%s\n", keys);
      fflush(out);

    } else {
      fprintf(out, "ERR unknown command\n");
      fflush(out);
    }
  }

  fclose(in);
  fclose(out);
}

#ifndef TEST
int main(void) {
  DB *db = db_new();
  if (!db) {
    fprintf(stderr, "failed to create db\n");
    return 1;
  }

  int server_fd = socket(AF_INET, SOCK_STREAM, 0);
  if (server_fd < 0) {
    perror("socket");
    return 1;
  }

  int opt = 1;
  setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

  struct sockaddr_in addr = {0};
  addr.sin_family = AF_INET;
  addr.sin_addr.s_addr = INADDR_ANY;
  addr.sin_port = htons(6379);

  if (bind(server_fd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
    perror("bind");
    return 1;
  }

  if (listen(server_fd, 128) < 0) {
    perror("listen");
    return 1;
  }

  fprintf(stderr, "Redis-like server listening on 0.0.0.0:6379\n");

  while (1) {
    struct sockaddr_in client_addr;
    socklen_t client_len = sizeof(client_addr);
    int client_fd =
        accept(server_fd, (struct sockaddr *)&client_addr, &client_len);

    if (client_fd < 0) {
      if (errno == EINTR)
        continue;
      perror("accept");
      continue;
    }

    pthread_t th;
    ConnArg *arg = malloc(sizeof(ConnArg));
    arg->fd = client_fd;
    arg->db = db;

    pthread_create(&th, NULL, handle_connection_thread, arg);
    pthread_detach(th);
  }

  close(server_fd);
  db_free(db);
  return 0;
}
#endif
