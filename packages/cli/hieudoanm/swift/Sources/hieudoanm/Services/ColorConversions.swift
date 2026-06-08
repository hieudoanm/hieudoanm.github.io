import Foundation

func clamp01(_ x: Double) -> Double { min(1, max(0, x)) }

func linearToSRGB(_ c: Double) -> Double {
    c <= 0.0031308 ? 12.92 * c : 1.055 * pow(c, 1 / 2.4) - 0.055
}

func srgbToLinear(_ c: Double) -> Double {
    let c = c / 255.0
    return c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4)
}

// MARK: - Hex

func hexToRGB(_ hex: String) -> (r: Int, g: Int, b: Int)? {
    var h = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
    if h.hasPrefix("#") { h = String(h.dropFirst()) }
    guard h.count == 6, let value = Int(h, radix: 16) else { return nil }
    return ((value >> 16) & 0xFF, (value >> 8) & 0xFF, value & 0xFF)
}

func rgbToHex(r: Int, g: Int, b: Int) -> String {
    String(format: "#%02X%02X%02X", r, g, b)
}

func randomHex() -> String {
    let r = Int.random(in: 0...255)
    let g = Int.random(in: 0...255)
    let b = Int.random(in: 0...255)
    return rgbToHex(r: r, g: g, b: b)
}

// MARK: - RGB ↔ HSL

struct HSL { var h: Double, s: Double, l: Double }

func rgbToHSL(r: Int, g: Int, b: Int) -> HSL {
    let rn = Double(r) / 255, gn = Double(g) / 255, bn = Double(b) / 255
    let mx = max(rn, gn, bn), mn = min(rn, gn, bn)
    let d = mx - mn
    var h = 0.0, s = 0.0, l = (mx + mn) / 2

    if d != 0 {
        s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn)
        switch mx {
        case rn: h = ((gn - bn) / d).truncatingRemainder(dividingBy: 6) * 60
        case gn: h = ((bn - rn) / d + 2) * 60
        default: h = ((rn - gn) / d + 4) * 60
        }
        if h < 0 { h += 360 }
    }
    return HSL(h: h, s: s * 100, l: l * 100)
}

func hslToRGB(h: Double, s: Double, l: Double) -> (r: Int, g: Int, b: Int) {
    let h = h / 360, s = s / 100, l = l / 100
    let c = (1 - abs(2 * l - 1)) * s
    let x = c * (1 - abs((h * 6).truncatingRemainder(dividingBy: 2) - 1))
    let m = l - c / 2
    var rn = 0.0, gn = 0.0, bn = 0.0
    switch h * 6 {
    case 0..<1: (rn, gn, bn) = (c, x, 0)
    case 1..<2: (rn, gn, bn) = (x, c, 0)
    case 2..<3: (rn, gn, bn) = (0, c, x)
    case 3..<4: (rn, gn, bn) = (0, x, c)
    case 4..<5: (rn, gn, bn) = (x, 0, c)
    default: (rn, gn, bn) = (c, 0, x)
    }
    return (Int((rn + m) * 255), Int((gn + m) * 255), Int((bn + m) * 255))
}

// MARK: - RGB ↔ CMYK

func rgbToCMYK(r: Int, g: Int, b: Int) -> (c: Double, m: Double, y: Double, k: Double) {
    let rn = Double(r) / 255, gn = Double(g) / 255, bn = Double(b) / 255
    let k = 1 - max(rn, gn, bn)
    guard k < 1 else { return (0, 0, 0, 1) }
    return ((1 - rn - k) / (1 - k), (1 - gn - k) / (1 - k), (1 - bn - k) / (1 - k), k)
}

func cmykToRGB(c: Double, m: Double, y: Double, k: Double) -> (r: Int, g: Int, b: Int) {
    let rn = (1 - c) * (1 - k), gn = (1 - m) * (1 - k), bn = (1 - y) * (1 - k)
    return (Int(rn * 255), Int(gn * 255), Int(bn * 255))
}

// MARK: - Lab / HCL / OKLCH

func labToRGB(l: Double, a: Double, b: Double) -> (r: Int, g: Int, b: Int) {
    let fy = (l + 16) / 116, fx = a / 500 + fy, fz = fy - b / 200
    let x = 0.95047 * (fx * fx * fx > 0.008856 ? fx * fx * fx : (116 * fx - 16) / 5.206)
    let y = 1.0 * (fy * fy * fy > 0.008856 ? fy * fy * fy : (116 * fy - 16) / 5.206)
    let z = 1.08883 * (fz * fz * fz > 0.008856 ? fz * fz * fz : (116 * fz - 16) / 5.206)

    let rl = x * 3.2406 + y * -1.5372 + z * -0.4986
    let gl = x * -0.9689 + y * 1.8758 + z * 0.0415
    let bl = x * 0.0557 + y * -0.2040 + z * 1.0570

    return (Int(clamp01(linearToSRGB(rl)) * 255),
            Int(clamp01(linearToSRGB(gl)) * 255),
            Int(clamp01(linearToSRGB(bl)) * 255))
}

