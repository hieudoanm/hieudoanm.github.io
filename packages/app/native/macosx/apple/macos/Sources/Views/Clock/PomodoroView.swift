import SwiftUI

/// Pomodoro timer with work/break phases and a circular progress ring.
struct PomodoroView: View {
    @ObservedObject var viewModel: PomodoroViewModel

    var body: some View {
        VStack(spacing: 18) {
            presetRow

            phaseBadge

            ring

            controls

            Spacer()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(.vertical, 12)
    }

    private var presetRow: some View {
        HStack(spacing: 8) {
            ForEach(PomodoroViewModel.presets) { preset in
                let isSelected = viewModel.selectedPreset == preset
                Button {
                    viewModel.applyPreset(preset)
                } label: {
                    Text(preset.label)
                        .font(.system(.caption, design: .monospaced))
                        .padding(.horizontal, 14)
                        .padding(.vertical, 6)
                        .background(isSelected ? Color.accentColor : Color.primary.opacity(0.08), in: Capsule())
                        .foregroundColor(isSelected ? .white : .primary)
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Set pomodoro to \(preset.workMinutes) minutes work, \(preset.breakMinutes) minutes break")
            }
        }
    }

    private var phaseBadge: some View {
        Text("\(viewModel.phase.title) · \(viewModel.round) / ∞")
            .font(.system(.caption, design: .monospaced))
            .padding(.horizontal, 12)
            .padding(.vertical, 5)
            .background(
                (viewModel.phase == .work ? Color.accentColor : Color.green).opacity(0.15),
                in: Capsule()
            )
            .foregroundColor(.secondary)
            .accessibilityLabel(viewModel.statusText)
    }

    private var ring: some View {
        ClockRing(progress: viewModel.progress, color: faceColor) {
            HStack(alignment: .firstTextBaseline, spacing: 2) {
                Text(viewModel.timeText)
                    .font(.system(size: 34, weight: .medium, design: .monospaced))
                    .monospacedDigit()
                Text("min")
                    .font(.system(size: 12, weight: .regular, design: .monospaced))
                    .foregroundColor(.secondary)
            }
        }
    }

    private var controls: some View {
        HStack(spacing: 24) {
            circleButton(systemImage: "arrow.counterclockwise", size: 30, color: .gray) {
                viewModel.reset()
            }
            .disabled(viewModel.secondsRemaining == viewModel.totalSeconds)

            circleButton(
                systemImage: viewModel.isRunning ? "pause.fill" : "play.fill",
                size: 64,
                color: viewModel.isRunning ? .red : faceColor
            ) {
                viewModel.toggleRunning()
            }

            circleButton(systemImage: "forward.end.fill", size: 30, color: .gray) {
                viewModel.skipPhase()
            }
            .help("Skip to next phase")
        }
    }

    private var faceColor: Color {
        viewModel.phase == .work ? .accentColor : .green
    }

    private func circleButton(systemImage: String, size: CGFloat, color: Color, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: systemImage)
                .font(.system(size: size >= 60 ? 22 : 14, weight: .semibold))
                .foregroundColor(.white)
                .frame(width: size, height: size)
                .background(color, in: Circle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(systemImage)
    }
}