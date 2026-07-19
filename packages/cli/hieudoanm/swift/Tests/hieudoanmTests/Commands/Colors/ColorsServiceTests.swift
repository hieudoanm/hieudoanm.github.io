import XCTest
@testable import hieudoanm

final class ColorConversionsTests: XCTestCase {
    // MARK: - Hex ↔ RGB

    func testHexToRGB() {
        XCTAssertEqual(hexToRGB("#FF0000")?.r, 255)
        XCTAssertEqual(hexToRGB("#FF0000")?.g, 0)
        XCTAssertEqual(hexToRGB("#FF0000")?.b, 0)

        XCTAssertEqual(hexToRGB("00FF00")?.r, 0)
        XCTAssertEqual(hexToRGB("00FF00")?.g, 255)
        XCTAssertEqual(hexToRGB("00FF00")?.b, 0)

        XCTAssertEqual(hexToRGB("#FFFFFF")?.r, 255)
        XCTAssertEqual(hexToRGB("#FFFFFF")?.g, 255)
        XCTAssertEqual(hexToRGB("#FFFFFF")?.b, 255)

        XCTAssertEqual(hexToRGB("#000000")?.r, 0)
        XCTAssertEqual(hexToRGB("#000000")?.g, 0)
        XCTAssertEqual(hexToRGB("#000000")?.b, 0)
    }

    func testHexToRGB_invalidInput() {
        XCTAssertNil(hexToRGB(""))
        XCTAssertNil(hexToRGB("#FFF"))
        XCTAssertNil(hexToRGB("GGGGGG"))
        XCTAssertNil(hexToRGB("#GGGGGG"))
    }

    func testHexToRGB_caseInsensitive() {
        let upper = hexToRGB("#AABBCC")
        let lower = hexToRGB("#aabbcc")
        XCTAssertEqual(upper?.r, lower?.r)
        XCTAssertEqual(upper?.g, lower?.g)
        XCTAssertEqual(upper?.b, lower?.b)
    }

    func testRGBToHex() {
        XCTAssertEqual(rgbToHex(r: 255, g: 0, b: 0), "#FF0000")
        XCTAssertEqual(rgbToHex(r: 0, g: 255, b: 0), "#00FF00")
        XCTAssertEqual(rgbToHex(r: 0, g: 0, b: 0), "#000000")
        XCTAssertEqual(rgbToHex(r: 255, g: 255, b: 255), "#FFFFFF")
        XCTAssertEqual(rgbToHex(r: 171, g: 205, b: 239), "#ABCDEF")
        // XCTAsssertEqual(rgbToHex(r: 0, g: 0, b: 0), "#000000")
    }

    func testHexRGBRoundtrip() {
        let testCases = ["#FF0000", "#00FF00", "#0000FF", "#FFFFFF", "#000000", "#ABCDEF", "#123456"]
        for hex in testCases {
            guard let (r, g, b) = hexToRGB(hex) else {
                XCTFail("Failed to parse \(hex)")
                return
            }
            XCTAssertEqual(rgbToHex(r: r, g: g, b: b), hex.uppercased())
        }
    }

    // MARK: - RGB ↔ HSL

    func testRGBToHSL_red() {
        let hsl = rgbToHSL(r: 255, g: 0, b: 0)
        XCTAssertEqual(hsl.h, 0, accuracy: 1)
        XCTAssertEqual(hsl.s, 100, accuracy: 1)
        XCTAssertEqual(hsl.l, 50, accuracy: 1)
    }

    func testRGBToHSL_green() {
        let hsl = rgbToHSL(r: 0, g: 255, b: 0)
        XCTAssertEqual(hsl.h, 120, accuracy: 1)
        XCTAssertEqual(hsl.s, 100, accuracy: 1)
        XCTAssertEqual(hsl.l, 50, accuracy: 1)
    }

    func testRGBToHSL_blue() {
        let hsl = rgbToHSL(r: 0, g: 0, b: 255)
        XCTAssertEqual(hsl.h, 240, accuracy: 1)
        XCTAssertEqual(hsl.s, 100, accuracy: 1)
        XCTAssertEqual(hsl.l, 50, accuracy: 1)
    }

    func testRGBToHSL_white() {
        let hsl = rgbToHSL(r: 255, g: 255, b: 255)
        XCTAssertEqual(hsl.l, 100, accuracy: 1)
    }

    func testRGBToHSL_black() {
        let hsl = rgbToHSL(r: 0, g: 0, b: 0)
        XCTAssertEqual(hsl.l, 0, accuracy: 1)
    }

    func testHSLToRGB() {
        let (r, g, b) = hslToRGB(h: 0, s: 100, l: 50)
        XCTAssertEqual(r, 255)
        XCTAssertEqual(g, 0)
        XCTAssertEqual(b, 0)
    }

