import Foundation
import ArgumentParser

struct Frankfurter: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "frankfurter",
        abstract: "Fetch exchange rates from frankfurter.dev"
    )

    @Argument(help: "Amount to convert")
    var amount: Double?

    @Option(name: .long, help: "Base currency (default: EUR)")
    var base: String = "EUR"

    @Option(name: .long, help: "Target currencies (e.g., USD,GBP)")
    var to: String?

    @Option(name: .long, help: "Start date (YYYY-MM-DD)")
    var from: String?

    @Option(name: .long, help: "End date (YYYY-MM-DD)")
    var until: String?

    mutating func run() async throws {
        var url = "https://api.frankfurter.dev/latest?base=\(base)"
        if let from = from { url += "&from=\(from)" }
        if let until = until { url += "&to=\(until)" }

        var options = RequestsOptions()
        options.query["base"] = base
        if let from = from { options.query["from"] = from }
        if let until = until { options.query["to"] = until }

        let data = try await requestsFetch(method: "GET", url: "https://api.frankfurter.dev/latest", options: options)
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]

        print("Base: \(json?["base"] as? String ?? "")")
        print("Date: \(json?["date"] as? String ?? "")")

        if let rates = json?["rates"] as? [String: Double] {
            let filtered = to.map { t in
                let targets = Set(t.split(separator: ",").map(String.init))
                return rates.filter { targets.contains($0.key) }
            } ?? rates

            for (currency, rate) in filtered.sorted(by: { $0.key < $1.key }) {
                if let amount = amount {
                    print("\(amount) \(base) = \(amount * rate) \(currency)")
                } else {
                    print("  \(currency): \(rate)")
                }
            }
        }
    }
}
