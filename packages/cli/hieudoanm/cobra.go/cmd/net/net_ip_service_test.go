package net

import "testing"

func TestDetectVPN_KnownProviders(t *testing.T) {
	providers := []string{
		"Cloudflare, Inc.",
		"Amazon Web Services",
		"Google Cloud Platform",
		"DigitalOcean, LLC",
		"Microsoft Corporation",
		"cloudflare",
		"amazon",
		"google",
		"digitalocean",
		"microsoft",
	}

	for _, org := range providers {
		t.Run(org, func(t *testing.T) {
			if !detectVPN(org) {
				t.Errorf("detectVPN(%q) = false, want true", org)
			}
		})
	}
}

func TestDetectVPN_NonMatchingOrgs(t *testing.T) {
	orgs := []string{
		"ACME Corp",
		"My ISP",
		"University of Testing",
		"",
		"Some Other Company",
	}

	for _, org := range orgs {
		t.Run(org, func(t *testing.T) {
			if detectVPN(org) {
				t.Errorf("detectVPN(%q) = true, want false", org)
			}
		})
	}
}

func TestDetectVPN_PartialMatch(t *testing.T) {
	if !detectVPN("MyCloudflareService") {
		t.Errorf("detectVPN(%q) = false, want true", "MyCloudflareService")
	}
	if !detectVPN("SomethingAmazonSomething") {
		t.Errorf("detectVPN(%q) = false, want true", "SomethingAmazonSomething")
	}
}

func TestIPInfo_Struct(t *testing.T) {
	info := IPInfo{
		IP:          "1.2.3.4",
		Version:     "IPv4",
		City:        "TestCity",
		Region:      "TestRegion",
		CountryName: "TestCountry",
		CountryCode: "TC",
		Postal:      "12345",
		Latitude:    "10.0",
		Longitude:   "20.0",
		Timezone:    "UTC",
		Org:         "TestOrg",
		ASN:         "AS12345",
	}

	if info.IP != "1.2.3.4" {
		t.Errorf("IPInfo.IP = %q, want %q", info.IP, "1.2.3.4")
	}
	if info.Org != "TestOrg" {
		t.Errorf("IPInfo.Org = %q, want %q", info.Org, "TestOrg")
	}
}
