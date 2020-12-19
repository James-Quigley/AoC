package main

import (
	"io/ioutil"
	"log"
	"strings"
)

func isSame(a, b [][]rune) bool {
	for i := 0; i < len(a); i++ {
		aline := a[i]
		bline := b[i]
		for j := 0; j < len(aline); j++ {
			if aline[j] != bline[j] {
				return false
			}
		}
	}
	return true
}

type countingFunc func([][]rune, int, int) int

func countSurrounding(input [][]rune, x, y int) int {
	seats := 0
	for i := x - 1; i <= x+1; i++ {
		for j := y - 1; j <= y+1; j++ {
			if i >= 0 && i < len(input) && j >= 0 && j < len(input[0]) {
				if !(x == i && y == j) && input[i][j] == '#' {
					seats++
				}
			}
		}
	}
	return seats
}

func countVisibleOccupied(input [][]rune, x, y int) int {
	seats := 0
	for i := x + 1; i < len(input); i++ {
		char := input[i][y]
		if char == '#' {
			seats++
			break
		}
		if char == 'L' {
			break
		}
	}
	for i := x - 1; i >= 0; i-- {
		char := input[i][y]
		if char == '#' {
			seats++
			break
		}
		if char == 'L' {
			break
		}
	}
	for j := y + 1; j < len(input[0]); j++ {
		char := input[x][j]
		if char == '#' {
			seats++
			break
		}
		if char == 'L' {
			break
		}
	}
	for j := y - 1; j >= 0; j-- {
		char := input[x][j]
		if char == '#' {
			seats++
			break
		}
		if char == 'L' {
			break
		}
	}
	i, j := x+1, y+1
	for {
		if i >= len(input) || j >= len(input[0]) {
			break
		}
		char := input[i][j]
		if char == '#' {
			seats++
			break
		}
		if char == 'L' {
			break
		}
		i++
		j++
	}
	i, j = x+1, y-1
	for {
		if i >= len(input) || j < 0 {
			break
		}
		char := input[i][j]
		if char == '#' {
			seats++
			break
		}
		if char == 'L' {
			break
		}
		i++
		j--
	}
	i, j = x-1, y-1
	for {
		if i < 0 || j < 0 {
			break
		}
		char := input[i][j]
		if char == '#' {
			seats++
			break
		}
		if char == 'L' {
			break
		}
		i--
		j--
	}
	i, j = x-1, y+1
	for {
		if i < 0 || j >= len(input[0]) {
			break
		}
		char := input[i][j]
		if char == '#' {
			seats++
			break
		}
		if char == 'L' {
			break
		}
		i--
		j++
	}
	return seats
}

func countOccupied(input [][]rune) int {
	occupied := 0
	for _, line := range input {
		for _, char := range line {
			if char == '#' {
				occupied++
			}
		}
	}
	return occupied
}

func tick(input [][]rune, seatLeaveThreshold int, countFunc countingFunc) [][]rune {
	dest := make([][]rune, len(input))
	for i := 0; i < len(input); i++ {
		dest[i] = make([]rune, len(input[i]))
		for j := 0; j < len(input[0]); j++ {
			count := countFunc(input, i, j)
			if input[i][j] == 'L' && count == 0 {
				dest[i][j] = '#'
			} else if input[i][j] == '#' && count >= seatLeaveThreshold {
				dest[i][j] = 'L'
			} else {
				dest[i][j] = input[i][j]
			}
		}
	}
	return dest
}

func makeRuneSlice(input []string) [][]rune {
	s := make([][]rune, len(input))
	for i, line := range input {
		l := make([]rune, len(line))
		for j, char := range line {
			l[j] = char
		}
		s[i] = l
	}
	return s
}

func a(input []string) {
	arr := makeRuneSlice(input)
	for {
		n := tick(arr, 4, countSurrounding)
		if isSame(arr, n) {
			log.Println(countOccupied(n))
			return
		}

		arr = n
	}
}

func b(input []string) {
	arr := makeRuneSlice(input)
	ticks := 0
	for {
		n := tick(arr, 5, countVisibleOccupied)
		ticks++
		if isSame(arr, n) {
			log.Println(countOccupied(n))
			return
		}
		if ticks%1000 == 0 {
			log.Println("ticks", ticks)
		}

		arr = n
	}
}

func main() {
	data, err := ioutil.ReadFile("11.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
