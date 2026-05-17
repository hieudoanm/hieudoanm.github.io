package lodash

/**
 * Creates a lodash wrapper instance that wraps value with explicit method chain sequences enabled.
 * The result of such sequences must be unwrapped by invoking _.value().
 */
class LodashWrapper<T>(private val value: T) {
    /**
     * Returns the wrapped value.
     */
    fun value(): T = value

    /**
     * This method invokes interceptor and returns the wrapper instance.
     */
    fun tap(interceptor: (T) -> Unit): LodashWrapper<T> {
        interceptor(value)
        return this
    }

    /**
     * This method invokes interceptor and returns the result of interceptor wrapped.
     */
    fun <R> thru(interceptor: (T) -> R): LodashWrapper<R> {
        return LodashWrapper(interceptor(value))
    }

    // Methods like map, filter, etc., could be added here to support chaining.
}

/**
 * Creates a lodash wrapper instance that wraps value.
 */
fun <T> chain(value: T): LodashWrapper<T> = LodashWrapper(value)

/**
 * This method invokes interceptor and returns value.
 */
fun <T> tap(value: T, interceptor: (T) -> Unit): T {
    interceptor(value)
    return value
}

/**
 * This method invokes interceptor and returns the result of interceptor.
 */
fun <T, R> thru(value: T, interceptor: (T) -> R): R {
    return interceptor(value)
}
