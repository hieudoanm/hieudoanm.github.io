package time

import "time"

var commonZones = map[string]string{
	"utc":       "UTC",
	"ny":        "America/New_York",
	"london":    "Europe/London",
	"tokyo":     "Asia/Tokyo",
	"hcmc":      "Asia/Ho_Chi_Minh",
	"hanoi":     "Asia/Ho_Chi_Minh",
	"sf":        "America/Los_Angeles",
	"la":        "America/Los_Angeles",
	"paris":     "Europe/Paris",
	"berlin":    "Europe/Berlin",
	"mumbai":    "Asia/Kolkata",
	"beijing":   "Asia/Shanghai",
	"seoul":     "Asia/Seoul",
	"sydney":    "Australia/Sydney",
	"dubai":     "Asia/Dubai",
	"singapore": "Asia/Singapore",
	"hk":        "Asia/Hong_Kong",
	"ams":       "Europe/Amsterdam",
	"chi":       "America/Chicago",
	"den":       "America/Denver",
	"phx":       "America/Phoenix",
}

func loadLocation(name string) (*time.Location, error) {
	if alias, ok := commonZones[name]; ok {
		name = alias
	}
	return time.LoadLocation(name)
}
