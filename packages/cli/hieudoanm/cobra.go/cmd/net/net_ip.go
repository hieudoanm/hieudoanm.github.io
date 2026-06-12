package net

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/spf13/cobra"
)

type IPInfo struct {
	IP          string `json:"ip"`
	Version     string `json:"version"`
	City        string `json:"city,omitempty"`
	Region      string `json:"region,omitempty"`
	CountryName string `json:"country_name,omitempty"`
	CountryCode string `json:"country_code,omitempty"`
	Postal      string `json:"postal,omitempty"`
	Latitude    string `json:"latitude,omitempty"`
	Longitude   string `json:"longitude,omitempty"`
	Timezone    string `json:"timezone,omitempty"`
	Org         string `json:"org,omitempty"`
	ASN         string `json:"asn,omitempty"`
}

var (
	ipRawFlag bool
	ipJSON    bool
)

func newIPCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "ip",
		Short: "Ip CLI application (utilities tools)",
		Long: `The ip CLI application is a comprehensive backend utility belonging to the utilities suite of tools.

Use this root executable to manage configuring, running, and interacting with all ip-related operations securely and efficiently from your terminal.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			ip, err := fetchPublicIP()
			if err != nil {
				return err
			}

			var info *IPInfo
			provider := "IPinfo"

			info, err = fetchFromIPInfo(ip)
			if err != nil {
				fmt.Fprintf(os.Stderr, "IPinfo failed (%v), falling back to ipapi...\n", err)
				info, err = fetchFromIpapi(ip)
				if err != nil {
					return fmt.Errorf("both providers failed: %w", err)
				}
				provider = "ipapi"
			}

			raw := ipRawFlag || ipJSON
			printIPInfo(info, provider, raw)
			return nil
		},
	}

	cmd.Flags().BoolVarP(&ipRawFlag, "raw", "r", false, "Output raw JSON")
	cmd.Flags().BoolVar(&ipJSON, "json", false, "Output in JSON format")
	cmd.AddCommand(newDNSSubCmd())
	return cmd
}

func fetchPublicIP() (string, error) {
	body, err := requests.Get("https://api.ipify.org?format=json", requests.Options{})
	if err != nil {
		return "", fmt.Errorf("failed to fetch public IP: %w", err)
	}

	var result struct {
		IP string `json:"ip"`
	}
	if err := json.Unmarshal(body, &result); err != nil {
		return "", fmt.Errorf("failed to parse IP response: %w", err)
	}
	return result.IP, nil
}

func fetchFromIPInfo(ip string) (*IPInfo, error) {
	body, err := requests.Get(fmt.Sprintf("https://ipinfo.io/%s/json", ip), requests.Options{})
	if err != nil {
		return nil, fmt.Errorf("IPinfo request failed: %w", err)
	}

	var data struct {
		IP       string `json:"ip"`
		City     string `json:"city"`
		Region   string `json:"region"`
		Country  string `json:"country"`
		Postal   string `json:"postal"`
		Loc      string `json:"loc"`
		Timezone string `json:"timezone"`
		Org      string `json:"org"`
	}
	if err := json.Unmarshal(body, &data); err != nil {
		return nil, fmt.Errorf("failed to parse IPinfo response: %w", err)
	}

	version := "IPv4"
	if strings.Contains(data.IP, ":") {
		version = "IPv6"
	}

	lat, lon := "", ""
	if parts := strings.SplitN(data.Loc, ",", 2); len(parts) == 2 {
		lat, lon = parts[0], parts[1]
	}

	return &IPInfo{
		IP:          data.IP,
		Version:     version,
		City:        data.City,
		Region:      data.Region,
		CountryName: data.Country,
		CountryCode: data.Country,
		Postal:      data.Postal,
		Latitude:    lat,
		Longitude:   lon,
		Timezone:    data.Timezone,
		Org:         data.Org,
		ASN:         data.Org,
	}, nil
}

func fetchFromIpapi(ip string) (*IPInfo, error) {
	body, err := requests.Get(fmt.Sprintf("https://ipapi.co/%s/json/", ip), requests.Options{})
	if err != nil {
		return nil, fmt.Errorf("ipapi request failed: %w", err)
	}

	var data struct {
		IP          string  `json:"ip"`
		Version     string  `json:"version"`
		City        string  `json:"city"`
		Region      string  `json:"region"`
		CountryName string  `json:"country_name"`
		CountryCode string  `json:"country_code"`
		Postal      string  `json:"postal"`
		Latitude    float64 `json:"latitude"`
		Longitude   float64 `json:"longitude"`
		Timezone    string  `json:"timezone"`
		Org         string  `json:"org"`
		ASN         string  `json:"asn"`
	}
	if err := json.Unmarshal(body, &data); err != nil {
		return nil, fmt.Errorf("failed to parse ipapi response: %w", err)
	}

	return &IPInfo{
		IP:          data.IP,
		Version:     data.Version,
		City:        data.City,
		Region:      data.Region,
		CountryName: data.CountryName,
		CountryCode: data.CountryCode,
		Postal:      data.Postal,
		Latitude:    fmt.Sprintf("%f", data.Latitude),
		Longitude:   fmt.Sprintf("%f", data.Longitude),
		Timezone:    data.Timezone,
		Org:         data.Org,
		ASN:         data.ASN,
	}, nil
}

func detectVPN(org string) bool {
	lower := strings.ToLower(org)
	keywords := []string{"cloudflare", "amazon", "google", "digitalocean", "microsoft"}
	for _, kw := range keywords {
		if strings.Contains(lower, kw) {
			return true
		}
	}
	return false
}

func printIPInfo(info *IPInfo, provider string, raw bool) {
	if raw {
		b, _ := json.MarshalIndent(info, "", "  ")
		fmt.Println(string(b))
		return
	}

	fmt.Printf("Provider    : %s\n", provider)
	fmt.Println()
	fmt.Println("── Network Info ──────────────────────")
	fmt.Printf("IP          : %s\n", info.IP)
	fmt.Printf("Version     : %s\n", info.Version)
	fmt.Printf("ASN         : %s\n", info.ASN)
	fmt.Printf("Organization: %s\n", info.Org)
	fmt.Printf("Timezone    : %s\n", info.Timezone)
	fmt.Println()
	fmt.Println("── Location ──────────────────────────")
	fmt.Printf("Country     : %s\n", info.CountryName)
	fmt.Printf("Region      : %s\n", info.Region)
	fmt.Printf("City        : %s\n", info.City)
	fmt.Printf("Postal      : %s\n", info.Postal)
	fmt.Printf("Coordinates : %s, %s\n", info.Latitude, info.Longitude)

	if detectVPN(info.Org) {
		fmt.Println()
		fmt.Println("⚠  Shared hosting / VPN detected. Rate limiting may occur.")
	}
}
