import MacOSXCore
import SwiftUI

/// Stopwatch with lap timing and a laps table.
struct StopwatchView: View {
    @ObservedObject var viewModel: StopwatchViewModel

    var body: some View {
        VStack(spacing: 20) {
            Spacer()

            Text(viewModel.timeText)
                .font(.system(size: 40, weight: .regular, design: .monospaced))
                .monospacedDigit()
                .animation(.linear(duration: 0.02), value: viewModel.elapsedMilliseconds)

            controls

            if !viewModel.laps.isEmpty {
                Divider()
                lapsTable
            }

            Spacer()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(.vertical, 12)
    }

    private var controls: some View {
        HStack(spacing: 24) {
            circleButton(systemImage: "flag.fill", size: 46, color: .gray) {
                viewModel.lap()
            }
            .disabled(!viewModel.isRunning)

            circleButton(
                systemImage: viewModel.isRunning ? "pause.fill" : "play.fill",
                size: 70,
                color: viewModel.isRunning ? .red : .accentColor
            ) {
                if viewModel.isRunning {
                    viewModel.stop()
                } else {
                    viewModel.start()
                }
            }

            circleButton(systemImage: "stop.fill", size: 46, color: .gray) {
                viewModel.stop()
            }
            .disabled(!viewModel.isRunning)

            circleButton(systemImage: "arrow.counterclockwise", size: 46, color: .gray) {
                viewModel.reset()
            }
            .disabled(!viewModel.canReset)
        }
    }

    private var lapsTable: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 0) {
                ForEach(viewModel.laps) { lap in
                    HStack {
                        Text("Lap \(lap.index)")
                            .monospacedDigit()
                            .foregroundColor(.secondary)
                        Spacer()
                        Text("+\(ClockFormatter.stopwatch(lap.splitMilliseconds))")
                            .monospacedDigit()
                            .foregroundColor(.secondary)
                        Text(ClockFormatter.stopwatch(lap.elapsedMilliseconds))
                            .monospacedDigit()
                            .foregroundColor(.primary)
                    }
                    .font(.system(.body, design: .monospaced))
                    .padding(.vertical, 5)
                    .accessibilityElement(children: .combine)
                    .accessibilityLabel(
                        "Lap \(lap.index), \(ClockFormatter.stopwatch(lap.elapsedMilliseconds))"
                    )
                }
            }
        }
        .frame(maxHeight: 220)
    }

    private func circleButton(systemImage: String, size: CGFloat, color: Color, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: systemImage)
                .font(.system(size: size >= 60 ? 22 : 15, weight: .semibold))
                .foregroundColor(.white)
                .frame(width: size, height: size)
                .background(color, in: Circle())
        }
        .buttonStyle(.plain)
    }
}