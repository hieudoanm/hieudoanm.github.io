package lodash

import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit

/**
 * The opposite of _.before; this method creates a function that invokes func once it's called n or more times.
 */
fun after(n: Int, func: () -> Unit): () -> Unit {
    var count = 0
    return {
        count++
        if (count >= n) {
            func()
        }
    }
}

/**
 * Creates a function that invokes func while it's called less than n times.
 * Subsequent calls to the created function return the result of the last func invocation.
 */
fun <R> before(n: Int, func: () -> R): () -> R {
    var count = 0
    var lastResult: R? = null
    return {
        count++
        if (count < n) {
            lastResult = func()
        }
        lastResult!!
    }
}

/**
 * Creates a function that negates the result of the predicate func.
 */
fun <T> negate(predicate: (T) -> Boolean): (T) -> Boolean = { !predicate(it) }

/**
 * Creates a function that is restricted to invoking func once.
 * Repeat calls to the function return the value of the first invocation.
 */
fun <R> once(func: () -> R): () -> R {
    var called = false
    var result: R? = null
    return {
        if (!called) {
            called = true
            result = func()
        }
        result!!
    }
}

/**
 * Creates a memoized function. The cache key is determined by the first argument provided to the memoized function.
 */
fun <T, R> memoize(func: (T) -> R): (T) -> R {
    val cache = mutableMapOf<T, R>()
    return { arg ->
        cache.getOrPut(arg) { func(arg) }
    }
}

/**
 * Creates a function that invokes func with arguments reversed.
 */
fun <A, B, R> flip(func: (A, B) -> R): (B, A) -> R = { b, a -> func(a, b) }

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 */
fun debounce(func: () -> Unit, wait: Long): () -> Unit {
    val scheduler = Executors.newSingleThreadScheduledExecutor()
    var future: java.util.concurrent.ScheduledFuture<*>? = null
    return {
        future?.cancel(false)
        future = scheduler.schedule(func, wait, TimeUnit.MILLISECONDS)
    }
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds.
 */
fun throttle(func: () -> Unit, wait: Long): () -> Unit {
    var lastTime = 0L
    return {
        val currentTime = System.currentTimeMillis()
        if (currentTime - lastTime >= wait) {
            lastTime = currentTime
            func()
        }
    }
}

/**
 * Creates a function that invokes func with the arguments of the created function.
 */
fun <T, R> unary(func: (T) -> R): (T) -> R = { func(it) }

/**
 * Creates a function that provides value to wrapper as its first argument.
 * Any additional arguments provided to the function are appended to those provided to the wrapper.
 */
fun <T, R> wrap(value: T, wrapper: (T) -> R): () -> R = { wrapper(value) }
