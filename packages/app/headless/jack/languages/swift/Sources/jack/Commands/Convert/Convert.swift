import Foundation
import ArgumentParser
import CoreGraphics
import ImageIO

struct ConvertCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "convert",
        abstract: "Text conversion and transformation",
        subcommands: [
            ConvertBase64.self, ConvertBraille.self, ConvertCamelcase.self,
            ConvertCapitalise.self, ConvertCount.self, ConvertDeburr.self,
            ConvertKebabcase.self, ConvertLowercase.self, ConvertMorse.self,
            ConvertPascalcase.self, ConvertSlug.self, ConvertSnakecase.self,
            ConvertUppercase.self, ConvertURL.self,
        ]
    )
    mutating func run() {}
}

struct ConvertBase64: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "base64",
        abstract: "Base64 encode/decode",
        subcommands: [ConvertBase64Encode.self, ConvertBase64Decode.self]
    )
    mutating func run() {}
}

struct ConvertBase64Encode: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "encode", abstract: "Encode text/file to base64")
    @Argument(help: "Text to encode") var text: String = ""
    @Option(name: .shortAndLong, help: "File to encode (reads raw bytes → base64)") var file: String?
    @Option(name: .shortAndLong, help: "Write output to file instead of stdout") var output: String?

    mutating func run() {
        let input: Data
        if let filePath = file {
            guard let fileData = try? Data(contentsOf: URL(fileURLWithPath: filePath)) else {
                print("Failed to read file: \(filePath)"); return
            }
            input = fileData
        } else {
            guard let data = text.data(using: .utf8) else { print("Encoding failed"); return }
            input = data
        }
        let encoded = input.base64EncodedString()
        if let outPath = output {
            try? encoded.write(toFile: outPath, atomically: true, encoding: .utf8)
        } else {
            print(encoded)
        }
    }
}

struct ConvertBase64Decode: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "decode", abstract: "Decode base64 to text/file")
    @Argument(help: "Base64 string to decode") var text: String = ""
    @Option(name: .shortAndLong, help: "File containing base64 to decode") var file: String?
    @Option(name: .shortAndLong, help: "Write decoded output to file instead of stdout") var output: String?

    mutating func run() {
        let input: Data
        if let filePath = file {
            guard let fileData = try? Data(contentsOf: URL(fileURLWithPath: filePath)) else {
                print("Failed to read file: \(filePath)"); return
            }
            input = fileData
        } else {
            input = text.data(using: .utf8) ?? Data()
        }
        let raw = String(decoding: input, as: UTF8.self)
            .trimmingCharacters(in: .whitespacesAndNewlines)
            .replacingOccurrences(of: "\n", with: "")
        let cleaned: String
        if let range = raw.range(of: "base64,") {
            cleaned = String(raw[range.upperBound...])
        } else {
            cleaned = raw
        }
        guard let decoded = Data(base64Encoded: cleaned) else {
            print("Invalid base64"); return
        }
        if let outPath = output {
            try? decoded.write(to: URL(fileURLWithPath: outPath))
        } else {
            print(String(decoding: decoded, as: UTF8.self))
        }
    }
}

