use criterion::{criterion_group, criterion_main, Criterion};
use kevin::db::DB;

fn bench_set(c: &mut Criterion) {
    let db = DB::new();
    c.bench_function("set", |b| {
        b.iter(|| {
            db.set("key", "value");
        });
    });
}

fn bench_get(c: &mut Criterion) {
    let db = DB::new();
    db.set("key", "value");
    c.bench_function("get", |b| {
        b.iter(|| {
            db.get("key");
        });
    });
}

fn bench_keys(c: &mut Criterion) {
    let db = DB::new();
    for i in 0..1000 {
        db.set(&format!("key-{i:04}"), "value");
    }
    c.bench_function("keys", |b| {
        b.iter(|| {
            db.keys();
        });
    });
}

criterion_group!(benches, bench_set, bench_get, bench_keys);
criterion_main!(benches);
