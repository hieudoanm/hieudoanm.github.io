import SwiftUI

/// Owns state for the Clock tab's five sub-tabs.
@MainActor
final class ClockViewModel: ObservableObject {
    let worldClock = WorldClockViewModel()
    let timer = TimerViewModel()
    let stopwatch = StopwatchViewModel()
    let pomodoro = PomodoroViewModel()
}