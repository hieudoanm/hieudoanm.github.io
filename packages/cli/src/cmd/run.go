package cmd

import (
	"fmt"
	"log"

	"github.com/hieudoanm/server"
	"github.com/spf13/cobra"
)

var (
	port string
)

var runCmd = &cobra.Command{
	Use:   "run",
	Short: "Start the webhook HTTP server",
	RunE: func(cmd *cobra.Command, args []string) error {
		addr := fmt.Sprintf(":%s", port)
		log.Printf("Starting webhook server on %s", addr)

		webhookServer := server.NewServer(addr)
		return webhookServer.Start()
	},
}

func init() {
	runCmd.Flags().StringVarP(&port, "port", "p", "8080", "Port to listen on")
	rootCmd.AddCommand(runCmd)
}
