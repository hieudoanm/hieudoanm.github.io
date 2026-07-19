// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Snap",
    platforms: [
        .macOS(.v13)
    ],
    targets: [
        .target(
            name: "SnapCore",
            path: "Sources/Core",
            linkerSettings: [
                .linkedFramework("CoreGraphics"),
            ]
        ),
        .executableTarget(
            name: "Snap",
            dependencies: ["SnapCore"],
            path: "Sources",
            exclude: ["Core"],
            linkerSettings: [
                .linkedFramework("Cocoa"),
                .linkedFramework("Carbon"),
                .linkedFramework("ApplicationServices"),
                .linkedFramework("CoreGraphics"),
            ]
        ),
        .testTarget(
            name: "SnapTests",
            dependencies: ["SnapCore"],
            path: "Tests"
        ),
    ]
)
