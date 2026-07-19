use kevin::db::DB;
use kevin::handler::handle_line;

fn reply(line: &str, kv: &DB) -> String {
    handle_line(line, kv).0
}

#[test]
fn ping_and_case_insensitive() {
    let kv = DB::new();
    assert_eq!(reply("PING", &kv), "PONG\n");
    assert_eq!(reply("ping", &kv), "PONG\n");
}

#[test]
fn set_get() {
    let kv = DB::new();
    assert_eq!(reply("SET k v", &kv), "OK\n");
    assert_eq!(reply("GET k", &kv), "v\n");
    assert_eq!(reply("GET missing", &kv), "(nil)\n");
}

#[test]
fn set_overwrite() {
    let kv = DB::new();
    assert_eq!(reply("SET k one", &kv), "OK\n");
    assert_eq!(reply("SET k two", &kv), "OK\n");
    assert_eq!(reply("GET k", &kv), "two\n");
}

#[test]
fn keys_and_len() {
    let kv = DB::new();
    assert_eq!(reply("KEYS", &kv), "\n");
    assert_eq!(reply("SET a 1", &kv), "OK\n");
    assert_eq!(reply("SET b 2", &kv), "OK\n");
    let keys = reply("KEYS", &kv);
    assert!(matches!(keys.as_str(), "a b\n" | "b a\n"));
    assert_eq!(reply("LEN", &kv), "2\n");
}

#[test]
fn error_messages_match_go() {
    let kv = DB::new();
    assert_eq!(reply("NOSUCH", &kv), "ERR unknown command\n");
    assert_eq!(reply("GET a b", &kv), "ERR usage: GET key\n");
    assert_eq!(reply("SET", &kv), "ERR usage: SET key value [EX seconds]\n");
    assert_eq!(
        reply("SET k", &kv),
        "ERR usage: SET key value [EX seconds]\n"
    );
    assert_eq!(reply("DEL", &kv), "ERR usage: DEL key [key ...]\n");
    assert_eq!(reply("LEN x", &kv), "ERR usage: LEN\n");
    assert_eq!(reply("FLUSHALL x", &kv), "ERR usage: FLUSHALL\n");
}

#[test]
fn value_with_spaces() {
    let kv = DB::new();
    assert_eq!(reply("SET msg hello world", &kv), "OK\n");
    assert_eq!(reply("GET msg", &kv), "hello world\n");
}

#[test]
fn empty_lines_ignored() {
    let kv = DB::new();
    let (resp, ok) = handle_line("", &kv);
    assert_eq!(resp, "");
    assert!(!ok);
    let (resp, ok) = handle_line("   \r\n", &kv);
    assert_eq!(resp, "");
    assert!(!ok);
}

#[test]
fn ttl_expire_and_sentinels() {
    let kv = DB::new();
    assert_eq!(reply("SET k v EX 10", &kv), "OK\n");
    assert_eq!(reply("TTL k", &kv), "10\n");
    assert_eq!(reply("EXPIRE k 20", &kv), "1\n");
    assert_eq!(reply("TTL k", &kv), "20\n");
    assert_eq!(reply("TTL missing", &kv), "-2\n");
    assert_eq!(reply("SET plain v", &kv), "OK\n");
    assert_eq!(reply("TTL plain", &kv), "-1\n");
    assert_eq!(reply("EXPIRE missing 5", &kv), "0\n");
}

#[test]
fn set_ex_invalid() {
    let kv = DB::new();
    assert_eq!(reply("SET k v EX abc", &kv), "ERR invalid expire time\n");
    assert_eq!(reply("SET k v EX 0", &kv), "ERR invalid expire time\n");
}

#[test]
fn del_multiple_exists_flush() {
    let kv = DB::new();
    assert_eq!(reply("SET a 1", &kv), "OK\n");
    assert_eq!(reply("SET b 2", &kv), "OK\n");
    assert_eq!(reply("EXISTS a", &kv), "1\n");
    assert_eq!(reply("EXISTS c", &kv), "0\n");
    assert_eq!(reply("DEL a b missing", &kv), "2\n");
    assert_eq!(reply("LEN", &kv), "0\n");
    assert_eq!(reply("SET a 1", &kv), "OK\n");
    assert_eq!(reply("FLUSHALL", &kv), "OK\n");
    assert_eq!(reply("LEN", &kv), "0\n");
}

#[test]
fn trailing_crlf_is_stripped() {
    let kv = DB::new();
    assert_eq!(reply("SET a 1\r\n", &kv), "OK\n");
    assert_eq!(reply("GET a\r\n", &kv), "1\n");
}
