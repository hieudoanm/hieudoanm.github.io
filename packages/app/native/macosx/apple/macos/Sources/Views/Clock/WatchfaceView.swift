import MacOSXCore
import SwiftUI

/// Analog (Dot) and digital (Minimal) clock faces, ticked every second.
struct WatchfaceView: View {
    private enum Face: Hashable {
        case dot
        case minimal
    }

    @State private var face: Face = .dot
    @State private var now = Date()

    var body: some View {
        VStack(spacing: 0) {
            faceContent
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .animation(.linear(duration: 1), value: now)

            Divider()

            HStack(spacing: 16) {
                faceButton("DOT", isSelected: face == .dot) {
                    face = .dot
                }
                faceButton("MINIMAL", isSelected: face == .minimal) {
                    face = .minimal
                }
            }
            .padding(.vertical, 12)
        }
        .task {
            while !Task.isCancelled {
                now = Date()
                try? await Task.sleep(for: .seconds(1))
            }
        }
    }

    @ViewBuilder
    private var faceContent: some View {
        switch face {
        case .dot:
            analogFace
        case .minimal:
            minimalFace
        }
    }

    private var analogFace: some View {
        GeometryReader { geometry in
            let minDimension = min(geometry.size.width, geometry.size.height)
            ZStack {
                Circle()
                    .fill(Color(nsColor: .controlBackgroundColor))
                    .overlay {
                        Circle().stroke(Color.primary.opacity(0.15), lineWidth: 2)
                    }
                    .shadow(color: .black.opacity(0.15), radius: 12, y: 6)

                handDot(
                    angle: hourAngle,
                    radius: minDimension * 0.30,
                    size: 26,
                    color: .accentColor
                )
                handDot(
                    angle: minuteAngle,
                    radius: minDimension * 0.34,
                    size: 18,
                    color: Color.primary.opacity(0.6)
                )
                handDot(
                    angle: secondAngle,
                    radius: minDimension * 0.38,
                    size: 10,
                    color: Color.primary.opacity(0.4)
                )

                Circle()
                    .fill(Color.primary.opacity(0.2))
                    .frame(width: 5, height: 5)
            }
        }
        .padding(20)
    }

    private func handDot(angle: Double, radius: CGFloat, size: CGFloat, color: Color) -> some View {
        Circle()
            .fill(color)
            .shadow(color: .black.opacity(0.15), radius: 4, y: 2)
            .frame(width: size, height: size)
            .offset(
                x: radius * sin(angle * .pi / 180),
                y: -radius * cos(angle * .pi / 180)
            )
    }

    private var minimalFace: some View {
        VStack(spacing: 0) {
            HStack(alignment: .firstTextBaseline, spacing: 8) {
                Text(hourText)
                    .foregroundColor(.primary)
                Text(":")
                    .foregroundColor(.secondary.opacity(0.4))
                Text(minuteText)
                    .foregroundColor(Color.primary.opacity(0.8))
                Text(":")
                    .foregroundColor(.secondary.opacity(0.4))
                Text(secondText)
                    .foregroundColor(.secondary)
            }
            .font(.system(size: 52, weight: .regular, design: .monospaced))
            .monospacedDigit()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(24)
        .overlay {
            Circle()
                .stroke(Color.primary.opacity(0.15), lineWidth: 2)
                .padding(20)
        }
    }

    private var hourText: String {
        ClockFormatter.two(Calendar.current.component(.hour, from: now))
    }

    private var minuteText: String {
        ClockFormatter.two(Calendar.current.component(.minute, from: now))
    }

    private var secondText: String {
        ClockFormatter.two(Calendar.current.component(.second, from: now))
    }

    private var hourAngle: Double {
        let hours = Double(Calendar.current.component(.hour, from: now))
        let minutes = Double(Calendar.current.component(.minute, from: now))
        return (hours.truncatingRemainder(dividingBy: 12)) * 30 + minutes * 0.5
    }

    private var minuteAngle: Double {
        let minutes = Double(Calendar.current.component(.minute, from: now))
        let seconds = Double(Calendar.current.component(.second, from: now))
        return minutes * 6 + seconds * 0.1
    }

    private var secondAngle: Double {
        Double(Calendar.current.component(.second, from: now)) * 6
    }

    private func faceButton(_ title: String, isSelected: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(title)
                .font(.system(.caption, design: .monospaced))
                .tracking(2)
                .padding(.horizontal, 20)
                .padding(.vertical, 7)
                .background(isSelected ? Color.accentColor : Color.primary.opacity(0.08), in: Capsule())
                .foregroundColor(isSelected ? .white : .primary)
        }
        .buttonStyle(.plain)
        .accessibilityLabel("\(title) face")
    }
}