// swift-tools-version: 5.10
import PackageDescription

let package = Package(
    name: "jack",
    platforms: [.macOS(.v14)],
    products: [
        .executable(name: "jack", targets: ["jack"]),
    ],
    dependencies: [
        .package(url: "https://github.com/apple/swift-argument-parser.git", from: "1.5.0"),
        .package(url: "https://github.com/scinfu/SwiftSoup.git", from: "2.7.0"),
    ],
    targets: [
        .executableTarget(
            name: "jack",
            dependencies: [
                .product(name: "ArgumentParser", package: "swift-argument-parser"),
                "SwiftSoup",
            ]
        ),
        .testTarget(
            name: "jackTests",
            dependencies: ["jack"]
        ),
    ]
)
