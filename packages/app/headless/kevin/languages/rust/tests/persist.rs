use kevin::db::DB;
use std::fs;
use std::time::Duration;

#[test]
fn save_load_roundtrip() {
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("kevin.json");
    let path = path.to_str().unwrap().to_string();

    let db = DB::new();
    db.set("a", "1");
    db.set_with_ttl("b", "2", Duration::from_secs(3600));
    db.save(&path).unwrap();

    let db2 = DB::new();
    db2.load(&path).unwrap();
    assert_eq!(db2.len(), 2);
    assert_eq!(db2.get("a").unwrap(), "1");
    assert_eq!(db2.get("b").unwrap(), "2");
    assert!(matches!(db2.ttl("b"), kevin::db::ttl::TTL::Remaining(_)));
}

#[test]
fn load_missing_is_noop() {
    let db = DB::new();
    db.set("keep", "1");
    let path = tempfile::tempdir().unwrap().path().join("nope.json");
    db.load(path.to_str().unwrap()).unwrap();
    assert_eq!(db.keys(), vec!["keep"]);
}

#[test]
fn load_prunes_expired_keys() {
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("kevin.json");
    let snap = r#"{"data":{"a":"1","b":"2"},"expires":{"a":1,"b":99999999999999}}"#;
    fs::write(&path, snap).unwrap();

    let db = DB::new();
    db.load(path.to_str().unwrap()).unwrap();
    assert_eq!(db.keys(), vec!["b"]);
    assert_eq!(db.ttl("a"), kevin::db::ttl::TTL::Missing);
}

#[test]
fn save_is_overwritten() {
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("kevin.json");
    let path = path.to_str().unwrap().to_string();

    let db = DB::new();
    db.set("a", "1");
    db.save(&path).unwrap();
    db.set("b", "2");
    db.save(&path).unwrap();

    let db2 = DB::new();
    db2.load(&path).unwrap();
    assert_eq!(db2.keys(), vec!["a", "b"]);
}

#[test]
fn load_rejects_corrupt_json() {
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("kevin.json");
    fs::write(&path, "{not json}").unwrap();

    let db = DB::new();
    assert!(db.load(path.to_str().unwrap()).is_err());
}
