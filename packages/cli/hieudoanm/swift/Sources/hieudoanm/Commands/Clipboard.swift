import Foundation
import ArgumentParser
#if canImport(AppKit)
import AppKit
#endif

struct Clipboard: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "clipboard",
        abstract: "Read from or write to system clipboard"
    )

    @Argument(help: "Text to write to clipboard. If omitted, reads from clipboard.")
    var input: String?

    mutating func run() {
        #if canImport(AppKit)
        let pasteboard = NSPasteboard.general
        if let text = input {
            pasteboard.clearContents()
            pasteboard.setString(text, forType: .string)
            print("Copied to clipboard: \(text)")
        } else {
            if let clipboardText = pasteboard.string(forType: .string) {
                print(clipboardText)
            } else {
                print("Clipboard is empty")
            }
        }
        #else
        print("Clipboard command requires macOS with AppKit")
        #endif
    }
}
