package lodash

import kotlin.math.floor
import kotlin.random.Random

/**
 * Clamps number within the inclusive lower and upper bounds.
 *
 * @param number The number to clamp.
 * @param lower The lower bound.
 * @param upper The upper bound.
 * @return Returns the clamped number.
 */
fun clamp(number: Double, lower: Double, upper: Double): Double = number.coerceIn(lower, upper)
fun clamp(number: Int, lower: Int, upper: Int): Int = number.coerceIn(lower, upper)
fun clamp(number: Long, lower: Long, upper: Long): Long = number.coerceIn(lower, upper)

/**
 * Checks if number is between start and up to, but not including, end.
 * If end is not specified, it's set to start with start then set to 0.
 * If start is greater than end the params are swapped to support negative ranges.
 *
 * @param number The number to check.
 * @param start The start of the range.
 * @param end The end of the range.
 * @return Returns true if number is in range, else false.
 */
fun inRange(number: Double, start: Double = 0.0, end: Double): Boolean {
    var s = start
    var e = end
    if (s > e) {
        val temp = s
        s = e
        e = temp
    }
    return number >= s && number < e
}

fun inRange(number: Int, start: Int = 0, end: Int): Boolean = inRange(number.toDouble(), start.toDouble(), end.toDouble())

/**
 * Produces a random number between the inclusive lower and upper bounds.
 * If only one argument is provided a number between 0 and the given number is returned.
 * If floating is true, or either lower or upper are floats, a floating-point number is returned instead of an integer.
 *
 * @param lower The lower bound.
 * @param upper The upper bound.
 * @param floating Specify returning a floating-point number.
 * @return Returns the random number.
 */
fun random(lower: Double = 0.0, upper: Double = 1.0, floating: Boolean = false): Double {
    var l = lower
    var u = upper
    if (l > u) {
        val temp = l
        l = u
        u = temp
    }
    val r = Random.nextDouble(l, u)
    return if (floating || lower % 1.0 != 0.0 || upper % 1.0 != 0.0) r else floor(r)
}

fun random(upper: Double): Double = random(0.0, upper)
fun random(upper: Int): Int = Random.nextInt(0, upper + 1)
fun random(lower: Int, upper: Int): Int = Random.nextInt(lower, upper + 1)
