// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Gauge",
    platforms: [
        .macOS(.v13)
    ],
    targets: [
        .target(
            name: "GaugeCore",
            path: "Sources/Core"
        ),
        .executableTarget(
            name: "Gauge",
            dependencies: ["GaugeCore"],
            path: "Sources",
            exclude: ["Core"],
            linkerSettings: [
                .linkedFramework("Foundation"),
            ]
        ),
        .testTarget(
            name: "GaugeTests",
            dependencies: ["GaugeCore"],
            path: "Tests"
        ),
    ]
)
