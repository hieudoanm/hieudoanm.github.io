package lodash

import kotlin.math.*

/**
 * Adds two numbers.
 */
fun add(augend: Double, addend: Double): Double = augend + addend
fun add(augend: Int, addend: Int): Int = augend + addend

/**
 * Computes number rounded up to precision.
 */
fun ceil(number: Double, precision: Int = 0): Double {
    val factor = 10.0.pow(precision)
    return ceil(number * factor) / factor
}

/**
 * Divide two numbers.
 */
fun divide(dividend: Double, divisor: Double): Double = dividend / divisor

/**
 * Computes number rounded down to precision.
 */
fun floor(number: Double, precision: Int = 0): Double {
    val factor = 10.0.pow(precision)
    return floor(number * factor) / factor
}

/**
 * Computes the maximum value of array. If array is empty or falsey, null is returned.
 */
fun <T : Comparable<T>> max(array: Iterable<T>?): T? = array?.maxOrNull()

/**
 * This method is like _.max except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked.
 */
fun <T, R : Comparable<R>> maxBy(array: Iterable<T>?, iteratee: (T) -> R): T? {
    return array?.maxByOrNull(iteratee)
}

/**
 * Computes the mean of the values in array.
 */
fun mean(array: Iterable<Number>?): Double {
    if (array == null) return Double.NaN
    val list = array.toList()
    if (list.isEmpty()) return Double.NaN
    return list.sumOf { it.toDouble() } / list.size
}

/**
 * This method is like _.mean except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is averaged.
 */
fun <T> meanBy(array: Iterable<T>?, iteratee: (T) -> Number): Double {
    if (array == null) return Double.NaN
    val list = array.toList()
    if (list.isEmpty()) return Double.NaN
    return list.sumOf { iteratee(it).toDouble() } / list.size
}

/**
 * Computes the minimum value of array. If array is empty or falsey, null is returned.
 */
fun <T : Comparable<T>> min(array: Iterable<T>?): T? = array?.minOrNull()

/**
 * This method is like _.min except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked.
 */
fun <T, R : Comparable<R>> minBy(array: Iterable<T>?, iteratee: (T) -> R): T? {
    return array?.minByOrNull(iteratee)
}

/**
 * Multiply two numbers.
 */
fun multiply(multiplier: Double, multiplicand: Double): Double = multiplier * multiplicand
fun multiply(multiplier: Int, multiplicand: Int): Int = multiplier * multiplicand

/**
 * Computes number rounded to precision.
 */
fun round(number: Double, precision: Int = 0): Double {
    val factor = 10.0.pow(precision)
    return round(number * factor) / factor
}

/**
 * Subtract two numbers.
 */
fun subtract(minuend: Double, subtrahend: Double): Double = minuend - subtrahend
fun subtract(minuend: Int, subtrahend: Int): Int = minuend - subtrahend

/**
 * Computes the sum of the values in array.
 */
fun sum(array: Iterable<Number>?): Double = array?.sumOf { it.toDouble() } ?: 0.0

/**
 * This method is like _.sum except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is summed.
 */
fun <T> sumBy(array: Iterable<T>?, iteratee: (T) -> Number): Double = array?.sumOf { iteratee(it).toDouble() } ?: 0.0
