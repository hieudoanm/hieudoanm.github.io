package landify

// Pricing powers the "pricing" page type: a grid of tier cards with a
// highlighted (tagged) plan and an optional footnote.
type Pricing struct {
	Heading string        `yaml:"heading"`
	Sub     string        `yaml:"sub"`
	Note    string        `yaml:"note"`
	Tiers   []PricingTier `yaml:"tiers"`
}

// PricingTier is one card in a pricing grid.
type PricingTier struct {
	Name   string   `yaml:"name"`
	Price  string   `yaml:"price"`
	Period string   `yaml:"period"`
	Tag    string   `yaml:"tag"`
	CTA    Button   `yaml:"cta"`
	Perks  []string `yaml:"perks"`
}

// App powers the "app" page type: an app-store-style page with store badges,
// a rating line, and an optional portrait screenshot gallery.
type App struct {
	Stores  []AppStore `yaml:"stores"`
	Ratings string     `yaml:"ratings"`
	Reviews string     `yaml:"reviews"`
	Shots   []Shot     `yaml:"shots"`
}

// AppStore is a store download link (App Store, Play Store, ...) with an
// optional emoji icon.
type AppStore struct {
	Name string `yaml:"name"`
	Icon string `yaml:"icon"`
	Href string `yaml:"href"`
}

// Shot is one portrait (9:16) app screenshot with an optional caption.
type Shot struct {
	Title string `yaml:"title"`
	Src   string `yaml:"src"`
}

// Portfolio powers the "portfolio" page type: a personal page with an avatar,
// skills chips, and a project card grid.
type Portfolio struct {
	Name     string    `yaml:"name"`
	Role     string    `yaml:"role"`
	Location string    `yaml:"location"`
	Avatar   string    `yaml:"avatar"`
	About    string    `yaml:"about"`
	Skills   []string  `yaml:"skills"`
	Projects []Project `yaml:"projects"`
}

// Project is a card in a portfolio project grid.
type Project struct {
	Icon  string `yaml:"icon"`
	Title string `yaml:"title"`
	Body  string `yaml:"body"`
	Href  string `yaml:"href"`
}

// Docs powers the "docs" page type: a documentation landing page with topic
// card links and an optional code sample.
type Docs struct {
	Heading  string    `yaml:"heading"`
	Sub      string    `yaml:"sub"`
	Sample   string    `yaml:"sample"`
	Packages []DocCard `yaml:"packages"`
}

// DocCard is a linked topic card on a docs landing page.
type DocCard struct {
	Icon  string `yaml:"icon"`
	Title string `yaml:"title"`
	Body  string `yaml:"body"`
	Href  string `yaml:"href"`
}
