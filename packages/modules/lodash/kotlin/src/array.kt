package lodash

/**
 * Creates an array of elements split into groups the length of size.
 * If collection can't be split evenly, the final chunk will be the remaining elements.
 */
fun <T> chunk(array: List<T>, size: Int = 1): List<List<T>> {
    if (size <= 0) return emptyList()
    return array.chunked(size)
}

/**
 * Creates an array with all falsey values removed.
 * Falsey values in JavaScript are false, null, 0, "", undefined, and NaN.
 */
fun <T> compact(array: List<T?>): List<T> {
    return array.filterNotNull().filter {
        when (it) {
            is Boolean -> it
            is Number -> it.toDouble() != 0.0 && !it.toDouble().isNaN()
            is String -> it.isNotEmpty()
            else -> true
        }
    }
}

/**
 * Creates a new array concatenating array with any additional arrays and/or values.
 */
fun <T> concat(array: List<T>, vararg values: Any?): List<Any?> {
    val result = array.toMutableList<Any?>()
    for (value in values) {
        if (value is Iterable<*>) {
            result.addAll(value)
        } else if (value is Array<*>) {
            result.addAll(value)
        } else {
            result.add(value)
        }
    }
    return result
}

/**
 * Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons.
 */
fun <T> difference(array: List<T>, vararg values: List<T>): List<T> {
    val result = array.toMutableList()
    for (v in values) {
        result.removeAll(v)
    }
    return result
}

/**
 * Creates a slice of array with n elements dropped from the beginning.
 */
fun <T> drop(array: List<T>, n: Int = 1): List<T> = array.drop(n.coerceAtLeast(0))

/**
 * Creates a slice of array with n elements dropped from the end.
 */
fun <T> dropRight(array: List<T>, n: Int = 1): List<T> = array.dropLast(n.coerceAtLeast(0))

/**
 * Creates a slice of array with elements dropped from the beginning.
 * Elements are dropped until predicate returns falsey.
 */
fun <T> dropWhile(array: List<T>, predicate: (T) -> Boolean): List<T> = array.dropWhile(predicate)

/**
 * Creates a slice of array with elements dropped from the end.
 * Elements are dropped until predicate returns falsey.
 */
fun <T> dropRightWhile(array: List<T>, predicate: (T) -> Boolean): List<T> = array.dropLastWhile(predicate)

/**
 * Fills elements of array with value from start up to, but not including, end.
 */
fun <T> fill(array: MutableList<T>, value: T, start: Int = 0, end: Int = array.size): MutableList<T> {
    for (i in start.coerceAtLeast(0) until end.coerceAtMost(array.size)) {
        array[i] = value
    }
    return array
}

/**
 * This method is like _.find except that it returns the index of the first element predicate returns truthy for instead of the element itself.
 */
fun <T> findIndex(array: List<T>, predicate: (T) -> Boolean): Int = array.indexOfFirst(predicate)

/**
 * This method is like _.findIndex except that it iterates over elements of collection from right to left.
 */
fun <T> findLastIndex(array: List<T>, predicate: (T) -> Boolean): Int = array.indexOfLast(predicate)

/**
 * Flattens array a single level deep.
 */
fun flatten(array: List<Any?>): List<Any?> {
    val result = mutableListOf<Any?>()
    for (item in array) {
        if (item is Iterable<*>) {
            result.addAll(item)
        } else {
            result.add(item)
        }
    }
    return result
}

/**
 * Recursively flattens array.
 */
fun flattenDeep(array: List<Any?>): List<Any?> {
    val result = mutableListOf<Any?>()
    for (item in array) {
        if (item is Iterable<*>) {
            result.addAll(flattenDeep(item.toList()))
        } else {
            result.add(item)
        }
    }
    return result
}

/**
 * Recursively flatten array up to depth times.
 */
fun flattenDepth(array: List<Any?>, depth: Int = 1): List<Any?> {
    if (depth <= 0) return array
    val result = mutableListOf<Any?>()
    for (item in array) {
        if (item is Iterable<*>) {
            result.addAll(flattenDepth(item.toList(), depth - 1))
        } else {
            result.add(item)
        }
    }
    return result
}

/**
 * The inverse of _.toPairs; this method returns an object composed from an array of key-value pairs.
 */
fun <K, V> fromPairs(pairs: List<Pair<K, V>>): Map<K, V> = pairs.toMap()

/**
 * Gets the first element of array.
 */
fun <T> head(array: List<T>): T? = array.firstOrNull()

/**
 * Gets the index at which the first occurrence of value is found in array.
 */
fun <T> indexOf(array: List<T>, value: T, fromIndex: Int = 0): Int {
    if (fromIndex >= array.size) return -1
    val subIndex = array.subList(fromIndex.coerceAtLeast(0), array.size).indexOf(value)
    return if (subIndex == -1) -1 else subIndex + fromIndex
}

/**
 * Gets all but the last element of array.
 */
