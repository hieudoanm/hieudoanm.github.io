import Foundation
import CoreGraphics

public struct ScreenInfo: Identifiable, Hashable {
    public let id: CGDirectDisplayID
    public let name: String
    public let frame: CGRect
    public let visibleFrame: CGRect
    public let scaleFactor: CGFloat

    public var width: Double { Double(frame.width) }
    public var height: Double { Double(frame.height) }

    public init(
        id: CGDirectDisplayID,
        name: String,
        frame: CGRect,
        visibleFrame: CGRect,
        scaleFactor: CGFloat
    ) {
        self.id = id
        self.name = name
        self.frame = frame
        self.visibleFrame = visibleFrame
        self.scaleFactor = scaleFactor
    }

    public func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }

    public static func == (lhs: ScreenInfo, rhs: ScreenInfo) -> Bool {
        lhs.id == rhs.id
    }
}
