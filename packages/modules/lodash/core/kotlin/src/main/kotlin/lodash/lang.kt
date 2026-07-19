package lodash

/**
 * Performs a comparison between two values to determine if they are equivalent.
 */
fun eq(value: Any?, other: Any?): Boolean = value == other

/**
 * Checks if value is greater than other.
 */
fun gt(value: Double, other: Double): Boolean = value > other

/**
 * Checks if value is greater than or equal to other.
 */
fun gte(value: Double, other: Double): Boolean = value >= other

/**
 * Checks if value is less than other.
 */
fun lt(value: Double, other: Double): Boolean = value < other

/**
 * Checks if value is less than or equal to other.
 */
fun lte(value: Double, other: Double): Boolean = value <= other

/**
 * Checks if value is likely an array.
 */
fun isArray(value: Any?): Boolean = value is Iterable<*> || value is Array<*> || value is IntArray || value is LongArray || value is DoubleArray

/**
 * Checks if value is classified as a boolean primitive or object.
 */
fun isBoolean(value: Any?): Boolean = value is Boolean

/**
 * Checks if value is empty. A value is considered empty if it's an enumerable collection with no elements.
 */
fun isEmpty(value: Any?): Boolean {
    return when (value) {
        null -> true
        is String -> value.isEmpty()
        is Iterable<*> -> !value.iterator().hasNext()
        is Array<*> -> value.isEmpty()
        is Map<*, *> -> value.isEmpty()
        is IntArray -> value.isEmpty()
        is LongArray -> value.isEmpty()
        is DoubleArray -> value.isEmpty()
        else -> true
    }
}

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 */
fun isEqual(a: Any?, b: Any?): Boolean = a == b

/**
 * Checks if value is a finite primitive number.
 */
fun isFinite(value: Any?): Boolean = value is Number && java.lang.Double.isFinite(value.toDouble())

/**
 * Checks if value is classified as a Number primitive or object.
 */
fun isNumber(value: Any?): Boolean = value is Number

/**
 * Checks if value is classified as a String primitive or object.
 */
fun isString(value: Any?): Boolean = value is String

/**
 * Checks if value is NaN.
 */
fun isNaN(value: Any?): Boolean = value is Double && value.isNaN()

/**
 * Checks if value is null.
 */
fun isNil(value: Any?): Boolean = value == null

/**
 * Checks if value is null.
 */
fun isNull(value: Any?): Boolean = value == null

/**
 * Checks if value is an integer.
 */
fun isInteger(value: Any?): Boolean {
    return value is Number && value.toDouble() % 1.0 == 0.0
}

/**
 * Converts value to a finite number.
 */
fun toFinite(value: Any?): Double {
    val n = toNumber(value)
    if (n.isInfinite()) return if (n > 0) Double.MAX_VALUE else -Double.MAX_VALUE
    if (n.isNaN()) return 0.0
    return n
}

/**
 * Converts value to an integer.
 */
fun toInteger(value: Any?): Int = toFinite(value).toInt()

/**
 * Converts value to a number.
 */
fun toNumber(value: Any?): Double {
    return when (value) {
        is Number -> value.toDouble()
        is String -> value.toDoubleOrNull() ?: 0.0
        is Boolean -> if (value) 1.0 else 0.0
        else -> 0.0
    }
}

/**
 * Converts value to a string. An empty string is returned for null and undefined values.
 */
fun toString(value: Any?): String = value?.toString() ?: ""

/**
 * Casts value as an array if it's not one.
 */
fun castArray(value: Any?): List<Any?> {
    return if (isArray(value)) {
        when (value) {
            is Iterable<*> -> value.toList()
            is Array<*> -> value.toList()
            else -> listOf(value)
        }
    } else {
        listOf(value)
    }
}

/**
 * Checks if value is classified as a Function object.
 */
fun isFunction(value: Any?): Boolean = value is Function<*>

/**
 * Checks if value is classified as a Date object.
 */
fun isDate(value: Any?): Boolean = value is java.util.Date

/**
 * Checks if value is likely a DOM element.
 */
fun isElement(value: Any?): Boolean = false // Not applicable in standard Kotlin

/**
 * Checks if value is an Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, or URIError object.
 */
fun isError(value: Any?): Boolean = value is Throwable

/**
 * Checks if value is classified as a Map object.
 */
fun isMap(value: Any?): Boolean = value is Map<*, *>

/**
 * Checks if value is classified as a Set object.
 */
fun isSet(value: Any?): Boolean = value is Set<*>

/**
 * Checks if value is classified as a RegExp object.
 */
fun isRegExp(value: Any?): Boolean = value is Regex
