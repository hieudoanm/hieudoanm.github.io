import Foundation

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * - Returns: Returns the timestamp.
 */
public func now() -> Int64 {
    return Int64(Date().timeIntervalSince1970 * 1000)
}
