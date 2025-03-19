package array

func IndexOf(array []float64, value float64, fromIndex int) int {
	var slice []float64 = array[fromIndex:]
	for idx, v := range slice {
		if v == value {
			return idx + fromIndex
		}
	}
	return -1
}

func LastIndexOf(array []float64, value float64, fromIndex int) int {
	var index int = -1
	var slice []float64 = array[0 : len(array)-fromIndex]
	for idx, v := range slice {
		if v == value {
			index = idx
		}
	}
	return index
}
