package crypto

import (
	"encoding/json"
	"fmt"

	"github.com/google/uuid"
	"github.com/spf13/cobra"
)

var uuidJSON bool

func newUUIDCmd() *cobra.Command {
	var count int

	cmd := &cobra.Command{
		Use:   "uuid",
		Short: "Generate UUID v4 identifiers",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			var uuids []string
			for i := 0; i < count; i++ {
				uuids = append(uuids, uuid.New().String())
			}

			if uuidJSON {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"uuids": uuids,
					"count": count,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				for _, u := range uuids {
					fmt.Println(u)
				}
			}
			return nil
		},
	}

	cmd.Flags().IntVarP(&count, "count", "n", 1, "Number of UUIDs to generate")
	cmd.Flags().BoolVar(&uuidJSON, "json", false, "Output in JSON format")
	return cmd
}
