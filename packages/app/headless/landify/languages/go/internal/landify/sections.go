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

// FAQ powers the "faq" page type: a question-and-answer list rendered with
// native <details>/<summary> elements, so it needs no JavaScript.
type FAQ struct {
	Heading string    `yaml:"heading"`
	Sub     string    `yaml:"sub"`
	Items   []FAQItem `yaml:"items"`
}

// FAQItem is a single question with its answer.
type FAQItem struct {
	Question string `yaml:"question"`
	Answer   string `yaml:"answer"`
}

// Team powers the "team" page type: an optional values strip above a grid of
// member cards.
type Team struct {
	Heading string       `yaml:"heading"`
	Sub     string       `yaml:"sub"`
	Values  []TeamValue  `yaml:"values"`
	Members []TeamMember `yaml:"members"`
}

// TeamValue is one principle card in a team values strip.
type TeamValue struct {
	Icon  string `yaml:"icon"`
	Title string `yaml:"title"`
	Body  string `yaml:"body"`
}

// TeamMember is one person card on a team page.
type TeamMember struct {
	Name   string `yaml:"name"`
	Role   string `yaml:"role"`
	Bio    string `yaml:"bio"`
	Avatar string `yaml:"avatar"`
}

// Status powers the "status" page type: a current-service-state banner with
// optional uptime stats and a recent incidents list.
type Status struct {
	Heading      string         `yaml:"heading"`
	Sub          string         `yaml:"sub"`
	State        string         `yaml:"state"`
	Updated      string         `yaml:"updated"`
	Announcement string         `yaml:"announcement"`
	Stats        []StatusStat   `yaml:"stats"`
	Incidents    []StatusTicket `yaml:"incidents"`
}

// StatusStat is one uptime/health figure (label/value pair).
type StatusStat struct {
	Label string `yaml:"label"`
	Value string `yaml:"value"`
}

// StatusTicket is one row in the recent incidents list.
type StatusTicket struct {
	Date  string `yaml:"date"`
	Title string `yaml:"title"`
	State string `yaml:"state"`
	Body  string `yaml:"body"`
}

// Linktree powers the "linktree" page type: a compact profile page with a
// centered list of big link cards and optional social links. It has no hero
// section; the profile block replaces it.
type Linktree struct {
	Heading string     `yaml:"heading"`
	Sub     string     `yaml:"sub"`
	Avatar  string     `yaml:"avatar"`
	Cards   []LinkCard `yaml:"cards"`
	Social  []NavItem  `yaml:"social"`
}

// LinkCard is one big rounded button on a linktree page.
type LinkCard struct {
	Title string `yaml:"title"`
	Href  string `yaml:"href"`
	Icon  string `yaml:"icon"`
	Note  string `yaml:"note"`
}
