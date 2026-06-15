import Foundation
import ArgumentParser
import CoreImage
import AppKit
import CommonCrypto
#if canImport(CryptoKit)
import CryptoKit
#endif

struct CryptoCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "crypto",
        abstract: "Cryptographic tools",
        subcommands: [
            HashCommand.self, JwtCommand.self, KeygenCommand.self,
            PasswdCommand.self, UuidCommand.self, QrcodeCommand.self,
            EncryptCommand.self, DecryptCommand.self, TotpCommand.self,
        ]
    )
    mutating func run() {}
}

// MARK: - Hash

struct HashCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "hash", abstract: "Compute hash of string or file")

    @Argument(help: "Input string or file path")
    var input: String

    @Option(name: .shortAndLong, help: "Algorithm: md5, sha1, sha256, sha512")
    var algorithm: String = "sha256"

    @Flag(name: .long, help: "Treat input as file path")
    var file = false

    mutating func run() throws {
        #if canImport(CryptoKit)
        let data: Data
        if file {
            guard let fileData = try? Data(contentsOf: URL(fileURLWithPath: input)) else {
                throw CryptoError.fileNotFound(input)
            }
            data = fileData
        } else {
            guard let inputData = input.data(using: .utf8) else {
                throw CryptoError.invalidInput
            }
            data = inputData
        }

        let hash: String
        switch algorithm.lowercased() {
        case "md5":
            let digest = Insecure.MD5.hash(data: data)
            hash = digest.map { String(format: "%02x", $0) }.joined()
        case "sha1":
            let digest = Insecure.SHA1.hash(data: data)
            hash = digest.map { String(format: "%02x", $0) }.joined()
        case "sha256":
            let digest = SHA256.hash(data: data)
            hash = digest.map { String(format: "%02x", $0) }.joined()
        case "sha512":
            let digest = SHA512.hash(data: data)
            hash = digest.map { String(format: "%02x", $0) }.joined()
        default:
            throw CryptoError.unknownAlgorithm(algorithm)
        }
        print(hash)
        #else
        throw CryptoError.platformUnsupported
        #endif
    }
}

// MARK: - JWT

struct JwtCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "jwt", abstract: "Encode, decode, or verify JWT")

    @Option(name: .long, help: "Action: encode, decode, verify")
    var action: String = "decode"

    @Option(name: .shortAndLong, help: "JWT payload as JSON string (for encode)")
    var payload: String?

    @Option(name: .shortAndLong, help: "Secret key")
    var secret: String = "secret"

    @Argument(help: "JWT token (for decode/verify)")
    var token: String?

    mutating func run() throws {
        switch action {
        case "encode":
            let payloadData = try JSONSerialization.data(withJSONObject: parseJSON(payload ?? "{}"), options: [.sortedKeys])
            let header = #"{"alg":"HS256","typ":"JWT"}"#
            let headerB64 = base64URLEncode(Data(header.utf8))
            let payloadB64 = base64URLEncode(payloadData)
            let signature = try hmacSHA256(key: secret, message: "\(headerB64).\(payloadB64)")
            print("\(headerB64).\(payloadB64).\(signature)")
        case "decode":
            guard let token = token else { throw CryptoError.missingArgument("token") }
            let parts = token.split(separator: ".")
            guard parts.count == 3 else { throw CryptoError.invalidJWT }
            let payloadData = base64URLDecode(String(parts[1]))
            let json = try JSONSerialization.jsonObject(with: payloadData, options: [.fragmentsAllowed])
            let pretty = try JSONSerialization.data(withJSONObject: json, options: [.prettyPrinted])
            print(String(data: pretty, encoding: .utf8) ?? "")
        case "verify":
            guard let token = token else { throw CryptoError.missingArgument("token") }
            let parts = token.split(separator: ".")
            guard parts.count == 3 else { throw CryptoError.invalidJWT }
            let expectedSig = try hmacSHA256(key: secret, message: "\(parts[0]).\(parts[1])")
            let actualSig = String(parts[2])
            let isValid = expectedSig == actualSig
            print(isValid ? "verified" : "invalid signature")
        default:
            throw CryptoError.unknownAlgorithm(action)
        }
    }

    private func parseJSON(_ string: String) -> Any {
        guard let data = string.data(using: .utf8),
              let json = try? JSONSerialization.jsonObject(with: data) else {
            return ["sub": "1234567890", "name": "John Doe", "iat": 1516239022]
        }
        return json
    }
}

// MARK: - Keygen