fun <T> initial(array: List<T>): List<T> = if (array.isEmpty()) emptyList() else array.dropLast(1)

/**
 * Creates an array of unique values that are included in all given arrays.
 */
fun <T> intersection(vararg arrays: List<T>): List<T> {
    if (arrays.isEmpty()) return emptyList()
    return arrays.reduce { acc, list -> acc.intersect(list).toList() }
}

/**
 * Joins elements of array into a string separated by separator.
 */
fun <T> join(array: List<T>, separator: String = ","): String = array.joinToString(separator)

/**
 * Gets the last element of array.
 */
fun <T> last(array: List<T>): T? = array.lastOrNull()

/**
 * This method is like _.indexOf except that it iterates over elements of array from right to left.
 */
fun <T> lastIndexOf(array: List<T>, value: T, fromIndex: Int = array.size - 1): Int {
    if (array.isEmpty()) return -1
    val actualFrom = fromIndex.coerceIn(0, array.size - 1)
    val subIndex = array.subList(0, actualFrom + 1).lastIndexOf(value)
    return subIndex
}

/**
 * Gets the element at index n of array. If n is negative, the nth element from the end is returned.
 */
fun <T> nth(array: List<T>, n: Int = 0): T? {
    val index = if (n >= 0) n else array.size + n
    return if (index in array.indices) array[index] else null
}

/**
 * Removes all given values from array using SameValueZero for equality comparisons.
 */
fun <T> pull(array: MutableList<T>, vararg values: T): MutableList<T> {
    array.removeAll(values.toList())
    return array
}

/**
 * This method is like _.pull except that it accepts an array of values to remove.
 */
fun <T> pullAll(array: MutableList<T>, values: List<T>): MutableList<T> {
    array.removeAll(values)
    return array
}

/**
 * Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.
 */
fun <T> reverse(array: MutableList<T>): MutableList<T> {
    array.reverse()
    return array
}

/**
 * Creates a slice of array from start up to, but not including, end.
 */
fun <T> slice(array: List<T>, start: Int = 0, end: Int = array.size): List<T> {
    return array.subList(start.coerceIn(0, array.size), end.coerceIn(0, array.size))
}

/**
 * Gets all but the first element of array.
 */
fun <T> tail(array: List<T>): List<T> = if (array.isEmpty()) emptyList() else array.drop(1)

/**
 * Creates a slice of array with n elements taken from the beginning.
 */
fun <T> take(array: List<T>, n: Int = 1): List<T> = array.take(n.coerceAtLeast(0))

/**
 * Creates a slice of array with n elements taken from the end.
 */
fun <T> takeRight(array: List<T>, n: Int = 1): List<T> = array.takeLast(n.coerceAtLeast(0))

/**
 * Creates an array of unique values, in order, from all given arrays.
 */
fun <T> union(vararg arrays: List<T>): List<T> {
    return arrays.flatMap { it }.distinct()
}

/**
 * Creates a duplicate-free version of an array.
 */
fun <T> uniq(array: List<T>): List<T> = array.distinct()

/**
 * This method is like _.uniq except that it accepts iteratee which is invoked for each element in array to generate the criterion by which uniqueness is computed.
 */
fun <T, K> uniqBy(array: List<T>, iteratee: (T) -> K): List<T> = array.distinctBy(iteratee)

/**
 * The inverse of _.zip; this method accepts an array of grouped elements and creates an array of separate arrays, replacing the first elements of the grouped elements with those in the first array, the second elements of the grouped elements with those in the second array, and so on.
 */
fun <T> unzip(array: List<List<T?>>): List<List<T?>> {
    if (array.isEmpty()) return emptyList()
    val maxLen = array.maxOf { it.size }
    return (0 until maxLen).map { i ->
        array.map { if (i < it.size) it[i] else null }
    }
}

/**
 * Creates an array of array values not included in the other given arrays.
 */
fun <T> without(array: List<T>, vararg values: T): List<T> {
    return array.filter { it !in values }
}

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays.
 */
fun <T> xor(vararg arrays: List<T>): List<T> {
    val counts = mutableMapOf<T, Int>()
    arrays.forEach { list ->
        list.distinct().forEach { item ->
            counts[item] = counts.getOrDefault(item, 0) + 1
        }
    }
    return counts.filter { it.value % 2 != 0 }.keys.toList()
}

/**
 * Creates an array of grouped elements.
 */
fun <T> zip(vararg arrays: List<T>): List<List<T?>> {
    if (arrays.isEmpty()) return emptyList()
    val maxLen = arrays.maxOf { it.size }
    return (0 until maxLen).map { i ->
        arrays.map { if (i < it.size) it[i] else null }
    }
}

/**
 * This method is like _.fromPairs except that it accepts two arrays, one of property identifiers and one of corresponding values.
 */
fun <K, V> zipObject(props: List<K>, values: List<V>): Map<K, V?> {
    return props.mapIndexed { index, k -> k to values.getOrNull(index) }.toMap()
}
