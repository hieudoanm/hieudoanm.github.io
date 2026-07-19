fn main() {
    println!("cargo:rerun-if-changed=src/gui/ui.slint");
    if std::env::var("CARGO_FEATURE_GUI").is_ok() {
        slint_build::compile_with_config(
            "src/gui/ui.slint",
            slint_build::CompilerConfiguration::new().with_style("material".into()),
        )
        .unwrap();
    }
}
