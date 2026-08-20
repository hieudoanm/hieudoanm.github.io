import Foundation

public struct NormalizedRect: Codable, Hashable {
    public var x: Double
    public var y: Double
    public var width: Double
    public var height: Double

    public init(x: Double, y: Double, width: Double, height: Double) {
        self.x = x
        self.y = y
        self.width = width
        self.height = height
    }

    public static let leftHalf = NormalizedRect(x: 0, y: 0, width: 0.5, height: 1.0)
    public static let rightHalf = NormalizedRect(x: 0.5, y: 0, width: 0.5, height: 1.0)
    public static let topHalf = NormalizedRect(x: 0, y: 0, width: 1.0, height: 0.5)
    public static let bottomHalf = NormalizedRect(x: 0, y: 0.5, width: 1.0, height: 0.5)
    public static let topLeft = NormalizedRect(x: 0, y: 0, width: 0.5, height: 0.5)
    public static let topRight = NormalizedRect(x: 0.5, y: 0, width: 0.5, height: 0.5)
    public static let bottomLeft = NormalizedRect(x: 0, y: 0.5, width: 0.5, height: 0.5)
    public static let bottomRight = NormalizedRect(x: 0.5, y: 0.5, width: 0.5, height: 0.5)
    public static let maximized = NormalizedRect(x: 0, y: 0, width: 1.0, height: 1.0)
    public static let centered = NormalizedRect(x: 0.15, y: 0.15, width: 0.7, height: 0.7)
}
