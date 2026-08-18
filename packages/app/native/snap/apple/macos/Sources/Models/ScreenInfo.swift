import Foundation
import CoreGraphics

struct ScreenInfo: Identifiable, Hashable {
    let id: CGDirectDisplayID
    let name: String
    let frame: CGRect
    let visibleFrame: CGRect
    let scaleFactor: CGFloat

    var width: Double { Double(frame.width) }
    var height: Double { Double(frame.height) }

    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }

    static func == (lhs: ScreenInfo, rhs: ScreenInfo) -> Bool {
        lhs.id == rhs.id
    }
}
