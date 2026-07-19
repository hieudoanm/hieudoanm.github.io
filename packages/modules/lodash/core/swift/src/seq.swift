import Foundation

/**
 * Creates a lodash wrapper instance that wraps value with explicit method chain sequences enabled.
 */
public class LodashWrapper<T> {
    private let value: T
    
    public init(_ value: T) {
        self.value = value
    }
    
    /**
     * Returns the wrapped value.
     */
    public func value() -> T {
        return value
    }
    
    /**
     * This method invokes interceptor and returns the wrapper instance.
     */
    public func tap(_ interceptor: (T) -> Void) -> LodashWrapper<T> {
        interceptor(value)
        return self
    }
    
    /**
     * This method invokes interceptor and returns the result of interceptor wrapped.
     */
    public func thru<R>(_ interceptor: (T) -> R) -> LodashWrapper<R> {
        return LodashWrapper<R>(interceptor(value))
    }
}

/**
 * Creates a lodash wrapper instance that wraps value.
 */
public func chain<T>(_ value: T) -> LodashWrapper<T> {
    return LodashWrapper(value)
}

/**
 * This method invokes interceptor and returns value.
 */
public func tap<T>(_ value: T, _ interceptor: (T) -> Void) -> T {
    interceptor(value)
    return value
}

/**
 * This method invokes interceptor and returns the result of interceptor.
 */
public func thru<T, R>(_ value: T, _ interceptor: (T) -> R) -> R {
    return interceptor(value)
}
