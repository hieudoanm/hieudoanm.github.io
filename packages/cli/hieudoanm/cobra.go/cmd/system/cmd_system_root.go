package system

import "github.com/spf13/cobra"

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "system",
		Short: "System utilities",
		Long:  `System monitoring and clipboard management.`,
	}
	cmd.AddCommand(
		newMonitorCmd(),
		newClipboardCmd(),
		newInfoCmd(),
		newEnvCmd(),
		newPathCmd(),
		newDiskCmd(),
		newBatteryCmd(),
	)
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
