import Foundation
import ArgumentParser

struct Colors: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "colors",
        abstract: "Color conversion and manipulation",
        subcommands: [
            ColorsConvert.self, ColorsPalette.self, ColorsRandom.self,
        ]
    )

    mutating func run() {}
}

struct ColorsConvert: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "convert",
        abstract: "Convert color formats",
        subcommands: [ConvertHex.self, ConvertRGB.self, ConvertHCL.self, ConvertOKLCH.self, ConvertHSL.self]
    )

    mutating func run() {}
}

func printAllConversions(r: Int, g: Int, b: Int) {
    let hex = rgbToHex(r: r, g: g, b: b)
    let hsl = rgbToHSL(r: r, g: g, b: b)
    let cmyk = rgbToCMYK(r: r, g: g, b: b)
    let (hclH, hclC, hclL) = rgbToHCL(r: r, g: g, b: b)
    let (okl, okc, okh) = rgbToOKLCH(r: r, g: g, b: b)
    print("RGB:   \(r) \(g) \(b)")
    print("HEX:   \(hex)")
    print("HSL:   \(String(format: "%.1f", hsl.h))° \(String(format: "%.1f", hsl.s))% \(String(format: "%.1f", hsl.l))%")
    print("CMYK:  \(String(format: "%.1f", cmyk.c * 100))% \(String(format: "%.1f", cmyk.m * 100))% \(String(format: "%.1f", cmyk.y * 100))% \(String(format: "%.1f", cmyk.k * 100))%")
    print("HCL:   \(String(format: "%.1f", hclH))° \(String(format: "%.1f", hclC)) \(String(format: "%.1f", hclL))")
    print("OKLCH: \(String(format: "%.3f", okl)) \(String(format: "%.3f", okc)) \(String(format: "%.1f", okh))°")
}

struct ConvertHex: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "hex", abstract: "Convert HEX to other formats")
    @Argument(help: "Hex color (e.g., #FF0000 or FF0000)") var hex: String
    mutating func run() {
        guard let (r, g, b) = hexToRGB(hex) else { print("Invalid hex"); return }
        printAllConversions(r: r, g: g, b: b)
    }
}

struct ConvertRGB: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "rgb", abstract: "Convert RGB to other formats")
    @Argument(help: "Red (0-255)") var r: Int
    @Argument(help: "Green (0-255)") var g: Int
    @Argument(help: "Blue (0-255)") var b: Int
    mutating func run() {
        guard (0...255).contains(r) && (0...255).contains(g) && (0...255).contains(b) else {
            print("Invalid RGB values"); return
        }
        printAllConversions(r: r, g: g, b: b)
    }
}

struct ConvertHCL: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "hcl", abstract: "Convert HCL to other formats")
    @Argument(help: "Hue (0-360)") var h: Double
    @Argument(help: "Chroma") var c: Double
    @Argument(help: "Lightness (0-100)") var l: Double
    mutating func run() {
        let (r, g, b) = hclToRGB(h: h, c: c, l: l)
        printAllConversions(r: r, g: g, b: b)
    }
}

struct ConvertOKLCH: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "oklch", abstract: "Convert OKLCH to other formats")
    @Argument(help: "Lightness (0-1)") var l: Double
    @Argument(help: "Chroma") var c: Double
    @Argument(help: "Hue (0-360)") var h: Double
    mutating func run() {
        let (r, g, b) = oklchToRGB(l: l, c: c, h: h)
        printAllConversions(r: r, g: g, b: b)
    }
}

struct ConvertHSL: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "hsl", abstract: "Convert HSL to other formats")
    @Argument(help: "Hue (0-360)") var h: Double
    @Argument(help: "Saturation (0-100)") var s: Double
    @Argument(help: "Lightness (0-100)") var l: Double
    mutating func run() {
        let (r, g, b) = hslToRGB(h: h, s: s, l: l)
        printAllConversions(r: r, g: g, b: b)
    }
}

struct ColorsPalette: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "palette", abstract: "Generate color palette")

    @Argument(help: "Base hex color") var hex: String
    @Option(name: .long, help: "Palette type: mono, complement, triad, tetrad, analogous")
    var type: String = "mono"
    @Option(name: .long, help: "Number of colors")
    var count: Int = 5
    @Flag(name: .long, help: "Show color blocks")
    var show = false

    mutating func run() {
        guard let pt = PaletteType(rawValue: type) else {
            print("Invalid palette type. Use: mono, complement, triad, tetrad, analogous")
            return
        }
        let palette = generatePalette(hex: hex, type: pt, count: count)
        for color in palette {
            if show {
                print("\(color)")
            } else {
                print(color)
            }
        }
    }
}

struct ColorsRandom: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "random", abstract: "Generate random hex color")
    mutating func run() { print(randomHex()) }
}
