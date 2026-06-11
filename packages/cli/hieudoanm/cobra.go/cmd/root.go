package cmd

import (
	"os"

	"github.com/hieudoanm/hieudoanm/cmd/calc"
	"github.com/hieudoanm/hieudoanm/cmd/casino"
	"github.com/hieudoanm/hieudoanm/cmd/chess"
	"github.com/hieudoanm/hieudoanm/cmd/clipboard"
	"github.com/hieudoanm/hieudoanm/cmd/clock"
	"github.com/hieudoanm/hieudoanm/cmd/colors"
	"github.com/hieudoanm/hieudoanm/cmd/convert"
	"github.com/hieudoanm/hieudoanm/cmd/cron"
	"github.com/hieudoanm/hieudoanm/cmd/csv"
	"github.com/hieudoanm/hieudoanm/cmd/docsify"
	"github.com/hieudoanm/hieudoanm/cmd/doi"
	"github.com/hieudoanm/hieudoanm/cmd/english"
	"github.com/hieudoanm/hieudoanm/cmd/epoch"
	"github.com/hieudoanm/hieudoanm/cmd/gh"
	"github.com/hieudoanm/hieudoanm/cmd/hash"
	"github.com/hieudoanm/hieudoanm/cmd/instagram"
	"github.com/hieudoanm/hieudoanm/cmd/ip"
	"github.com/hieudoanm/hieudoanm/cmd/jsontool"
	"github.com/hieudoanm/hieudoanm/cmd/jwt"
	"github.com/hieudoanm/hieudoanm/cmd/openapi"
	"github.com/hieudoanm/hieudoanm/cmd/openrouter"
	"github.com/hieudoanm/hieudoanm/cmd/passwd"
	"github.com/hieudoanm/hieudoanm/cmd/qrcode"
	"github.com/hieudoanm/hieudoanm/cmd/semver"
	"github.com/hieudoanm/hieudoanm/cmd/shopify"
	"github.com/hieudoanm/hieudoanm/cmd/snapshot"
	"github.com/hieudoanm/hieudoanm/cmd/statuspkg"
	"github.com/hieudoanm/hieudoanm/cmd/system"
	"github.com/hieudoanm/hieudoanm/cmd/telegram"
	"github.com/hieudoanm/hieudoanm/cmd/timercmd"
	"github.com/hieudoanm/hieudoanm/cmd/uuidcmd"
	"github.com/hieudoanm/hieudoanm/cmd/version"
	"github.com/hieudoanm/hieudoanm/cmd/weather"
	"github.com/hieudoanm/hieudoanm/cmd/wificmd"
	"github.com/hieudoanm/hieudoanm/cmd/ymlcmd"
	"github.com/hieudoanm/hieudoanm/cmd/youtube"
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "hieudoanm",
	Short: "Hieu Doan's personal CLI toolbox",
	Long:  `A collection of CLI utilities covering system monitoring, cloud service status, currency conversion, text processing, UUID generation, and more.`,
}

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	rootCmd.AddCommand(calc.NewCommand())
	rootCmd.AddCommand(casino.NewCommand())
	rootCmd.AddCommand(chess.NewCommand())
	rootCmd.AddCommand(clipboard.NewCommand())
	rootCmd.AddCommand(clock.NewCommand())
	rootCmd.AddCommand(colors.NewCommand())
	rootCmd.AddCommand(convert.NewCommand())
	rootCmd.AddCommand(cron.NewCommand())
	rootCmd.AddCommand(csv.NewCommand())
	rootCmd.AddCommand(docsify.NewCommand())
	rootCmd.AddCommand(doi.NewCommand())
	rootCmd.AddCommand(english.NewCommand())
	rootCmd.AddCommand(epoch.NewCommand())
	rootCmd.AddCommand(gh.NewCommand())
	rootCmd.AddCommand(hash.NewCommand())
	rootCmd.AddCommand(instagram.NewCommand())
	rootCmd.AddCommand(ip.NewCommand())
	rootCmd.AddCommand(jsontool.NewCommand())
	rootCmd.AddCommand(jwt.NewCommand())
	rootCmd.AddCommand(openapi.NewCommand())
	rootCmd.AddCommand(semver.NewCommand())
	rootCmd.AddCommand(openrouter.NewCommand())
	rootCmd.AddCommand(passwd.NewCommand())
	rootCmd.AddCommand(qrcode.NewCommand())
	rootCmd.AddCommand(shopify.NewCommand())
	rootCmd.AddCommand(snapshot.NewCommand())
	rootCmd.AddCommand(statuspkg.NewCommand())
	rootCmd.AddCommand(system.NewCommand())
	rootCmd.AddCommand(telegram.NewCommand())
	rootCmd.AddCommand(timercmd.NewCommand())
	rootCmd.AddCommand(uuidcmd.NewCommand())
	rootCmd.AddCommand(version.NewCommand())
	rootCmd.AddCommand(weather.NewCommand())
	rootCmd.AddCommand(wificmd.NewCommand())
	rootCmd.AddCommand(ymlcmd.NewCommand())
	rootCmd.AddCommand(youtube.NewCommand())
}
