// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Snap",
    platforms: [
        .macOS(.v13)
    ],
    targets: [
        .executableTarget(
            name: "Snap",
            path: "Sources",
            linkerSettings: [
                .linkedFramework("Cocoa"),
                .linkedFramework("Carbon"),
                .linkedFramework("ApplicationServices"),
                .linkedFramework("CoreGraphics"),
            ]
        )
    ]
)
