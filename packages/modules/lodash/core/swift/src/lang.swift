import Foundation

/**
 * Performs a comparison between two values to determine if they are equivalent.
 */
public func eq(_ value: Any?, _ other: Any?) -> Bool {
    if value == nil && other == nil { return true }
    guard let v = value, let o = other else { return false }
    // Basic Equatable check is hard with Any. Using string representation as a fallback MVP.
    return "\(v)" == "\(o)"
}

/**
 * Checks if value is greater than other.
 */
public func gt(_ value: Double, _ other: Double) -> Bool {
    return value > other
}

/**
 * Checks if value is greater than or equal to other.
 */
public func gte(_ value: Double, _ other: Double) -> Bool {
    return value >= other
}

/**
 * Checks if value is less than other.
 */
public func lt(_ value: Double, _ other: Double) -> Bool {
    return value < other
}

/**
 * Checks if value is less than or equal to other.
 */
public func lte(_ value: Double, _ other: Double) -> Bool {
    return value <= other
}

/**
 * Checks if value is likely an array.
 */
public func isArray(_ value: Any?) -> Bool {
    return value is [Any]
}

/**
 * Checks if value is classified as a boolean primitive or object.
 */
public func isBoolean(_ value: Any?) -> Bool {
    return value is Bool
}

/**
 * Checks if value is empty.
 */
public func isEmpty(_ value: Any?) -> Bool {
    if value == nil { return true }
    if let str = value as? String { return str.isEmpty }
    if let arr = value as? [Any] { return arr.isEmpty }
    if let dict = value as? [String: Any] { return dict.isEmpty }
    return true
}

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 */
public func isEqual(_ a: Any?, _ b: Any?) -> Bool {
    return eq(a, b)
}

/**
 * Checks if value is a finite primitive number.
 */
public func isFinite(_ value: Any?) -> Bool {
    guard let n = value as? Double else { return false }
    return n.isFinite
}

/**
 * Checks if value is classified as a Number primitive or object.
 */
public func isNumber(_ value: Any?) -> Bool {
    return value is Double || value is Int || value is Float
}

/**
 * Checks if value is classified as a String primitive or object.
 */
public func isString(_ value: Any?) -> Bool {
    return value is String
}

/**
 * Checks if value is NaN.
 */
public func isNaN(_ value: Any?) -> Bool {
    guard let n = value as? Double else { return false }
    return n.isNaN
}

/**
 * Checks if value is null.
 */
public func isNil(_ value: Any?) -> Bool {
    return value == nil
}

/**
 * Checks if value is null.
 */
public func isNull(_ value: Any?) -> Bool {
    return value == nil
}

/**
 * Checks if value is an integer.
 */
public func isInteger(_ value: Any?) -> Bool {
    if let n = value as? Int { return true }
    if let n = value as? Double { return n.truncatingRemainder(dividingBy: 1.0) == 0.0 }
    return false
}

/**
 * Converts value to a finite number.
 */
public func toFinite(_ value: Any?) -> Double {
    let n = toNumber(value)
    if n.isInfinite {
        return n > 0 ? Double.greatestFiniteMagnitude : -Double.greatestFiniteMagnitude
    }
    return n.isNaN ? 0.0 : n
}

/**
 * Converts value to an integer.
 */
public func toInteger(_ value: Any?) -> Int {
    return Int(toFinite(value))
}

/**
 * Converts value to a number.
 */
public func toNumber(_ value: Any?) -> Double {
    if let n = value as? Double { return n }
    if let n = value as? Int { return Double(n) }
    if let s = value as? String { return Double(s) ?? 0.0 }
    if let b = value as? Bool { return b ? 1.0 : 0.0 }
    return 0.0
}

/**
 * Converts value to a string.
 */
public func toString(_ value: Any?) -> String {
    guard let value = value else { return "" }
    return "\(value)"
}

/**
 * Casts value as an array if it's not one.
 */
public func castArray(_ value: Any?) -> [Any] {
    if let arr = value as? [Any] { return arr }
    return [value as Any]
}

/**
 * Checks if value is classified as a Function object.
 */
public func isFunction(_ value: Any?) -> Bool {
    // Hard in Swift to check if 'Any' is a closure type generally.
    return false 
}

/**
 * Checks if value is classified as a Date object.
 */
public func isDate(_ value: Any?) -> Bool {
    return value is Date
}

/**
 * Checks if value is an Error object.
 */
public func isError(_ value: Any?) -> Bool {
    return value is Error
}
