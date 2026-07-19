package lodash

/**
 * Attempts to invoke func, returning either the result or the error object.
 */
fun <R> attempt(func: () -> R): Any? {
    return try {
        func()
    } catch (e: Exception) {
        e
    }
}

/**
 * Creates a function that returns value.
 */
fun <T> constant(value: T): () -> T = { value }

/**
 * Checks value to determine whether a default value should be returned in its place.
 * The defaultValue is returned if value is NaN, null, or undefined.
 */
fun <T> defaultTo(value: T?, defaultValue: T): T = value ?: defaultValue

/**
 * This method returns the first argument it receives.
 */
fun <T> identity(value: T): T = value

/**
 * A no-operation function.
 */
fun noop() {}

/**
 * Creates a function that returns the nth argument.
 * If n is negative, the nth argument from the end is returned.
 */
fun <T> nthArg(n: Int): (List<T>) -> T? {
    return { args ->
        val index = if (n >= 0) n else args.size + n
        if (index in args.indices) args[index] else null
    }
}

/**
 * Creates an array of numbers (positive and/or negative) progressing from start up to, but not including, end.
 */
fun range(start: Int = 0, end: Int, step: Int = if (start < end) 1 else -1): List<Int> {
    if (step == 0) return emptyList()
    val result = mutableListOf<Int>()
    var current = start
    if (step > 0) {
        while (current < end) {
            result.add(current)
            current += step
        }
    } else {
        while (current > end) {
            result.add(current)
            current += step
        }
    }
    return result
}

/**
 * Overload for range with only end specified.
 */
fun range(end: Int): List<Int> = range(0, end)

/**
 * This method is like _.range except that it populates values in descending order.
 */
fun rangeRight(start: Int = 0, end: Int, step: Int = if (start < end) 1 else -1): List<Int> {
    return range(start, end, step).reversed()
}

/**
 * Overload for rangeRight with only end specified.
 */
fun rangeRight(end: Int): List<Int> = rangeRight(0, end)

/**
 * Returns a new empty array.
 */
fun stubArray(): List<Any> = emptyList()

/**
 * Returns false.
 */
fun stubFalse(): Boolean = false

/**
 * Returns a new empty object.
 */
fun stubObject(): Map<String, Any> = emptyMap()

/**
 * Returns an empty string.
 */
fun stubString(): String = ""

/**
 * Returns true.
 */
fun stubTrue(): Boolean = true

/**
 * Invokes the iteratee n times, returning an array of the results of each invocation.
 */
fun <R> times(n: Int, iteratee: (Int) -> R): List<R> {
    return (0 until n).map(iteratee)
}

/**
 * Generates a unique ID. If prefix is given, the ID is appended to it.
 */
private var idCounter = 0
fun uniqueId(prefix: String = ""): String {
    return "$prefix${++idCounter}"
}
