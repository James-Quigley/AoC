package main

import (
	"io/ioutil"
	"log"
	"sort"
	"strconv"
	"strings"
)

func makeIntSlice(input []string) []int {
	arr := make([]int, len(input))
	for i, el := range input {
		x, _ := strconv.Atoi(el)
		arr[i] = x
	}
	return arr
}

func a(input []string) {
	arr := makeIntSlice(input)
	sort.Ints(arr)
	arr = append([]int{0}, arr...)
	arr = append(arr, arr[len(arr)-1]+3)
	oneDiffs, threeDiffs := 0, 0
	for i := 1; i < len(arr); i++ {
		diff := arr[i] - arr[i-1]
		switch diff {
		case 1:
			oneDiffs++
			break
		case 2:
			break
		case 3:
			threeDiffs++
			break
		default:
			log.Fatal("Wrong diff", diff)
		}
	}
	log.Println(oneDiffs * threeDiffs)
}

func contains(s []int, x int) bool {
	for _, n := range s {
		if x == n {
			return true
		}
	}
	return false
}

func isValid(original, input []int) bool {
	if len(input) < 2 || !contains(input, original[0]) || !contains(input, original[len(original)-1]) {
		return false
	}
	for i := 1; i < len(input); i++ {
		if input[i]-input[i-1] > 3 {
			return false
		}
	}
	return true
}

// https://github.com/mxschmitt/golang-combinations/blob/master/combinations.go
func All(set []int) (subsets [][]int) {
	length := uint(len(set))

	// Go through all possible combinations of objects
	// from 1 (only first object in subset) to 2^length (all objects in subset)
	for subsetBits := 1; subsetBits < (1 << length); subsetBits++ {
		var subset []int

		for object := uint(0); object < length; object++ {
			// checks if object is contained in subset
			// by checking if bit 'object' is set in subsetBits
			if (subsetBits>>object)&1 == 1 {
				// add object to subset
				subset = append(subset, set[object])
			}
		}
		// add subset to subsets
		subsets = append(subsets, subset)
	}
	return subsets
}

func b(input []string) {
	arr := makeIntSlice(input)
	sort.Ints(arr)
	arr = append([]int{0}, arr...)
	arr = append(arr, arr[len(arr)-1]+3)
	pivots := make([]int, 1)

	lists := make([][]int, 0)
	currentSlice := []int{arr[0]}
	for i := 1; i < len(arr)-1; i++ {
		currentSlice = append(currentSlice, arr[i])
		if arr[i+1]-arr[i-1] > 3 {
			pivots = append(pivots, i)
			if len(currentSlice) > 1 {
				lists = append(lists, currentSlice)
			}
			currentSlice = []int{arr[i]}
		}
	}
	currentSlice = append(currentSlice, arr[len(arr)-1])
	lists = append(lists, currentSlice)

	total := 1
	for _, list := range lists {
		listTotal := 0
		combinations := All(list)
		for _, combo := range combinations {
			if isValid(list, combo) {
				listTotal++
			}
		}
		total = total * listTotal
	}
	log.Println(total)
}

func main() {
	data, err := ioutil.ReadFile("10.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	// (0) 1 (3) (5) 7 8 (9) (12)
	// test := []string{"1", "3", "5", "7", "8", "9"}
	b(inputArr)
}
