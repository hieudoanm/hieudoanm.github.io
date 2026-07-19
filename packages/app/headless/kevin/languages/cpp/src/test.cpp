#define TEST

#include <sys/socket.h>
#include <unistd.h>

#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <optional>
#include <sstream>
#include <string>
#include <thread>

#include "main.cpp"

static int tests_run = 0;
static int tests_passed = 0;
static int tests_failed = 0;

#define ASSERT(cond, msg)                                                      \
  do {                                                                         \
    tests_run++;                                                               \
    if (!(cond)) {                                                             \
      fprintf(stderr, "  FAIL %s:%d: %s\n", __FILE__, __LINE__, msg);          \
      tests_failed++;                                                          \
      return;                                                                  \
    }                                                                          \
    tests_passed++;                                                            \
  } while (0)

#define ASSERT_STR_EQ(a, b, msg)                                               \
  do {                                                                         \
    if ((a) == NULL || (b) == NULL || strcmp((a), (b)) != 0) {                 \
      char _buf[256];                                                          \
      snprintf(_buf, sizeof(_buf), "%s: expected \"%s\", got \"%s\"", msg,     \
               (b) ? (b) : "(null)", (a) ? (a) : "(null)");                    \
      ASSERT(0, _buf);                                                         \
    }                                                                          \
  } while (0)

static int fail_count = 0;

static void run_test(const char *name, void (*fn)(void)) {
  fprintf(stderr, "  %s ... ", name);
  int before = tests_failed;
  fn();
  if (tests_failed == before) {
    fprintf(stderr, "ok\n");
  } else {
    fprintf(stderr, "FAILED\n");
    fail_count++;
  }
}

void test_db_new(void) {
  DB db;
  (void)db;
}

void test_db_set_get(void) {
  DB db;
  db.set("key1", "value1");
  auto val = db.get("key1");
  ASSERT(val.has_value(), "get after set should have value");
  ASSERT_STR_EQ(val->c_str(), "value1", "get after set");
}

void test_db_get_missing(void) {
  DB db;
  auto val = db.get("nonexistent");
  ASSERT(!val.has_value(), "get should return nullopt for missing key");
}

void test_db_del(void) {
  DB db;
  db.set("key1", "value1");
  ASSERT(db.del("key1"), "del should return true for existing key");
  auto val = db.get("key1");
  ASSERT(!val.has_value(), "key should be deleted");
}

void test_db_del_missing(void) {
  DB db;
  ASSERT(!db.del("nonexistent"), "del should return false for missing key");
}

void test_db_overwrite(void) {
  DB db;
  db.set("key1", "value1");
  db.set("key1", "value2");
  auto val = db.get("key1");
  ASSERT(val.has_value(), "overwritten value should exist");
  ASSERT_STR_EQ(val->c_str(), "value2", "overwritten value");
}

void test_db_keys(void) {
  DB db;
  db.set("a", "1");
  db.set("b", "2");
  db.set("c", "3");

  std::string result = db.keys();
  ASSERT(!result.empty(), "keys should not be empty");

  std::istringstream iss(result);
  std::string token;
  int count = 0;
  while (iss >> token)
    count++;
  ASSERT(count == 3, "should have 3 keys");
}

void test_db_concurrency(void) {
  DB db;
  std::vector<std::thread> threads;

  for (int i = 0; i < 100; i++) {
    threads.emplace_back([&db, i]() {
      char key[32], value[32];
      snprintf(key, sizeof(key), "key%d", i);
      snprintf(value, sizeof(value), "value%d", i);
      db.set(key, value);
      auto val = db.get(key);
      if (!val.has_value() || *val != value) {
        fprintf(stderr, "concurrent set/get failed for %s\n", key);
      }
    });
  }

  for (auto &t : threads)
    t.join();

  for (int i = 0; i < 100; i++) {
    char key[32], expected[32];
    snprintf(key, sizeof(key), "key%d", i);
    snprintf(expected, sizeof(expected), "value%d", i);
    auto val = db.get(key);
    ASSERT(val.has_value(), "key should exist after concurrent writes");
    if (val.has_value()) {
      ASSERT_STR_EQ(val->c_str(), expected, "concurrent write value");
    }
  }
}

static int setup_socketpair(int *sv, DB &db) {
  if (socketpair(AF_UNIX, SOCK_STREAM, 0, sv) != 0)
    return -1;
  std::thread([sv, &db]() { handle_connection(sv[0], db); }).detach();
  return 0;
}

static void cmd_write(int fd, const char *command) {
  char buf[256];
  snprintf(buf, sizeof(buf), "%s\n", command);
  write(fd, buf, strlen(buf));
}

static int cmd_read(int fd, char *resp, size_t size) {
  memset(resp, 0, size);
  ssize_t n = read(fd, resp, size - 1);
  if (n > 0) {
    resp[strcspn(resp, "\r\n")] = '\0';
    return 0;
  }
  return -1;
}

void test_ping(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  write(sv[1], "PING\n", 5);
  char resp[128] = {};
  read(sv[1], resp, sizeof(resp));
  ASSERT(strncmp(resp, "PONG\n", 5) == 0, "expected PONG");

  close(sv[1]);
}