func rgbToLab(r: Int, g: Int, b: Int) -> (l: Double, a: Double, b: Double) {
    let rl = srgbToLinear(Double(r)), gl = srgbToLinear(Double(g)), bl = srgbToLinear(Double(b))
    let x = 0.4124564 * rl + 0.3575761 * gl + 0.1804375 * bl
    let y = 0.2126729 * rl + 0.7151522 * gl + 0.0721750 * bl
    let z = 0.0193339 * rl + 0.1191920 * gl + 0.9503041 * bl

    let xn = x / 0.95047, yn = y / 1.0, zn = z / 1.08883
    let fx = xn > 0.008856 ? pow(xn, 1/3) : (7.787 * xn + 16/116)
    let fy = yn > 0.008856 ? pow(yn, 1/3) : (7.787 * yn + 16/116)
    let fz = zn > 0.008856 ? pow(zn, 1/3) : (7.787 * zn + 16/116)

    return (116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz))
}

func hclToRGB(h: Double, c: Double, l: Double) -> (r: Int, g: Int, b: Int) {
    let hRad = h * .pi / 180
    let a = c * cos(hRad), bVal = c * sin(hRad)
    return labToRGB(l: l, a: a, b: bVal)
}

func rgbToHCL(r: Int, g: Int, b: Int) -> (h: Double, c: Double, l: Double) {
    let (l, a, bVal) = rgbToLab(r: r, g: g, b: b)
    let c = sqrt(a * a + bVal * bVal)
    var h = atan2(bVal, a) * 180 / .pi
    if h < 0 { h += 360 }
    return (h, c, l)
}

// MARK: - OKLab / OKLCH

func oklabToLinearRGB(l: Double, a: Double, b: Double) -> (r: Double, g: Double, b: Double) {
    let l_ = l + 0.3963377774 * a + 0.2158037573 * b
    let m_ = l - 0.1055613458 * a - 0.0638541728 * b
    let s_ = l - 0.0894841775 * a - 1.2914855480 * b

    let l3 = l_ * l_ * l_, m3 = m_ * m_ * m_, s3 = s_ * s_ * s_
    return (
        4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
        -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
        -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3
    )
}

func oklchToRGB(l: Double, c: Double, h: Double) -> (r: Int, g: Int, b: Int) {
    let hRad = h * .pi / 180
    let a = c * cos(hRad), bVal = c * sin(hRad)
    let (rl, gl, bl) = oklabToLinearRGB(l: l, a: a, b: bVal)
    return (Int(clamp01(linearToSRGB(rl)) * 255),
            Int(clamp01(linearToSRGB(gl)) * 255),
            Int(clamp01(linearToSRGB(bl)) * 255))
}

func rgbToOKLCH(r: Int, g: Int, b: Int) -> (l: Double, c: Double, h: Double) {
    let rl = srgbToLinear(Double(r)), gl = srgbToLinear(Double(g)), bl = srgbToLinear(Double(b))
    let l_ = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl
    let m_ = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl
    let s_ = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl

    let l3 = cbrt(l_), m3 = cbrt(m_), s3 = cbrt(s_)
    let l = 0.2104542553 * l3 + 0.7936177850 * m3 - 0.0040720468 * s3
    let a = 1.9779984951 * l3 - 2.4285922050 * m3 + 0.4505937099 * s3
    let bVal = 0.0259040371 * l3 + 0.7827717662 * m3 - 0.8086757660 * s3

    let c = sqrt(a * a + bVal * bVal)
    var h = atan2(bVal, a) * 180 / .pi
    if h < 0 { h += 360 }
    return (l, c, h)
}

// MARK: - Palette

enum PaletteType: String, CaseIterable {
    case mono, complement, triad, tetrad, analogous
}

func generatePalette(hex: String, type: PaletteType, count: Int = 5) -> [String] {
    guard let (r, g, b) = hexToRGB(hex) else { return [] }
    let hsl = rgbToHSL(r: r, g: g, b: b)
    var angles: [Double]

    switch type {
    case .mono:
        angles = (0..<count).map { Double($0) * 0 }
    case .complement:
        angles = [0, 180]
    case .triad:
        angles = [0, 120, 240]
    case .tetrad:
        angles = [0, 90, 180, 270]
    case .analogous:
        angles = stride(from: -30.0, through: Double(count - 1) * 30.0 - 30.0, by: 30.0).map { $0 }
    }

    return angles.map { angle in
        var newH = hsl.h + angle
        newH = newH.truncatingRemainder(dividingBy: 360)
        if newH < 0 { newH += 360 }
        let (nr, ng, nb) = hslToRGB(h: newH, s: hsl.s, l: hsl.l)
        return rgbToHex(r: nr, g: ng, b: nb)
    }
}
