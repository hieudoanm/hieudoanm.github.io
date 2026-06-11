package uuidcmd

import (
	"fmt"
	"os"

	"github.com/google/uuid"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var uuidVersion int

	cmd := &cobra.Command{
		Use:   "uuid",
		Short: "Generate UUIDs (v1, v4, v7)",
		Long:  `A simple UUID generator that supports versions 1 (time-based), 4 (random), and 7 (time-ordered random).`,
		Run: func(cmd *cobra.Command, args []string) {
			var u uuid.UUID
			var err error

			switch uuidVersion {
			case 1:
				u, err = uuid.NewUUID()
			case 4:
				u = uuid.New()
			case 7:
				u, err = uuid.NewV7()
			default:
				u = uuid.New()
			}

			if err != nil {
				fmt.Fprintf(os.Stderr, "Error: failed to generate UUID v%d: %v\n", uuidVersion, err)
				os.Exit(1)
			}

			fmt.Println(u.String())
		},
	}

	cmd.Flags().IntVarP(&uuidVersion, "version", "v", 4, "UUID version to generate (1, 4, or 7)")
	return cmd
}
