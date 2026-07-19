import Foundation
import ArgumentParser
import CoreGraphics
import ImageIO

struct ImageCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "image",
        abstract: "Image tools using sips",
        subcommands: [ImageInfo.self, ImageConvert.self, ImageDominant.self]
    )

    mutating func run() {}
}

// MARK: - Info

struct ImageInfo: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "info", abstract: "Display image information")

    @Argument(help: "Image file path")
    var path: String

    @Flag(name: .long, help: "JSON output")
    var json = false

    mutating func run() throws {
        let url = URL(fileURLWithPath: path)
        let data = try Data(contentsOf: url)
        let size = data.count

        let output = try runSips(args: ["--getProperty", "all", path])
        var pixelWidth = ""
        var pixelHeight = ""
        var format = ""
        var space = ""

        for line in output.components(separatedBy: .newlines) {
            let parts = line.split(separator: ":", maxSplits: 1).map(String.init)
            guard parts.count == 2 else { continue }
            let key = parts[0].trimmingCharacters(in: .whitespaces)
            let val = parts[1].trimmingCharacters(in: .whitespaces)
            switch key {
            case "pixelWidth": pixelWidth = val
            case "pixelHeight": pixelHeight = val
            case "format": format = val
            case "space": space = val
            default: break
            }
        }

        if json {
            let info: [String: Any] = [
                "file": path,
                "width": pixelWidth,
                "height": pixelHeight,
                "format": format,
                "colorSpace": space,
                "size": size,
            ]
            let jsonData = try JSONSerialization.data(withJSONObject: info, options: .prettyPrinted)
            print(String(data: jsonData, encoding: .utf8) ?? "{}")
        } else {
            print("File:       \(path)")
            print("Dimensions: \(pixelWidth)x\(pixelHeight)")
            print("Format:     \(format)")
            print("Color:      \(space)")
            print("Size:       \(NumberFormat.formatBytes(UInt64(size)))")
        }
    }
}

// MARK: - Convert

struct ImageConvert: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "convert", abstract: "Convert image format")

    @Argument(help: "Input file")
    var input: String

    @Argument(help: "Output file")
    var output: String

    @Option(name: .shortAndLong, help: "Output format (jpeg, png, tiff, gif, pdf)")
    var format: String?

    @Option(name: .long, help: "Resize width")
    var width: Int?

    @Option(name: .long, help: "Resize height")
    var height: Int?

    mutating func run() throws {
        var args = ["--out", output]

        if let format = format {
            args += ["--setProperty", "format", format]
        }

        if let width = width, let height = height {
            args += ["--resampleHeightWidth", "\(height)", "\(width)"]
        } else if let width = width {
            args += ["--resampleWidth", "\(width)"]
        } else if let height = height {
            args += ["--resampleHeight", "\(height)"]
        }

        args.append(input)

        _ = try runSips(args: args)
        let outSize = try FileManager.default.attributesOfItem(atPath: output)[.size] as? UInt64 ?? 0
        print("Converted \(input) -> \(output) (\(NumberFormat.formatBytes(outSize)))")
    }
}

// MARK: - Dominant

struct ImageDominant: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "dominant", abstract: "Extract dominant color from image")

    @Argument(help: "Image file path")
    var path: String

    @Flag(name: .long, help: "JSON output")
    var json = false

    mutating func run() throws {
        let output = try runSips(args: ["--getProperty", "all", path])
        let lines = output.components(separatedBy: .newlines)

        for line in lines {
            let parts = line.split(separator: ":", maxSplits: 1).map(String.init)
            guard parts.count == 2 else { continue }
        }

        let tempDir = FileManager.default.temporaryDirectory
        let scaledPath = tempDir.appendingPathComponent("\(UUID().uuidString).png").path
        defer { try? FileManager.default.removeItem(atPath: scaledPath) }

        _ = try runSips(args: ["--resampleWidth", "1", "--resampleHeight", "1", "--out", scaledPath, path])

        guard let scaledData = try? Data(contentsOf: URL(fileURLWithPath: scaledPath)),
              let imageSource = CGImageSourceCreateWithData(scaledData as CFData, nil),
              let cgImage = CGImageSourceCreateImageAtIndex(imageSource, 0, nil) else {
            print("Could not extract dominant color")
            return
        }

        let colorSpaceRef = cgImage.colorSpace ?? CGColorSpace(name: CGColorSpace.sRGB)!
        let width = cgImage.width
        let height = cgImage.height
        let bytesPerPixel = 4
        let bytesPerRow = bytesPerPixel * width
        var pixelData = [UInt8](repeating: 0, count: Int(width * height * bytesPerPixel))

        guard let context = CGContext(
            data: &pixelData, width: width, height: height,
            bitsPerComponent: 8, bytesPerRow: bytesPerRow,
            space: colorSpaceRef,
            bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
        ) else {
            print("Could not create context")
            return
        }

        context.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))

        let r = pixelData[0]
        let g = pixelData[1]
        let b = pixelData[2]
        let hex = String(format: "#%02x%02x%02x", r, g, b)

        if json {
            let info: [String: Any] = [
                "file": path,
                "color": hex,
                "rgb": [Int(r), Int(g), Int(b)],
            ]
            let jsonData = try JSONSerialization.data(withJSONObject: info, options: .prettyPrinted)
            print(String(data: jsonData, encoding: .utf8) ?? "{}")
        } else {
            let block = "\u{1B}[48;2;\(r);\(g);\(b)m     \u{1B}[0m"
            print("\(block) \(hex) (rgb: \(r), \(g), \(b))")
        }
    }
}

// MARK: - Helpers

@discardableResult
private func runSips(args: [String]) throws -> String {
    let process = Process()
    process.executableURL = URL(fileURLWithPath: "/usr/bin/sips")
    process.arguments = args

    let pipe = Pipe()
    process.standardOutput = pipe
    process.standardError = pipe

    try process.run()
    process.waitUntilExit()

    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    guard let output = String(data: data, encoding: .utf8) else {
        throw ImageError.invalidOutput
    }

    guard process.terminationStatus == 0 else {
        throw ImageError.sipsFailed(output)
    }

    return output
}

enum ImageError: Error, CustomStringConvertible {
    case invalidOutput
    case sipsFailed(String)

    var description: String {
        switch self {
        case .invalidOutput: return "Invalid sips output"
        case .sipsFailed(let msg): return "sips failed: \(msg)"
        }
    }
}
