// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Brewery",
    platforms: [
        .macOS(.v13)
    ],
    targets: [
        .target(
            name: "BreweryCore",
            path: "Sources/Core"
        ),
        .executableTarget(
            name: "Brewery",
            dependencies: ["BreweryCore"],
            path: "Sources",
            exclude: ["Core"],
            linkerSettings: [
                .linkedFramework("Cocoa"),
            ]
        ),
        .testTarget(
            name: "BreweryTests",
            dependencies: ["BreweryCore"],
            path: "Tests"
        ),
    ]
)
