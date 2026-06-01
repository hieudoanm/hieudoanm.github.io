use std::collections::HashMap;
use std::io::{BufRead, BufReader, Write};
use std::net::{TcpListener, TcpStream};
use std::sync::{Arc, RwLock};

type SharedDB = Arc<RwLock<HashMap<String, String>>>;

fn handle_connection(stream: TcpStream, db: SharedDB) {
    let peer = match stream.peer_addr() {
        Ok(addr) => addr.to_string(),
        Err(_) => "unknown".to_string(),
    };
    eprintln!("Accepted connection from: {peer}");

    let reader = BufReader::new(stream.try_clone().unwrap());
    let mut writer = stream;

    for line in reader.lines() {
        let line = match line {
            Ok(l) => l,
            Err(_) => break,
        };
        let line = line.trim().to_string();
        if line.is_empty() {
            continue;
        }

        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.is_empty() {
            continue;
        }

        match parts[0].to_uppercase().as_str() {
            "PING" => {
                let _ = writeln!(writer, "PONG");
            }
            "SET" => {
                if parts.len() < 3 {
                    let _ = writeln!(writer, "ERR usage: SET key value");
                    continue;
                }
                let key = parts[1].to_string();
                let value = parts[2..].join(" ");
                db.write().unwrap().insert(key, value);
                let _ = writeln!(writer, "OK");
            }
            "GET" => {
                if parts.len() != 2 {
                    let _ = writeln!(writer, "ERR usage: GET key");
                    continue;
                }
                let value = {
                    let db = db.read().unwrap();
                    db.get(parts[1]).cloned()
                };
                if let Some(v) = &value {
                    let _ = writeln!(writer, "{v}");
                } else {
                    let _ = writeln!(writer, "(nil)");
                }
            }
            "DEL" => {
                if parts.len() != 2 {
                    let _ = writeln!(writer, "ERR usage: DEL key");
                    continue;
                }
                let removed = db.write().unwrap().remove(parts[1]).is_some();
                if removed {
                    let _ = writeln!(writer, "1");
                } else {
                    let _ = writeln!(writer, "0");
                }
            }
            "KEYS" => {
                let response = {
                    let db = db.read().unwrap();
                    let keys: Vec<&str> = db.keys().map(|k| k.as_str()).collect();
                    keys.join(" ")
                };
                let _ = writeln!(writer, "{response}");
            }
            _ => {
                let _ = writeln!(writer, "ERR unknown command");
            }
        }
    }
}

