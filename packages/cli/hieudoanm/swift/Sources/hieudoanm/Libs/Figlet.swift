func figletPrint(text: String) {
    print(figletRender(text: text))
}

func figletRender(text: String) -> String {
    let lines: [String] = [
        "  _   _      _                   _       _   _   _      _   _  ",
        " | | | | ___| |_ ___   ___  _ __| |_   ／ ／ | |_| |__   ___  |",
        " | |_| |/ _ \\ __/ _ \\ / _ \\| '__| __| | |   | __| '_ \\ / _ \\ |",
        " |  _  |  __/ || (_) | (_) | |  | |_  | |   | |_| | | |  __/ |",
        " |_| |_|\\___|\\__\\___/ \\___/|_|   \\__| | |    \\__|_| |_|\\___| |",
        "                                      \\_\\                      ",
    ]
    return lines.joined(separator: "\n")
}
