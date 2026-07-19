#[derive(Debug, Clone, Copy, PartialEq)]
pub enum State {
    Chat,
    Loading,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_state_equality() {
        assert_eq!(State::Chat, State::Chat);
        assert_eq!(State::Loading, State::Loading);
        assert_ne!(State::Chat, State::Loading);
    }

    #[test]
    fn test_state_debug() {
        assert_eq!(format!("{:?}", State::Chat), "Chat");
        assert_eq!(format!("{:?}", State::Loading), "Loading");
    }
}
