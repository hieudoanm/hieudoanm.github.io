import Foundation

/**
 * Converts string to camel case.
 */
public func camelCase(_ str: String?) -> String {
    guard let str = str else { return "" }
    let wordList = words(str)
    return wordList.enumerated().map { index, word in
        if index == 0 {
            return word.lowercased()
        } else {
            return word.lowercased().capitalizingFirstLetter()
        }
    }.joined()
}

/**
 * Converts the first character of string to upper case and the remaining to lower case.
 */
public func capitalize(_ str: String?) -> String {
    guard let str = str else { return "" }
    return str.lowercased().capitalizingFirstLetter()
}

/**
 * Checks if string ends with the given target string.
 */
public func endsWith(_ str: String?, _ target: String?, _ position: Int? = nil) -> Bool {
    guard let str = str, let target = target else { return false }
    let pos = position ?? str.count
    let end = str.index(str.startIndex, offsetBy: clamp(pos, 0, str.count))
    return str[..<end].hasSuffix(target)
}

/**
 * Converts the characters "&", "<", ">", '"', and "'" in string to their corresponding HTML entities.
 */
public func escape(_ str: String?) -> String {
    guard let str = str else { return "" }
    return str.replacingOccurrences(of: "&", with: "&amp;")
        .replacingOccurrences(of: "<", with: "&lt;")
        .replacingOccurrences(of: ">", with: "&gt;")
        .replacingOccurrences(of: "\"", with: "&quot;")
        .replacingOccurrences(of: "'", with: "&#39;")
}

/**
 * Converts string to kebab case.
 */
public func kebabCase(_ str: String?) -> String {
    guard let str = str else { return "" }
    return words(str).map { $0.lowercased() }.joined(separator: "-")
}

/**
 * Converts the first character of string to lower case.
 */
public func lowerFirst(_ str: String?) -> String {
    guard let str = str else { return "" }
    return str.prefix(1).lowercased() + str.dropFirst()
}

/**
 * Pads string on the left and right sides if it's shorter than length.
 */
public func pad(_ str: String?, _ length: Int, _ chars: String = " ") -> String {
    guard let str = str else { return "" }
    if str.count >= length { return str }
    let totalPad = length - str.count
    let leftPad = totalPad / 2
    return padStart(str, str.count + leftPad, chars).let { padEnd($0, length, chars) }
}

/**
 * Pads string on the right side if it's shorter than length.
 */
public func padEnd(_ str: String?, _ length: Int, _ chars: String = " ") -> String {
    guard let str = str else { return "" }
    if str.count >= length { return str }
    let diff = length - str.count
    let padContent = String(repeating: chars, count: (diff / chars.count) + 1).prefix(diff)
    return str + padContent
}

/**
 * Pads string on the left side if it's shorter than length.
 */
public func padStart(_ str: String?, _ length: Int, _ chars: String = " ") -> String {
    guard let str = str else { return "" }
    if str.count >= length { return str }
    let diff = length - str.count
    let padContent = String(repeating: chars, count: (diff / chars.count) + 1).prefix(diff)
    return padContent + str
}

/**
 * Repeats the given string n times.
 */
public func repeatString(_ str: String?, _ n: Int = 1) -> String {
    guard let str = str, n > 0 else { return "" }
    return String(repeating: str, count: n)
}

/**
 * Replaces matches for pattern in string with replacement.
 */
public func replace(_ str: String?, _ pattern: String, _ replacement: String) -> String {
    guard let str = str else { return "" }
    return str.replacingOccurrences(of: pattern, with: replacement)
}

/**
 * Converts string to snake case.
 */
public func snakeCase(_ str: String?) -> String {
    guard let str = str else { return "" }
    return words(str).map { $0.lowercased() }.joined(separator: "_")
}

/**
 * Splits string by separator.
 */
public func split(_ str: String?, _ separator: String?, _ limit: Int? = nil) -> [String] {
    guard let str = str else { return [] }
    guard let separator = separator else { return [str] }
    let parts = str.components(separatedBy: separator)
    if let limit = limit {
        return Array(parts.prefix(limit))
    }
    return parts
}

/**
 * Converts string to start case.
 */
public func startCase(_ str: String?) -> String {
    guard let str = str else { return "" }
    return words(str).map { $0.lowercased().capitalizingFirstLetter() }.joined(separator: " ")
}

/**
 * Checks if string starts with the given target string.
 */
public func startsWith(_ str: String?, _ target: String?, _ position: Int = 0) -> Bool {
    guard let str = str, let target = target else { return false }
    let start = str.index(str.startIndex, offsetBy: clamp(position, 0, str.count))
    return str[start...].hasPrefix(target)
}

/**
 * Converts string to lower case.
 */
public func toLower(_ str: String?) -> String {
    return str?.lowercased() ?? ""
}

/**
 * Converts string to upper case.
 */
public func toUpper(_ str: String?) -> String {
    return str?.uppercased() ?? ""
}

/**
 * Truncates string if it's longer than the given maximum string length.
 */
public func truncate(_ str: String?, _ length: Int = 30, _ omission: String = "...") -> String {
    guard let str = str else { return "" }
    if str.count <= length { return str }
    return str.prefix(length - omission.count) + omission
}

/**
 * The inverse of _.escape; this method converts the HTML entities &amp;, &lt;, &gt;, &quot;, and &#39; in string to their corresponding characters.
 */
public func unescape(_ str: String?) -> String {
    guard let str = str else { return "" }
    return str.replacingOccurrences(of: "&amp;", with: "&")
        .replacingOccurrences(of: "&lt;", with: "<")
        .replacingOccurrences(of: "&gt;", with: ">")
        .replacingOccurrences(of: "&quot;", with: "\"")
        .replacingOccurrences(of: "&#39;", with: "'")
}

/**
 * Converts the first character of string to upper case.
 */
public func upperFirst(_ str: String?) -> String {
    guard let str = str else { return "" }
    return str.prefix(1).uppercased() + str.dropFirst()
}

/**
 * Splits string into an array of its words.
 */
public func words(_ str: String?) -> [String] {
    guard let str = str else { return [] }
    let regex = try! NSRegularExpression(pattern: "[a-zA-Z0-9]+")
    let nsString = str as NSString
    let results = regex.matches(in: str, range: NSRange(location: 0, length: nsString.length))
    return results.map { nsString.substring(with: $0.range) }
}

private extension String {
    func capitalizingFirstLetter() -> String {
        return prefix(1).uppercased() + dropFirst()
    }
}

private extension NSObjectProtocol {
    func `let`<R>(_ block: (Self) -> R) -> R {
        return block(self)
    }
}

private func clamp<T: Comparable>(_ value: T, _ lower: T, _ upper: T) -> T {
    return min(max(value, lower), upper)
}
