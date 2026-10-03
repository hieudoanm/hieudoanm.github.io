package landify

import "strings"

// OGFrame is the outer geometry: the canvas, its margins, and the header row.
type OGFrame struct {
	Width, Height int
	Pad, Edge     int
	Rail          int
	HeadY         int
	Tile          int
	TileRadius    int
	NameX         int // tile plus the gap after it
	MonogramX     int // centre of the tile
	MonogramSize  int
	Baseline      int // the name and the monogram sit on this line
	HostBaseline  int
	RuleY         int
}

// OGType is the type scale and the baselines the copy lands on.
type OGType struct {
	Name, Host            int
	Kicker, KickerStep    int
	KickerY               int
	Title, TitleStep      int
	TitleY                int
	Description, DescStep int
	DescriptionY          int
	Column                int
}

// OGPanel is the identity panel on the right: a monogram tile over the pills.
type OGPanel struct {
	X, Y, W, H int
	Radius     int
	Tile       int
	TileX      int // the tile shares the padding box's left edge with the pills
	TileY      int
	TileRadius int
	Monogram   int // monogram font size
	MonogramX  int
	MonogramY  int // baseline of the monogram inside the tile
	PillSize   int
}

// OGPill is one tag chip in the panel.
type OGPill struct {
	Label  string
	X, Y   int
	W, H   int
	DotX   int
	DotY   int
	DotR   int
	TextX  int
	TextY  int
	Radius int
}

// ogFrame is the canvas, its margins, and the header row.
func ogFrame() OGFrame {
	return OGFrame{
		Width: ogWidth, Height: ogHeight, Pad: ogPad, Edge: ogEdge,
		Rail: ogRail, HeadY: ogHeadY, Tile: ogHeadTile,
		TileRadius: ogHeadRadius, RuleY: ogRuleY,
		NameX:        ogPad + ogHeadTile + ogNameStep,
		MonogramX:    ogPad + ogHeadTile/2,
		MonogramSize: ogMonoSize,
		Baseline:     ogHeadY + ogHeadLift,
		HostBaseline: ogHeadY + ogHeadNudge,
	}
}

// ogScale is the type scale; ogCenterText fills in the baselines it lands on.
func ogScale() OGType {
	return OGType{
		Name: ogNameSize, Host: ogHostSize,
		Kicker: ogKickerSize, KickerStep: ogKickerStep,
		Title: ogTitleSize, TitleStep: ogTitleStep, Column: ogColumn,
		Description: ogDescSize, DescStep: ogDescStep,
	}
}

// ogPanelBox is the panel frame; ogPills fills in the tile and the chips.
func ogPanelBox() OGPanel {
	tileX := ogPanelX + ogPanelPad
	return OGPanel{
		X: ogPanelX, Y: ogPanelY, W: ogPanelW, H: ogPanelH,
		Radius: ogPanelRadius,
		Tile:   ogPanelTile, TileRadius: ogPanelTileR,
		Monogram:  ogPanelMonogram,
		TileX:     tileX,
		MonogramX: tileX + ogPanelTile/2,
		PillSize:  ogPillSize,
	}
}

// ogCenterText places the copy block between the header rule and the bottom
// margin, so a one-line card and a three-line card both sit in the same
// optical spot. It measures the box the text paints, not just its baselines:
// a kicker and a last-line descender both count.
func ogCenterText(card *OGCard) {
	height := 0
	if card.Kicker != "" {
		height += ogKickerCap + ogKickerStep
	}
	height += (len(card.Lines)-1)*ogTitleStep + ogAscender
	if len(card.DescRuns) > 0 {
		height += ogGap + (len(card.DescRuns)-1)*ogDescStep + ogDescDepth
	} else {
		height += ogTitleDesc
	}
	top := ogTextTop + (ogTextBottom-ogTextTop-height)/2
	if card.Kicker != "" {
		card.Type.KickerY = top + ogKickerCap
		top += ogKickerCap + ogKickerStep
	}
	card.Type.TitleY = top + ogAscender
	if len(card.DescRuns) > 0 {
		card.Type.DescriptionY = card.Type.TitleY + (len(card.Lines)-1)*ogTitleStep + ogGap
	}
}

// ogPills lays out the tag pills inside the identity panel: a monogram tile on
// top, then one pill per tag, the whole stack optically centred in the panel.
// A tag too wide for the panel is truncated, never dropped — a card with four
// tags and a card with none should differ in content, not in furniture.
func ogPills(card *OGCard) {
	inner := float64(ogPanelW - 2*ogPanelPad)
	tags := card.Tags
	if len(tags) > ogPillMax {
		tags = tags[:ogPillMax]
	}
	stack := ogPanelTile + ogPanelGap
	if len(tags) > 0 {
		stack += len(tags)*ogPillH + (len(tags)-1)*ogPillGap
	}
	top := ogPanelY + (ogPanelH-stack)/2
	card.Panel.TileY = top
	card.Panel.MonogramY = top + ogPanelTile/2 + ogMonoLift
	for i, tag := range tags {
		y := top + ogPanelTile + ogPanelGap + i*(ogPillH+ogPillGap)
		ogPill(card, tag, y, inner)
	}
}

// ogPill places one chip at y, left-aligned in the panel, with its label
// truncated to whatever width is left inside the panel's padding.
func ogPill(card *OGCard, tag string, y int, inner float64) {
	label := ogClamp(strings.TrimSpace(tag), ogPillSize, inner-ogPillFrame)
	card.Pills = append(card.Pills, OGPill{
		Label:  label,
		X:      ogPanelX + ogPanelPad,
		Y:      y,
		W:      int(ogTextWidth(label, ogPillSize) + ogPillFrame),
		H:      ogPillH,
		DotX:   ogPanelX + ogPanelPad + ogPillPadX,
		DotY:   y + ogPillH/2,
		TextX:  ogPanelX + ogPanelPad + ogPillPadX + ogPillDot + ogPillTextGap,
		TextY:  y + ogPillH/2 + ogPillLift,
		DotR:   ogPillDot / 2,
		Radius: ogPillH / 2,
	})
}
