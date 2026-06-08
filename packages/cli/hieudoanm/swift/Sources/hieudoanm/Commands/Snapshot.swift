import Foundation
import ArgumentParser

struct Snapshot: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "snapshot",
        abstract: "Capture screenshot/PDF of a URL"
    )

    @Argument(help: "URL to capture")
    var url: String

    @Option(name: .long, help: "Output file")
    var output: String?

    @Flag(name: .long, help: "Full page screenshot")
    var fullpage = false

    @Flag(name: .long, help: "PDF output")
    var pdf = false

    @Option(name: .long, help: "Delay in seconds before capture")
    var delay: Int = 0

    @Option(name: .long, help: "Viewport preset (desktop, hd, 4k, laptop, tablet, mobile)")
    var viewport: String = "desktop"

    mutating func run() async throws {
        let outFile = output ?? "snapshot.\(pdf ? "pdf" : "png")"
        var opts = BrowserOptions()
        opts.fullpage = fullpage
        opts.pdf = pdf
        opts.delay = delay
        opts.viewport = viewport

        try await captureScreenshot(url: url, output: outFile, options: opts)
        print("Saved to \(outFile)")
    }
}
