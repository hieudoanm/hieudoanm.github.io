import Foundation
import ArgumentParser

struct CalcCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "calc",
        abstract: "Calculator and math tools",
        subcommands: [
            CalcAge.self, CalcBmi.self, CalcCurrency.self, CalcTax.self,
            CalcCompound.self, CalcLoan.self, CalcDiscount.self,
            CalcTip.self, CalcBase.self, CalcUnit.self,
            CalcPercent.self, CalcMortgage.self, CalcDate.self,
            CalcEval.self, CalcStats.self, CalcFactorial.self,
            CalcRandom.self, CalcPrime.self, CalcGCD.self, CalcLCM.self,
        ]
    )
    mutating func run() {}
}

struct CalcAge: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "age", abstract: "Calculate age from birthdate")
    @Option(name: .shortAndLong, help: "Birth year") var year: Int
    @Option(name: .shortAndLong, help: "Birth month (1-12)") var month: Int
    @Option(name: .shortAndLong, help: "Birth day (1-31)") var day: Int
    @Flag(name: .long, help: "Output in JSON format") var json = false

    mutating func run() {
        guard year > 0, month >= 1, month <= 12, day >= 1, day <= 31 else {
            print("invalid birth date: year/month/day must be valid values"); return
        }
        let cal = Calendar.current
        var components = DateComponents()
        components.year = year
        components.month = month
        components.day = day
        guard let birth = cal.date(from: components) else {
            print("invalid birth date: \(year)/\(month)/\(day) does not exist"); return
        }
        guard birth <= Date() else {
            print("birth date cannot be in the future"); return
        }
        let now = Date()
        let years = cal.dateComponents([.year], from: birth, to: now).year ?? 0
        let months = cal.dateComponents([.month], from: birth, to: now).month ?? 0
        let days = cal.dateComponents([.day], from: birth, to: now).day ?? 0

        if json {
            let obj: [String: Any] = [
                "birth_date": String(format: "%04d-%02d-%02d", year, month, day),
                "years": years, "months": months % 12, "days": days % 30,
            ]
            if let data = try? JSONSerialization.data(withJSONObject: obj, options: [.prettyPrinted]),
               let str = String(data: data, encoding: .utf8) { print(str) }
        } else {
            print("Age: \(years) years, \(months % 12) months, \(days % 30) days")
        }
    }
}

struct CalcBmi: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "bmi", abstract: "Calculate BMI")
    @Argument(help: "Weight in kg") var weight: Double
    @Argument(help: "Height in cm") var height: Double
    mutating func run() {
        let h = height / 100
        let bmi = weight / (h * h)
        let category: String
        switch bmi {
        case ..<18.5: category = "Underweight"
        case ..<25: category = "Normal"
        case ..<30: category = "Overweight"
        default: category = "Obese"
        }
        print(String(format: "BMI: %.1f", bmi))
        print("Category: \(category)")
    }
}

struct CalcCurrency: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "currency", abstract: "Convert currency via Frankfurter API")
    @Argument(help: "Amount") var amount: Double
    @Argument(help: "From currency code") var from: String
    @Argument(help: "To currency code") var to: String
    mutating func run() async throws {
        let url = "https://api.frankfurter.dev/latest?base=\(from.uppercased())&symbols=\(to.uppercased())"
        let response = try await Requests.fetch(url)
        let json = try JSONSerialization.jsonObject(with: response.data) as? [String: Any]
        guard let rates = json?["rates"] as? [String: Double], let rate = rates[to.uppercased()] else {
            throw CalcError.conversionFailed
        }
        print("\(amount) \(from.uppercased()) = \(amount * rate) \(to.uppercased())")
        print("Rate: 1 \(from.uppercased()) = \(rate) \(to.uppercased())")
    }
}

struct CalcTax: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "tax", abstract: "US 2024 tax bracket calculator")
    @Argument(help: "Taxable income") var income: Double
    @Option(name: .long, help: "Filing status: single, married-joint, head-household") var status: String = "single"
    mutating func run() {
        let brackets: [(Double, Double)]
        switch status {
        case "married-joint":
            brackets = [(0, 0.10), (23200, 0.12), (94300, 0.22), (201050, 0.24), (383900, 0.32), (487450, 0.35), (731200, 0.37)]
        case "head-household":
            brackets = [(0, 0.10), (16550, 0.12), (63100, 0.22), (100500, 0.24), (191950, 0.32), (243700, 0.35), (609350, 0.37)]
        default:
            brackets = [(0, 0.10), (11600, 0.12), (47150, 0.22), (100525, 0.24), (191950, 0.32), (243725, 0.35), (609350, 0.37)]
        }
        var tax: Double = 0
        var remaining = income
        var detail: [(Double, Double, Double)] = []
        for i in (0..<brackets.count).reversed() {
            let (threshold, rate) = brackets[i]
            let nextThreshold = i + 1 < brackets.count ? brackets[i + 1].0 : Double.infinity
            let bracketMax = nextThreshold - threshold
            if remaining > bracketMax {
                let taxable = bracketMax
                let owed = taxable * rate
                detail.append((threshold, owed, rate * 100))
                tax += owed
                remaining -= taxable
            }
        }
        if remaining > 0 {
            let owed = remaining * brackets[0].1
            detail.append((0, owed, brackets[0].1 * 100))
            tax += owed
        }
        detail.sort { $0.0 < $1.0 }
        print(String(format: "Income: $%.2f", income))
        print(String(format: "Total Tax: $%.2f", tax))
        print(String(format: "Effective Rate: %.2f%%", income > 0 ? tax / income * 100 : 0))
        for (threshold, owed, rate) in detail {
            print(String(format: "  $%.0f+: $%.2f (%.0f%%)", threshold, owed, rate))
        }
    }
}

