// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Ports",
    platforms: [
        .macOS(.v13)
    ],
    targets: [
        .target(
            name: "PortsCore",
            path: "Sources/Core"
        ),
        .executableTarget(
            name: "Ports",
            dependencies: ["PortsCore"],
            path: "Sources",
            exclude: ["Core"],
            linkerSettings: [
                .linkedFramework("Foundation"),
            ]
        ),
        .testTarget(
            name: "PortsTests",
            dependencies: ["PortsCore"],
            path: "Tests"
        ),
    ]
)