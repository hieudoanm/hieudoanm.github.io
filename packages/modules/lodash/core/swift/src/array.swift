import Foundation

/**
 * Creates an array of elements split into groups the length of size.
 */
public func chunk<T>(_ array: [T], _ size: Int = 1) -> [[T]] {
    guard size > 0 else { return [] }
    return stride(from: 0, to: array.count, by: size).map {
        Array(array[$0..<min($0 + size, array.count)])
    }
}

/**
 * Creates an array with all falsey values removed.
 */
public func compact<T>(_ array: [T?]) -> [T] {
    return array.compactMap { $0 }.filter { item in
        if let b = item as? Bool { return b }
        if let n = item as? Double { return n != 0.0 && !n.isNaN }
        if let n = item as? Int { return n != 0 }
        if let s = item as? String { return !s.isEmpty }
        return true
    }
}

/**
 * Creates a new array concatenating array with any additional arrays and/or values.
 */
public func concat<T>(_ array: [T], _ values: Any...) -> [Any] {
    var result: [Any] = array
    for value in values {
        if let arr = value as? [Any] {
            result.append(contentsOf: arr)
        } else {
            result.append(value)
        }
    }
    return result
}

/**
 * Creates an array of array values not included in the other given arrays.
 */
public func difference<T: Equatable>(_ array: [T], _ values: [T]...) -> [T] {
    var result = array
    for v in values {
        result.removeAll(where: { v.contains($0) })
    }
    return result
}

/**
 * Creates a slice of array with n elements dropped from the beginning.
 */
public func drop<T>(_ array: [T], _ n: Int = 1) -> [T] {
    return Array(array.dropFirst(max(0, n)))
}

/**
 * Creates a slice of array with n elements dropped from the end.
 */
public func dropRight<T>(_ array: [T], _ n: Int = 1) -> [T] {
    return Array(array.dropLast(max(0, n)))
}

/**
 * Creates a slice of array with elements dropped from the beginning.
 */
public func dropWhile<T>(_ array: [T], _ predicate: (T) -> Bool) -> [T] {
    var result = array
    while let first = result.first, predicate(first) {
        result.removeFirst()
    }
    return result
}

/**
 * Creates a slice of array with elements dropped from the end.
 */
public func dropRightWhile<T>(_ array: [T], _ predicate: (T) -> Bool) -> [T] {
    var result = array
    while let last = result.last, predicate(last) {
        result.removeLast()
    }
    return result
}

/**
 * Fills elements of array with value from start up to, but not including, end.
 */
public func fill<T>(_ array: inout [T], _ value: T, _ start: Int = 0, _ end: Int? = nil) -> [T] {
    let actualEnd = end ?? array.count
    for i in max(0, start)..<min(actualEnd, array.count) {
        array[i] = value
    }
    return array
}

/**
 * This method is like _.find except that it returns the index of the first element predicate returns truthy for instead of the element itself.
 */
public func findIndex<T>(_ array: [T], _ predicate: (T) -> Bool) -> Int {
    return array.firstIndex(where: predicate) ?? -1
}

/**
 * This method is like _.findIndex except that it iterates over elements of collection from right to left.
 */
public func findLastIndex<T>(_ array: [T], _ predicate: (T) -> Bool) -> Int {
    return array.lastIndex(where: predicate) ?? -1
}

/**
 * Flattens array a single level deep.
 */
public func flatten(_ array: [Any]) -> [Any] {
    var result = [Any]()
    for item in array {
        if let arr = item as? [Any] {
            result.append(contentsOf: arr)
        } else {
            result.append(item)
        }
    }
    return result
}

/**
 * Recursively flattens array.
 */
public func flattenDeep(_ array: [Any]) -> [Any] {
    var result = [Any]()
    for item in array {
        if let arr = item as? [Any] {
            result.append(contentsOf: flattenDeep(arr))
        } else {
            result.append(item)
        }
    }
    return result
}

/**
 * Recursively flatten array up to depth times.
 */
public func flattenDepth(_ array: [Any], _ depth: Int = 1) -> [Any] {
    if depth <= 0 { return array }
    var result = [Any]()
    for item in array {
        if let arr = item as? [Any] {
            result.append(contentsOf: flattenDepth(arr, depth - 1))
        } else {
            result.append(item)
        }
    }
    return result
}

/**
 * The inverse of _.toPairs; this method returns an object composed from an array of key-value pairs.
 */
public func fromPairs<K: Hashable, V>(_ pairs: [(K, V)]) -> [K: V] {
    var result = [K: V]()
    for (k, v) in pairs {
        result[k] = v
    }
    return result
}

/**
 * Gets the first element of array.
 */
public func head<T>(_ array: [T]) -> T? {
    return array.first
}

/**
 * Gets the index at which the first occurrence of value is found in array.
 */
public func indexOf<T: Equatable>(_ array: [T], _ value: T, _ fromIndex: Int = 0) -> Int {
    guard fromIndex < array.count else { return -1 }
    let start = max(0, fromIndex)
    if let index = array[start...].firstIndex(of: value) {
        return index
    }
    return -1
}

/**
 * Gets all but the last element of array.
 */
public func initial<T>(_ array: [T]) -> [T] {
    return Array(array.dropLast())
}

/**
 * Creates an array of unique values that are included in all given arrays.
 */
public func intersection<T: Equatable>(_ arrays: [T]...) -> [T] {
    guard let first = arrays.first else { return [] }
    var result = first
    for array in arrays.dropFirst() {
        result = result.filter { array.contains($0) }
    }
    return Array(Set(result)) // simplified unique
}

