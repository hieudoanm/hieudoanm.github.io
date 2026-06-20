#[derive(clap::Args)]
pub struct Args {
    #[arg(help = "Hue (0-360)")]
    pub h: Option<f64>,
    #[arg(help = "Chroma (0-100)")]
    pub c: Option<f64>,
    #[arg(help = "Luminance (0-100)")]
    pub l: Option<f64>,
}

pub fn command() -> clap::Command {
    clap::Command::new("hcl")
        .about("Convert HCL color to other formats")
        .arg(clap::Arg::new("h").help("Hue (0-360)"))
        .arg(clap::Arg::new("c").help("Chroma (0-100)"))
        .arg(clap::Arg::new("l").help("Luminance (0-100)"))
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let h = *matches.h.as_ref().unwrap_or(&0.0);
    let c = *matches.c.as_ref().unwrap_or(&0.0);
    let l = *matches.l.as_ref().unwrap_or(&0.0);
    println!("HCL({h:.1}, {c:.1}%, {l:.1}%)");
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