struct ConvertBraille: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "braille", abstract: "Convert image to braille ASCII art")
    @Argument(help: "Image file path") var path: String
    @Option(name: .shortAndLong, help: "Output width in characters") var width: Int = 40
    mutating func run() throws {
        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/usr/bin/sips")
        process.arguments = ["--getProperty", "pixelWidth", "--getProperty", "pixelHeight", path]
        let outPipe = Pipe()
        process.standardOutput = outPipe
        try process.run(); process.waitUntilExit()
        let outData = outPipe.fileHandleForReading.readDataToEndOfFile()
        let meta = String(data: outData, encoding: .utf8) ?? ""
        var pixelWidth = 0, pixelHeight = 0
        for line in meta.components(separatedBy: .newlines) {
            let parts = line.split(separator: ":", maxSplits: 1).map(String.init)
            guard parts.count == 2 else { continue }
            let key = parts[0].trimmingCharacters(in: .whitespaces)
            let val = parts[1].trimmingCharacters(in: .whitespaces)
            if key == "pixelWidth" { pixelWidth = Int(val) ?? 0 }
            if key == "pixelHeight" { pixelHeight = Int(val) ?? 0 }
        }
        guard pixelWidth > 0, pixelHeight > 0 else { print("Could not read image"); return }
        let aspect = Double(pixelHeight) / Double(pixelWidth)
        let charAspect = 0.5
        let cols = min(width, pixelWidth)
        let rows = min(Int(Double(cols) * aspect * charAspect), pixelHeight / 2)
        let tempDir = FileManager.default.temporaryDirectory
        let scaledPath = tempDir.appendingPathComponent("\(UUID().uuidString).png").path
        defer { try? FileManager.default.removeItem(atPath: scaledPath) }
        let resize = Process()
        resize.executableURL = URL(fileURLWithPath: "/usr/bin/sips")
        resize.arguments = ["--resampleWidth", "\(cols)", "--resampleHeight", "\(rows * 2)", "--out", scaledPath, path]
        try resize.run(); resize.waitUntilExit()
        guard let data = try? Data(contentsOf: URL(fileURLWithPath: scaledPath)),
              let src = CGImageSourceCreateWithData(data as CFData, nil),
              let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else {
            print("Could not process image"); return
        }
        let cspace = img.colorSpace ?? CGColorSpace(name: CGColorSpace.sRGB)!
        let w = img.width, h = img.height
        let bpp = 4, bpr = bpp * w
        var pixels = [UInt8](repeating: 0, count: Int(w * h * bpp))
        guard let ctx = CGContext(data: &pixels, width: w, height: h, bitsPerComponent: 8, bytesPerRow: bpr, space: cspace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else {
            print("Could not create context"); return
        }
        ctx.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))
        for y in stride(from: 0, to: h - 1, by: 4) {
            var line = ""
            for x in stride(from: 0, to: w - 1, by: 2) {
                var byte: UInt8 = 0
                if y < h && x < w { let i = (y * w + x) * 4; if pixels[i] < 128 { byte |= 0x01 } }
                if y < h && x + 1 < w { let i = (y * w + x + 1) * 4; if pixels[i] < 128 { byte |= 0x02 } }
                if y + 1 < h && x < w { let i = ((y + 1) * w + x) * 4; if pixels[i] < 128 { byte |= 0x04 } }
                if y + 1 < h && x + 1 < w { let i = ((y + 1) * w + x + 1) * 4; if pixels[i] < 128 { byte |= 0x08 } }
                if y + 2 < h && x < w { let i = ((y + 2) * w + x) * 4; if pixels[i] < 128 { byte |= 0x10 } }
                if y + 2 < h && x + 1 < w { let i = ((y + 2) * w + x + 1) * 4; if pixels[i] < 128 { byte |= 0x20 } }
                if y + 3 < h && x < w { let i = ((y + 3) * w + x) * 4; if pixels[i] < 128 { byte |= 0x40 } }
                if y + 3 < h && x + 1 < w { let i = ((y + 3) * w + x + 1) * 4; if pixels[i] < 128 { byte |= 0x80 } }
                let scalar = UnicodeScalar(UInt32(0x2800) + UInt32(byte))!
                line += String(scalar)
            }
            print(line)
        }
    }
}

struct ConvertCamelcase: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "camelcase", abstract: "Convert to camelCase")
    @Argument(help: "Text") var text: String
    mutating func run() {
        let parts = text.components(separatedBy: CharacterSet.alphanumerics.inverted).filter { !$0.isEmpty }
        guard let first = parts.first else { print(text); return }
        let rest = parts.dropFirst().map { $0.capitalized }
        print(first.lowercased() + rest.joined())
    }
}

struct ConvertCapitalise: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "capitalise", abstract: "Capitalise first letter of each word")
    @Argument(help: "Text") var text: String
    mutating func run() { print(text.capitalized) }
}

struct ConvertCount: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "count", abstract: "Count characters, words, lines")
    @Argument(help: "Text") var text: String
    mutating func run() {
        let chars = text.count
        let words = text.split(separator: " ").filter { !$0.isEmpty }.count
        let lines = text.isEmpty ? 0 : text.components(separatedBy: .newlines).count
        print("Characters: \(chars)")
        print("Words: \(words)")
        print("Lines: \(lines)")
    }
}

struct ConvertDeburr: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "deburr", abstract: "Remove diacritical marks")
    @Argument(help: "Text") var text: String
    mutating func run() {
        print(text.folding(options: .diacriticInsensitive, locale: nil))
    }
}

struct ConvertKebabcase: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "kebabcase", abstract: "Convert to kebab-case")
    @Argument(help: "Text") var text: String
    mutating func run() {
        let cleaned = text.components(separatedBy: CharacterSet.alphanumerics.inverted).filter { !$0.isEmpty }
        print(cleaned.map { $0.lowercased() }.joined(separator: "-"))
    }
}

struct ConvertLowercase: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "lowercase", abstract: "Convert to lowercase")
    @Argument(help: "Text") var text: String
    mutating func run() { print(text.lowercased()) }
}

struct ConvertMorse: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "morse", abstract: "Convert text to/from Morse code")
    @Argument(help: "Text") var text: String
    @Option(name: .long, help: "Operation: encode, decode") var op: String = "encode"
    mutating func run() {
        let morseMap: [Character: String] = [
            "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.",
            "g": "--.", "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..",
            "m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-", "r": ".-.",
            "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-",
            "y": "-.--", "z": "--..",
            "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
            "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
            ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
            "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
            ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
            "\"": ".-..-.", "$": "...-..-", "@": ".--.-.",
        ]
        let reverseMap = Dictionary(uniqueKeysWithValues: morseMap.map { ($0.value, $0.key) })
        switch op.lowercased() {
        case "decode":
            let words = text.components(separatedBy: " / ")
            let decoded = words.map { word in
                word.split(separator: " ").compactMap { reverseMap[String($0)] }.map(String.init).joined()
            }.joined(separator: " ")
            print(decoded)
        default:
            print(text.lowercased().map { morseMap[$0] ?? String($0) }.joined(separator: " "))
        }
    }
}

