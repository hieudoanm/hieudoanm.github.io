import Foundation

/**
 * The opposite of _.before; this method creates a function that invokes func once it's called n or more times.
 */
public func after(_ n: Int, _ func: @escaping () -> Void) -> () -> Void {
    var count = 0
    return {
        count += 1
        if count >= n {
            `func`()
        }
    }
}

/**
 * Creates a function that invokes func while it's called less than n times.
 * Subsequent calls to the created function return the result of the last func invocation.
 */
public func before<R>(_ n: Int, _ func: @escaping () -> R) -> () -> R {
    var count = 0
    var lastResult: R?
    return {
        count += 1
        if count < n {
            lastResult = `func`()
        }
        return lastResult!
    }
}

/**
 * Creates a function that negates the result of the predicate func.
 */
public func negate<T>(_ predicate: @escaping (T) -> Bool) -> (T) -> Bool {
    return { !predicate($0) }
}

/**
 * Creates a function that is restricted to invoking func once.
 * Repeat calls to the function return the value of the first invocation.
 */
public func once<R>(_ func: @escaping () -> R) -> () -> R {
    var called = false
    var result: R?
    return {
        if !called {
            called = true
            result = `func`()
        }
        return result!
    }
}

/**
 * Creates a memoized function. The cache key is determined by the first argument provided to the memoized function.
 */
public func memoize<T: Hashable, R>(_ func: @escaping (T) -> R) -> (T) -> R {
    var cache = [T: R]()
    return { arg in
        if let cached = cache[arg] {
            return cached
        }
        let result = `func`(arg)
        cache[arg] = result
        return result
    }
}

/**
 * Creates a function that invokes func with arguments reversed.
 */
public func flip<A, B, R>(_ func: @escaping (A, B) -> R) -> (B, A) -> R {
    return { b, a in `func`(a, b) }
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 */
public func debounce(_ func: @escaping () -> Void, wait: TimeInterval) -> () -> Void {
    var workItem: DispatchWorkItem?
    return {
        workItem?.cancel()
        workItem = DispatchWorkItem(block: `func`)
        DispatchQueue.main.asyncAfter(deadline: .now() + (wait / 1000), execute: workItem!)
    }
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds.
 */
public func throttle(_ func: @escaping () -> Void, wait: TimeInterval) -> () -> Void {
    var lastTime = Date(timeIntervalSince1970: 0)
    return {
        let now = Date()
        if now.timeIntervalSince(lastTime) >= (wait / 1000) {
            lastTime = now
            `func`()
        }
    }
}

/**
 * Creates a function that invokes func with the arguments of the created function.
 */
public func unary<T, R>(_ func: @escaping (T) -> R) -> (T) -> R {
    return { `func`($0) }
}

/**
 * Creates a function that provides value to wrapper as its first argument.
 * Any additional arguments provided to the function are appended to those provided to the wrapper.
 */
public func wrap<T, R>(_ value: T, _ wrapper: @escaping (T) -> R) -> () -> R {
    return { wrapper(value) }
}
