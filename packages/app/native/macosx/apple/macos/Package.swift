// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MacOSX",
    platforms: [
        .macOS(.v13)
    ],
    targets: [
        .target(
            name: "MacOSXCore",
            path: "Sources/Core"
        ),
        .executableTarget(
            name: "MacOSX",
            dependencies: ["MacOSXCore"],
            path: "Sources",
            exclude: ["Core"],
            linkerSettings: [
                .linkedFramework("Foundation"),
                .linkedFramework("ApplicationServices"),
                .linkedFramework("IOKit"),
            ]
        ),
        .testTarget(
            name: "MacOSXTests",
            dependencies: ["MacOSXCore"],
            path: "Tests"
        ),
    ]
)
