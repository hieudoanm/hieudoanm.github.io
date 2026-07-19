import Foundation

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 */
public func countBy<T, K: Hashable>(_ collection: [T], _ iteratee: (T) -> K) -> [K: Int] {
    var result = [K: Int]()
    for item in collection {
        let key = iteratee(item)
        result[key, default: 0] += 1
    }
    return result
}

/**
 * Checks if predicate returns truthy for all elements of collection.
 */
public func every<T>(_ collection: [T], _ predicate: (T) -> Bool) -> Bool {
    return collection.allSatisfy(predicate)
}

/**
 * Iterates over elements of collection, returning an array of all elements predicate returns truthy for.
 */
public func filter<T>(_ collection: [T], _ predicate: (T) -> Bool) -> [T] {
    return collection.filter(predicate)
}

/**
 * Iterates over elements of collection, returning the first element predicate returns truthy for.
 */
public func find<T>(_ collection: [T], _ predicate: (T) -> Bool) -> T? {
    return collection.first(where: predicate)
}

/**
 * This method is like _.find except that it iterates over elements of collection from right to left.
 */
public func findLast<T>(_ collection: [T], _ predicate: (T) -> Bool) -> T? {
    return collection.last(where: predicate)
}

/**
 * Creates a flattened array of values by running each element in collection thru iteratee and flattening the mapped results.
 */
public func flatMap<T, R>(_ collection: [T], _ iteratee: (T) -> [R]) -> [R] {
    return collection.flatMap(iteratee)
}

/**
 * Iterates over elements of collection and invokes iteratee for each element.
 */
public func forEach<T>(_ collection: [T], _ iteratee: (T) -> Void) {
    collection.forEach(iteratee)
}

/**
 * This method is like _.forEach except that it iterates over elements of collection from right to left.
 */
public func forEachRight<T>(_ collection: [T], _ iteratee: (T) -> Void) {
    collection.reversed().forEach(iteratee)
}

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 */
public func groupBy<T, K: Hashable>(_ collection: [T], _ iteratee: (T) -> K) -> [K: [T]] {
    return Dictionary(grouping: collection, by: iteratee)
}

/**
 * Checks if value is in collection.
 */
public func includes<T: Equatable>(_ collection: [T], _ value: T) -> Bool {
    return collection.contains(value)
}

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 */
public func keyBy<T, K: Hashable>(_ collection: [T], _ iteratee: (T) -> K) -> [K: T] {
    var result = [K: T]()
    for item in collection {
        result[iteratee(item)] = item
    }
    return result
}

/**
 * Creates an array of values by running each element in collection thru iteratee.
 */
public func map<T, R>(_ collection: [T], _ iteratee: (T) -> R) -> [R] {
    return collection.map(iteratee)
}

/**
 * Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsey for.
 */
public func partition<T>(_ collection: [T], _ predicate: (T) -> Bool) -> ([T], [T]) {
    var first = [T]()
    var second = [T]()
    for item in collection {
        if predicate(item) {
            first.append(item)
        } else {
            second.append(item)
        }
    }
    return (first, second)
}

/**
 * Reduces collection to a value which is the accumulated result of running each element in collection thru iteratee, where each successive invocation is supplied the return value of the previous.
 */
public func reduce<T, R>(_ collection: [T], _ iteratee: (R, T) -> R, _ accumulator: R) -> R {
    return collection.reduce(accumulator, iteratee)
}

/**
 * This method is like _.reduce except that it iterates over elements of collection from right to left.
 */
public func reduceRight<T, R>(_ collection: [T], _ iteratee: (R, T) -> R, _ accumulator: R) -> R {
    return collection.reversed().reduce(accumulator, iteratee)
}

/**
 * The opposite of _.filter; this method returns the elements of collection that predicate does not return truthy for.
 */
public func reject<T>(_ collection: [T], _ predicate: (T) -> Bool) -> [T] {
    return collection.filter { !predicate($0) }
}

/**
 * Gets a random element from collection.
 */
public func sample<T>(_ collection: [T]) -> T? {
    return collection.randomElement()
}

/**
 * Gets n random elements at unique keys from collection up to the size of collection.
 */
public func sampleSize<T>(_ collection: [T], _ n: Int) -> [T] {
    return Array(collection.shuffled().take(n))
}

private extension Array {
    func take(_ n: Int) -> ArraySlice<Element> {
        return self.prefix(max(0, n))
    }
}

/**
 * Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.
 */
public func shuffle<T>(_ collection: [T]) -> [T] {
    return collection.shuffled()
}

/**
 * Gets the size of collection.
 */
public func size<T>(_ collection: [T]) -> Int {
    return collection.count
}

/**
 * Checks if predicate returns truthy for any element of collection.
 */
public func some<T>(_ collection: [T], _ predicate: (T) -> Bool) -> Bool {
    return collection.contains(where: predicate)
}

/**
 * Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru each iteratee.
 */
public func sortBy<T, R: Comparable>(_ collection: [T], _ iteratee: (T) -> R) -> [T] {
    return collection.sorted(by: { iteratee($0) < iteratee($1) })
}
