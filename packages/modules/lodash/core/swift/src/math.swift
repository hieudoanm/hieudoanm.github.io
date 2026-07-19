import Foundation

/**
 * Adds two numbers.
 */
public func add(_ augend: Double, _ addend: Double) -> Double {
    return augend + addend
}

public func add(_ augend: Int, _ addend: Int) -> Int {
    return augend + addend
}

/**
 * Computes number rounded up to precision.
 */
public func ceil(_ number: Double, _ precision: Int = 0) -> Double {
    let factor = pow(10, Double(precision))
    return ceil(number * factor) / factor
}

/**
 * Divide two numbers.
 */
public func divide(_ dividend: Double, _ divisor: Double) -> Double {
    return dividend / divisor
}

/**
 * Computes number rounded down to precision.
 */
public func floor(_ number: Double, _ precision: Int = 0) -> Double {
    let factor = pow(10, Double(precision))
    return floor(number * factor) / factor
}

/**
 * Computes the maximum value of array. If array is empty or falsey, null is returned.
 */
public func max<T: Comparable>(_ array: [T]) -> T? {
    return array.max()
}

/**
 * This method is like _.max except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked.
 */
public func maxBy<T, R: Comparable>(_ array: [T], _ iteratee: (T) -> R) -> T? {
    return array.max(by: { iteratee($0) < iteratee($1) })
}

/**
 * Computes the mean of the values in array.
 */
public func mean(_ array: [Double]) -> Double {
    guard !array.isEmpty else { return Double.nan }
    return array.reduce(0, +) / Double(array.count)
}

/**
 * This method is like _.mean except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is averaged.
 */
public func meanBy<T>(_ array: [T], _ iteratee: (T) -> Double) -> Double {
    guard !array.isEmpty else { return Double.nan }
    return array.map(iteratee).reduce(0, +) / Double(array.count)
}

/**
 * Computes the minimum value of array. If array is empty or falsey, null is returned.
 */
public func min<T: Comparable>(_ array: [T]) -> T? {
    return array.min()
}

/**
 * This method is like _.min except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked.
 */
public func minBy<T, R: Comparable>(_ array: [T], _ iteratee: (T) -> R) -> T? {
    return array.min(by: { iteratee($0) < iteratee($1) })
}

/**
 * Multiply two numbers.
 */
public func multiply(_ multiplier: Double, _ multiplicand: Double) -> Double {
    return multiplier * multiplicand
}

public func multiply(_ multiplier: Int, _ multiplicand: Int) -> Int {
    return multiplier * multiplicand
}

/**
 * Computes number rounded to precision.
 */
public func round(_ number: Double, _ precision: Int = 0) -> Double {
    let factor = pow(10, Double(precision))
    return round(number * factor) / factor
}

/**
 * Subtract two numbers.
 */
public func subtract(_ minuend: Double, _ subtrahend: Double) -> Double {
    return minuend - subtrahend
}

public func subtract(_ minuend: Int, _ subtrahend: Int) -> Int {
    return minuend - subtrahend
}

/**
 * Computes the sum of the values in array.
 */
public func sum(_ array: [Double]) -> Double {
    return array.reduce(0, +)
}

/**
 * This method is like _.sum except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is summed.
 */
public func sumBy<T>(_ array: [T], _ iteratee: (T) -> Double) -> Double {
    return array.map(iteratee).reduce(0, +)
}