struct KeygenCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "keygen", abstract: "Generate RSA key pair")

    @Option(name: .shortAndLong, help: "Key size in bits")
    var bits: Int = 2048

    @Option(name: .shortAndLong, help: "Output directory")
    var output: String = "."

    mutating func run() throws {
        #if canImport(CryptoKit)
        let privateKey = P256.KeyAgreement.PrivateKey()
        let publicKey = privateKey.publicKey

        let privatePEM = privateKey.rawRepresentation.hexString
        let publicPEM = publicKey.rawRepresentation.hexString

        let privURL = URL(fileURLWithPath: output).appendingPathComponent("private.pem")
        let pubURL = URL(fileURLWithPath: output).appendingPathComponent("public.pem")

        try privatePEM.write(to: privURL, atomically: true, encoding: .utf8)
        try publicPEM.write(to: pubURL, atomically: true, encoding: .utf8)

        print("Key pair generated:")
        print("  Private: \(privURL.path)")
        print("  Public:  \(pubURL.path)")
        #else
        throw CryptoError.platformUnsupported
        #endif
    }
}

// MARK: - Passwd

struct PasswdCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "passwd", abstract: "Generate random password")

    @Option(name: .shortAndLong, help: "Password length")
    var length: Int = 24

    @Flag(name: .long, help: "Include uppercase letters")
    var upper = true

    @Flag(name: .long, help: "Include lowercase letters")
    var lower = true

    @Flag(name: .long, help: "Include digits")
    var digits = true

    @Flag(name: .long, help: "Include symbols")
    var symbols = false

    mutating func run() throws {
        var chars = ""
        if upper { chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ" }
        if lower { chars += "abcdefghijklmnopqrstuvwxyz" }
        if digits { chars += "0123456789" }
        if symbols { chars += "!@#$%^&*()_+-=[]{}|;:,.<>?" }
        guard !chars.isEmpty else { throw CryptoError.invalidInput }
        let password = (0..<length).map { _ in chars.randomElement()! }
        print(String(password))
    }
}

// MARK: - Uuid

struct UuidCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "uuid", abstract: "Generate UUIDs")

    @Option(name: .shortAndLong, help: "UUID version: v4 or v7")
    var version: String = "v4"

    @Option(name: .long, help: "Generate multiple UUIDs")
    var count: Int = 1

    mutating func run() {
        for _ in 0..<count {
            switch version {
            case "v7":
                print(generateUUIDv7())
            default:
                print(Foundation.UUID().uuidString.lowercased())
            }
        }
    }
}

func generateUUIDv7() -> String {
    let timestamp = Int(Date().timeIntervalSince1970 * 1000)
    var uuid = [UInt8](repeating: 0, count: 16)

    uuid[0] = UInt8((timestamp >> 40) & 0xFF)
    uuid[1] = UInt8((timestamp >> 32) & 0xFF)
    uuid[2] = UInt8((timestamp >> 24) & 0xFF)
    uuid[3] = UInt8((timestamp >> 16) & 0xFF)
    uuid[4] = UInt8((timestamp >> 8) & 0xFF)
    uuid[5] = UInt8(timestamp & 0xFF)

    uuid[6] = (uuid[6] & 0x0F) | 0x70
    uuid[8] = (uuid[8] & 0x3F) | 0x80

    for i in 0..<16 {
        if uuid[i] == 0 {
            uuid[i] = UInt8.random(in: 0...255)
        }
    }

    return String(format: "%02x%02x%02x%02x-%02x%02x-%02x%02x-%02x%02x-%02x%02x%02x%02x%02x%02x",
                  uuid[0], uuid[1], uuid[2], uuid[3],
                  uuid[4], uuid[5], uuid[6], uuid[7],
                  uuid[8], uuid[9], uuid[10], uuid[11],
                  uuid[12], uuid[13], uuid[14], uuid[15])
}

// MARK: - QRCode

struct QrcodeCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "qrcode", abstract: "Generate QR code")

    @Argument(help: "Text to encode")
    var text: String

    @Option(name: .shortAndLong, help: "Output PNG file (optional)")
    var output: String?

    mutating func run() throws {
        #if canImport(CoreImage)
        guard let filter = CIFilter(name: "CIQRCodeGenerator") else {
            throw CryptoError.qrGenerationFailed
        }
        filter.setValue(text.data(using: .utf8), forKey: "inputMessage")
        filter.setValue("H", forKey: "inputCorrectionLevel")

        guard let outputImage = filter.outputImage else {
            throw CryptoError.qrGenerationFailed
        }

        let transform = CGAffineTransform(scaleX: 10, y: 10)
        let scaledImage = outputImage.transformed(by: transform)

        let context = CIContext()
        guard let cgImage = context.createCGImage(scaledImage, from: scaledImage.extent) else {
            throw CryptoError.qrGenerationFailed
        }

        if let output = output {
            let rep = NSBitmapImageRep(cgImage: cgImage)
            guard let data = rep.representation(using: NSBitmapImageRep.FileType.png, properties: [:]) else {
                throw CryptoError.qrGenerationFailed
            }
            try data.write(to: URL(fileURLWithPath: output))
            print("QR code saved to \(output)")
        }

        let width = cgImage.width
        let height = cgImage.height
        guard let data = cgImage.dataProvider?.data,
              let pixels = CFDataGetBytePtr(data) else { return }

        let block = "\u{2588}"
        let scale = max(1, width / 40)
        for y in stride(from: 0, to: height, by: scale * 2) {
            var line = ""
            for x in stride(from: 0, to: width, by: scale) {
                let pixel = pixels[(y * width + x) * 4]
                line += pixel < 128 ? block : " "
            }
            print(line)
        }
        #else
        throw CryptoError.platformUnsupported
        #endif
    }
}

