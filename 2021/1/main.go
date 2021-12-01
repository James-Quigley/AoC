package main

import (
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

func main() {
	data, err := ioutil.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(data), "\n")
	nums := make([]int, len(lines))
	for i, s := range lines {
		n, err := strconv.Atoi(s)
		if err != nil {
			panic(err)
		}
		nums[i] = n
	}
	inc := 0
	for i := 1; i < len(nums); i++ {
		if nums[i] > nums[i-1] {
			inc++
		}
	}
	log.Println(inc)

	inc = 0
	for i := 1; i < len(nums) - 2; i++ {
		if nums[i] + nums[i+1] + nums[i+2] > nums[i-1] + nums[i] + nums[i+1]{
			inc++
		} 
	}
	log.Println(inc)
}