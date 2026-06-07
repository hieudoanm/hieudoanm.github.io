import Foundation

/**
 * Clamps number within the inclusive lower and upper bounds.
 *
 * - Parameters:
 *   - number: The number to clamp.
 *   - lower: The lower bound.
 *   - upper: The upper bound.
 * - Returns: Returns the clamped number.
 */
public func clamp<T: Comparable>(_ number: T, _ lower: T, _ upper: T) -> T {
    return min(max(number, lower), upper)
}

/**
 * Checks if number is between start and up to, but not including, end.
 * If end is not specified, it's set to start with start then set to 0.
 * If start is greater than end the params are swapped to support negative ranges.
 *
 * - Parameters:
 *   - number: The number to check.
 *   - start: The start of the range.
 *   - end: The end of the range.
 * - Returns: Returns true if number is in range, else false.
 */
public func inRange(_ number: Double, _ start: Double = 0.0, _ end: Double) -> Bool {
    var s = start
    var e = end
    if s > e {
        swap(&s, &e)
    }
    return number >= s && number < e
}

/**
 * Produces a random number between the inclusive lower and upper bounds.
 * If only one argument is provided a number between 0 and the given number is returned.
 * If floating is true, or either lower or upper are floats, a floating-point number is returned instead of an integer.
 *
 * - Parameters:
 *   - lower: The lower bound.
 *   - upper: The upper bound.
 *   - floating: Specify returning a floating-point number.
 * - Returns: Returns the random number.
 */
public func random(_ lower: Double = 0.0, _ upper: Double = 1.0, _ floating: Bool = false) -> Double {
    var l = lower
    var u = upper
    if l > u {
        swap(&l, &u)
    }
    
    let r = Double.random(in: l...u)
    return (floating || lower.truncatingRemainder(dividingBy: 1.0) != 0.0 || upper.truncatingRemainder(dividingBy: 1.0) != 0.0) ? r : floor(r)
}

public func random(_ upper: Double) -> Double {
    return random(0, upper)
}

public func random(_ lower: Int, _ upper: Int) -> Int {
    var l = lower
    var u = upper
    if l > u {
        swap(&l, &u)
    }
    return Int.random(in: l...u)
}
