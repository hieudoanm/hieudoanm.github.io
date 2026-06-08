import Foundation
import ArgumentParser

struct Morse: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "morse",
        abstract: "Convert text to Morse code"
    )

    @Argument(help: "Text to convert")
    var text: String

    mutating func run() {
        print(convertToMorse(text))
    }
}

func convertToMorse(_ s: String) -> String {
    let morseMap: [Character: String] = [
        "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.",
        "g": "--.", "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..",
        "m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-", "r": ".-.",
        "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-",
        "y": "-.--", "z": "--..",
        "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
        "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
        ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
        "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
        ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
        "\"": ".-..-.", "$": "...-..-", "@": ".--.-.",
    ]
    return s.lowercased().map { morseMap[$0] ?? String($0) }.joined(separator: " ")
}
