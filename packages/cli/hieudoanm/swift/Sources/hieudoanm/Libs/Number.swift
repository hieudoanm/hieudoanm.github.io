import Foundation

func addZero(n: Int) -> String {
    guard n >= 0, n <= 9 else { return "\(n)" }
    return "0\(n)"
}

func comma(n: Int) -> String {
    let formatter = NumberFormatter()
    formatter.numberStyle = .decimal
    formatter.groupingSeparator = ","
    return formatter.string(from: NSNumber(value: n)) ?? "\(n)"
}
