import Foundation
import ArgumentParser

struct English: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "english",
        abstract: "Convert a number to English words"
    )

    @Argument(help: "Number to convert")
    var number: Int

    mutating func run() {
        print(numberToEnglish(number))
    }
}

func numberToEnglish(_ n: Int) -> String {
    guard n != 0 else { return "zero" }

    let ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
                 "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
                 "seventeen", "eighteen", "nineteen"]
    let tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

    var n = n
    var result = ""

    if n < 0 {
        result += "negative "
        n = -n
    }

    let chunks = [(1_000_000_000, "billion"), (1_000_000, "million"), (1_000, "thousand"), (1, "")]
    for (value, name) in chunks {
        if n >= value {
            let chunk = n / value
            n %= value
            result += convertChunk(chunk, ones: ones, tens: tens)
            if !name.isEmpty { result += " \(name)" }
            if n > 0 { result += " " }
        }
    }

    return result.trimmingCharacters(in: .whitespaces)
}

func convertChunk(_ n: Int, ones: [String], tens: [String]) -> String {
    var n = n
    var result = ""

    if n >= 100 {
        result += "\(ones[n / 100]) hundred"
        n %= 100
        if n > 0 { result += " " }
    }

    if n >= 20 {
        result += tens[n / 10]
        n %= 10
        if n > 0 { result += "-" }
    }

    if n > 0 {
        result += ones[n]
    }

    return result
}
