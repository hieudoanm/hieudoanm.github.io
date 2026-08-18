// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Mixer",
    platforms: [
        .macOS(.v13)
    ],
    targets: [
        .target(
            name: "MixerCore",
            path: "Sources/Core",
            linkerSettings: [
                .linkedFramework("CoreAudio"),
            ]
        ),
        .executableTarget(
            name: "Mixer",
            dependencies: ["MixerCore"],
            path: "Sources",
            exclude: ["Core"],
            linkerSettings: [
                .linkedFramework("Cocoa"),
                .linkedFramework("CoreAudio"),
                .linkedFramework("AudioToolbox"),
                .linkedFramework("AudioUnit"),
                .linkedFramework("AVFoundation"),
            ]
        ),
        .testTarget(
            name: "MixerTests",
            dependencies: ["MixerCore"],
            path: "Tests"
        ),
    ]
)
