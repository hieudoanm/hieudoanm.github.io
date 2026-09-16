fn main() {
    landify::run().unwrap_or_else(|err| {
        eprintln!("landify: {err}");
        std::process::exit(1);
    });
}
