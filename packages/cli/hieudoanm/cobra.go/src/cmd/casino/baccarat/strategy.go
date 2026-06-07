package baccarat

import "github.com/hieudoanm/jack/src/cmd/casino/internal"

func baccaratSimHand(d []internal.Card) (playerVal, bankerVal int) {
	player := []internal.Card{d[0], d[1]}
	banker := []internal.Card{d[2], d[3]}
	d = d[4:]

	pv := baccaratSum(player)
	bv := baccaratSum(banker)

	if pv >= 8 || bv >= 8 {
		return pv, bv
	}

	if baccaratShouldDraw(player) {
		player = append(player, d[0])
		d = d[1:]
		pv = baccaratSum(player)
		pc := player[2]
		pVal := baccaratValue(pc)
		if baccaratDrawForThird(banker, pVal) {
			banker = append(banker, d[0])
			d = d[1:]
			bv = baccaratSum(banker)
		}
	} else {
		if baccaratShouldDraw(banker) {
			banker = append(banker, d[0])
			d = d[1:]
			bv = baccaratSum(banker)
		}
	}

	return baccaratSum(player), baccaratSum(banker)
}

func repeat(s string, n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = s[0]
	}
	return string(b)
}
