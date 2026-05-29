# TREE

```bash
├── bin/
│   └── hieudoanm
├── scripts/
│   └── install.sh
├── src/
│   ├── cmd/
│   │   ├── chess/
│   │   │   ├── chess.go
│   │   │   ├── chess_com_leaderboards.go
│   │   │   ├── chess_com_player.go
│   │   │   ├── chess_com_titled.go
│   │   │   ├── chess_elo.go
│   │   │   ├── chess_fen.go
│   │   │   ├── chess_fen_eval.go
│   │   │   ├── chess_fen_svg.go
│   │   │   ├── chess_pgn.go
│   │   │   ├── chess_pgn_fen.go
│   │   │   ├── chess_pgn_uci.go
│   │   │   ├── chess_play.go
│   │   │   ├── chess_random.go
│   │   │   ├── chess_setup.go
│   │   │   └── chess_stockfish.go
│   │   ├── clock/
│   │   │   ├── clock.go
│   │   │   ├── clock_now.go
│   │   │   └── clock_pomodoro.go
│   │   ├── colors/
│   │   │   ├── colors.go
│   │   │   ├── colors_convert_hcl.go
│   │   │   ├── colors_convert_hex.go
│   │   │   ├── colors_convert_oklch.go
│   │   │   ├── colors_convert_rgb.go
│   │   │   ├── colors_palette.go
│   │   │   └── colors_random.go
│   │   ├── docsify/
│   │   │   ├── docsify.go
│   │   │   ├── docsify_cobra.go
│   │   │   ├── docsify_scan.go
│   │   │   └── docsify_tree.go
│   │   ├── doi/
│   │   │   ├── doi.go
│   │   │   ├── doi_cite.go
│   │   │   └── doi_ref.go
│   │   ├── instagram/
│   │   │   ├── instagram.go
│   │   │   ├── instagram_download.go
│   │   │   └── instagram_download_test.go
│   │   ├── ip/
│   │   │   ├── ip.go
│   │   │   └── ip_dns.go
│   │   ├── openapi/
│   │   │   ├── openapi.go
│   │   │   └── openapi_postman.go
│   │   ├── openrouter/
│   │   │   ├── openrouter.go
│   │   │   ├── openrouter_chat.go
│   │   │   ├── openrouter_hook.go
│   │   │   ├── openrouter_models.go
│   │   │   ├── openrouter_serve.go
│   │   │   └── openrouter_status.go
│   │   ├── shopify/
│   │   │   ├── shopify.go
│   │   │   └── shopify_detect.go
│   │   ├── string/
│   │   │   ├── string.go
│   │   │   ├── string_capitalise.go
│   │   │   ├── string_deburr.go
│   │   │   ├── string_kebabcase.go
│   │   │   ├── string_lowercase.go
│   │   │   ├── string_snakecase.go
│   │   │   └── string_uppercase.go
│   │   ├── system/
│   │   │   ├── system.go
│   │   │   └── system_monitor.go
│   │   ├── telegram/
│   │   │   ├── telegram.go
│   │   │   ├── telegram_message.go
│   │   │   ├── telegram_message_send.go
│   │   │   ├── telegram_webhook.go
│   │   │   ├── telegram_webhook_delete.go
│   │   │   ├── telegram_webhook_info.go
│   │   │   └── telegram_webhook_set.go
│   │   ├── youtube/
│   │   │   ├── youtube.go
│   │   │   ├── youtube_thumbnails.go
│   │   │   └── youtube_transcript.go
│   │   ├── blackjack.go
│   │   ├── braille.go
│   │   ├── clipboard.go
│   │   ├── cmd_test.go
│   │   ├── english.go
│   │   ├── frankfurter.go
│   │   ├── morse.go
│   │   ├── qrcode.go
│   │   ├── root.go
│   │   ├── snapshot.go
│   │   ├── status.go
│   │   ├── status_all.go
│   │   ├── tax.go
│   │   ├── uuid.go
│   │   ├── version.go
│   │   └── wifi.go
│   ├── configs/
│   │   ├── configs.go
│   │   └── configs_test.go
│   ├── data/
│   │   ├── chess960.go
│   │   ├── countries.go
│   │   ├── openings.go
│   │   └── titles.go
│   ├── libs/
│   │   ├── browser/
│   │   │   ├── browser.go
│   │   │   └── browser_test.go
│   │   ├── colors/
│   │   │   ├── colors.go
│   │   │   └── colors_test.go
│   │   ├── figlet/
│   │   │   ├── figlet.go
│   │   │   └── figlet_test.go
│   │   ├── http/
│   │   │   ├── http.go
│   │   │   └── http_test.go
│   │   ├── number/
│   │   │   ├── number.go
│   │   │   └── number_test.go
│   │   └── requests/
│   │       ├── requests.go
│   │       └── requests_test.go
│   └── services/
│       ├── apa/
│       │   ├── apa.go
│       │   └── apa_test.go
│       ├── blackjack/
│       │   └── blackjack.go
│       ├── chat/
│       │   └── chat.go
│       ├── colors/
│       │   ├── cmyk.go
│       │   ├── colors_test.go
│       │   ├── hcl.go
│       │   ├── hex.go
│       │   ├── hsl.go
│       │   ├── oklch.go
│       │   └── rgb.go
│       ├── docsify/
│       │   ├── extractor.go
│       │   ├── graph.go
│       │   ├── walker.go
│       │   └── writer.go
│       ├── lichess/
│       │   └── lichess.org.go
│       ├── openrouter/
│       │   ├── config.go
│       │   ├── openrouter.go
│       │   └── openrouter_test.go
│       ├── pomodoro/
│       │   └── pomodoro.go
│       ├── shopify/
│       │   ├── shopify.go
│       │   └── shopify_test.go
│       ├── status/
│       │   ├── status.go
│       │   └── status_test.go
│       ├── tax/
│       │   ├── tax.go
│       │   └── tax_test.go
│       ├── telegram/
│       │   └── telegram.go
│       ├── transcript/
│       │   ├── client.go
│       │   ├── parser.go
│       │   ├── transcript_test.go
│       │   └── types.go
│       └── wifi/
│           ├── wifi_darwin.go
│           └── wifi_linux.go
├── LICENSE
├── Makefile
├── README.md
├── TREE.md
├── go.mod
├── go.sum
└── main.go
```

42 directories, 142 files
