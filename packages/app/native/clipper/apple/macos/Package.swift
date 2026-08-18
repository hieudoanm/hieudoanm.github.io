// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Clipper",
    platforms: [
        .macOS(.v13)
    ],
    targets: [
        .target(
            name: "ClipperCore",
            path: "Sources/Core"
        ),
        .executableTarget(
            name: "Clipper",
            dependencies: ["ClipperCore"],
            path: "Sources",
            exclude: ["Core"],
            linkerSettings: [
                .linkedFramework("Cocoa"),
            ]
        ),
        .testTarget(
            name: "ClipperTests",
            dependencies: ["ClipperCore"],
            path: "Tests"
        ),
    ]
)
