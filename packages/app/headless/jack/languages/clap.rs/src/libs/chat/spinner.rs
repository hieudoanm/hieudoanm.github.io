const FRAMES: &[char] = &['\u{25D0}', '\u{25D3}', '\u{25D1}', '\u{25D2}'];

pub struct Spinner {
    frame: usize,
}

impl Spinner {
    pub fn new() -> Self {
        Self { frame: 0 }
    }

    pub fn tick(&mut self) {
        self.frame = (self.frame + 1) % FRAMES.len();
    }

    pub fn current(&self) -> char {
        FRAMES[self.frame]
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_spinner_new() {
        let s = Spinner::new();
        assert_eq!(s.frame, 0);
    }

    #[test]
    fn test_spinner_tick() {
        let mut s = Spinner::new();
        s.tick();
        assert_eq!(s.frame, 1);
    }

    #[test]
    fn test_spinner_current_initial() {
        let s = Spinner::new();
        assert_eq!(s.current(), FRAMES[0]);
    }

    #[test]
    fn test_spinner_tick_wraps_around() {
        let mut s = Spinner {
            frame: FRAMES.len() - 1,
        };
        s.tick();
        assert_eq!(s.frame, 0);
    }

    #[test]
    fn test_spinner_all_frames() {
        for i in 0..FRAMES.len() {
            let s = Spinner { frame: i };
            assert_eq!(s.current(), FRAMES[i]);
        }
    }
}
