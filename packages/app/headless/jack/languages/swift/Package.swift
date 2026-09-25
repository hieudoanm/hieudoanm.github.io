// swift-tools-version: 5.10
import PackageDescription

let package = Package(
    name: "jack",
    platforms: [.macOS(.v14)],
    products: [
        .executable(name: "jack", targets: ["jack"]),
    ],
    dependencies: [
        .package(url: "https://github.com/apple/swift-argument-parser.git", exact: "1.8.2"),
        .package(url: "https://github.com/scinfu/SwiftSoup.git", exact: "2.13.9"),
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