/**
 * Joins elements of array into a string separated by separator.
 */
public func join<T>(_ array: [T], _ separator: String = ",") -> String {
    return array.map { "\($0)" }.joined(separator: separator)
}

/**
 * Gets the last element of array.
 */
public func last<T>(_ array: [T]) -> T? {
    return array.last
}

/**
 * This method is like _.indexOf except that it iterates over elements of array from right to left.
 */
public func lastIndexOf<T: Equatable>(_ array: [T], _ value: T, _ fromIndex: Int? = nil) -> Int {
    let start = fromIndex ?? (array.count - 1)
    guard !array.isEmpty && start >= 0 else { return -1 }
    let actualStart = min(start, array.count - 1)
    if let index = array[0...actualStart].lastIndex(of: value) {
        return index
    }
    return -1
}

/**
 * Gets the element at index n of array.
 */
public func nth<T>(_ array: [T], _ n: Int = 0) -> T? {
    let index = n >= 0 ? n : array.count + n
    return (index >= 0 && index < array.count) ? array[index] : nil
}

/**
 * Removes all given values from array.
 */
public func pull<T: Equatable>(_ array: inout [T], _ values: T...) -> [T] {
    array.removeAll(where: { values.contains($0) })
    return array
}

/**
 * This method is like _.pull except that it accepts an array of values to remove.
 */
public func pullAll<T: Equatable>(_ array: inout [T], _ values: [T]) -> [T] {
    array.removeAll(where: { values.contains($0) })
    return array
}

/**
 * Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.
 */
public func reverse<T>(_ array: inout [T]) -> [T] {
    array.reverse()
    return array
}

/**
 * Creates a slice of array from start up to, but not including, end.
 */
public func slice<T>(_ array: [T], _ start: Int = 0, _ end: Int? = nil) -> [T] {
    let actualEnd = end ?? array.count
    let s = max(0, min(start, array.count))
    let e = max(0, min(actualEnd, array.count))
    if s >= e { return [] }
    return Array(array[s..<e])
}

/**
 * Gets all but the first element of array.
 */
public func tail<T>(_ array: [T]) -> [T] {
    return Array(array.dropFirst())
}

/**
 * Creates a slice of array with n elements taken from the beginning.
 */
public func take<T>(_ array: [T], _ n: Int = 1) -> [T] {
    return Array(array.prefix(max(0, n)))
}

/**
 * Creates a slice of array with n elements taken from the end.
 */
public func takeRight<T>(_ array: [T], _ n: Int = 1) -> [T] {
    return Array(array.suffix(max(0, n)))
}

/**
 * Creates an array of unique values, in order, from all given arrays.
 */
public func union<T: Equatable>(_ arrays: [T]...) -> [T] {
    var result = [T]()
    for array in arrays {
        for item in array {
            if !result.contains(item) {
                result.append(item)
            }
        }
    }
    return result
}

/**
 * Creates a duplicate-free version of an array.
 */
public func uniq<T: Equatable>(_ array: [T]) -> [T] {
    var result = [T]()
    for item in array {
        if !result.contains(item) {
            result.append(item)
        }
    }
    return result
}

/**
 * This method is like _.uniq except that it accepts iteratee which is invoked for each element in array to generate the criterion by which uniqueness is computed.
 */
public func uniqBy<T, K: Equatable>(_ array: [T], _ iteratee: (T) -> K) -> [T] {
    var result = [T]()
    var seen = [K]()
    for item in array {
        let key = iteratee(item)
        if !seen.contains(key) {
            seen.append(key)
            result.append(item)
        }
    }
    return result
}

/**
 * The inverse of _.zip.
 */
public func unzip<T>(_ array: [[T?]]) -> [[T?]] {
    guard let first = array.first else { return [] }
    let maxLen = array.map { $0.count }.max() ?? 0
    return (0..<maxLen).map { i in
        array.map { i < $0.count ? $0[i] : nil }
    }
}

/**
 * Creates an array of array values not included in the other given arrays.
 */
public func without<T: Equatable>(_ array: [T], _ values: T...) -> [T] {
    return array.filter { !values.contains($0) }
}

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays.
 */
public func xor<T: Equatable>(_ arrays: [T]...) -> [T] {
    var counts = [T: Int]()
    // Custom logic since T is not Hashable, using a list of pairs for MVP if needed
    // But let's assume T can be Equatable and we just filter
    var allItems = [T]()
    for array in arrays {
        for item in uniq(array) {
            allItems.append(item)
        }
    }
    
    var result = [T]()
    for item in uniq(allItems) {
        let count = allItems.filter { $0 == item }.count
        if count % 2 != 0 {
            result.append(item)
        }
    }
    return result
}

/**
 * Creates an array of grouped elements.
 */
public func zip<T>(_ arrays: [T]...) -> [[T?]] {
    let maxLen = arrays.map { $0.count }.max() ?? 0
    return (0..<maxLen).map { i in
        arrays.map { i < $0.count ? $0[i] : nil }
    }
}

/**
 * This method is like _.fromPairs except that it accepts two arrays.
 */
public func zipObject<K: Hashable, V>(_ props: [K], _ values: [V]) -> [K: V?] {
    var result = [K: V?]()
    for (i, key) in props.enumerated() {
        result[key] = i < values.count ? values[i] : nil
    }
    return result
}
