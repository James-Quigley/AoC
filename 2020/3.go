package main

import (
	"io/ioutil"
	"log"
	"strings"
)

func a(input []string) {
	y, trees := 0, 0
	yCount := len(strings.Split(input[0], ""))
	for _, line := range input {
		if rune(line[y]) == '#' {
			trees = trees + 1
		}
		y = (y + 3) % (yCount)
	}
	log.Println(trees)
}

type Slope struct {
	right int
	down  int
}

func b(input []string) {
	/*

	   Right 1, down 1.
	   Right 3, down 1. (This is the slope you already checked.)
	   Right 5, down 1.
	   Right 7, down 1.
	   Right 1, down 2.

	*/
	slopes := []Slope{{1, 1}, {3, 1}, {5, 1}, {7, 1}, {1, 2}}

	totalTrees := 1
	for _, slope := range slopes {
		log.Println(slope)
		x, y, trees := 0, 0, 0
		for {
			if rune(input[x][y]) == '#' {
				trees = trees + 1
			}

			x = (x + slope.down)
			y = (y + slope.right) % len(strings.Split(input[0], ""))

			if x >= len(input) {
				totalTrees = totalTrees * trees
				break
			}
		}
	}

	log.Println(totalTrees)

}

func main() {

	data, err := ioutil.ReadFile("3.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