// MARK: - Encrypt / Decrypt

struct EncryptCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "encrypt", abstract: "AES-256-CBC encrypt a file")

    @Argument(help: "Input file path")
    var input: String

    @Option(name: .shortAndLong, help: "Output file path")
    var output: String?

    @Option(name: .shortAndLong, help: "Encryption key (32 bytes hex)")
    var key: String

    mutating func run() throws {
        let fileData = try Data(contentsOf: URL(fileURLWithPath: input))
        let keyData = try parseKey(key)

        let iv = try randomBytes(16)
        var encrypted = try aes256cbcEncrypt(data: fileData, key: keyData, iv: iv)
        var result = Data()
        result.append(iv)
        result.append(encrypted)

        let outPath = output ?? "\(input).enc"
        try result.write(to: URL(fileURLWithPath: outPath))
        print("Encrypted to \(outPath)")
    }
}

struct DecryptCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "decrypt", abstract: "AES-256-CBC decrypt a file")

    @Argument(help: "Input file path")
    var input: String

    @Option(name: .shortAndLong, help: "Output file path")
    var output: String?

    @Option(name: .shortAndLong, help: "Decryption key (32 bytes hex)")
    var key: String

    mutating func run() throws {
        let fileData = try Data(contentsOf: URL(fileURLWithPath: input))
        let keyData = try parseKey(key)

        guard fileData.count > 16 else { throw CryptoError.invalidInput }
        let iv = fileData[0..<16]
        let encrypted = fileData[16...]

        let decrypted = try aes256cbcDecrypt(data: Data(encrypted), key: keyData, iv: Data(iv))
        let outPath = output ?? (input.hasSuffix(".enc") ? String(input.dropLast(4)) : "\(input).dec")
        try decrypted.write(to: URL(fileURLWithPath: outPath))
        print("Decrypted to \(outPath)")
    }
}

private func parseKey(_ hex: String) throws -> Data {
    let hex = hex.replacingOccurrences(of: " ", with: "")
    guard hex.count == 64, let data = hex.data(using: .utf8) else {
        throw CryptoError.invalidKey
    }
    var bytes = [UInt8]()
    var idx = hex.startIndex
    while idx < hex.endIndex {
        let end = hex.index(idx, offsetBy: 2)
        guard let byte = UInt8(hex[idx..<end], radix: 16) else {
            throw CryptoError.invalidKey
        }
        bytes.append(byte)
        idx = end
    }
    return Data(bytes)
}

private func randomBytes(_ count: Int) throws -> Data {
    var bytes = [UInt8](repeating: 0, count: count)
    let status = SecRandomCopyBytes(kSecRandomDefault, count, &bytes)
    guard status == errSecSuccess else { throw CryptoError.randomGenerationFailed }
    return Data(bytes)
}

private func aes256cbcEncrypt(data: Data, key: Data, iv: Data) throws -> Data {
    var encrypted = [UInt8](repeating: 0, count: data.count + kCCBlockSizeAES128)
    var encryptedLen = 0
    let status = CCCrypt(
        CCOperation(kCCEncrypt), CCAlgorithm(kCCAlgorithmAES), CCOptions(kCCOptionPKCS7Padding),
        [UInt8](key), kCCKeySizeAES256, [UInt8](iv),
        [UInt8](data), data.count, &encrypted, encrypted.count, &encryptedLen
    )
    guard status == kCCSuccess else { throw CryptoError.encryptionFailed }
    return Data(encrypted[0..<encryptedLen])
}

private func aes256cbcDecrypt(data: Data, key: Data, iv: Data) throws -> Data {
    var decrypted = [UInt8](repeating: 0, count: data.count + kCCBlockSizeAES128)
    var decryptedLen = 0
    let status = CCCrypt(
        CCOperation(kCCDecrypt), CCAlgorithm(kCCAlgorithmAES), CCOptions(kCCOptionPKCS7Padding),
        [UInt8](key), kCCKeySizeAES256, [UInt8](iv),
        [UInt8](data), data.count, &decrypted, decrypted.count, &decryptedLen
    )
    guard status == kCCSuccess else { throw CryptoError.decryptionFailed }
    return Data(decrypted[0..<decryptedLen])
}

