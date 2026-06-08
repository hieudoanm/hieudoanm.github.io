import Foundation

struct BrowserOptions {
    var fullpage = false
    var pdf = false
    var delay: Int = 0
    var viewport: String = "desktop"
    var format: String = "png"
    var quality: Int = 90
}

let viewportPresets: [String: (width: Int, height: Int)] = [
    "desktop": (1920, 1080),
    "hd": (1280, 720),
    "4k": (3840, 2160),
    "laptop": (1440, 900),
    "tablet": (768, 1024),
    "mobile": (375, 667),
]

func resolveChromePath() -> String? {
    let paths = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium",
        "/usr/bin/chromium-browser",
    ]

    for path in paths {
        if FileManager.default.fileExists(atPath: path) {
            return path
        }
    }

    return nil
}

func captureScreenshot(url: String, output: String, options: BrowserOptions) async throws {
    guard let chromePath = resolveChromePath() else {
        throw BrowserError.chromeNotFound
    }

    let viewport = viewportPresets[options.viewport] ?? viewportPresets["desktop"]!

    var args: [String] = [
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--window-size=\(viewport.width),\(viewport.height)",
        "--screenshot=\(output)",
        "--hide-scrollbars",
    ]

    if options.fullpage {
        args.append("--screenshot-high-dpi")
    }

    if options.pdf {
        if let pdfIndex = args.firstIndex(where: { $0.hasPrefix("--screenshot") }) {
            args.remove(at: pdfIndex)
        }
        args.append("--print-to-pdf=\(output)")
    }

    if options.delay > 0 {
        try await Task.sleep(nanoseconds: UInt64(options.delay) * 1_000_000_000)
    }

    args.append(url)

    let process = Process()
    process.executableURL = URL(fileURLWithPath: chromePath)
    process.arguments = args

    try process.run()
    process.waitUntilExit()

    guard process.terminationStatus == 0 else {
        throw BrowserError.captureFailed
    }
}

enum BrowserError: LocalizedError {
    case chromeNotFound
    case captureFailed

    var errorDescription: String? {
        switch self {
        case .chromeNotFound: return "Chrome not found"
        case .captureFailed: return "screenshot capture failed"
        }
    }
}
