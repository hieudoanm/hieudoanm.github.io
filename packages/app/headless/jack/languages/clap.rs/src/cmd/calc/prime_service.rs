pub fn is_prime(n: i64) -> bool {
    if n < 2 {
        return false;
    }
    if n == 2 || n == 3 {
        return true;
    }
    if n % 2 == 0 || n % 3 == 0 {
        return false;
    }
    let limit = (n as f64).sqrt() as i64;
    let mut i = 5;
    while i <= limit {
        if n % i == 0 || n % (i + 2) == 0 {
            return false;
        }
        i += 6;
    }
    true
}

pub fn sieve(limit: i64) -> Vec<i64> {
    if limit < 2 {
        return vec![];
    }
    let n = limit as usize;
    let mut is_composite = vec![false; n + 1];
    let mut i: usize = 2;
    while i * i <= n {
        if !is_composite[i] {
            let mut j = i * i;
            while j <= n {
                is_composite[j] = true;
                j += i;
            }
        }
        i += 1;
    }
    (2..=n)
        .filter(|&i| !is_composite[i])
        .map(|i| i as i64)
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_prime_negative() {
        assert!(!is_prime(-5));
    }

    #[test]
    fn test_is_prime_zero() {
        assert!(!is_prime(0));
    }

    #[test]
    fn test_is_prime_one() {
        assert!(!is_prime(1));
    }

    #[test]
    fn test_is_prime_two() {
        assert!(is_prime(2));
    }

    #[test]
    fn test_is_prime_three() {
        assert!(is_prime(3));
    }

    #[test]
    fn test_is_prime_four() {
        assert!(!is_prime(4));
    }

    #[test]
    fn test_is_prime_large_prime() {
        assert!(is_prime(7919));
    }

    #[test]
    fn test_is_prime_large_composite() {
        assert!(!is_prime(7920));
    }

    #[test]
    fn test_is_prime_even() {
        assert!(!is_prime(100));
    }

    #[test]
    fn test_sieve_empty() {
        assert!(sieve(1).is_empty());
    }

    #[test]
    fn test_sieve_up_to_10() {
        assert_eq!(sieve(10), vec![2, 3, 5, 7]);
    }

    #[test]
    fn test_sieve_up_to_30() {
        assert_eq!(sieve(30), vec![2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    }

    #[test]
    fn test_sieve_up_to_2() {
        assert_eq!(sieve(2), vec![2]);
    }
}