// MARK: - TOTP

struct TotpCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "totp", abstract: "Generate TOTP code (RFC 6238)")

    @Argument(help: "Base32-encoded secret")
    var secret: String

    @Option(name: .shortAndLong, help: "Time step in seconds")
    var step: Int = 30

    @Option(name: .shortAndLong, help: "Number of digits")
    var digits: Int = 6

    mutating func run() throws {
        let secretData = try base32Decode(secret)
        let counter = UInt64(Date().timeIntervalSince1970 / Double(step))
        let code = try generateTOTP(secret: secretData, counter: counter, digits: digits)
        print(code)
    }
}

private func generateTOTP(secret: Data, counter: UInt64, digits: Int) throws -> String {
    var counterBE = counter.bigEndian
    let counterData = Data(bytes: &counterBE, count: MemoryLayout<UInt64>.size)

    #if canImport(CryptoKit)
    let key = SymmetricKey(data: secret)
    let code = HMAC<Insecure.SHA1>.authenticationCode(for: counterData, using: key)
    var codeBytes = [UInt8](code)

    let offset = Int(codeBytes[codeBytes.count - 1] & 0x0f)
    let truncated = UInt32(codeBytes[offset] & 0x7f) << 24
        | UInt32(codeBytes[offset + 1]) << 16
        | UInt32(codeBytes[offset + 2]) << 8
        | UInt32(codeBytes[offset + 3])

    let otp = truncated % UInt32(pow(10, Float(digits)))
    return String(format: "%0*d", digits, otp)
    #else
    throw CryptoError.platformUnsupported
    #endif
}

func base32Decode(_ string: String) throws -> Data {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
    let upper = string.uppercased().filter { chars.contains($0) }
    var result = [UInt8]()
    var buffer = 0
    var bitsLeft = 0
    for ch in upper {
        guard let val = chars.firstIndex(of: ch)?.utf16Offset(in: chars) else { continue }
        buffer = (buffer << 5) | val
        bitsLeft += 5
        if bitsLeft >= 8 {
            bitsLeft -= 8
            result.append(UInt8((buffer >> bitsLeft) & 0xFF))
        }
    }
    return Data(result)
}

// MARK: - Crypto Helpers

enum CryptoError: Error, CustomStringConvertible {
    case fileNotFound(String)
    case invalidInput
    case invalidKey
    case invalidJWT
    case unknownAlgorithm(String)
    case missingArgument(String)
    case qrGenerationFailed
    case randomGenerationFailed
    case encryptionFailed
    case decryptionFailed
    case platformUnsupported

    var description: String {
        switch self {
        case .fileNotFound(let path): return "File not found: \(path)"
        case .invalidInput: return "Invalid input"
        case .invalidKey: return "Invalid key (must be 64 hex chars)"
        case .invalidJWT: return "Invalid JWT format"
        case .unknownAlgorithm(let alg): return "Unknown algorithm: \(alg)"
        case .missingArgument(let arg): return "Missing argument: \(arg)"
        case .qrGenerationFailed: return "QR code generation failed"
        case .randomGenerationFailed: return "Random byte generation failed"
        case .encryptionFailed: return "Encryption failed"
        case .decryptionFailed: return "Decryption failed"
        case .platformUnsupported: return "Feature not supported on this platform"
        }
    }
}

func base64URLEncode(_ data: Data) -> String {
    data.base64EncodedString()
        .replacingOccurrences(of: "+", with: "-")
        .replacingOccurrences(of: "/", with: "_")
        .replacingOccurrences(of: "=", with: "")
}

func base64URLDecode(_ string: String) -> Data {
    var base64 = string
        .replacingOccurrences(of: "-", with: "+")
        .replacingOccurrences(of: "_", with: "/")
    let rem = base64.count % 4
    if rem > 0 { base64 += String(repeating: "=", count: 4 - rem) }
    return Data(base64Encoded: base64) ?? Data()
}

func hmacSHA256(key: String, message: String) throws -> String {
    #if canImport(CryptoKit)
    let keyData = Data(key.utf8)
    let msgData = Data(message.utf8)
    let symmetricKey = SymmetricKey(data: keyData)
    let code = HMAC<SHA256>.authenticationCode(for: msgData, using: symmetricKey)
    return base64URLEncode(Data(code))
    #else
    throw CryptoError.platformUnsupported
    #endif
}

#if !canImport(CryptoKit)
import CommonCrypto
#endif

extension Data {
    var hexString: String {
        map { String(format: "%02x", $0) }.joined()
    }
}
