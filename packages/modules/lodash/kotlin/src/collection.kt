package lodash

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 */
fun <T, K> countBy(collection: Iterable<T>, iteratee: (T) -> K): Map<K, Int> {
    return collection.groupingBy(iteratee).eachCount()
}

/**
 * Checks if predicate returns truthy for all elements of collection.
 */
fun <T> every(collection: Iterable<T>, predicate: (T) -> Boolean): Boolean = collection.all(predicate)

/**
 * Iterates over elements of collection, returning an array of all elements predicate returns truthy for.
 */
fun <T> filter(collection: Iterable<T>, predicate: (T) -> Boolean): List<T> = collection.filter(predicate)

/**
 * Iterates over elements of collection, returning the first element predicate returns truthy for.
 */
fun <T> find(collection: Iterable<T>, predicate: (T) -> Boolean): T? = collection.find(predicate)

/**
 * This method is like _.find except that it iterates over elements of collection from right to left.
 */
fun <T> findLast(collection: List<T>, predicate: (T) -> Boolean): T? = collection.findLast(predicate)

/**
 * Creates a flattened array of values by running each element in collection thru iteratee and flattening the mapped results.
 */
fun <T, R> flatMap(collection: Iterable<T>, iteratee: (T) -> Iterable<R>): List<R> = collection.flatMap(iteratee)

/**
 * Iterates over elements of collection and invokes iteratee for each element.
 */
fun <T> forEach(collection: Iterable<T>, iteratee: (T) -> Unit) = collection.forEach(iteratee)

/**
 * This method is like _.forEach except that it iterates over elements of collection from right to left.
 */
fun <T> forEachRight(collection: List<T>, iteratee: (T) -> Unit) {
    for (i in collection.indices.reversed()) {
        iteratee(collection[i])
    }
}

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 */
fun <T, K> groupBy(collection: Iterable<T>, iteratee: (T) -> K): Map<K, List<T>> = collection.groupBy(iteratee)

/**
 * Checks if value is in collection.
 */
fun <T> includes(collection: Iterable<T>, value: T): Boolean = collection.contains(value)

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 */
fun <T, K> keyBy(collection: Iterable<T>, iteratee: (T) -> K): Map<K, T> = collection.associateBy(iteratee)

/**
 * Creates an array of values by running each element in collection thru iteratee.
 */
fun <T, R> map(collection: Iterable<T>, iteratee: (T) -> R): List<R> = collection.map(iteratee)

/**
 * Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsey for.
 */
fun <T> partition(collection: Iterable<T>, predicate: (T) -> Boolean): Pair<List<T>, List<T>> = collection.partition(predicate)

/**
 * Reduces collection to a value which is the accumulated result of running each element in collection thru iteratee, where each successive invocation is supplied the return value of the previous.
 */
fun <T, R> reduce(collection: Iterable<T>, iteratee: (R, T) -> R, accumulator: R): R = collection.fold(accumulator, iteratee)

/**
 * This method is like _.reduce except that it iterates over elements of collection from right to left.
 */
fun <T, R> reduceRight(collection: List<T>, iteratee: (R, T) -> R, accumulator: R): R {
    var result = accumulator
    for (i in collection.indices.reversed()) {
        result = iteratee(result, collection[i])
    }
    return result
}

/**
 * The opposite of _.filter; this method returns the elements of collection that predicate does not return truthy for.
 */
fun <T> reject(collection: Iterable<T>, predicate: (T) -> Boolean): List<T> = collection.filterNot(predicate)

/**
 * Gets a random element from collection.
 */
fun <T> sample(collection: Iterable<T>): T? = collection.toList().randomOrNull()

/**
 * Gets n random elements at unique keys from collection up to the size of collection.
 */
fun <T> sampleSize(collection: Iterable<T>, n: Int): List<T> = collection.toList().shuffled().take(n)

/**
 * Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.
 */
fun <T> shuffle(collection: Iterable<T>): List<T> = collection.toList().shuffled()

/**
 * Gets the size of collection.
 */
fun <T> size(collection: Iterable<T>): Int = collection.toList().size

/**
 * Checks if predicate returns truthy for any element of collection.
 */
fun <T> some(collection: Iterable<T>, predicate: (T) -> Boolean): Boolean = collection.any(predicate)

/**
 * Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru each iteratee.
 */
fun <T, R : Comparable<R>> sortBy(collection: Iterable<T>, iteratee: (T) -> R): List<T> = collection.sortedBy(iteratee)
