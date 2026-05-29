use std::time::{Duration, Instant};

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum PomodoroState {
    Work,
    Break,
    Done,
    Stopped,
}

#[derive(Debug, Clone)]
pub struct Pomodoro {
    pub work_duration: Duration,
    pub break_duration: Duration,
    pub start_time: Instant,
    pub total_duration: Duration,
    pub accumulated_pause: Duration,
    pub paused_at: Option<Instant>,
    pub state: PomodoroState,
    pub paused: bool,
}

impl Pomodoro {
    pub fn new(work_minutes: u64, break_minutes: u64) -> Self {
        Self {
            work_duration: Duration::from_secs(work_minutes * 60),
            break_duration: Duration::from_secs(break_minutes * 60),
            start_time: Instant::now(),
            total_duration: Duration::from_secs(work_minutes * 60),
            accumulated_pause: Duration::ZERO,
            paused_at: None,
            state: PomodoroState::Work,
            paused: false,
        }
    }

    pub fn elapsed(&self) -> Duration {
        if self.paused {
            if let Some(paused_at) = self.paused_at {
                paused_at.duration_since(self.start_time) - self.accumulated_pause
            } else {
                Duration::ZERO
            }
        } else {
            Instant::now().duration_since(self.start_time) - self.accumulated_pause
        }
    }

    pub fn remaining(&self) -> Duration {
        let elapsed = self.elapsed();
        if elapsed >= self.total_duration {
            Duration::ZERO
        } else {
            self.total_duration - elapsed
        }
    }

    pub fn progress(&self) -> f64 {
        let elapsed = self.elapsed();
        let pct = elapsed.as_secs_f64() / self.total_duration.as_secs_f64();
        pct.clamp(0.0, 1.0)
    }

    pub fn tick(&mut self) -> Option<PomodoroState> {
        if self.paused || self.state == PomodoroState::Stopped {
            return None;
        }

        let elapsed = Instant::now().duration_since(self.start_time) - self.accumulated_pause;

        if elapsed >= self.total_duration {
            match self.state {
                PomodoroState::Work => {
                    self.state = PomodoroState::Break;
                    self.start_time = Instant::now();
                    self.accumulated_pause = Duration::ZERO;
                    self.total_duration = self.break_duration;
                    return Some(PomodoroState::Break);
                }
                _ => {
                    self.state = PomodoroState::Done;
                    return Some(PomodoroState::Done);
                }
            }
        }

        None
    }

    pub fn toggle_pause(&mut self) {
        if self.paused {
            self.paused = false;
            if let Some(paused_at) = self.paused_at {
                self.accumulated_pause += paused_at.elapsed();
            }
            self.paused_at = None;
        } else {
            self.paused = true;
            self.paused_at = Some(Instant::now());
        }
    }

    pub fn stop(&mut self) {
        self.state = PomodoroState::Stopped;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_initial_state() {
        let p = Pomodoro::new(25, 5);
        assert_eq!(p.state, PomodoroState::Work);
        assert!(!p.paused);
        assert_eq!(p.work_duration, Duration::from_secs(25 * 60));
        assert_eq!(p.break_duration, Duration::from_secs(5 * 60));
    }

    #[test]
    fn test_pause_toggle() {
        let mut p = Pomodoro::new(25, 5);
        assert!(!p.paused);
        p.toggle_pause();
        assert!(p.paused);
        p.toggle_pause();
        assert!(!p.paused);
    }

    #[test]
    fn test_stop() {
        let mut p = Pomodoro::new(25, 5);
        p.stop();
        assert_eq!(p.state, PomodoroState::Stopped);
    }

    #[test]
    fn test_progress_bounds() {
        let p = Pomodoro::new(25, 5);
        let prog = p.progress();
        assert!(prog >= 0.0 && prog <= 1.0);
    }
}