struct CalcCompound: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "compound", abstract: "Compound interest calculator")
    @Argument(help: "Principal") var principal: Double
    @Argument(help: "Annual rate (e.g. 5 for 5%%)") var rate: Double
    @Argument(help: "Years") var years: Double
    @Option(name: .shortAndLong, help: "Compounds per year") var compounds: Int = 12
    mutating func run() {
        let r = rate / 100
        let n = Double(compounds)
        let a = principal * pow(1 + r / n, n * years)
        print(String(format: "Principal: $%.2f", principal))
        print(String(format: "Rate: %.2f%%", rate))
        print(String(format: "After %.0f years: $%.2f", years, a))
        print(String(format: "Interest earned: $%.2f", a - principal))
    }
}

struct CalcLoan: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "loan", abstract: "Loan payment calculator")
    @Argument(help: "Loan amount") var principal: Double
    @Argument(help: "Annual rate (e.g. 5 for 5%%)") var rate: Double
    @Argument(help: "Term in months") var months: Int
    mutating func run() {
        let r = rate / 100 / 12
        let n = Double(months)
        let payment = principal * (r * pow(1 + r, n)) / (pow(1 + r, n) - 1)
        let total = payment * n
        print(String(format: "Monthly payment: $%.2f", payment))
        print(String(format: "Total payment: $%.2f", total))
        print(String(format: "Total interest: $%.2f", total - principal))
    }
}

struct CalcDiscount: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "discount", abstract: "Calculate discount")
    @Argument(help: "Original price") var price: Double
    @Argument(help: "Discount percentage") var percent: Double
    mutating func run() {
        let discount = price * percent / 100
        let finalPrice = price - discount
        print(String(format: "Original: $%.2f", price))
        print(String(format: "Discount: $%.2f (%.1f%%)", discount, percent))
        print(String(format: "Final: $%.2f", finalPrice))
    }
}

struct CalcTip: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "tip", abstract: "Tip calculator")
    @Argument(help: "Bill amount") var bill: Double
    @Argument(help: "Tip percentage") var percent: Double
    @Option(name: .shortAndLong, help: "Number of people") var split: Int = 1
    mutating func run() {
        let tip = bill * percent / 100
        let total = bill + tip
        let perPerson = total / Double(max(split, 1))
        print(String(format: "Bill: $%.2f", bill))
        print(String(format: "Tip (%.1f%%): $%.2f", percent, tip))
        print(String(format: "Total: $%.2f", total))
        if split > 1 {
            print(String(format: "Each: $%.2f", perPerson))
        }
    }
}

struct CalcBase: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "base", abstract: "Convert between bases")
    @Argument(help: "Value to convert") var value: String
    @Option(name: .long, help: "Input base: bin, oct, dec, hex") var from: String = "dec"
    @Option(name: .long, help: "Output base: bin, oct, dec, hex") var to: String = "hex"
    mutating func run() {
        let radix: Int
        switch from.lowercased() {
        case "bin": radix = 2
        case "oct": radix = 8
        case "hex": radix = 16
        default: radix = 10
        }
        guard let decimal = Int(value, radix: radix) else {
            print("Invalid input for base \(from)"); return
        }
        let result: String
        switch to.lowercased() {
        case "bin": result = String(decimal, radix: 2)
        case "oct": result = String(decimal, radix: 8)
        case "hex": result = String(decimal, radix: 16).uppercased()
        default: result = String(decimal)
        }
        print(result)
    }
}

