// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Mixer",
    platforms: [
        .macOS(.v13)
    ],
    targets: [
        .executableTarget(
            name: "Mixer",
            path: "Sources",
            linkerSettings: [
                .linkedFramework("Cocoa"),
                .linkedFramework("CoreAudio"),
                .linkedFramework("AudioToolbox"),
                .linkedFramework("AudioUnit"),
                .linkedFramework("AVFoundation"),
            ]
        )
    ]
)
