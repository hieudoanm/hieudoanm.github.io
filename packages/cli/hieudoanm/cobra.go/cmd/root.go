package cmd

import (
	"os"

	"github.com/hieudoanm/hieudoanm/cmd/calc"
	"github.com/hieudoanm/hieudoanm/cmd/casino"
	"github.com/hieudoanm/hieudoanm/cmd/chess"
	"github.com/hieudoanm/hieudoanm/cmd/colors"
	"github.com/hieudoanm/hieudoanm/cmd/convert"
	"github.com/hieudoanm/hieudoanm/cmd/crypto"
	"github.com/hieudoanm/hieudoanm/cmd/data"
	"github.com/hieudoanm/hieudoanm/cmd/docsify"
	"github.com/hieudoanm/hieudoanm/cmd/doi"
	"github.com/hieudoanm/hieudoanm/cmd/english"
	"github.com/hieudoanm/hieudoanm/cmd/file"
	"github.com/hieudoanm/hieudoanm/cmd/gh"
	"github.com/hieudoanm/hieudoanm/cmd/image"
	"github.com/hieudoanm/hieudoanm/cmd/net"
	"github.com/hieudoanm/hieudoanm/cmd/openapi"
	"github.com/hieudoanm/hieudoanm/cmd/openrouter"
	"github.com/hieudoanm/hieudoanm/cmd/semver"
	"github.com/hieudoanm/hieudoanm/cmd/system"
	"github.com/hieudoanm/hieudoanm/cmd/telegram"
	"github.com/hieudoanm/hieudoanm/cmd/time"
	"github.com/hieudoanm/hieudoanm/cmd/version"
	"github.com/hieudoanm/hieudoanm/cmd/web"
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
	rootCmd.AddCommand(colors.NewCommand())
	rootCmd.AddCommand(convert.NewCommand())
	rootCmd.AddCommand(crypto.NewCommand())
	rootCmd.AddCommand(data.NewCommand())
	rootCmd.AddCommand(docsify.NewCommand())
	rootCmd.AddCommand(doi.NewCommand())
	rootCmd.AddCommand(english.NewCommand())
	rootCmd.AddCommand(file.NewCommand())
	rootCmd.AddCommand(gh.NewCommand())
	rootCmd.AddCommand(image.NewCommand())
	rootCmd.AddCommand(net.NewCommand())
	rootCmd.AddCommand(openapi.NewCommand())
	rootCmd.AddCommand(openrouter.NewCommand())
	rootCmd.AddCommand(semver.NewCommand())
	rootCmd.AddCommand(system.NewCommand())
	rootCmd.AddCommand(telegram.NewCommand())
	rootCmd.AddCommand(time.NewCommand())
	rootCmd.AddCommand(version.NewCommand())
	rootCmd.AddCommand(web.NewCommand())
}
