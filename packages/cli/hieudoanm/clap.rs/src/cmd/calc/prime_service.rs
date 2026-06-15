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