struct ConvertPascalcase: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "pascalcase", abstract: "Convert to PascalCase")
    @Argument(help: "Text") var text: String
    mutating func run() {
        let parts = text.components(separatedBy: CharacterSet.alphanumerics.inverted).filter { !$0.isEmpty }
        print(parts.map { $0.capitalized }.joined())
    }
}

struct ConvertSlug: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "slug", abstract: "Generate URL slug")
    @Argument(help: "Text") var text: String
    mutating func run() {
        let cleaned = text
            .folding(options: .diacriticInsensitive, locale: nil)
            .lowercased()
            .components(separatedBy: CharacterSet.alphanumerics.inverted)
            .filter { !$0.isEmpty }
            .joined(separator: "-")
            .replacingOccurrences(of: "-+", with: "-", options: .regularExpression)
        print(cleaned)
    }
}

struct ConvertSnakecase: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "snakecase", abstract: "Convert to snake_case")
    @Argument(help: "Text") var text: String
    mutating func run() {
        let cleaned = text.components(separatedBy: CharacterSet.alphanumerics.inverted).filter { !$0.isEmpty }
        print(cleaned.map { $0.lowercased() }.joined(separator: "_"))
    }
}

struct ConvertUppercase: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "uppercase", abstract: "Convert to UPPERCASE")
    @Argument(help: "Text") var text: String
    mutating func run() { print(text.uppercased()) }
}

struct ConvertURL: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "url", abstract: "URL encode/decode")
    @Argument(help: "String to encode/decode") var text: String
    @Option(name: .long, help: "Operation: encode, decode") var op: String = "encode"
    mutating func run() {
        switch op.lowercased() {
        case "decode":
            guard let decoded = text.removingPercentEncoding else { print("Invalid URL encoding"); return }
            print(decoded)
        default:
            guard let encoded = text.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) else {
                print("Encoding failed"); return
            }
            print(encoded)
        }
    }
}

enum ConvertError: Error, CustomStringConvertible {
    case invalidOutput; case sipsFailed(String)
    var description: String {
        switch self {
        case .invalidOutput: return "Invalid output"
        case .sipsFailed(let msg): return "sips failed: \(msg)"
        }
    }
}

// MARK: - Braille

func convertToBraille(_ s: String) -> String {
    let brailleBase: UInt32 = 0x2800
    let letters: [Character: UInt8] = [
        "a": 1, "b": 3, "c": 9, "d": 25, "e": 17, "f": 11, "g": 27, "h": 19,
        "i": 10, "j": 26, "k": 5, "l": 7, "m": 13, "n": 29, "o": 21, "p": 15,
        "q": 31, "r": 23, "s": 14, "t": 30, "u": 37, "v": 39, "w": 58, "x": 45,
        "y": 61, "z": 53,
    ]
    let digits: [Character: UInt8] = [
        "1": 1, "2": 3, "3": 9, "4": 25, "5": 17,
        "6": 11, "7": 27, "8": 19, "9": 10, "0": 26,
    ]
    var result = ""
    var numberMode = false
    for ch in s {
        if ch.isUppercase {
            result += String(UnicodeScalar(brailleBase + 32)!)
            let lower = Character(ch.lowercased())
            if let byte = letters[lower] {
                result += String(UnicodeScalar(brailleBase + UInt32(byte))!)
            } else {
                result += String(ch)
            }
            numberMode = false
        } else if let byte = letters[ch] {
            result += String(UnicodeScalar(brailleBase + UInt32(byte))!)
            numberMode = false
        } else if let byte = digits[ch] {
            if !numberMode {
                result += String(UnicodeScalar(brailleBase + 60)!)
                numberMode = true
            }
            result += String(UnicodeScalar(brailleBase + UInt32(byte))!)
        } else if ch == " " {
            result += " "
            numberMode = false
        } else {
            result += String(ch)
        }
    }
    return result
}

// MARK: - Morse

func convertToMorse(_ s: String) -> String {
    let morse: [Character: String] = [
        "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.",
        "g": "--.", "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..",
        "m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-", "r": ".-.",
        "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-",
        "y": "-.--", "z": "--..",
        "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
        "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
        ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--",
    ]
    var result: [String] = []
    for word in s.split(separator: " ") {
        let chars = word.map { morse[$0.lowercased().first!] ?? String($0) }
        result.append(chars.joined(separator: " "))
    }
    return result.joined(separator: "   ")
}
