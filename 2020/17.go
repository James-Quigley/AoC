package main

import (
	"io/ioutil"
	"log"
	"strings"
)

func makeGrid(size int) [][][]rune {
	grid := make([][][]rune, size)
	for x := range grid {
		grid[x] = make([][]rune, size)
		for y := range grid[x] {
			grid[x][y] = make([]rune, size)
			for z := range grid[x][y] {
				grid[x][y][z] = '.'
			}
		}
	}
	return grid
}

func makeGrid4(size int) [][][][]rune {
	grid := make([][][][]rune, size)
	for x := range grid {
		grid[x] = make([][][]rune, size)
		for y := range grid[x] {
			grid[x][y] = make([][]rune, size)
			for z := range grid[x][y] {
				grid[x][y][z] = make([]rune, size)
				for w := range grid[x][y][z] {
					grid[x][y][z][w] = '.'
				}
			}
		}
	}
	return grid
}

func countActiveAdjacent(x, y, z int, grid [][][]rune) int {
	count := 0
	for i := x - 1; i <= x+1; i++ {
		for j := y - 1; j <= y+1; j++ {
			for k := z - 1; k <= z+1; k++ {
				if i >= 0 && i < len(grid) && j >= 0 && j < len(grid) && k >= 0 && k < len(grid) {
					if i == x && j == y && k == z {
						continue
					}
					if grid[i][j][k] == '#' {
						count++
					}
				}
			}
		}
	}
	return count
}

func countActiveAdjacent4(x, y, z, w int, grid [][][][]rune) int {
	count := 0
	for i := x - 1; i <= x+1; i++ {
		for j := y - 1; j <= y+1; j++ {
			for k := z - 1; k <= z+1; k++ {
				for l := w - 1; l <= w+1; l++ {
					if i >= 0 && i < len(grid) && j >= 0 && j < len(grid) && k >= 0 && k < len(grid) && l >= 0 && l < len(grid) {
						if i == x && j == y && k == z && l == w {
							continue
						}
						if grid[i][j][k][l] == '#' {
							count++
						}
					}
				}
			}
		}
	}
	return count
}

func tick(grid [][][]rune) [][][]rune {
	newGrid := makeGrid(len(grid))
	for i := range grid {
		for j := range grid[i] {
			for k := range grid[i][j] {
				activeAdjacent := countActiveAdjacent(i, j, k, grid)
				char := grid[i][j][k]
				var newChar rune
				if char == '#' && (activeAdjacent < 2 || activeAdjacent > 3) {
					newChar = '.'
				} else if char == '.' && activeAdjacent == 3 {
					newChar = '#'
				} else {
					newChar = char
				}
				newGrid[i][j][k] = newChar
			}
		}
	}
	return newGrid
}

func tick4(grid [][][][]rune) [][][][]rune {
	newGrid := makeGrid4(len(grid))
	for i := range grid {
		for j := range grid[i] {
			for k := range grid[i][j] {
				for l := range grid[i][j][k] {
					activeAdjacent := countActiveAdjacent4(i, j, k, l, grid)
					char := grid[i][j][k][l]
					var newChar rune
					if char == '#' && (activeAdjacent < 2 || activeAdjacent > 3) {
						newChar = '.'
					} else if char == '.' && activeAdjacent == 3 {
						newChar = '#'
					} else {
						newChar = char
					}
					newGrid[i][j][k][l] = newChar
				}
			}
		}
	}
	return newGrid
}

func a(input []string) {
	size := 101
	grid := makeGrid(size)
	for i, line := range input {
		for j, char := range line {
			x := (size / 2) + i
			y := (size / 2) + j
			grid[x][y][size/2] = char
		}
	}
	cycles := 0
	for cycles < 6 {
		log.Println("tick")
		grid = tick(grid)
		cycles++
	}
	total := 0
	for x := range grid {
		for y := range grid[x] {
			for z := range grid[x][y] {
				if grid[x][y][z] == '#' {
					total++
				}
			}
		}
	}
	log.Println(total)
}

func b(input []string) {
	size := 30
	grid := makeGrid4(size)
	for i, line := range input {
		for j, char := range line {
			x := (size / 2) - (len(line) / 2) + i
			y := (size / 2) - (len(line) / 2) + j
			grid[x][y][size/2][size/2] = char
		}
	}
	cycles := 0
	for cycles < 6 {
		log.Println("tick")
		grid = tick4(grid)
		cycles++
	}
	total := 0
	for x := range grid {
		for y := range grid[x] {
			for z := range grid[x][y] {
				for w := range grid[x][y][z] {
					if grid[x][y][z][w] == '#' {
						total++
					}
				}
			}
		}
	}
	log.Println(total)
}

func main() {
	data, err := ioutil.ReadFile("17.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