    func testHSLToRGB_green() {
        let (r, g, b) = hslToRGB(h: 120, s: 100, l: 50)
        XCTAssertEqual(r, 0)
        XCTAssertEqual(g, 255)
        XCTAssertEqual(b, 0)
    }

    func testHSLToRGB_blue() {
        let (r, g, b) = hslToRGB(h: 240, s: 100, l: 50)
        XCTAssertEqual(r, 0)
        XCTAssertEqual(g, 0)
        XCTAssertEqual(b, 255)
    }

    func testHSLRoundtrip() {
        let testCases = [(255, 0, 0), (0, 255, 0), (0, 0, 255), (128, 128, 128), (42, 99, 180)]
        for (r, g, b) in testCases {
            let hsl = rgbToHSL(r: r, g: g, b: b)
            let (nr, ng, nb) = hslToRGB(h: hsl.h, s: hsl.s, l: hsl.l)
            XCTAssertEqual(nr, r, accuracy: 1, "R mismatch for (\(r),\(g),\(b))")
            XCTAssertEqual(ng, g, accuracy: 1, "G mismatch for (\(r),\(g),\(b))")
            XCTAssertEqual(nb, b, accuracy: 1, "B mismatch for (\(r),\(g),\(b))")
        }
    }

    // MARK: - RGB ↔ CMYK

    func testRGBToCMYK_red() {
        let (c, m, y, k) = rgbToCMYK(r: 255, g: 0, b: 0)
        XCTAssertEqual(c, 0, accuracy: 0.01)
        XCTAssertEqual(m, 1, accuracy: 0.01)
        XCTAssertEqual(y, 1, accuracy: 0.01)
        XCTAssertEqual(k, 0, accuracy: 0.01)
    }

    func testRGBToCMYK_black() {
        let (c, m, y, k) = rgbToCMYK(r: 0, g: 0, b: 0)
        XCTAssertEqual(c, 0, accuracy: 0.01)
        XCTAssertEqual(m, 0, accuracy: 0.01)
        XCTAssertEqual(y, 0, accuracy: 0.01)
        XCTAssertEqual(k, 1, accuracy: 0.01)
    }

    func testRGBToCMYK_white() {
        let (c, m, y, k) = rgbToCMYK(r: 255, g: 255, b: 255)
        XCTAssertEqual(c, 0, accuracy: 0.01)
        XCTAssertEqual(m, 0, accuracy: 0.01)
        XCTAssertEqual(y, 0, accuracy: 0.01)
        XCTAssertEqual(k, 0, accuracy: 0.01)
    }

    func testCMYKToRGB() {
        let (r, g, b) = cmykToRGB(c: 0, m: 1, y: 1, k: 0)
        XCTAssertEqual(r, 255)
        XCTAssertEqual(g, 0)
        XCTAssertEqual(b, 0)
    }

    func testCMYKRoundtrip() {
        let testCases: [(r: Int, g: Int, b: Int)] = [(255, 0, 0), (0, 255, 0), (0, 0, 255), (128, 128, 128)]
        for (r, g, b) in testCases {
            let (c, m, y, k) = rgbToCMYK(r: r, g: g, b: b)
            let (nr, ng, nb) = cmykToRGB(c: c, m: m, y: y, k: k)
            XCTAssertEqual(nr, r, accuracy: 1)
            XCTAssertEqual(ng, g, accuracy: 1)
            XCTAssertEqual(nb, b, accuracy: 1)
        }
    }

    // MARK: - Lab / HCL

    func testRGBToLab_white() {
        let (l, a, b) = rgbToLab(r: 255, g: 255, b: 255)
        XCTAssertEqual(l, 100, accuracy: 1)
        XCTAssertEqual(a, 0, accuracy: 1)
        XCTAssertEqual(b, 0, accuracy: 1)
    }

    func testRGBToLab_black() {
        let (l, _, _) = rgbToLab(r: 0, g: 0, b: 0)
        XCTAssertEqual(l, 0, accuracy: 1)
    }

    func testLabToRGB() {
        let (r, g, b) = labToRGB(l: 0, a: 0, b: 0)
        XCTAssertEqual(r, 0, accuracy: 1)
        XCTAssertEqual(g, 0, accuracy: 1)
        XCTAssertEqual(b, 0, accuracy: 1)
    }

    func testHCLRoundtrip() {
        let (r, g, b) = (42, 99, 180)
        let (h, c, l) = rgbToHCL(r: r, g: g, b: b)
        let (nr, ng, nb) = hclToRGB(h: h, c: c, l: l)
        XCTAssertEqual(nr, r, accuracy: 1)
        XCTAssertEqual(ng, g, accuracy: 1)
        XCTAssertEqual(nb, b, accuracy: 1)
    }

    // MARK: - OKLCH

