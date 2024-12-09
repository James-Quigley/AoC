package main

import (
	"log"
	"os"
	"strings"
)

func main() {
	testBytes, err := os.ReadFile("test.txt")
	if err != nil {
		panic(err)
	}
	testData := string(testBytes)

	inputBytes, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	inputData := string(inputBytes)

	log.Println("Part 1")
	part1(testData)
	part1(inputData)

	log.Println("Part 2")
	part2(testData)
	part2(inputData)

}

type Node struct {
	letter    string
	neighbors []*Node
}

func parseData(data string) [][]*Node {
	lines := strings.Split(data, "\n")
	grid := make([][]*Node, len(lines))
	for row, line := range lines {
		parts := strings.Split(line, "")
		grid[row] = make([]*Node, len(parts))
		for i, part := range parts {
			n := Node{
				letter: part,
			}
			grid[row][i] = &n
		}
	}
	for row := 0; row < len(grid); row++ {
		for col := 0; col < len(grid[row]); col++ {
			n := grid[row][col]
			neighbors := make([]*Node, 8)
			idx := -1
			for i := row - 1; i <= row+1; i++ {
				for j := col - 1; j <= col+1; j++ {
					if i == row && j == col {
						continue
					}
					idx++
					if (i < 0) || (i >= len(grid)) || j < 0 || j >= len(grid[row]) {
						continue
					}
					neighbors[idx] = grid[i][j]
				}
			}
			n.neighbors = neighbors
		}
	}
	return grid
}

func part1(data string) {
	grid := parseData(data)
	total := 0
	for _, row := range grid {
		for _, n := range row {
			if n.letter == "X" {
				for dir := 0; dir < 8; dir++ {
					current := n
					word := ""
					for current != nil && len(word) < 4 {
						word = word + current.letter
						current = current.neighbors[dir]
					}
					if word == "XMAS" {
						total++
					}
				}
			}
		}
	}
	log.Println(total)
}

func part2(data string) {
	grid := parseData(data)
	total := 0
	for _, row := range grid {
		for _, n := range row {
			if n.letter == "A" {
				// Get 4 corners
				corners := []*Node{n.neighbors[0], n.neighbors[2], n.neighbors[7], n.neighbors[5]}
				cornerLetters := ""
				for _, corner := range corners {
					if corner != nil {
						cornerLetters = cornerLetters + corner.letter
					}
				}
				// There's 4 possible orientations. Check each
				if cornerLetters == "MMSS" || cornerLetters == "SMMS" || cornerLetters == "SSMM" || cornerLetters == "MSSM" {
					total++
				}
			}
		}
	}
	log.Println(total)
}
