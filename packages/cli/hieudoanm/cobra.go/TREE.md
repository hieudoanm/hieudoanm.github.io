# TREE

```text
├── cmd/
│   ├── braille/
│   │   └── [braille.go](./cmd/braille/braille.go)
│   ├── calc/
│   │   ├── [calc.go](./cmd/calc/calc.go)
│   │   ├── [calc_compound.go](./cmd/calc/calc_compound.go)
│   │   ├── [calc_compound_test.go](./cmd/calc/calc_compound_test.go)
│   │   ├── [calc_tax.go](./cmd/calc/calc_tax.go)
│   │   └── [calc_tax_test.go](./cmd/calc/calc_tax_test.go)
│   ├── casino/
│   │   ├── [casino.go](./cmd/casino/casino.go)
│   │   ├── [casino_baccarat.go](./cmd/casino/casino_baccarat.go)
│   │   ├── [casino_baccarat_play.go](./cmd/casino/casino_baccarat_play.go)
│   │   ├── [casino_baccarat_strategy.go](./cmd/casino/casino_baccarat_strategy.go)
│   │   ├── [casino_blackjack.go](./cmd/casino/casino_blackjack.go)
│   │   ├── [casino_blackjack_count.go](./cmd/casino/casino_blackjack_count.go)
│   │   ├── [casino_blackjack_play.go](./cmd/casino/casino_blackjack_play.go)
│   │   ├── [casino_poker.go](./cmd/casino/casino_poker.go)
│   │   ├── [casino_poker_odds.go](./cmd/casino/casino_poker_odds.go)
│   │   ├── [casino_poker_odds_eval.go](./cmd/casino/casino_poker_odds_eval.go)
│   │   ├── [casino_poker_odds_sim.go](./cmd/casino/casino_poker_odds_sim.go)
│   │   ├── [casino_poker_play.go](./cmd/casino/casino_poker_play.go)
│   │   ├── [casino_slots.go](./cmd/casino/casino_slots.go)
│   │   └── [casino_slots_play.go](./cmd/casino/casino_slots_play.go)
│   ├── chess/
│   │   ├── lichess/
│   │   │   └── [lichess.org.go](./cmd/chess/lichess/lichess.org.go)
│   │   ├── [chess.go](./cmd/chess/chess.go)
│   │   ├── [chess960.go](./cmd/chess/chess960.go)
│   │   ├── [chess_com_leaderboards.go](./cmd/chess/chess_com_leaderboards.go)
│   │   ├── [chess_com_player.go](./cmd/chess/chess_com_player.go)
│   │   ├── [chess_com_titled.go](./cmd/chess/chess_com_titled.go)
│   │   ├── [chess_elo.go](./cmd/chess/chess_elo.go)
│   │   ├── [chess_fen.go](./cmd/chess/chess_fen.go)
│   │   ├── [chess_fen_eval.go](./cmd/chess/chess_fen_eval.go)
│   │   ├── [chess_fen_svg.go](./cmd/chess/chess_fen_svg.go)
│   │   ├── [chess_openings.go](./cmd/chess/chess_openings.go)
│   │   ├── [chess_pgn.go](./cmd/chess/chess_pgn.go)
│   │   ├── [chess_pgn_fen.go](./cmd/chess/chess_pgn_fen.go)
│   │   ├── [chess_pgn_uci.go](./cmd/chess/chess_pgn_uci.go)
│   │   ├── [chess_play.go](./cmd/chess/chess_play.go)
│   │   ├── [chess_random.go](./cmd/chess/chess_random.go)
│   │   ├── [chess_setup.go](./cmd/chess/chess_setup.go)
│   │   ├── [chess_stockfish.go](./cmd/chess/chess_stockfish.go)
│   │   └── [chess_titles.go](./cmd/chess/chess_titles.go)
│   ├── clipboard/
│   │   └── [clipboard.go](./cmd/clipboard/clipboard.go)
│   ├── clock/
│   │   ├── pomodoro/
│   │   │   └── [pomodoro.go](./cmd/clock/pomodoro/pomodoro.go)
│   │   ├── [clock.go](./cmd/clock/clock.go)
│   │   ├── [clock_now.go](./cmd/clock/clock_now.go)
│   │   └── [clock_pomodoro.go](./cmd/clock/clock_pomodoro.go)
│   ├── colors/
│   │   ├── [cmyk.go](./cmd/colors/cmyk.go)
│   │   ├── [colors.go](./cmd/colors/colors.go)
│   │   ├── [colors_convert_hcl.go](./cmd/colors/colors_convert_hcl.go)
│   │   ├── [colors_convert_hex.go](./cmd/colors/colors_convert_hex.go)
│   │   ├── [colors_convert_oklch.go](./cmd/colors/colors_convert_oklch.go)
│   │   ├── [colors_convert_rgb.go](./cmd/colors/colors_convert_rgb.go)
│   │   ├── [colors_palette.go](./cmd/colors/colors_palette.go)
│   │   ├── [colors_random.go](./cmd/colors/colors_random.go)
│   │   ├── [colors_test.go](./cmd/colors/colors_test.go)
│   │   ├── [hcl.go](./cmd/colors/hcl.go)
│   │   ├── [hex.go](./cmd/colors/hex.go)
│   │   ├── [hsl.go](./cmd/colors/hsl.go)
│   │   ├── [oklch.go](./cmd/colors/oklch.go)
│   │   └── [rgb.go](./cmd/colors/rgb.go)
│   ├── docsify/
│   │   ├── [docsify.go](./cmd/docsify/docsify.go)
│   │   ├── [docsify_cobra.go](./cmd/docsify/docsify_cobra.go)
│   │   ├── [docsify_obsidian.go](./cmd/docsify/docsify_obsidian.go)
│   │   ├── [docsify_scan.go](./cmd/docsify/docsify_scan.go)
│   │   ├── [docsify_tree.go](./cmd/docsify/docsify_tree.go)
│   │   ├── [extractor.go](./cmd/docsify/extractor.go)
│   │   ├── [graph.go](./cmd/docsify/graph.go)
│   │   ├── [walker.go](./cmd/docsify/walker.go)
│   │   └── [writer.go](./cmd/docsify/writer.go)
│   ├── doi/
│   │   ├── [apa.go](./cmd/doi/apa.go)
│   │   ├── [apa_test.go](./cmd/doi/apa_test.go)
│   │   ├── [doi.go](./cmd/doi/doi.go)
│   │   ├── [doi_cite.go](./cmd/doi/doi_cite.go)
│   │   └── [doi_ref.go](./cmd/doi/doi_ref.go)
│   ├── english/
│   │   └── [english.go](./cmd/english/english.go)
│   ├── frankfurter/
│   │   └── [frankfurter.go](./cmd/frankfurter/frankfurter.go)
│   ├── gh/
│   │   ├── [gh.go](./cmd/gh/gh.go)
│   │   ├── [gh_coc.go](./cmd/gh/gh_coc.go)
│   │   ├── [gh_colors.go](./cmd/gh/gh_colors.go)
│   │   ├── [gh_ignore.go](./cmd/gh/gh_ignore.go)
│   │   ├── [gh_languages.go](./cmd/gh/gh_languages.go)
│   │   ├── [gh_license.go](./cmd/gh/gh_license.go)
│   │   └── [gh_og.go](./cmd/gh/gh_og.go)
│   ├── instagram/
│   │   ├── [instagram.go](./cmd/instagram/instagram.go)
│   │   ├── [instagram_download.go](./cmd/instagram/instagram_download.go)
│   │   └── [instagram_download_test.go](./cmd/instagram/instagram_download_test.go)
│   ├── ip/
│   │   ├── [ip.go](./cmd/ip/ip.go)
│   │   └── [ip_dns.go](./cmd/ip/ip_dns.go)
│   ├── morse/
│   │   └── [morse.go](./cmd/morse/morse.go)
│   ├── openapi/
│   │   ├── [openapi.go](./cmd/openapi/openapi.go)
│   │   └── [openapi_postman.go](./cmd/openapi/openapi_postman.go)
│   ├── openrouter/
│   │   ├── chat/
│   │   │   └── [chat.go](./cmd/openrouter/chat/chat.go)
│   │   ├── [config.go](./cmd/openrouter/config.go)
│   │   ├── [openrouter.go](./cmd/openrouter/openrouter.go)
│   │   ├── [openrouter_chat.go](./cmd/openrouter/openrouter_chat.go)
│   │   ├── [openrouter_cmd.go](./cmd/openrouter/openrouter_cmd.go)
│   │   ├── [openrouter_hook.go](./cmd/openrouter/openrouter_hook.go)
│   │   ├── [openrouter_models.go](./cmd/openrouter/openrouter_models.go)
│   │   ├── [openrouter_serve.go](./cmd/openrouter/openrouter_serve.go)
│   │   ├── [openrouter_status.go](./cmd/openrouter/openrouter_status.go)
│   │   └── [openrouter_test.go](./cmd/openrouter/openrouter_test.go)
│   ├── qrcode/
│   │   └── [qrcode.go](./cmd/qrcode/qrcode.go)
│   ├── shopify/
│   │   ├── [shopify.go](./cmd/shopify/shopify.go)
│   │   ├── [shopify_detect.go](./cmd/shopify/shopify_detect.go)
│   │   └── [shopify_test.go](./cmd/shopify/shopify_test.go)
│   ├── snapshot/
│   │   └── [snapshot.go](./cmd/snapshot/snapshot.go)
│   ├── statuspkg/
│   │   └── [statuspkg.go](./cmd/statuspkg/statuspkg.go)
│   ├── string/
│   │   ├── [string.go](./cmd/string/string.go)
│   │   ├── [string_capitalise.go](./cmd/string/string_capitalise.go)
│   │   ├── [string_deburr.go](./cmd/string/string_deburr.go)
│   │   ├── [string_kebabcase.go](./cmd/string/string_kebabcase.go)
│   │   ├── [string_lowercase.go](./cmd/string/string_lowercase.go)
│   │   ├── [string_snakecase.go](./cmd/string/string_snakecase.go)
│   │   └── [string_uppercase.go](./cmd/string/string_uppercase.go)
│   ├── system/
│   │   ├── [system.go](./cmd/system/system.go)
│   │   └── [system_monitor.go](./cmd/system/system_monitor.go)
│   ├── telegram/
│   │   ├── [telegram.go](./cmd/telegram/telegram.go)
│   │   ├── [telegram_cmd.go](./cmd/telegram/telegram_cmd.go)
│   │   ├── [telegram_message.go](./cmd/telegram/telegram_message.go)
│   │   ├── [telegram_message_send.go](./cmd/telegram/telegram_message_send.go)
│   │   ├── [telegram_webhook.go](./cmd/telegram/telegram_webhook.go)
│   │   ├── [telegram_webhook_delete.go](./cmd/telegram/telegram_webhook_delete.go)
│   │   ├── [telegram_webhook_info.go](./cmd/telegram/telegram_webhook_info.go)
│   │   └── [telegram_webhook_set.go](./cmd/telegram/telegram_webhook_set.go)
│   ├── uuidcmd/
│   │   └── [uuidcmd.go](./cmd/uuidcmd/uuidcmd.go)
│   ├── version/
│   │   └── [version.go](./cmd/version/version.go)
│   ├── wificmd/
│   │   ├── [wifi_darwin.go](./cmd/wificmd/wifi_darwin.go)
│   │   ├── [wifi_linux.go](./cmd/wificmd/wifi_linux.go)
│   │   └── [wificmd.go](./cmd/wificmd/wificmd.go)
│   ├── youtube/
│   │   ├── transcript/
│   │   │   ├── [client.go](./cmd/youtube/transcript/client.go)
│   │   │   ├── [parser.go](./cmd/youtube/transcript/parser.go)
│   │   │   ├── [transcript_test.go](./cmd/youtube/transcript/transcript_test.go)
│   │   │   └── [types.go](./cmd/youtube/transcript/types.go)
│   │   ├── [youtube.go](./cmd/youtube/youtube.go)
│   │   ├── [youtube_thumbnails.go](./cmd/youtube/youtube_thumbnails.go)
│   │   └── [youtube_transcript.go](./cmd/youtube/youtube_transcript.go)
│   ├── [cmd_test.go](./cmd/cmd_test.go)
│   └── [root.go](./cmd/root.go)
├── data/
│   └── [countries.go](./data/countries.go)
├── libs/
│   ├── browser/
│   │   ├── [browser.go](./libs/browser/browser.go)
│   │   └── [browser_test.go](./libs/browser/browser_test.go)
│   ├── colors/
│   │   ├── [colors.go](./libs/colors/colors.go)
│   │   └── [colors_test.go](./libs/colors/colors_test.go)
│   ├── number/
│   │   ├── [number.go](./libs/number/number.go)
│   │   └── [number_test.go](./libs/number/number_test.go)
│   ├── requests/
│   │   ├── [requests.go](./libs/requests/requests.go)
│   │   └── [requests_test.go](./libs/requests/requests_test.go)
│   └── theme/
│       └── [theme.go](./libs/theme/theme.go)
├── scripts/
│   └── [install.sh](./scripts/install.sh)
├── [LICENSE](./LICENSE)
├── [Makefile](./Makefile)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [go.mod](./go.mod)
├── [go.sum](./go.sum)
└── [main.go](./main.go)
```

41 directories, 154 files