    func testRGBToOKLCH_red() {
        let (l, c, h) = rgbToOKLCH(r: 255, g: 0, b: 0)
        XCTAssertGreaterThan(l, 0)
        XCTAssertGreaterThan(c, 0)
        XCTAssertTrue(h >= 0 && h < 360)
    }

    func testRGBToOKLCH_white() {
        let (l, c, _) = rgbToOKLCH(r: 255, g: 255, b: 255)
        XCTAssertEqual(l, 1, accuracy: 0.01)
        XCTAssertEqual(c, 0, accuracy: 0.01)
    }

    func testRGBToOKLCH_black() {
        let (l, c, _) = rgbToOKLCH(r: 0, g: 0, b: 0)
        XCTAssertEqual(l, 0, accuracy: 0.01)
        XCTAssertEqual(c, 0, accuracy: 0.01)
    }

    func testOKLCHToRGB_red() {
        let (r, g, b) = oklchToRGB(l: 0.627, c: 0.257, h: 29.2)
        XCTAssertEqual(r, 255, accuracy: 2)
        XCTAssertEqual(g, 0, accuracy: 2)
        XCTAssertEqual(b, 0, accuracy: 2)
    }

    func testOKLCHRoundtrip() {
        let testCases: [(r: Int, g: Int, b: Int)] = [(255, 0, 0), (0, 255, 0), (128, 128, 128), (42, 99, 180)]
        for (r, g, b) in testCases {
            let (l, c, h) = rgbToOKLCH(r: r, g: g, b: b)
            let (nr, ng, nb) = oklchToRGB(l: l, c: c, h: h)
            XCTAssertEqual(nr, r, accuracy: 1, "R mismatch for (\(r),\(g),\(b))")
            XCTAssertEqual(ng, g, accuracy: 1, "G mismatch for (\(r),\(g),\(b))")
            XCTAssertEqual(nb, b, accuracy: 1, "B mismatch for (\(r),\(g),\(b))")
        }
    }

    // MARK: - Palette

    func testGeneratePalette_mono() {
        let palette = generatePalette(hex: "#FF0000", type: .mono, count: 3)
        XCTAssertEqual(palette.count, 3)
        XCTAssertEqual(palette[0], "#FF0000")
    }

    func testGeneratePalette_complement() {
        let palette = generatePalette(hex: "#FF0000", type: .complement)
        XCTAssertEqual(palette.count, 2)
        XCTAssertEqual(palette[0], "#FF0000")
        // complement of red should be cyan-ish
        XCTAssertEqual(palette[1], "#00FFFF")
    }

    func testGeneratePalette_triad() {
        let palette = generatePalette(hex: "#FF0000", type: .triad)
        XCTAssertEqual(palette.count, 3)
        XCTAssertEqual(palette[0], "#FF0000")
        XCTAssertEqual(palette[1], "#00FF00")
        XCTAssertEqual(palette[2], "#0000FF")
    }

    func testGeneratePalette_tetrad() {
        let palette = generatePalette(hex: "#FF0000", type: .tetrad)
        XCTAssertEqual(palette.count, 4)
        XCTAssertEqual(palette[0], "#FF0000")
        XCTAssertEqual(palette[2], "#00FFFF")
    }

    func testGeneratePalette_analogous() {
        let palette = generatePalette(hex: "#FF0000", type: .analogous, count: 5)
        XCTAssertEqual(palette.count, 5)
        // All generated values should be valid hex colors
        for hex in palette {
            XCTAssertNotNil(hexToRGB(hex), "Invalid hex in palette: \(hex)")
        }
        // Index 1 corresponds to angle 0° (base color)
        XCTAssertEqual(palette[1], "#FF0000")
    }

    func testGeneratePalette_invalidHex() {
        let palette = generatePalette(hex: "invalid", type: .mono)
        XCTAssertTrue(palette.isEmpty)
    }

    func testRandomHex() {
        let hex = randomHex()
        XCTAssertEqual(hex.count, 7)
        XCTAssertTrue(hex.hasPrefix("#"))
        XCTAssertNotNil(hexToRGB(hex))
    }

    // MARK: - Clamp

    func testClamp01() {
        XCTAssertEqual(clamp01(-1), 0)
        XCTAssertEqual(clamp01(0), 0)
        XCTAssertEqual(clamp01(0.5), 0.5)
        XCTAssertEqual(clamp01(1), 1)
        XCTAssertEqual(clamp01(2), 1)
    }

    // MARK: - Linear / sRGB

    func testLinearToSRGB() {
        XCTAssertEqual(linearToSRGB(0), 0, accuracy: 0.001)
        XCTAssertEqual(linearToSRGB(1), 1, accuracy: 0.001)
    }

    func testSRGBToLinear() {
        XCTAssertEqual(srgbToLinear(0), 0, accuracy: 0.001)
        XCTAssertEqual(srgbToLinear(255), 1, accuracy: 0.001)
    }

}
