# TREE

```text
├── bin/
│   └── [hieudoanm](./bin/hieudoanm)
├── scripts/
│   └── [install.sh](./scripts/install.sh)
├── src/
│   ├── cmd/
│   │   ├── chess/
│   │   │   ├── [chess.go](./src/cmd/chess/chess.go)
│   │   │   ├── [chess960.go](./src/cmd/chess/chess960.go)
│   │   │   ├── [chess_com_leaderboards.go](./src/cmd/chess/chess_com_leaderboards.go)
│   │   │   ├── [chess_com_player.go](./src/cmd/chess/chess_com_player.go)
│   │   │   ├── [chess_com_titled.go](./src/cmd/chess/chess_com_titled.go)
│   │   │   ├── [chess_elo.go](./src/cmd/chess/chess_elo.go)
│   │   │   ├── [chess_fen.go](./src/cmd/chess/chess_fen.go)
│   │   │   ├── [chess_fen_eval.go](./src/cmd/chess/chess_fen_eval.go)
│   │   │   ├── [chess_fen_svg.go](./src/cmd/chess/chess_fen_svg.go)
│   │   │   ├── [chess_openings.go](./src/cmd/chess/chess_openings.go)
│   │   │   ├── [chess_pgn.go](./src/cmd/chess/chess_pgn.go)
│   │   │   ├── [chess_pgn_fen.go](./src/cmd/chess/chess_pgn_fen.go)
│   │   │   ├── [chess_pgn_uci.go](./src/cmd/chess/chess_pgn_uci.go)
│   │   │   ├── [chess_play.go](./src/cmd/chess/chess_play.go)
│   │   │   ├── [chess_random.go](./src/cmd/chess/chess_random.go)
│   │   │   ├── [chess_setup.go](./src/cmd/chess/chess_setup.go)
│   │   │   ├── [chess_stockfish.go](./src/cmd/chess/chess_stockfish.go)
│   │   │   └── [chess_titles.go](./src/cmd/chess/chess_titles.go)
│   │   ├── clock/
│   │   │   ├── [clock.go](./src/cmd/clock/clock.go)
│   │   │   ├── [clock_now.go](./src/cmd/clock/clock_now.go)
│   │   │   └── [clock_pomodoro.go](./src/cmd/clock/clock_pomodoro.go)
│   │   ├── colors/
│   │   │   ├── [colors.go](./src/cmd/colors/colors.go)
│   │   │   ├── [colors_convert_hcl.go](./src/cmd/colors/colors_convert_hcl.go)
│   │   │   ├── [colors_convert_hex.go](./src/cmd/colors/colors_convert_hex.go)
│   │   │   ├── [colors_convert_oklch.go](./src/cmd/colors/colors_convert_oklch.go)
│   │   │   ├── [colors_convert_rgb.go](./src/cmd/colors/colors_convert_rgb.go)
│   │   │   ├── [colors_palette.go](./src/cmd/colors/colors_palette.go)
│   │   │   └── [colors_random.go](./src/cmd/colors/colors_random.go)
│   │   ├── docsify/
│   │   │   ├── [docsify.go](./src/cmd/docsify/docsify.go)
│   │   │   ├── [docsify_cobra.go](./src/cmd/docsify/docsify_cobra.go)
│   │   │   ├── [docsify_obsidian.go](./src/cmd/docsify/docsify_obsidian.go)
│   │   │   ├── [docsify_scan.go](./src/cmd/docsify/docsify_scan.go)
│   │   │   └── [docsify_tree.go](./src/cmd/docsify/docsify_tree.go)
│   │   ├── doi/
│   │   │   ├── [doi.go](./src/cmd/doi/doi.go)
│   │   │   ├── [doi_cite.go](./src/cmd/doi/doi_cite.go)
│   │   │   └── [doi_ref.go](./src/cmd/doi/doi_ref.go)
│   │   ├── instagram/
│   │   │   ├── [instagram.go](./src/cmd/instagram/instagram.go)
│   │   │   ├── [instagram_download.go](./src/cmd/instagram/instagram_download.go)
│   │   │   └── [instagram_download_test.go](./src/cmd/instagram/instagram_download_test.go)
│   │   ├── ip/
│   │   │   ├── [ip.go](./src/cmd/ip/ip.go)
│   │   │   └── [ip_dns.go](./src/cmd/ip/ip_dns.go)
│   │   ├── openapi/
│   │   │   ├── [openapi.go](./src/cmd/openapi/openapi.go)
│   │   │   └── [openapi_postman.go](./src/cmd/openapi/openapi_postman.go)
│   │   ├── openrouter/
│   │   │   ├── [openrouter.go](./src/cmd/openrouter/openrouter.go)
│   │   │   ├── [openrouter_chat.go](./src/cmd/openrouter/openrouter_chat.go)
│   │   │   ├── [openrouter_hook.go](./src/cmd/openrouter/openrouter_hook.go)
│   │   │   ├── [openrouter_models.go](./src/cmd/openrouter/openrouter_models.go)
│   │   │   ├── [openrouter_serve.go](./src/cmd/openrouter/openrouter_serve.go)
│   │   │   └── [openrouter_status.go](./src/cmd/openrouter/openrouter_status.go)
│   │   ├── shopify/
│   │   │   ├── [shopify.go](./src/cmd/shopify/shopify.go)
│   │   │   └── [shopify_detect.go](./src/cmd/shopify/shopify_detect.go)
│   │   ├── string/
│   │   │   ├── [string.go](./src/cmd/string/string.go)
│   │   │   ├── [string_capitalise.go](./src/cmd/string/string_capitalise.go)
│   │   │   ├── [string_deburr.go](./src/cmd/string/string_deburr.go)
│   │   │   ├── [string_kebabcase.go](./src/cmd/string/string_kebabcase.go)
│   │   │   ├── [string_lowercase.go](./src/cmd/string/string_lowercase.go)
│   │   │   ├── [string_snakecase.go](./src/cmd/string/string_snakecase.go)
│   │   │   └── [string_uppercase.go](./src/cmd/string/string_uppercase.go)
│   │   ├── system/
│   │   │   ├── [system.go](./src/cmd/system/system.go)
│   │   │   └── [system_monitor.go](./src/cmd/system/system_monitor.go)
│   │   ├── telegram/
│   │   │   ├── [telegram.go](./src/cmd/telegram/telegram.go)
│   │   │   ├── [telegram_message.go](./src/cmd/telegram/telegram_message.go)
│   │   │   ├── [telegram_message_send.go](./src/cmd/telegram/telegram_message_send.go)
│   │   │   ├── [telegram_webhook.go](./src/cmd/telegram/telegram_webhook.go)
│   │   │   ├── [telegram_webhook_delete.go](./src/cmd/telegram/telegram_webhook_delete.go)
│   │   │   ├── [telegram_webhook_info.go](./src/cmd/telegram/telegram_webhook_info.go)
│   │   │   └── [telegram_webhook_set.go](./src/cmd/telegram/telegram_webhook_set.go)
│   │   ├── youtube/
│   │   │   ├── [youtube.go](./src/cmd/youtube/youtube.go)
│   │   │   ├── [youtube_thumbnails.go](./src/cmd/youtube/youtube_thumbnails.go)
│   │   │   └── [youtube_transcript.go](./src/cmd/youtube/youtube_transcript.go)
│   │   ├── [blackjack.go](./src/cmd/blackjack.go)
│   │   ├── [braille.go](./src/cmd/braille.go)
│   │   ├── [clipboard.go](./src/cmd/clipboard.go)
│   │   ├── [cmd_test.go](./src/cmd/cmd_test.go)
│   │   ├── [english.go](./src/cmd/english.go)
│   │   ├── [frankfurter.go](./src/cmd/frankfurter.go)
│   │   ├── [morse.go](./src/cmd/morse.go)
│   │   ├── [qrcode.go](./src/cmd/qrcode.go)
│   │   ├── [root.go](./src/cmd/root.go)
│   │   ├── [snapshot.go](./src/cmd/snapshot.go)
│   │   ├── [status.go](./src/cmd/status.go)
│   │   ├── [tax.go](./src/cmd/tax.go)
│   │   ├── [uuid.go](./src/cmd/uuid.go)
│   │   ├── [version.go](./src/cmd/version.go)
│   │   └── [wifi.go](./src/cmd/wifi.go)
│   ├── data/
│   │   └── [countries.go](./src/data/countries.go)
│   ├── libs/
│   │   ├── browser/
│   │   │   ├── [browser.go](./src/libs/browser/browser.go)
│   │   │   └── [browser_test.go](./src/libs/browser/browser_test.go)
│   │   ├── colors/
│   │   │   ├── [colors.go](./src/libs/colors/colors.go)
│   │   │   └── [colors_test.go](./src/libs/colors/colors_test.go)
│   │   ├── figlet/
│   │   │   ├── [figlet.go](./src/libs/figlet/figlet.go)
│   │   │   └── [figlet_test.go](./src/libs/figlet/figlet_test.go)
│   │   ├── http/
│   │   │   ├── [http.go](./src/libs/http/http.go)
│   │   │   └── [http_test.go](./src/libs/http/http_test.go)
│   │   ├── number/
│   │   │   ├── [number.go](./src/libs/number/number.go)
│   │   │   └── [number_test.go](./src/libs/number/number_test.go)
│   │   └── requests/
│   │       ├── [requests.go](./src/libs/requests/requests.go)
│   │       └── [requests_test.go](./src/libs/requests/requests_test.go)
│   └── services/
│       ├── apa/
│       │   ├── [apa.go](./src/services/apa/apa.go)
│       │   └── [apa_test.go](./src/services/apa/apa_test.go)
│       ├── blackjack/
│       │   └── [blackjack.go](./src/services/blackjack/blackjack.go)
│       ├── chat/
│       │   └── [chat.go](./src/services/chat/chat.go)
│       ├── colors/
│       │   ├── [cmyk.go](./src/services/colors/cmyk.go)
│       │   ├── [colors_test.go](./src/services/colors/colors_test.go)
│       │   ├── [hcl.go](./src/services/colors/hcl.go)
│       │   ├── [hex.go](./src/services/colors/hex.go)
│       │   ├── [hsl.go](./src/services/colors/hsl.go)
│       │   ├── [oklch.go](./src/services/colors/oklch.go)
│       │   └── [rgb.go](./src/services/colors/rgb.go)
│       ├── docsify/
│       │   ├── [extractor.go](./src/services/docsify/extractor.go)
│       │   ├── [graph.go](./src/services/docsify/graph.go)
│       │   ├── [walker.go](./src/services/docsify/walker.go)
│       │   └── [writer.go](./src/services/docsify/writer.go)
│       ├── lichess/
│       │   └── [lichess.org.go](./src/services/lichess/lichess.org.go)
│       ├── openrouter/
│       │   ├── [config.go](./src/services/openrouter/config.go)
│       │   ├── [openrouter.go](./src/services/openrouter/openrouter.go)
│       │   └── [openrouter_test.go](./src/services/openrouter/openrouter_test.go)
│       ├── pomodoro/
│       │   └── [pomodoro.go](./src/services/pomodoro/pomodoro.go)
│       ├── shopify/
│       │   ├── [shopify.go](./src/services/shopify/shopify.go)
│       │   └── [shopify_test.go](./src/services/shopify/shopify_test.go)
│       ├── tax/
│       │   ├── [tax.go](./src/services/tax/tax.go)
│       │   └── [tax_test.go](./src/services/tax/tax_test.go)
│       ├── telegram/
│       │   └── [telegram.go](./src/services/telegram/telegram.go)
│       ├── transcript/
│       │   ├── [client.go](./src/services/transcript/client.go)
│       │   ├── [parser.go](./src/services/transcript/parser.go)
│       │   ├── [transcript_test.go](./src/services/transcript/transcript_test.go)
│       │   └── [types.go](./src/services/transcript/types.go)
│       └── wifi/
│           ├── [wifi_darwin.go](./src/services/wifi/wifi_darwin.go)
│           └── [wifi_linux.go](./src/services/wifi/wifi_linux.go)
├── [LICENSE](./LICENSE)
├── [Makefile](./Makefile)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [go.mod](./go.mod)
├── [go.sum](./go.sum)
└── [main.go](./main.go)
```

40 directories, 138 files
