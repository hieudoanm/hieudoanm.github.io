// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Top",
    platforms: [
        .macOS(.v13)
    ],
    targets: [
        .target(
            name: "TopCore",
            path: "Sources/Core"
        ),
        .executableTarget(
            name: "Top",
            dependencies: ["TopCore"],
            path: "Sources",
            exclude: ["Core"],
            linkerSettings: [
                .linkedFramework("Cocoa"),
                .linkedFramework("ApplicationServices"),
                .linkedFramework("CoreGraphics"),
            ]
        ),
        .testTarget(
            name: "TopTests",
            dependencies: ["TopCore"],
            path: "Tests"
        ),
    ]
)
