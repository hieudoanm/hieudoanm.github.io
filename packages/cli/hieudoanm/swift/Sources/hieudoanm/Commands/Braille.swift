import Foundation
import ArgumentParser

struct Braille: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "braille",
        abstract: "Convert text to Braille"
    )

    @Argument(help: "Text to convert")
    var text: String

    mutating func run() {
        print(convertToBraille(text))
    }
}

func convertToBraille(_ s: String) -> String {
    let brailleMap: [Character: String] = [
        "a": "⠁", "b": "⠃", "c": "⠉", "d": "⠙", "e": "⠑",
        "f": "⠋", "g": "⠛", "h": "⠓", "i": "⠊", "j": "⠚",
        "k": "⠅", "l": "⠇", "m": "⠍", "n": "⠝", "o": "⠕",
        "p": "⠏", "q": "⠟", "r": "⠗", "s": "⠎", "t": "⠞",
        "u": "⠥", "v": "⠧", "w": "⠺", "x": "⠭", "y": "⠽",
        "z": "⠵",
        "A": "⠠⠁", "B": "⠠⠃", "C": "⠠⠉", "D": "⠠⠙", "E": "⠠⠑",
        "F": "⠠⠋", "G": "⠠⠛", "H": "⠠⠓", "I": "⠠⠊", "J": "⠠⠚",
        "K": "⠠⠅", "L": "⠠⠇", "M": "⠠⠍", "N": "⠠⠝", "O": "⠠⠕",
        "P": "⠠⠏", "Q": "⠠⠟", "R": "⠠⠗", "S": "⠠⠎", "T": "⠠⠞",
        "U": "⠠⠥", "V": "⠠⠧", "W": "⠠⠺", "X": "⠠⠭", "Y": "⠠⠽",
        "Z": "⠠⠵",
        "0": "⠼⠚", "1": "⠼⠁", "2": "⠼⠃", "3": "⠼⠉", "4": "⠼⠙",
        "5": "⠼⠑", "6": "⠼⠋", "7": "⠼⠛", "8": "⠼⠓", "9": "⠼⠊",
        " ": " ",
    ]
    return s.map { brailleMap[$0] ?? String($0) }.joined()
}
