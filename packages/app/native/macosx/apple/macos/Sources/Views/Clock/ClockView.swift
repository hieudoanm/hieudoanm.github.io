import SwiftUI

/// The Clock tab: five sub-tabs mirroring the hybrid clock app.
struct ClockView: View {
    @ObservedObject var viewModel: ClockViewModel

    private enum Section: Hashable {
        case watchface
        case worldClock
        case timer
        case stopwatch
        case pomodoro
    }

    @State private var section: Section = .watchface

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            sectionPicker

            Divider()

            content
        }
        .padding(14)
    }

    private var header: some View {
        HStack {
            Label("Clock", systemImage: "clock")
                .font(.headline)
                .accessibilityElement(children: .combine)
            Spacer()
            Text("\(Date.now.formatted(date: .omitted, time: .shortened))")
                .font(.caption)
                .monospacedDigit()
                .foregroundColor(.secondary)
        }
        .padding(.bottom, 12)
    }

    private var sectionPicker: some View {
        Picker("Section", selection: $section) {
            Text("Watchface").tag(Section.watchface)
            Text("World Clock").tag(Section.worldClock)
            Text("Timer").tag(Section.timer)
            Text("Stopwatch").tag(Section.stopwatch)
            Text("Pomodoro").tag(Section.pomodoro)
        }
        .pickerStyle(.segmented)
        .labelsHidden()
        .accessibilityLabel("Clock section")
    }

    @ViewBuilder
    private var content: some View {
        switch section {
        case .watchface:
            WatchfaceView()
                .transition(.opacity)
        case .worldClock:
            WorldClockView(viewModel: viewModel.worldClock)
                .transition(.opacity)
        case .timer:
            TimerView(viewModel: viewModel.timer)
                .transition(.opacity)
        case .stopwatch:
            StopwatchView(viewModel: viewModel.stopwatch)
                .transition(.opacity)
        case .pomodoro:
            PomodoroView(viewModel: viewModel.pomodoro)
                .transition(.opacity)
        }
    }
}