void test_handle_set(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "SET mykey myvalue");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "OK", "SET response");

  close(sv[1]);
}

void test_handle_get(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  db.set("mykey", "myvalue");

  cmd_write(sv[1], "GET mykey");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "myvalue", "GET response");

  close(sv[1]);
}

void test_handle_get_missing(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "GET nonexistent");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "(nil)", "GET missing response");

  close(sv[1]);
}

void test_handle_del(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  db.set("mykey", "myvalue");

  cmd_write(sv[1], "DEL mykey");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "1", "DEL response");

  auto val = db.get("mykey");
  ASSERT(!val.has_value(), "key should be deleted after DEL");

  close(sv[1]);
}

void test_handle_del_missing(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "DEL nonexistent");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "0", "DEL missing response");

  close(sv[1]);
}

void test_handle_keys(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  db.set("a", "1");
  db.set("b", "2");
  db.set("c", "3");

  cmd_write(sv[1], "KEYS");
  char resp[8192];
  cmd_read(sv[1], resp, sizeof(resp));

  std::istringstream iss(resp);
  std::string token;
  int count = 0;
  while (iss >> token)
    count++;
  ASSERT(count == 3, "KEYS should return 3 keys");

  close(sv[1]);
}

void test_handle_unknown_command(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "FOO");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "ERR unknown command", "unknown command response");

  close(sv[1]);
}

void test_handle_set_no_args(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "SET");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "ERR usage: SET key value", "SET no args");

  close(sv[1]);
}

void test_handle_set_one_arg(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "SET key");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "ERR usage: SET key value", "SET one arg");

  close(sv[1]);
}

void test_handle_get_no_args(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "GET");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "ERR usage: GET key", "GET no args");

  close(sv[1]);
}

void test_handle_get_too_many_args(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "GET a b");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "ERR usage: GET key", "GET too many args");

  close(sv[1]);
}

void test_handle_del_no_args(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "DEL");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "ERR usage: DEL key", "DEL no args");

  close(sv[1]);
}

void test_handle_del_too_many_args(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "DEL a b");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "ERR usage: DEL key", "DEL too many args");

  close(sv[1]);
}

void test_handle_value_with_spaces(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "SET mykey hello world");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "OK", "SET with spaces");

  cmd_write(sv[1], "GET mykey");
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "hello world", "GET with spaces");

  close(sv[1]);
}

void test_handle_ping_case_insensitive(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  cmd_write(sv[1], "ping");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "PONG", "case insensitive PING");

  close(sv[1]);
}

void test_handle_empty_line(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  write(sv[1], "\n", 1);

  cmd_write(sv[1], "PING");
  char resp[128];
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "PONG", "PING after empty line");

  close(sv[1]);
}

void test_handle_multiple_commands(void) {
  int sv[2];
  DB db;
  ASSERT(setup_socketpair(sv, db) == 0, "setup_socketpair failed");

  char resp[128];

  cmd_write(sv[1], "SET a 1");
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "OK", "multi SET a");

  cmd_write(sv[1], "SET b 2");
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "OK", "multi SET b");

  cmd_write(sv[1], "GET a");
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "1", "multi GET a");

  cmd_write(sv[1], "GET b");
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "2", "multi GET b");

  cmd_write(sv[1], "DEL a");
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "1", "multi DEL a");

  cmd_write(sv[1], "GET a");
  cmd_read(sv[1], resp, sizeof(resp));
  ASSERT_STR_EQ(resp, "(nil)", "multi GET a after DEL");

  close(sv[1]);
}

int main(void) {
  fprintf(stderr, "DB unit tests:\n");
  run_test("db_new", test_db_new);
  run_test("db_set_get", test_db_set_get);
  run_test("db_get_missing", test_db_get_missing);
  run_test("db_del", test_db_del);
  run_test("db_del_missing", test_db_del_missing);
  run_test("db_overwrite", test_db_overwrite);
  run_test("db_keys", test_db_keys);
  run_test("db_concurrency", test_db_concurrency);

  fprintf(stderr, "\nServer integration tests:\n");
  run_test("ping", test_ping);
  run_test("set", test_handle_set);
  run_test("get", test_handle_get);
  run_test("get_missing", test_handle_get_missing);
  run_test("del", test_handle_del);
  run_test("del_missing", test_handle_del_missing);
  run_test("keys", test_handle_keys);
  run_test("unknown_command", test_handle_unknown_command);
  run_test("set_no_args", test_handle_set_no_args);
  run_test("set_one_arg", test_handle_set_one_arg);
  run_test("get_no_args", test_handle_get_no_args);
  run_test("get_too_many_args", test_handle_get_too_many_args);
  run_test("del_no_args", test_handle_del_no_args);
  run_test("del_too_many_args", test_handle_del_too_many_args);
  run_test("value_with_spaces", test_handle_value_with_spaces);
  run_test("ping_case_insensitive", test_handle_ping_case_insensitive);
  run_test("empty_line", test_handle_empty_line);
  run_test("multiple_commands", test_handle_multiple_commands);

  fprintf(stderr, "\n%d passed, %d failed out of %d assertions\n", tests_passed,
          tests_failed, tests_run);

  return fail_count > 0 ? 1 : 0;
}
