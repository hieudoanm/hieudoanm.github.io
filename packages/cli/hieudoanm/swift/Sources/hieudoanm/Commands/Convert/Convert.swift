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
    static let configuration = CommandConfiguration(commandName: "base64", abstract: "Base64 encode/decode")
    @Argument(help: "String to encode/decode") var text: String
    @Option(name: .long, help: "Operation: encode, decode") var op: String = "encode"
    mutating func run() {
        switch op.lowercased() {
        case "decode":
            guard let data = Data(base64Encoded: text), let decoded = String(data: data, encoding: .utf8) else {
                print("Invalid base64"); return
            }
            print(decoded)
        default:
            guard let data = text.data(using: .utf8) else { print("Encoding failed"); return }
            print(data.base64EncodedString())
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
        let brailleChars: [UInt16] = [
            0x2800, 0x2801, 0x2802, 0x2803, 0x2804, 0x2805, 0x2806, 0x2807,
            0x2808, 0x2809, 0x280A, 0x280B, 0x280C, 0x280D, 0x280E, 0x280F,
            0x2810, 0x2811, 0x2812, 0x2813, 0x2814, 0x2815, 0x2816, 0x2817,
            0x2818, 0x2819, 0x281A, 0x281B, 0x281C, 0x281D, 0x281E, 0x281F,
            0x2820, 0x2821, 0x2822, 0x2823, 0x2824, 0x2825, 0x2826, 0x2827,
            0x2828, 0x2829, 0x282A, 0x282B, 0x282C, 0x282D, 0x282E, 0x282F,
            0x2830, 0x2831, 0x2832, 0x2833, 0x2834, 0x2835, 0x2836, 0x2837,
            0x2838, 0x2839, 0x283A, 0x283B, 0x283C, 0x283D, 0x283E, 0x283F,
            0x2840, 0x2841, 0x2842, 0x2843, 0x2844, 0x2845, 0x2846, 0x2847,
            0x2848, 0x2849, 0x284A, 0x284B, 0x284C, 0x284D, 0x284E, 0x284F,
            0x2850, 0x2851, 0x2852, 0x2853, 0x2854, 0x2855, 0x2856, 0x2857,
            0x2858, 0x2859, 0x285A, 0x285B, 0x285C, 0x285D, 0x285E, 0x285F,
            0x2860, 0x2861, 0x2862, 0x2863, 0x2864, 0x2865, 0x2866, 0x2867,
            0x2868, 0x2869, 0x286A, 0x286B, 0x286C, 0x286D, 0x286E, 0x286F,
            0x2870, 0x2871, 0x2872, 0x2873, 0x2874, 0x2875, 0x2876, 0x2877,
            0x2878, 0x2879, 0x287A, 0x287B, 0x287C, 0x287D, 0x287E, 0x287F,
            0x2880, 0x2881, 0x2882, 0x2883, 0x2884, 0x2885, 0x2886, 0x2887,
            0x2888, 0x2889, 0x288A, 0x288B, 0x288C, 0x288D, 0x288E, 0x288F,
            0x2890, 0x2891, 0x2892, 0x2893, 0x2894, 0x2895, 0x2896, 0x2897,
            0x2898, 0x2899, 0x289A, 0x289B, 0x289C, 0x289D, 0x289E, 0x289F,
            0x28A0, 0x28A1, 0x28A2, 0x28A3, 0x28A4, 0x28A5, 0x28A6, 0x28A7,
            0x28A8, 0x28A9, 0x28AA, 0x28AB, 0x28AC, 0x28AD, 0x28AE, 0x28AF,
            0x28B0, 0x28B1, 0x28B2, 0x28B3, 0x28B4, 0x28B5, 0x28B6, 0x28B7,
            0x28B8, 0x28B9, 0x28BA, 0x28BB, 0x28BC, 0x28BD, 0x28BE, 0x28BF,
            0x28C0, 0x28C1, 0x28C2, 0x28C3, 0x28C4, 0x28C5, 0x28C6, 0x28C7,
            0x28C8, 0x28C9, 0x28CA, 0x28CB, 0x28CC, 0x28CD, 0x28CE, 0x28CF,
            0x28D0, 0x28D1, 0x28D2, 0x28D3, 0x28D4, 0x28D5, 0x28D6, 0x28D7,
            0x28D8, 0x28D9, 0x28DA, 0x28DB, 0x28DC, 0x28DD, 0x28DE, 0x28DF,
            0x28E0, 0x28E1, 0x28E2, 0x28E3, 0x28E4, 0x28E5, 0x28E6, 0x28E7,
            0x28E8, 0x28E9, 0x28EA, 0x28EB, 0x28EC, 0x28ED, 0x28EE, 0x28EF,
            0x28F0, 0x28F1, 0x28F2, 0x28F3, 0x28F4, 0x28F5, 0x28F6, 0x28F7,
            0x28F8, 0x28F9, 0x28FA, 0x28FB, 0x28FC, 0x28FD, 0x28FE, 0x28FF,
        ]
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
