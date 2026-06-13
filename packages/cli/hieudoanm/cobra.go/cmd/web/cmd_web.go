package web

import "github.com/spf13/cobra"

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "web",
		Short: "Web service tools",
		Long:  `Interact with web services: download Instagram content, detect Shopify sites, capture page snapshots, fetch weather, and retrieve YouTube transcripts.`,
	}
	cmd.AddCommand(
		newInstagramCmd(),
		newShopifyCmd(),
		newSnapshotCmd(),
		newWeatherCmd(),
		newYoutubeCmd(),
	)
	return cmd
}
