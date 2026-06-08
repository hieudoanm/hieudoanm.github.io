import Foundation
import ArgumentParser
#if canImport(AppKit)
import AppKit
import CoreImage
#endif

struct QRCode: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "qrcode",
        abstract: "Generate QR code image"
    )

    @Argument(help: "Text to encode")
    var text: String

    @Option(name: .shortAndLong, help: "Output file (default: qrcode.png)")
    var output: String = "qrcode.png"

    mutating func run() {
        #if canImport(CoreImage)
        guard let filter = CIFilter(name: "CIQRCodeGenerator") else {
            print("Error: QR code generator not available")
            return
        }
        filter.setValue(text.data(using: .utf8), forKey: "inputMessage")
        filter.setValue("H", forKey: "inputCorrectionLevel")

        guard let outputImage = filter.outputImage else {
            print("Error: failed to generate QR code")
            return
        }

        let transform = CGAffineTransform(scaleX: 10, y: 10)
        let scaledImage = outputImage.transformed(by: transform)

        let context = CIContext()
        guard let cgImage = context.createCGImage(scaledImage, from: scaledImage.extent) else {
            print("Error: failed to create CGImage")
            return
        }

        let rep = NSBitmapImageRep(cgImage: cgImage)
        guard let data = rep.representation(using: NSBitmapImageRep.FileType.png, properties: [:]) else {
            print("Error: failed to encode PNG")
            return
        }

        try? data.write(to: URL(fileURLWithPath: output))
        print("QR code saved to \(output)")
        #else
        print("QR code generation requires macOS with CoreImage")
        #endif
    }
}
