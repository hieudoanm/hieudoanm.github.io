package web

import "github.com/spf13/cobra"

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "web",
		Short: "Web service tools",
		Long:  `Interact with web services: download Instagram content, detect Shopify sites, capture page snapshots, fetch weather, and retrieve YouTube transcripts.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(
		newInstagramCmd(),
		newShopifyCmd(),
		newSnapshotCmd(),
		newWeatherCmd(),
		newYoutubeCmd(),
	)
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
