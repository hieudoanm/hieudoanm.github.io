#include <arpa/inet.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <unistd.h>

#include <algorithm>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <iostream>
#include <optional>
#include <shared_mutex>
#include <string>
#include <thread>
#include <unordered_map>
#include <vector>

constexpr size_t MAX_LINE = 8192;

class DB {
public:
  DB() = default;
  ~DB() = default;

  void set(const std::string &key, const std::string &value) {
    std::unique_lock lock(mutex_);
    map_[key] = value;
  }

  std::optional<std::string> get(const std::string &key) {
    std::shared_lock lock(mutex_);
    auto it = map_.find(key);
    if (it == map_.end())
      return std::nullopt;
    return it->second;
  }

  bool del(const std::string &key) {
    std::unique_lock lock(mutex_);
    return map_.erase(key) > 0;
  }

  std::string keys() {
    std::shared_lock lock(mutex_);
    std::string result;
    for (auto it = map_.begin(); it != map_.end(); ++it) {
      if (it != map_.begin())
        result += ' ';
      result += it->first;
    }
    return result;
  }

private:
  std::unordered_map<std::string, std::string> map_;
  mutable std::shared_mutex mutex_;
};

static std::string str_toupper(std::string s) {
  std::transform(s.begin(), s.end(), s.begin(), ::toupper);
  return s;
}

static void handle_connection(int fd, DB &db) {
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
    char *tok = strtok_r(line, " ", &save);
    if (!tok)
      continue;

    std::string cmd = str_toupper(tok);

    if (cmd == "PING") {
      fprintf(out, "PONG\n");
      fflush(out);

    } else if (cmd == "SET") {
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

      db.set(key, p);
      fprintf(out, "OK\n");
      fflush(out);

    } else if (cmd == "GET") {
      char *key = strtok_r(NULL, " ", &save);
      if (!key || strtok_r(NULL, " ", &save) != NULL) {
        fprintf(out, "ERR usage: GET key\n");
        fflush(out);
        continue;
      }

      auto val = db.get(key);
      if (val) {
        fprintf(out, "%s\n", val->c_str());
      } else {
        fprintf(out, "(nil)\n");
      }
      fflush(out);

    } else if (cmd == "DEL") {
      char *key = strtok_r(NULL, " ", &save);
      if (!key || strtok_r(NULL, " ", &save) != NULL) {
        fprintf(out, "ERR usage: DEL key\n");
        fflush(out);
        continue;
      }

      fprintf(out, "%d\n", db.del(key) ? 1 : 0);
      fflush(out);

    } else if (cmd == "KEYS") {
      std::string k = db.keys();
      fprintf(out, "%s\n", k.c_str());
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
  DB db;

  int server_fd = socket(AF_INET, SOCK_STREAM, 0);
  if (server_fd < 0) {
    perror("socket");
    return 1;
  }

  int opt = 1;
  setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

  struct sockaddr_in addr = {};
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

    std::thread([client_fd, &db]() {
      handle_connection(client_fd, db);
    }).detach();
  }

  close(server_fd);
  return 0;
}
#endif
