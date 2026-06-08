// swift-tools-version: 5.10
import PackageDescription

let package = Package(
    name: "hieudoanm",
    platforms: [.macOS(.v14)],
    dependencies: [
        .package(url: "https://github.com/apple/swift-argument-parser", from: "1.5.0"),
    ],
    targets: [
        .executableTarget(
            name: "hieudoanm",
            dependencies: [
                .product(name: "ArgumentParser", package: "swift-argument-parser"),
            ],
            path: "Sources/hieudoanm"
        ),
        .testTarget(
            name: "hieudoanmTests",
            dependencies: ["hieudoanm"],
            path: "Tests/hieudoanmTests"
        ),
    ]
)
