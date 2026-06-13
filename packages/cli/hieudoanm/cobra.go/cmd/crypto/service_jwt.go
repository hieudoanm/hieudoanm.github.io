package crypto

func splitJWT(token string) []string {
	dot1 := -1
	dot2 := -1
	for i, c := range token {
		if c == '.' {
			if dot1 == -1 {
				dot1 = i
			} else if dot2 == -1 {
				dot2 = i
				break
			}
		}
	}
	if dot1 == -1 || dot2 == -1 {
		return []string{token}
	}
	return []string{token[:dot1], token[dot1+1 : dot2]}
}
