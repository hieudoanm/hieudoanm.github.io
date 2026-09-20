import MacOSXCore
import SwiftUI

/// Countdown timer with presets and a circular progress ring.
struct TimerView: View {
    @ObservedObject var viewModel: TimerViewModel

    var body: some View {
        VStack(spacing: 24) {
            presetRow

            Spacer()

            ring

            controls

            Spacer()

            presetBadge
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(.vertical, 12)
    }

    private var presetRow: some View {
        HStack(spacing: 8) {
            ForEach(TimerViewModel.presets) { preset in
                let isSelected = viewModel.selectedPreset == preset
                Button {
                    viewModel.applyPreset(preset)
                } label: {
                    Text(preset.label)
                        .font(.system(.caption, design: .monospaced))
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(isSelected ? Color.accentColor : Color.primary.opacity(0.08), in: Capsule())
                        .foregroundColor(isSelected ? .white : .primary)
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Set timer to \(preset.label)")
            }
        }
    }

    private var ring: some View {
        ClockRing(progress: viewModel.progress, color: viewModel.isFinished ? .green : Color.accentColor) {
            VStack(spacing: 4) {
                Text(viewModel.timeText)
                    .font(.system(size: 34, weight: .medium, design: .monospaced))
                    .monospacedDigit()
                Text(viewModel.isFinished ? "done" : "remaining")
                    .font(.caption)
                    .tracking(2)
                    .foregroundColor(viewModel.isFinished ? Color.secondary : Color.accentColor)
                    .textCase(.uppercase)
            }
        }
    }

    private var controls: some View {
        HStack(spacing: 24) {
            circleButton(systemImage: "arrow.counterclockwise", size: 30) {
                viewModel.reset()
            }
            .disabled(viewModel.timeText == ClockFormatter.timer(viewModel.totalSeconds) && !viewModel.isFinished) 

            circleButton(
                systemImage: viewModel.isRunning ? "pause.fill" : "play.fill",
                size: 64,
                color: viewModel.isRunning ? .red : .accentColor
            ) {
                viewModel.toggleRunning()
            }
        }
    }

    private var presetBadge: some View {
        Text(viewModel.selectedPreset.label)
            .font(.caption2)
            .padding(.horizontal, 10)
            .padding(.vertical, 4)
            .background(Color.accentColor.opacity(0.15), in: Capsule())
            .foregroundColor(.secondary)
    }

    private func circleButton(systemImage: String, size: CGFloat, color: Color = .accentColor, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: systemImage)
                .font(.system(size: size >= 60 ? 22 : 14, weight: .semibold))
                .foregroundColor(.white)
                .frame(width: size, height: size)
                .background(color, in: Circle())
        }
        .buttonStyle(.plain)
    }
}