struct CalcUnit: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "unit", abstract: "Convert units")
    @Argument(help: "Value") var value: Double
    @Argument(help: "From unit") var from: String
    @Argument(help: "To unit") var to: String
    mutating func run() {
        let meters: Double?
        switch from.lowercased() {
        case "m": meters = value
        case "ft": meters = value * 0.3048
        case "in": meters = value * 0.0254
        case "cm": meters = value / 100
        case "km": meters = value * 1000
        case "mi": meters = value * 1609.344
        case "kg": meters = value
        case "lb": meters = value * 0.453592
        case "oz": meters = value * 0.0283495
        case "g": meters = value / 1000
        case "c": meters = value
        case "f": meters = (value - 32) * 5 / 9
        case "k": meters = value - 273.15
        case "kmh": meters = value
        case "mph": meters = value * 1.60934
        case "knots": meters = value * 1.852
        default: meters = nil
        }
        guard let base = meters else { print("Unknown unit: \(from)"); return }
        let result: String
        switch to.lowercased() {
        case "m": result = String(format: "%.4f m", base)
        case "ft": result = String(format: "%.4f ft", base / 0.3048)
        case "in": result = String(format: "%.4f in", base / 0.0254)
        case "cm": result = String(format: "%.4f cm", base * 100)
        case "km": result = String(format: "%.4f km", base / 1000)
        case "mi": result = String(format: "%.4f mi", base / 1609.344)
        case "kg": result = String(format: "%.4f kg", base)
        case "lb": result = String(format: "%.4f lb", base / 0.453592)
        case "oz": result = String(format: "%.4f oz", base / 0.0283495)
        case "g": result = String(format: "%.4f g", base * 1000)
        case "c": result = String(format: "%.2f °C", base)
        case "f": result = String(format: "%.2f °F", base * 9 / 5 + 32)
        case "k": result = String(format: "%.2f K", base + 273.15)
        case "kmh": result = String(format: "%.4f km/h", base)
        case "mph": result = String(format: "%.4f mph", base / 1.60934)
        case "knots": result = String(format: "%.4f knots", base / 1.852)
        default: result = "Unknown target unit: \(to)"
        }
        print(result)
    }
}

struct CalcPercent: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "percent", abstract: "Percentage calculator")
    @Argument(help: "Value") var value: Double
    @Argument(help: "Total or operation") var second: Double
    @Option(name: .long, help: "Operation: of, change") var op: String = "of"
    mutating func run() {
        switch op.lowercased() {
        case "change":
            let change = ((value - second) / second) * 100
            print(String(format: "Change: %.2f%%", change))
        default:
            let pct = (value / second) * 100
            print(String(format: "%.2f is %.2f%% of %.2f", value, pct, second))
        }
    }
}

struct CalcMortgage: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "mortgage", abstract: "Mortgage calculator")
    @Argument(help: "Loan amount") var principal: Double
    @Argument(help: "Annual rate (e.g. 6.5 for 6.5%%)") var rate: Double
    @Argument(help: "Term in years") var years: Int
    mutating func run() {
        let r = rate / 100 / 12
        let n = Double(years * 12)
        let payment = principal * (r * pow(1 + r, n)) / (pow(1 + r, n) - 1)
        let total = payment * n
        print(String(format: "Monthly: $%.2f", payment))
        print(String(format: "Total: $%.2f", total))
        print(String(format: "Interest: $%.2f", total - principal))
    }
}

struct CalcDate: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "date", abstract: "Date arithmetic")
    @Argument(help: "Date (YYYY-MM-DD) or operation") var arg1: String
    @Argument(help: "Days to add/subtract, or second date") var arg2: String?
    @Option(name: .long, help: "Operation: add, diff") var op: String = "add"
    mutating func run() {
        let df = DateFormatter()
        df.dateFormat = "yyyy-MM-dd"
        switch op.lowercased() {
        case "diff":
            guard let d2 = arg2, let date1 = df.date(from: arg1), let date2 = df.date(from: d2) else {
                print("Invalid dates"); return
            }
            let diff = abs(date1.timeIntervalSince(date2)) / 86400
            print("Difference: \(Int(diff)) days")
        default:
            guard let days = Int(arg2 ?? "0"), let date = df.date(from: arg1) else {
                print("Invalid input"); return
            }
            let result = Calendar.current.date(byAdding: .day, value: days, to: date) ?? date
            print(df.string(from: result))
        }
    }
}

struct CalcEval: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "eval", abstract: "Evaluate arithmetic expression")
    @Argument(help: "Expression (e.g. 2+3*4)") var expression: String
    mutating func run() {
        let expr = expression
            .replacingOccurrences(of: "x", with: "*")
            .replacingOccurrences(of: "X", with: "*")
            .replacingOccurrences(of: "÷", with: "/")
            .replacingOccurrences(of: "×", with: "*")
        let allowed = CharacterSet(charactersIn: "0123456789+-*/.()% ")
        guard expr.unicodeScalars.allSatisfy({ allowed.contains($0) }) else {
            print("Invalid expression"); return
        }
        let nsExpr = NSExpression(format: expr)
        guard let result = nsExpr.expressionValue(with: nil, context: nil) as? NSNumber else {
            print("Evaluation failed"); return
        }
        print(String(format: "= %@", result.stringValue))
    }
}

