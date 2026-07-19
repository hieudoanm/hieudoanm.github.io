package cmd

import (
	"os"
	"time"

	"github.com/hieudoanm/jack/src/cmd/better"
	"github.com/hieudoanm/jack/src/cmd/calc"
	"github.com/hieudoanm/jack/src/cmd/casino"
	"github.com/hieudoanm/jack/src/cmd/chess"
	"github.com/hieudoanm/jack/src/cmd/colors"
	"github.com/hieudoanm/jack/src/cmd/completion"
	"github.com/hieudoanm/jack/src/cmd/convert"
	"github.com/hieudoanm/jack/src/cmd/crypto"
	"github.com/hieudoanm/jack/src/cmd/data"
	"github.com/hieudoanm/jack/src/cmd/docsify"
	"github.com/hieudoanm/jack/src/cmd/doi"
	"github.com/hieudoanm/jack/src/cmd/english"
	"github.com/hieudoanm/jack/src/cmd/file"
	"github.com/hieudoanm/jack/src/cmd/games"
	"github.com/hieudoanm/jack/src/cmd/gemini"
	"github.com/hieudoanm/jack/src/cmd/gh"
	history_cmd "github.com/hieudoanm/jack/src/cmd/history"
	"github.com/hieudoanm/jack/src/cmd/image"
	"github.com/hieudoanm/jack/src/cmd/mcp"
	"github.com/hieudoanm/jack/src/cmd/net"
	"github.com/hieudoanm/jack/src/cmd/openapi"
	"github.com/hieudoanm/jack/src/cmd/openrouter"
	"github.com/hieudoanm/jack/src/cmd/pdf"
	"github.com/hieudoanm/jack/src/cmd/port"
	"github.com/hieudoanm/jack/src/cmd/search"
	"github.com/hieudoanm/jack/src/cmd/semver"
	"github.com/hieudoanm/jack/src/cmd/system"
	"github.com/hieudoanm/jack/src/cmd/telegram"
	time_cmd "github.com/hieudoanm/jack/src/cmd/time"
	"github.com/hieudoanm/jack/src/cmd/version"
	"github.com/hieudoanm/jack/src/cmd/video"
	"github.com/hieudoanm/jack/src/cmd/web"
	"github.com/hieudoanm/jack/src/cmd/write"
	"github.com/hieudoanm/jack/src/libs/history"
	"github.com/spf13/cobra"
)

var lastCommandPath string

var osGetwd = os.Getwd

var rootCmd = &cobra.Command{
	Use:   "hieudoanm",
	Short: "Hieu Doan's personal CLI toolbox",
	Long:  `A collection of CLI utilities covering system monitoring, cloud service status, currency conversion, text processing, UUID generation, and more.`,
	Example: `  hieudoanm calc bmi --height 175 --weight 70
  hieudoanm casino blackjack
  hieudoanm convert base64 --input "hello world"
  hieudoanm crypto uuid
  hieudoanm data json --pretty --file data.json
  hieudoanm file read main.go
  hieudoanm net ip
  hieudoanm system monitor
  hieudoanm time now
  hieudoanm version`,
	PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
		lastCommandPath = cmd.CommandPath()
		return nil
	},
}

func getCWD() string {
	d, err := osGetwd()
	if err != nil {
		return ""
	}
	return d
}

func shouldTrack(cmdPath string) bool {
	if cmdPath == "" || cmdPath == "hieudoanm" {
		return false
	}
	for _, prefix := range []string{"hieudoanm help", "hieudoanm completion", "hieudoanm history", "hieudoanm mcp"} {
		if len(cmdPath) >= len(prefix) && cmdPath[:len(prefix)] == prefix {
			return false
		}
	}
	return true
}

func trackCommand(start time.Time, err error) {
	if !shouldTrack(lastCommandPath) {
		return
	}
	entry := history.Entry{
		Timestamp:  start.Format(time.RFC3339),
		Source:     "cli",
		Command:    lastCommandPath,
		CWD:        getCWD(),
		DurationMs: time.Since(start).Milliseconds(),
	}
	if err != nil {
		entry.Error = err.Error()
	}
	history.Append(entry)
}

func Execute() {
	start := time.Now()
	err := rootCmd.Execute()
	trackCommand(start, err)
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	rootCmd.AddCommand(better.NewCommand())
	rootCmd.AddCommand(calc.NewCommand())
	rootCmd.AddCommand(casino.NewCommand())
	rootCmd.AddCommand(chess.NewCommand())
	rootCmd.AddCommand(colors.NewCommand())
	rootCmd.AddCommand(completion.NewCommand(rootCmd))
	rootCmd.AddCommand(convert.NewCommand())
	rootCmd.AddCommand(crypto.NewCommand())
	rootCmd.AddCommand(data.NewCommand())
	rootCmd.AddCommand(docsify.NewCommand())
	rootCmd.AddCommand(doi.NewCommand())
	rootCmd.AddCommand(english.NewCommand())
	rootCmd.AddCommand(file.NewCommand())
	rootCmd.AddCommand(games.NewCommand())
	rootCmd.AddCommand(gemini.NewCommand())
	rootCmd.AddCommand(gh.NewCommand())
	rootCmd.AddCommand(history_cmd.NewCommand())
	rootCmd.AddCommand(image.NewCommand())
	rootCmd.AddCommand(mcp.NewCommand(rootCmd))
	rootCmd.AddCommand(net.NewCommand())
	rootCmd.AddCommand(openapi.NewCommand())
	rootCmd.AddCommand(openrouter.NewCommand())
	rootCmd.AddCommand(pdf.NewCommand())
	rootCmd.AddCommand(port.NewCommand())
	rootCmd.AddCommand(search.NewCommand())
	rootCmd.AddCommand(semver.NewCommand())
	rootCmd.AddCommand(system.NewCommand())
	rootCmd.AddCommand(telegram.NewCommand())
	rootCmd.AddCommand(time_cmd.NewCommand())
	rootCmd.AddCommand(version.NewCommand())
	rootCmd.AddCommand(video.NewCommand())
	rootCmd.AddCommand(web.NewCommand())
	rootCmd.AddCommand(write.NewCommand())
}
