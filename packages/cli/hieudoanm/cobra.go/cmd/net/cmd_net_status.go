package net

import (
	"encoding/json"
	"fmt"

	"charm.land/bubbles/v2/spinner"
	tea "charm.land/bubbletea/v2"
	"github.com/spf13/cobra"
)

func newStatusCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "status",
		Short: "Check the uptime status of cloud services",
		Long:  `Check and display the current operational status of various cloud services including Atlassian, GitHub, Vercel, and more via a Bubble Tea TUI.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			var services []ServiceStatus
			for _, servicesByGroup := range Services {
				for name, url := range servicesByGroup {
					services = append(services, ServiceStatus{
						Name: name,
						URL:  url,
					})
				}
			}

			if statusJSON {
				results := make([]map[string]interface{}, 0)
				for _, svc := range services {
					out := GetDescriptiveStatus(svc.Name, svc.URL, statusDebug)
					results = append(results, map[string]interface{}{
						"name":   svc.Name,
						"status": out,
					})
				}
				b, _ := json.MarshalIndent(results, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			sp := spinner.New()
			sp.Spinner = spinner.Dot

			m := statusModel{
				services: services,
				loading:  true,
				total:    len(services),
				spinner:  sp,
			}

			if _, err := tea.NewProgram(m).Run(); err != nil {
				return fmt.Errorf("error running TUI: %w", err)
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&statusDebug, "debug", "d", false, "Enable debug logging")
	cmd.Flags().BoolVar(&statusJSON, "json", false, "Output in JSON format")
	return cmd
}
