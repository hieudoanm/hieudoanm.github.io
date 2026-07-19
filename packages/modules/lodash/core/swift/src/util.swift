import Foundation

/**
 * Attempts to invoke func, returning either the result or the error object.
 */
public func attempt<R>(_ func: () throws -> R) -> Any {
    do {
        return try `func`()
    } catch {
        return error
    }
}

/**
 * Creates a function that returns value.
 */
public func constant<T>(_ value: T) -> () -> T {
    return { value }
}

/**
 * Checks value to determine whether a default value should be returned in its place.
 */
public func defaultTo<T>(_ value: T?, _ defaultValue: T) -> T {
    return value ?? defaultValue
}

/**
 * This method returns the first argument it receives.
 */
public func identity<T>(_ value: T) -> T {
    return value
}

/**
 * A no-operation function.
 */
public func noop() {}

/**
 * Creates a function that returns the nth argument.
 */
public func nthArg<T>(_ n: Int) -> ([T]) -> T? {
    return { args in
        let index = n >= 0 ? n : args.count + n
        return (index >= 0 && index < args.count) ? args[index] : nil
    }
}

/**
 * Creates an array of numbers progressing from start up to, but not including, end.
 */
public func range(_ start: Int = 0, _ end: Int, _ step: Int? = nil) -> [Int] {
    let actualStep = step ?? (start < end ? 1 : -1)
    if actualStep == 0 { return [] }

    var result = [Int]()
    var current = start
    if actualStep > 0 {
        while current < end {
            result.append(current)
            current += actualStep
        }
    } else {
        while current > end {
            result.append(current)
            current += actualStep
        }
    }
    return result
}

public func range(_ end: Int) -> [Int] {
    return range(0, end)
}

/**
 * This method is like _.range except that it populates values in descending order.
 */
public func rangeRight(_ start: Int = 0, _ end: Int, _ step: Int? = nil) -> [Int] {
    return range(start, end, step).reversed()
}

public func rangeRight(_ end: Int) -> [Int] {
    return rangeRight(0, end)
}

/**
 * Returns a new empty array.
 */
public func stubArray() -> [Any] {
    return []
}

/**
 * Returns false.
 */
public func stubFalse() -> Bool {
    return false
}

/**
 * Returns a new empty object.
 */
public func stubObject() -> [String: Any] {
    return [:]
}

/**
 * Returns an empty string.
 */
public func stubString() -> String {
    return ""
}

/**
 * Returns true.
 */
public func stubTrue() -> Bool {
    return true
}

/**
 * Invokes the iteratee n times, returning an array of the results of each invocation.
 */
public func times<R>(_ n: Int, _ iteratee: (Int) -> R) -> [R] {
    return (0..<max(0, n)).map(iteratee)
}

/**
 * Generates a unique ID. If prefix is given, the ID is appended to it.
 */
private var idCounter = 0
public func uniqueId(_ prefix: String = "") -> String {
    idCounter += 1
    return "\(prefix)\(idCounter)"
}
