import SwiftUI

/// Circular countdown ring shared by the Timer and Pomodoro sub-tabs.
struct ClockRing<Center: View>: View {
    let progress: Double
    let color: Color
    @ViewBuilder var center: () -> Center

    var body: some View {
        ZStack {
            Circle()
                .stroke(Color.primary.opacity(0.12), lineWidth: 8)
            Circle()
                .trim(from: 0, to: max(0, min(1, progress)))
                .stroke(
                    color,
                    style: StrokeStyle(lineWidth: 8, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .animation(.linear(duration: 0.5), value: progress)
            center()
        }
        .frame(width: 160, height: 160)
    }
}