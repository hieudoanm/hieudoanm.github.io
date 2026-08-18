import Foundation

struct NormalizedRect: Codable, Hashable {
    var x: Double
    var y: Double
    var width: Double
    var height: Double

    init(x: Double, y: Double, width: Double, height: Double) {
        self.x = x
        self.y = y
        self.width = width
        self.height = height
    }

    static let leftHalf = NormalizedRect(x: 0, y: 0, width: 0.5, height: 1.0)
    static let rightHalf = NormalizedRect(x: 0.5, y: 0, width: 0.5, height: 1.0)
    static let topHalf = NormalizedRect(x: 0, y: 0, width: 1.0, height: 0.5)
    static let bottomHalf = NormalizedRect(x: 0, y: 0.5, width: 1.0, height: 0.5)
    static let topLeft = NormalizedRect(x: 0, y: 0, width: 0.5, height: 0.5)
    static let topRight = NormalizedRect(x: 0.5, y: 0, width: 0.5, height: 0.5)
    static let bottomLeft = NormalizedRect(x: 0, y: 0.5, width: 0.5, height: 0.5)
    static let bottomRight = NormalizedRect(x: 0.5, y: 0.5, width: 0.5, height: 0.5)
    static let maximized = NormalizedRect(x: 0, y: 0, width: 1.0, height: 1.0)
    static let centered = NormalizedRect(x: 0.15, y: 0.15, width: 0.7, height: 0.7)
}