struct CalcStats: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "stats", abstract: "Statistical calculations")
    @Argument(parsing: .remaining, help: "Numbers (space-separated)") var numbers: [Double]
    mutating func run() {
        guard !numbers.isEmpty else { print("No numbers"); return }
        let n = Double(numbers.count)
        let sum = numbers.reduce(0, +)
        let mean = sum / n
        let sorted = numbers.sorted()
        let median: Double
        if numbers.count % 2 == 0 {
            median = (sorted[numbers.count / 2 - 1] + sorted[numbers.count / 2]) / 2
        } else {
            median = sorted[numbers.count / 2]
        }
        let freq = Dictionary(grouping: numbers, by: { $0 }).mapValues(\.count)
        let maxFreq = freq.values.max() ?? 0
        let modes = freq.filter { $0.value == maxFreq }.keys.sorted()
        let variance = numbers.map { pow($0 - mean, 2) }.reduce(0, +) / n
        let stddev = sqrt(variance)
        print("Count:   \(numbers.count)")
        print(String(format: "Sum:     %.4f", sum))
        print(String(format: "Mean:    %.4f", mean))
        print(String(format: "Median:  %.4f", median))
        print("Mode:    \(modes.map { String(format: "%.4f", $0) }.joined(separator: ", "))")
        print(String(format: "StdDev:  %.4f", stddev))
        print(String(format: "Min:     %.4f", sorted.first!))
        print(String(format: "Max:     %.4f", sorted.last!))
    }
}

struct CalcFactorial: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "factorial", abstract: "Calculate factorial")
    @Argument(help: "Number") var n: Int
    mutating func run() {
        guard n >= 0 else { print("Must be non-negative"); return }
        let result = (1...max(n, 1)).reduce(1, *)
        print("\(n)! = \(result)")
    }
}

struct CalcRandom: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "random", abstract: "Random number in range")
    @Argument(help: "Min") var min: Int = 0
    @Argument(help: "Max") var max: Int = 100
    mutating func run() {
        print(Int.random(in: min...max))
    }
}

struct CalcPrime: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "prime", abstract: "Prime number tools")
    @Argument(help: "Number") var n: Int
    @Option(name: .long, help: "Operation: check, generate") var op: String = "check"
    mutating func run() {
        switch op.lowercased() {
        case "generate":
            guard n > 1 else { print("No primes"); return }
            var sieve = [Bool](repeating: true, count: n + 1)
            sieve[0] = false; sieve[1] = false
            for i in 2...Int(sqrt(Double(n))) {
                if sieve[i] { for j in stride(from: i * i, through: n, by: i) { sieve[j] = false } }
            }
            let primes = (2...n).filter { sieve[$0] }
            print("Primes up to \(n): \(primes.map(String.init).joined(separator: " "))")
            print("Count: \(primes.count)")
        default:
            guard n > 1 else { print("\(n) is not prime"); return }
            if n == 2 { print("2 is prime"); return }
            if n % 2 == 0 { print("\(n) is not prime (divisible by 2)"); return }
            let limit = Int(sqrt(Double(n)))
            for i in stride(from: 3, through: limit, by: 2) {
                if n % i == 0 { print("\(n) is not prime (divisible by \(i))"); return }
            }
            print("\(n) is prime")
        }
    }
}

struct CalcGCD: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "gcd", abstract: "Greatest common divisor")
    @Argument(help: "First number") var a: Int
    @Argument(help: "Second number") var b: Int
    mutating func run() {
        func gcd(_ x: Int, _ y: Int) -> Int { y == 0 ? abs(x) : gcd(y, x % y) }
        print(gcd(a, b))
    }
}

struct CalcLCM: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "lcm", abstract: "Least common multiple")
    @Argument(help: "First number") var a: Int
    @Argument(help: "Second number") var b: Int
    mutating func run() {
        func gcd(_ x: Int, _ y: Int) -> Int { y == 0 ? abs(x) : gcd(y, x % y) }
        guard a != 0 || b != 0 else { print(0); return }
        print(abs(a * b) / gcd(a, b))
    }
}

enum CalcError: Error, CustomStringConvertible {
    case conversionFailed
    var description: String {
        switch self {
        case .conversionFailed: return "Currency conversion failed"
        }
    }
}

func calcGcd(_ a: Int, _ b: Int) -> Int {
    b == 0 ? abs(a) : calcGcd(b, a % b)
}

func calcLcm(_ a: Int, _ b: Int) -> Int {
    guard a != 0 || b != 0 else { return 0 }
    return abs(a * b) / calcGcd(a, b)
}
