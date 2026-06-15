import Foundation

func convertToBraille(_ s: String) -> String {
    let brailleBase: UInt32 = 0x2800
    let letters: [Character: UInt8] = [
        "a": 1, "b": 3, "c": 9, "d": 25, "e": 17, "f": 11, "g": 27, "h": 19,
        "i": 10, "j": 26, "k": 5, "l": 7, "m": 13, "n": 29, "o": 21, "p": 15,
        "q": 31, "r": 23, "s": 14, "t": 30, "u": 37, "v": 39, "w": 58, "x": 45,
        "y": 61, "z": 53,
    ]
    let digits: [Character: UInt8] = [
        "1": 1, "2": 3, "3": 9, "4": 25, "5": 17,
        "6": 11, "7": 27, "8": 19, "9": 10, "0": 26,
    ]
    var result = ""
    var numberMode = false
    for ch in s {
        if ch.isUppercase {
            result += String(UnicodeScalar(brailleBase + 32)!)
            let lower = Character(ch.lowercased())
            if let byte = letters[lower] {
                result += String(UnicodeScalar(brailleBase + UInt32(byte))!)
            } else {
                result += String(ch)
            }
            numberMode = false
        } else if let byte = letters[ch] {
            result += String(UnicodeScalar(brailleBase + UInt32(byte))!)
            numberMode = false
        } else if let byte = digits[ch] {
            if !numberMode {
                result += String(UnicodeScalar(brailleBase + 60)!)
                numberMode = true
            }
            result += String(UnicodeScalar(brailleBase + UInt32(byte))!)
        } else if ch == " " {
            result += " "
            numberMode = false
        } else {
            result += String(ch)
        }
    }
    return result
}
