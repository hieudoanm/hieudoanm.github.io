import Foundation
import ArgumentParser

struct EnglishCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "english",
        abstract: "English dictionary tools",
        subcommands: [DefineCommand.self]
    )
    mutating func run() {}
}

// MARK: - Define

struct DefineCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "define", abstract: "Fetch word definition from Free Dictionary API")

    @Argument(help: "Word to define")
    var word: String

    mutating func run() async throws {
        let url = "https://api.dictionaryapi.dev/api/v2/entries/en/\(word)"
        let response = try await Requests.fetch(url)

        guard response.statusCode == 200 else {
            if response.statusCode == 404 {
                print("Word '\(word)' not found")
            } else {
                print("HTTP \(response.statusCode): failed to fetch definition")
            }
            return
        }

        let json = try JSONSerialization.jsonObject(with: response.data)
        guard let entries = json as? [[String: Any]] else {
            print("Unexpected response format")
            return
        }

        for entry in entries {
            if let word = entry["word"] as? String {
                print("Word: \(word)")
            }

            if let phonetics = entry["phonetics"] as? [[String: Any]] {
                for phonetic in phonetics {
                    if let text = phonetic["text"] as? String {
                        print("Phonetic: \(text)")
                    }
                    if let audio = phonetic["audio"] as? String, !audio.isEmpty {
                        print("Audio: \(audio)")
                    }
                }
            }

            if let meanings = entry["meanings"] as? [[String: Any]] {
                for meaning in meanings {
                    if let partOfSpeech = meaning["partOfSpeech"] as? String {
                        print("\n\(partOfSpeech.uppercased())")
                    }

                    if let definitions = meaning["definitions"] as? [[String: Any]] {
                        for (i, def) in definitions.enumerated() {
                            if let definition = def["definition"] as? String {
                                print("  \(i + 1). \(definition)")
                            }
                            if let example = def["example"] as? String {
                                print("     Example: \"\(example)\"")
                            }
                            if let synonyms = def["synonyms"] as? [String], !synonyms.isEmpty {
                                print("     Synonyms: \(synonyms.joined(separator: ", "))")
                            }
                            if let antonyms = def["antonyms"] as? [String], !antonyms.isEmpty {
                                print("     Antonyms: \(antonyms.joined(separator: ", "))")
                            }
                        }
                    }
                }
            }
        }
    }
}
