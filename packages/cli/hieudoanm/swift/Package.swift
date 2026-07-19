// swift-tools-version: 5.10
import PackageDescription

let package = Package(
    name: "hieudoanm",
    platforms: [.macOS(.v14)],
    products: [
        .executable(name: "hieudoanm", targets: ["hieudoanm"]),
    ],
    dependencies: [
        .package(url: "https://github.com/apple/swift-argument-parser.git", from: "1.5.0"),
        .package(url: "https://github.com/scinfu/SwiftSoup.git", from: "2.7.0"),
    ],
    targets: [
        .executableTarget(
            name: "hieudoanm",
            dependencies: [
                .product(name: "ArgumentParser", package: "swift-argument-parser"),
                "SwiftSoup",
            ]
        ),
        .testTarget(
            name: "hieudoanmTests",
            dependencies: ["hieudoanm"]
        ),
    ]
)
