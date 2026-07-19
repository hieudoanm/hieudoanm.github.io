#[derive(clap::Args)]
pub struct Args {
    #[arg(help = "Hex color (without #)")]
    pub hex: Option<String>,
}

pub fn command() -> clap::Command {
    clap::Command::new("hex")
        .about("Convert hex color to other formats")
        .arg(clap::Arg::new("hex").help("Hex color (without #)"))
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    use crate::cmd::colors::service;

    let hex = if let Some(h) = matches.hex.as_ref() {
        h.clone()
    } else {
        print!("Enter hex color (e.g. ff0000): ");
        std::io::Write::flush(&mut std::io::stdout())?;
        let mut input = String::new();
        std::io::stdin().read_line(&mut input)?;
        input.trim().to_string()
    };

    let hex = hex.trim_start_matches('#');
    if !service::is_valid_hex(hex) {
        anyhow::bail!("invalid hex color: #{hex}");
    }

    let (r, g, b_val) = service::hex_to_rgb(hex).unwrap();
    let (h, s, l) = service::hex_to_hsl(hex).unwrap();
    let (l_oklch, c, h_oklch) = service::hex_to_oklch(hex).unwrap();
    let (hcl_h, hcl_c, hcl_l) = service::hex_to_hcl(hex).unwrap();
    let (c_val, m, y, k) = service::hex_to_cmyk(hex).unwrap();

    println!("Color: #{hex}");
    println!("\x1b[48;2;{r};{g};{b_val}m     \x1b[0m  preview");
    println!("HEX:  #{hex}");
    println!("RGB:  ({r}, {g}, {b_val})");
    println!("HSL:  ({h:.1}, {s:.1}%, {l:.1}%)");
    println!("HCL:  ({hcl_h:.1}, {hcl_c:.1}%, {hcl_l:.1}%)");
    println!("OKLCH: ({l_oklch:.3}, {c:.3}, {h_oklch:.1})");
    println!("CMYK: ({c_val:.1}%, {m:.1}%, {y:.1}%, {k:.1}%)");
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
