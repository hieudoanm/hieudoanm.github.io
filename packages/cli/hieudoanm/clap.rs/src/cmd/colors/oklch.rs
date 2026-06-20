#[derive(clap::Args)]
pub struct Args {
    #[arg(help = "Lightness (0-1)")]
    pub l: Option<f64>,
    #[arg(help = "Chroma (0-0.4)")]
    pub c: Option<f64>,
    #[arg(help = "Hue (0-360)")]
    pub h: Option<f64>,
}

pub fn command() -> clap::Command {
    clap::Command::new("oklch")
        .about("Convert OKLCH color to other formats")
        .arg(clap::Arg::new("l").help("Lightness (0-1)"))
        .arg(clap::Arg::new("c").help("Chroma (0-0.4)"))
        .arg(clap::Arg::new("h").help("Hue (0-360)"))
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let l = *matches.l.as_ref().unwrap_or(&0.0);
    let c = *matches.c.as_ref().unwrap_or(&0.0);
    let h = *matches.h.as_ref().unwrap_or(&0.0);
    println!("OKLCH({l:.3}, {c:.3}, {h:.1}°)");
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
