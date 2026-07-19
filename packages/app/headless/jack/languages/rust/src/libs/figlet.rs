pub fn log_program_name() {
    println!("╔══════════════════════════════════╗");
    println!("║        Hieu Doan's CLI           ║");
    println!("║        Personal Toolbox          ║");
    println!("╚══════════════════════════════════╝");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_log_program_name_does_not_panic() {
        log_program_name();
    }
}
