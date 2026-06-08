import Foundation
import ArgumentParser

struct Shopify: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "shopify",
        abstract: "Shopify detection tools",
        subcommands: [ShopifyDetect.self]
    )

    mutating func run() {}
}

struct ShopifyDetect: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "detect", abstract: "Detect if a URL is using Shopify")

    @Argument(help: "URL to check")
    var url: String

    mutating func run() async throws {
        let result = try await detectShopify(url: url)
        if result.isShopify {
            print("✅ \(url) is using Shopify\(result.isPlus ? " Plus" : "")")
            print("Detected via: \(result.via)")
        } else {
            print("❌ \(url) does not appear to be using Shopify")
        }
    }
}
