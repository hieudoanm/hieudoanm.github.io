# TREE

```text
├── Sources/
│   └── jack/
│       ├── Commands/
│       │   ├── Calc/
│       │   │   └── [Calc.swift](./Sources/jack/Commands/Calc/Calc.swift)
│       │   ├── Casino/
│       │   │   └── [Casino.swift](./Sources/jack/Commands/Casino/Casino.swift)
│       │   ├── Chess/
│       │   │   └── [Chess.swift](./Sources/jack/Commands/Chess/Chess.swift)
│       │   ├── Colors/
│       │   │   ├── [Colors.swift](./Sources/jack/Commands/Colors/Colors.swift)
│       │   │   └── [ColorsService.swift](./Sources/jack/Commands/Colors/ColorsService.swift)
│       │   ├── Convert/
│       │   │   └── [Convert.swift](./Sources/jack/Commands/Convert/Convert.swift)
│       │   ├── Crypto/
│       │   │   └── [Crypto.swift](./Sources/jack/Commands/Crypto/Crypto.swift)
│       │   ├── Data/
│       │   │   └── [Data.swift](./Sources/jack/Commands/Data/Data.swift)
│       │   ├── Docsify/
│       │   │   └── [Docsify.swift](./Sources/jack/Commands/Docsify/Docsify.swift)
│       │   ├── Doi/
│       │   │   └── [Doi.swift](./Sources/jack/Commands/Doi/Doi.swift)
│       │   ├── English/
│       │   │   └── [English.swift](./Sources/jack/Commands/English/English.swift)
│       │   ├── File/
│       │   │   └── [File.swift](./Sources/jack/Commands/File/File.swift)
│       │   ├── Gemini/
│       │   │   └── [Gemini.swift](./Sources/jack/Commands/Gemini/Gemini.swift)
│       │   ├── Gh/
│       │   │   └── [Gh.swift](./Sources/jack/Commands/Gh/Gh.swift)
│       │   ├── History/
│       │   │   └── [History.swift](./Sources/jack/Commands/History/History.swift)
│       │   ├── Image/
│       │   │   └── [Image.swift](./Sources/jack/Commands/Image/Image.swift)
│       │   ├── Mcp/
│       │   │   └── [McpCmd.swift](./Sources/jack/Commands/Mcp/McpCmd.swift)
│       │   ├── Net/
│       │   │   └── [Net.swift](./Sources/jack/Commands/Net/Net.swift)
│       │   ├── Openapi/
│       │   │   └── [Openapi.swift](./Sources/jack/Commands/Openapi/Openapi.swift)
│       │   ├── Openrouter/
│       │   │   └── [Openrouter.swift](./Sources/jack/Commands/Openrouter/Openrouter.swift)
│       │   ├── Port/
│       │   │   └── [Port.swift](./Sources/jack/Commands/Port/Port.swift)
│       │   ├── Search/
│       │   │   └── [Search.swift](./Sources/jack/Commands/Search/Search.swift)
│       │   ├── Semver/
│       │   │   └── [Semver.swift](./Sources/jack/Commands/Semver/Semver.swift)
│       │   ├── System/
│       │   │   └── [System.swift](./Sources/jack/Commands/System/System.swift)
│       │   ├── Telegram/
│       │   │   └── [Telegram.swift](./Sources/jack/Commands/Telegram/Telegram.swift)
│       │   ├── Time/
│       │   │   └── [Time.swift](./Sources/jack/Commands/Time/Time.swift)
│       │   ├── Version/
│       │   │   └── [Version.swift](./Sources/jack/Commands/Version/Version.swift)
│       │   └── Web/
│       │       ├── [Transcript.swift](./Sources/jack/Commands/Web/Transcript.swift)
│       │       └── [Web.swift](./Sources/jack/Commands/Web/Web.swift)
│       ├── Data/
│       │   └── [Countries.swift](./Sources/jack/Data/Countries.swift)
│       ├── Libs/
│       │   ├── [Browser.swift](./Sources/jack/Libs/Browser.swift)
│       │   ├── [Chat.swift](./Sources/jack/Libs/Chat.swift)
│       │   ├── [ColorHelpers.swift](./Sources/jack/Libs/ColorHelpers.swift)
│       │   ├── [Figlet.swift](./Sources/jack/Libs/Figlet.swift)
│       │   ├── [HistoryStore.swift](./Sources/jack/Libs/HistoryStore.swift)
│       │   ├── [McpServer.swift](./Sources/jack/Libs/McpServer.swift)
│       │   ├── [Number.swift](./Sources/jack/Libs/Number.swift)
│       │   └── [Requests.swift](./Sources/jack/Libs/Requests.swift)
│       └── [Jack.swift](./Sources/jack/Jack.swift)
├── Tests/
│   └── jackTests/
│       ├── Commands/
│       │   ├── Calc/
│       │   │   └── [CalcTests.swift](./Tests/jackTests/Commands/Calc/CalcTests.swift)
│       │   ├── Casino/
│       │   │   └── [CasinoTests.swift](./Tests/jackTests/Commands/Casino/CasinoTests.swift)
│       │   ├── Chess/
│       │   │   └── [ChessTests.swift](./Tests/jackTests/Commands/Chess/ChessTests.swift)
│       │   ├── Colors/
│       │   │   └── [ColorsServiceTests.swift](./Tests/jackTests/Commands/Colors/ColorsServiceTests.swift)
│       │   ├── Convert/
│       │   │   └── [ConvertTests.swift](./Tests/jackTests/Commands/Convert/ConvertTests.swift)
│       │   ├── Crypto/
│       │   │   └── [CryptoTests.swift](./Tests/jackTests/Commands/Crypto/CryptoTests.swift)
│       │   ├── Data/
│       │   │   └── [DataTests.swift](./Tests/jackTests/Commands/Data/DataTests.swift)
│       │   ├── Doi/
│       │   │   └── [DoiTests.swift](./Tests/jackTests/Commands/Doi/DoiTests.swift)
│       │   ├── English/
│       │   │   └── [EnglishTests.swift](./Tests/jackTests/Commands/English/EnglishTests.swift)
│       │   ├── File/
│       │   │   └── [FileTests.swift](./Tests/jackTests/Commands/File/FileTests.swift)
│       │   ├── Gemini/
│       │   │   └── [GeminiTests.swift](./Tests/jackTests/Commands/Gemini/GeminiTests.swift)
│       │   ├── Gh/
│       │   │   └── [GhTests.swift](./Tests/jackTests/Commands/Gh/GhTests.swift)
│       │   ├── Image/
│       │   │   └── [ImageTests.swift](./Tests/jackTests/Commands/Image/ImageTests.swift)
│       │   ├── Net/
│       │   │   └── [NetTests.swift](./Tests/jackTests/Commands/Net/NetTests.swift)
│       │   ├── Search/
│       │   │   └── [SearchTests.swift](./Tests/jackTests/Commands/Search/SearchTests.swift)
│       │   ├── Semver/
│       │   │   └── [SemverTests.swift](./Tests/jackTests/Commands/Semver/SemverTests.swift)
│       │   ├── System/
│       │   │   └── [SystemTests.swift](./Tests/jackTests/Commands/System/SystemTests.swift)
│       │   ├── Telegram/
│       │   │   └── [TelegramTests.swift](./Tests/jackTests/Commands/Telegram/TelegramTests.swift)
│       │   ├── Time/
│       │   │   └── [TimeTests.swift](./Tests/jackTests/Commands/Time/TimeTests.swift)
│       │   ├── Version/
│       │   │   └── [VersionTests.swift](./Tests/jackTests/Commands/Version/VersionTests.swift)
│       │   └── Web/
│       │       └── [WebTests.swift](./Tests/jackTests/Commands/Web/WebTests.swift)
│       ├── Libs/
│       │   ├── [BrowserTests.swift](./Tests/jackTests/Libs/BrowserTests.swift)
│       │   ├── [ChatTests.swift](./Tests/jackTests/Libs/ChatTests.swift)
│       │   ├── [ColorHelpersTests.swift](./Tests/jackTests/Libs/ColorHelpersTests.swift)
│       │   ├── [FigletTests.swift](./Tests/jackTests/Libs/FigletTests.swift)
│       │   ├── [NumberTests.swift](./Tests/jackTests/Libs/NumberTests.swift)
│       │   └── [RequestsTests.swift](./Tests/jackTests/Libs/RequestsTests.swift)
│       └── [StringCmdTests.swift](./Tests/jackTests/StringCmdTests.swift)
├── [LICENSE](./LICENSE)
├── [Makefile](./Makefile)
├── [Package.swift](./Package.swift)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

57 directories, 72 files