fn main() {
    let db: SharedDB = Arc::new(RwLock::new(HashMap::new()));
    let listener = TcpListener::bind("0.0.0.0:6379").unwrap();
    eprintln!("Redis-like server listening on 0.0.0.0:6379");

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                let db = db.clone();
                std::thread::spawn(move || {
                    handle_connection(stream, db);
                });
            }
            Err(_) => continue,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::thread;

    struct TestEnv {
        stream: TcpStream,
        db: SharedDB,
    }

    fn setup() -> TestEnv {
        let db: SharedDB = Arc::new(RwLock::new(HashMap::new()));
        let listener = TcpListener::bind("127.0.0.1:0").unwrap();
        let addr = listener.local_addr().unwrap();

        let db_clone = db.clone();
        thread::spawn(move || {
            if let Ok((stream, _)) = listener.accept() {
                handle_connection(stream, db_clone);
            }
        });

        let stream = TcpStream::connect(addr).unwrap();
        TestEnv { stream, db }
    }

    fn cmd(stream: &mut TcpStream, command: &str) -> String {
        let _ = writeln!(stream, "{command}");
        let mut reader = BufReader::new(stream.try_clone().unwrap());
        let mut line = String::new();
        reader.read_line(&mut line).unwrap();
        line.trim().to_string()
    }

    #[test]
    fn test_db_new() {
        let db: SharedDB = Arc::new(RwLock::new(HashMap::new()));
        assert!(db.read().unwrap().is_empty());
    }

    #[test]
    fn test_db_set_get() {
        let db: SharedDB = Arc::new(RwLock::new(HashMap::new()));
        db.write()
            .unwrap()
            .insert("key1".to_string(), "value1".to_string());
        let val = db.read().unwrap().get("key1").cloned();
        assert_eq!(val, Some("value1".to_string()));
    }

    #[test]
    fn test_db_get_missing() {
        let db: SharedDB = Arc::new(RwLock::new(HashMap::new()));
        let val = db.read().unwrap().get("nonexistent").cloned();
        assert_eq!(val, None);
    }

    #[test]
    fn test_db_del() {
        let db: SharedDB = Arc::new(RwLock::new(HashMap::new()));
        db.write()
            .unwrap()
            .insert("key1".to_string(), "value1".to_string());
        assert!(db.write().unwrap().remove("key1").is_some());
        assert!(db.read().unwrap().get("key1").is_none());
    }

    #[test]
    fn test_db_del_missing() {
        let db: SharedDB = Arc::new(RwLock::new(HashMap::new()));
        assert!(db.write().unwrap().remove("nonexistent").is_none());
    }

    #[test]
    fn test_db_overwrite() {
        let db: SharedDB = Arc::new(RwLock::new(HashMap::new()));
        db.write()
            .unwrap()
            .insert("key1".to_string(), "value1".to_string());
        db.write()
            .unwrap()
            .insert("key1".to_string(), "value2".to_string());
        let val = db.read().unwrap().get("key1").cloned();
        assert_eq!(val, Some("value2".to_string()));
    }

    #[test]
    fn test_db_concurrency() {
        let db: SharedDB = Arc::new(RwLock::new(HashMap::new()));
        let mut handles = Vec::new();

        for i in 0..100 {
            let db = db.clone();
            handles.push(thread::spawn(move || {
                let key = format!("key{i}");
                let value = format!("value{i}");
                db.write().unwrap().insert(key.clone(), value.clone());
                let result = db.read().unwrap().get(&key).cloned();
                assert_eq!(result, Some(value));
            }));
        }

        for h in handles {
            h.join().unwrap();
        }

        for i in 0..100 {
            let key = format!("key{i}");
            let expected = format!("value{i}");
            let val = db.read().unwrap().get(&key).cloned();
            assert_eq!(val, Some(expected));
        }
    }

    #[test]
    fn test_ping() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "PING"), "PONG");
    }

    #[test]
    fn test_set() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "SET mykey myvalue"), "OK");
    }

    #[test]
    fn test_get() {
        let mut env = setup();
        env.db
            .write()
            .unwrap()
            .insert("mykey".to_string(), "myvalue".to_string());
        assert_eq!(cmd(&mut env.stream, "GET mykey"), "myvalue");
    }

    #[test]
    fn test_get_missing() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "GET nonexistent"), "(nil)");
    }

    #[test]
    fn test_del() {
        let mut env = setup();
        env.db
            .write()
            .unwrap()
            .insert("mykey".to_string(), "myvalue".to_string());
        assert_eq!(cmd(&mut env.stream, "DEL mykey"), "1");
        assert!(env.db.read().unwrap().get("mykey").is_none());
    }

    #[test]
    fn test_del_missing() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "DEL nonexistent"), "0");
    }

    #[test]
    fn test_keys() {
        let mut env = setup();
        env.db
            .write()
            .unwrap()
            .insert("a".to_string(), "1".to_string());
        env.db
            .write()
            .unwrap()
            .insert("b".to_string(), "2".to_string());
        env.db
            .write()
            .unwrap()
            .insert("c".to_string(), "3".to_string());
        let resp = cmd(&mut env.stream, "KEYS");
        let keys: Vec<&str> = resp.split_whitespace().collect();
        assert_eq!(keys.len(), 3);
    }

    #[test]
    fn test_unknown_command() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "FOO"), "ERR unknown command");
    }

    #[test]
    fn test_set_no_args() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "SET"), "ERR usage: SET key value");
    }

    #[test]
    fn test_set_one_arg() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "SET key"), "ERR usage: SET key value");
    }

    #[test]
    fn test_get_no_args() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "GET"), "ERR usage: GET key");
    }

    #[test]
    fn test_get_too_many_args() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "GET a b"), "ERR usage: GET key");
    }

    #[test]
    fn test_del_no_args() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "DEL"), "ERR usage: DEL key");
    }

    #[test]
    fn test_del_too_many_args() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "DEL a b"), "ERR usage: DEL key");
    }

    #[test]
    fn test_value_with_spaces() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "SET mykey hello world"), "OK");
        assert_eq!(cmd(&mut env.stream, "GET mykey"), "hello world");
    }

    #[test]
    fn test_ping_case_insensitive() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "ping"), "PONG");
    }

    #[test]
    fn test_empty_line() {
        let mut env = setup();
        let _ = writeln!(env.stream, "");
        assert_eq!(cmd(&mut env.stream, "PING"), "PONG");
    }

    #[test]
    fn test_multiple_commands() {
        let mut env = setup();
        assert_eq!(cmd(&mut env.stream, "SET a 1"), "OK");
        assert_eq!(cmd(&mut env.stream, "SET b 2"), "OK");
        assert_eq!(cmd(&mut env.stream, "GET a"), "1");
        assert_eq!(cmd(&mut env.stream, "GET b"), "2");
        assert_eq!(cmd(&mut env.stream, "DEL a"), "1");
        assert_eq!(cmd(&mut env.stream, "GET a"), "(nil)");
    }
}
