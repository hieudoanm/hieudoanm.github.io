import Foundation
import ArgumentParser
import CoreGraphics
import ImageIO

struct ColorsCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "colors",
        abstract: "Color tools and conversions",
        subcommands: [ColorsConvertHex.self, ColorsConvertRGB.self, ColorsConvertHCL.self, ColorsConvertOKLCH.self, ColorsPalette.self, ColorsRandom.self]
    )
    mutating func run() {}
}

func printColorInfo(r: Int, g: Int, b: Int) {
    let rgb = RGB(r: r, g: g, b: b)
    let hsl = rgb.hsl
    let cmyk = rgb.cmyk
    let hcl = rgb.hcl
    let oklch = rgb.oklch
    let block = "\u{1B}[48;2;\(r);\(g);\(b)m     \u{1B}[0m"
    print("\(block) \(rgb.hex)")
    print("\(rgb)")
    print(String(format: "%@", hsl.description))
    print(String(format: "%@", cmyk.description))
    print(String(format: "HCL(%.1f°, %.1f, %.1f)", hcl.h, hcl.c, hcl.l))
    print(String(format: "OKLCH(%.3f, %.3f, %.1f°)", oklch.l, oklch.c, oklch.h))
}

struct ColorsConvertHex: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "convert-hex", abstract: "Convert HEX to all formats")
    @Argument(help: "Hex color (#FF0000 or FF0000)") var hex: String
    mutating func run() {
        guard let (r, g, b) = hexToRGB(hex) else { print("Invalid hex"); return }
        printColorInfo(r: r, g: g, b: b)
    }
}

struct ColorsConvertRGB: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "convert-rgb", abstract: "Convert RGB to all formats")
    @Argument(help: "Red (0-255)") var r: Int
    @Argument(help: "Green (0-255)") var g: Int
    @Argument(help: "Blue (0-255)") var b: Int
    mutating func run() {
        guard (0...255).contains(r) && (0...255).contains(g) && (0...255).contains(b) else {
            print("Invalid RGB values"); return
        }
        printColorInfo(r: r, g: g, b: b)
    }
}

struct ColorsConvertHCL: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "convert-hcl", abstract: "Convert HCL to all formats")
    @Argument(help: "Hue (0-360)") var h: Double
    @Argument(help: "Chroma") var c: Double
    @Argument(help: "Lightness (0-100)") var l: Double
    mutating func run() {
        let (r, g, b) = hclToRGB(h: h, c: c, l: l)
        printColorInfo(r: r, g: g, b: b)
    }
}

struct ColorsConvertOKLCH: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "convert-oklch", abstract: "Convert OKLCH to all formats")
    @Argument(help: "Lightness (0-1)") var l: Double
    @Argument(help: "Chroma") var c: Double
    @Argument(help: "Hue (0-360)") var h: Double
    mutating func run() {
        let (r, g, b) = oklchToRGB(l: l, c: c, h: h)
        printColorInfo(r: r, g: g, b: b)
    }
}

struct ColorsPalette: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "palette", abstract: "Extract dominant colors from image")
    @Argument(help: "Image file path") var path: String
    @Option(name: .shortAndLong, help: "Number of dominant colors") var count: Int = 5
    mutating func run() throws {
        let output = try runSips(args: ["--getProperty", "all", path])
        let lines = output.components(separatedBy: .newlines)
        var pixelWidth = 0, pixelHeight = 0
        for line in lines {
            let parts = line.split(separator: ":", maxSplits: 1).map(String.init)
            guard parts.count == 2 else { continue }
            let key = parts[0].trimmingCharacters(in: .whitespaces)
            let val = parts[1].trimmingCharacters(in: .whitespaces)
            if key == "pixelWidth" { pixelWidth = Int(val) ?? 0 }
            if key == "pixelHeight" { pixelHeight = Int(val) ?? 0 }
        }
        let totalPixels = pixelWidth * pixelHeight
        let sampleSize = min(totalPixels, 10000)
        var colorFreq: [String: Int] = [:]
        let tempDir = FileManager.default.temporaryDirectory
        let samplesPath = tempDir.appendingPathComponent("\(UUID().uuidString).png").path
        defer { try? FileManager.default.removeItem(atPath: samplesPath) }
        let cols = min(pixelWidth, 100)
        let rows = min(pixelHeight, Int(ceil(Double(sampleSize) / Double(cols))))
        try runSips(args: ["--resampleWidth", "\(cols)", "--resampleHeight", "\(rows)", "--out", samplesPath, path])
        guard let scaledData = try? Data(contentsOf: URL(fileURLWithPath: samplesPath)),
              let imageSource = CGImageSourceCreateWithData(scaledData as CFData, nil),
              let cgImage = CGImageSourceCreateImageAtIndex(imageSource, 0, nil) else {
            print("Could not process image"); return
        }
        let cspace = cgImage.colorSpace ?? CGColorSpace(name: CGColorSpace.sRGB)!
        let w = cgImage.width, h = cgImage.height
        let bpp = 4, bpr = bpp * w
        var pixels = [UInt8](repeating: 0, count: Int(w * h * bpp))
        guard let ctx = CGContext(data: &pixels, width: w, height: h, bitsPerComponent: 8, bytesPerRow: bpr, space: cspace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else {
            print("Could not create context"); return
        }
        ctx.draw(cgImage, in: CGRect(x: 0, y: 0, width: w, height: h))
        for y in 0..<h {
            for x in 0..<w {
                let i = (y * w + x) * 4
                let r = Int(pixels[i]), g = Int(pixels[i + 1]), b = Int(pixels[i + 2])
                let quantized = rgbToHex(r: r / 32 * 32, g: g / 32 * 32, b: b / 32 * 32)
                colorFreq[quantized, default: 0] += 1
            }
        }
        let sorted = colorFreq.sorted { $0.value > $1.value }.prefix(count)
        print("Dominant colors:")
        for (color, freq) in sorted {
            let block = ANSIColor.hex(color.trimmingCharacters(in: CharacterSet(charactersIn: "#")))
            print("\(block) \(color)")
        }
    }
}

private func runSips(args: [String]) throws -> String {
    let proc = Process()
    proc.executableURL = URL(fileURLWithPath: "/usr/bin/sips")
    proc.arguments = args
    let pipe = Pipe()
    proc.standardOutput = pipe; proc.standardError = pipe
    try proc.run(); proc.waitUntilExit()
    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    guard let output = String(data: data, encoding: .utf8) else { throw ColorsError.invalidOutput }
    guard proc.terminationStatus == 0 else { throw ColorsError.sipsFailed(output) }
    return output
}

struct ColorsRandom: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "random", abstract: "Generate random color")
    mutating func run() {
        let hex = randomHex()
        guard let (r, g, b) = hexToRGB(hex) else { return }
        let block = "\u{1B}[48;2;\(r);\(g);\(b)m     \u{1B}[0m"
        print("\(block) \(hex)")
        let hsl = RGB(r: r, g: g, b: b).hsl
        print("RGB: \(r) \(g) \(b)")
        print(String(format: "HSL: %.1f° %.1f%% %.1f%%", hsl.h, hsl.s, hsl.l))
    }
}

enum ColorsError: Error, CustomStringConvertible {
    case invalidOutput; case sipsFailed(String)
    var description: String {
        switch self {
        case .invalidOutput: return "Invalid sips output"
        case .sipsFailed(let msg): return "sips failed: \(msg)"
        }
    }
}
