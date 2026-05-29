pub fn command() -> clap::Command {
    clap::Command::new("colors")
        .about("Color conversion and palette tools")
        .subcommand(
            clap::Command::new("random")
                .about("Generate random colors"),
        )
        .subcommand(
            clap::Command::new("palette")
                .about("Show a color palette"),
        )
        .subcommand(
            clap::Command::new("convert-hex")
                .about("Convert hex color to other formats")
                .arg(clap::Arg::new("hex").help("Hex color (without #)")),
        )
        .subcommand(
            clap::Command::new("convert-rgb")
                .about("Convert RGB color to other formats")
                .arg(clap::Arg::new("r").help("Red (0-255)"))
                .arg(clap::Arg::new("g").help("Green (0-255)"))
                .arg(clap::Arg::new("b").help("Blue (0-255)")),
        )
        .subcommand(
            clap::Command::new("convert-hcl")
                .about("Convert HCL color to other formats")
                .arg(clap::Arg::new("h").help("Hue (0-360)"))
                .arg(clap::Arg::new("c").help("Chroma (0-100)"))
                .arg(clap::Arg::new("l").help("Luminance (0-100)")),
        )
        .subcommand(
            clap::Command::new("convert-oklch")
                .about("Convert OKLCH color to other formats")
                .arg(clap::Arg::new("l").help("Lightness (0-1)"))
                .arg(clap::Arg::new("c").help("Chroma (0-0.4)"))
                .arg(clap::Arg::new("h").help("Hue (0-360)")),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    use crate::services::colors;

    match matches.subcommand() {
        Some(("random", _m)) => {
            let hex = colors::generate_random_hex_color();
            let (r, g, b) = colors::hex_to_rgb(&hex).unwrap();
            println!("Random color: #{hex}");
            println!("RGB: ({r}, {g}, {b})");
            let (h, s, l) = colors::hex_to_hsl(&hex).unwrap();
            println!("HSL: ({h:.1}, {s:.1}%, {l:.1}%)");
        }
        Some(("palette", _m)) => {
            println!("Generating color palette...");
            for _ in 0..8 {
                let hex = colors::generate_random_hex_color();
                let (r, g, b) = colors::hex_to_rgb(&hex).unwrap();
                println!(
                    "\x1b[48;2;{r};{g};{b}m      \x1b[0m  #{hex}  RGB({r},{g},{b})"
                );
            }
        }
        Some(("convert-hex", sub_m)) => {
            let hex = if let Some(h) = sub_m.get_one::<String>("hex") {
                h.clone()
            } else {
                print!("Enter hex color (e.g. ff0000): ");
                std::io::Write::flush(&mut std::io::stdout())?;
                let mut input = String::new();
                std::io::stdin().read_line(&mut input)?;
                input.trim().to_string()
            };

            let hex = hex.trim_start_matches('#');
            if !colors::is_valid_hex(hex) {
                anyhow::bail!("invalid hex color: #{hex}");
            }

            let (r, g, b_val) = colors::hex_to_rgb(hex).unwrap();
            let (h, s, l) = colors::hex_to_hsl(hex).unwrap();
            let (l_oklch, c, h_oklch) = colors::hex_to_oklch(hex).unwrap();
            let (hcl_h, hcl_c, hcl_l) = colors::hex_to_hcl(hex).unwrap();
            let (c_val, m, y, k) = colors::hex_to_cmyk(hex).unwrap();

            println!("Color: #{hex}");
            println!(
                "\x1b[48;2;{r};{g};{b_val}m     \x1b[0m  preview"
            );
            println!("HEX:  #{hex}");
            println!("RGB:  ({r}, {g}, {b_val})");
            println!("HSL:  ({h:.1}, {s:.1}%, {l:.1}%)");
            println!("HCL:  ({hcl_h:.1}, {hcl_c:.1}%, {hcl_l:.1}%)");
            println!("OKLCH: ({l_oklch:.3}, {c:.3}, {h_oklch:.1})");
            println!("CMYK: ({c_val:.1}%, {m:.1}%, {y:.1}%, {k:.1}%)");
        }
        Some(("convert-rgb", sub_m)) => {
            let r = *sub_m.get_one::<u8>("r").unwrap_or(&0);
            let g = *sub_m.get_one::<u8>("g").unwrap_or(&0);
            let b = *sub_m.get_one::<u8>("b").unwrap_or(&0);
            println!("RGB({r}, {g}, {b})");
        }
        Some(("convert-hcl", sub_m)) => {
            let h = *sub_m.get_one::<f64>("h").unwrap_or(&0.0);
            let c = *sub_m.get_one::<f64>("c").unwrap_or(&0.0);
            let l = *sub_m.get_one::<f64>("l").unwrap_or(&0.0);
            println!("HCL({h:.1}, {c:.1}%, {l:.1}%)");
        }
        Some(("convert-oklch", sub_m)) => {
            let l = *sub_m.get_one::<f64>("l").unwrap_or(&0.0);
            let c = *sub_m.get_one::<f64>("c").unwrap_or(&0.0);
            let h = *sub_m.get_one::<f64>("h").unwrap_or(&0.0);
            println!("OKLCH({l:.3}, {c:.3}, {h:.1}°)");
        }
        _ => {
            println!("Colors commands:");
            println!("  random           Generate random colors");
            println!("  palette          Show a color palette");
            println!("  convert-hex      Convert hex to all formats");
        }
    }
    Ok(())
}
