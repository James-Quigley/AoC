package main

import (
	"io/ioutil"
	"log"
	"sort"
	"strconv"
	"strings"
)

func containsSum(target int, input []string) bool {
	m := make(map[int]bool)
	for _, i := range input {
		x, _ := strconv.Atoi(i)
		if !m[x] {
			m[x] = true
		} else {
			continue
		}
		if m[target-x] {
			return true
		}
	}
	return false
}

func a(input []string) {
	WindowLength := 25
	for i := WindowLength; i < len(input); i++ {
		x, _ := strconv.Atoi(input[i])
		if !containsSum(x, input[i-WindowLength:i]) {
			log.Println(x)
			return
		}
	}
}

func b(input []string) {
	target := 14360655

	for i, s := range input {
		x, _ := strconv.Atoi(s)
		sum := x
		for j := i + 1; j < len(input); j++ {
			y, _ := strconv.Atoi(input[j])
			sum = sum + y
			if sum == target {
				arr := input[i : j+1]
				intArr := make([]int, len(arr))
				for z, v := range arr {
					tmp, _ := strconv.Atoi(v)
					intArr[z] = tmp
				}
				sort.Ints(intArr)
				log.Println(intArr[0] + intArr[len(intArr)-1])
				return
			}
			if sum > target {
				break
			}
		}
	}
}

func main() {
	data, err := ioutil.ReadFile("9.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
