package system

import "github.com/spf13/cobra"

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "system",
		Short: "System utilities",
		Long:  `System monitoring and clipboard management.`,
	}
	cmd.AddCommand(
		newMonitorCmd(),
		newClipboardCmd(),
	)
	return cmd
}
