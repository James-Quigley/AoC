package main

import "log"

func findMostRecentIndex(input []int, v int) int {
	index := -1
	for i, n := range input {
		if v == n {
			index = i
		}
	}
	return index
}

func a(input []int) {
	i := len(input)
	for i < 2020 {
		idx := findMostRecentIndex(input[0:i-1], input[i-1])
		if idx < 0 {
			input = append(input, 0)
		} else {
			input = append(input, i-1-idx)
		}
		i++
	}
	log.Println(input[len(input)-1])
}

func b(input []int) {
	m := make(map[int]int)
	for i := 0; i < len(input)-1; i++ {
		m[input[i]] = i
	}
	i := len(input)
	for i < 30000000 {
		idx, exists := m[input[i-1]]
		if !exists {
			input = append(input, 0)
			m[input[i-1]] = i - 1
		} else {
			input = append(input, i-1-idx)
			m[input[i-1]] = i - 1
		}
		i++
	}
	log.Println(input[len(input)-1])
}

func main() {
	input := []int{6, 4, 12, 1, 20, 0, 16}
	a(input)
	b(input)
}
