package main

import (
	"io/ioutil"
	"log"
	"math"
	"strconv"
	"strings"
)

func newPos(x, y, dist int, dir string) (int, int) {
	x2, y2 := x, y
	switch dir {
	case "N":
		y2 = y + dist
	case "E":
		x2 = x + dist
	case "S":
		y2 = y - dist
	case "W":
		x2 = x - dist
	}
	return x2, y2
}

func manhattanDist(x, y int) int {
	return int(math.Abs(float64(x)) + math.Abs(float64(y)))
}

func newDir(dir, cmd string, dist int) string {
	start := 0

	switch dir {
	case "N":
		start = 0
	case "E":
		start = 90
	case "S":
		start = 180
	case "W":
		start = 270
	}

	mult := 1
	if cmd == "L" {
		mult = -1
	}

	degree := (start + (dist * mult)) % 360
	if degree < 0 {
		degree = 360 + degree
	}

	switch degree {
	case 0:
		return "N"
	case 90:
		return "E"
	case 180:
		return "S"
	case 270:
		return "W"
	default:
		panic(degree)
	}
}

func contains(s []string, x string) bool {
	for _, n := range s {
		if x == n {
			return true
		}
	}
	return false
}

func a(input []string) {
	dir := "E"
	x, y := 0, 0
	for _, line := range input {
		cmd := line[0:1]
		distStr := line[1:]
		dist, err := strconv.Atoi(distStr)
		if err != nil {
			panic(err)
		}
		if cmd == "L" || cmd == "R" {
			dir = newDir(dir, cmd, dist)
			continue
		}
		if cmd == "F" {
			cmd = dir
		}
		x, y = newPos(x, y, dist, cmd)
	}
	log.Println(manhattanDist(x, y))
}

func b(input []string) {
	shipX, shipY := 0, 0
	waypointX, waypointY := 10, 1
	for _, line := range input {
		cmd := line[0:1]
		distStr := line[1:]
		dist, err := strconv.Atoi(distStr)
		if err != nil {
			panic(err)
		}
		if contains([]string{"N", "S", "E", "W"}, cmd) {
			waypointX, waypointY = newPos(waypointX, waypointY, dist, cmd)
			continue
		}
		if cmd == "F" {
			x, y := waypointX, waypointY
			for i := 0; i < dist; i++ {
				shipX = shipX + x
				shipY = shipY + y
			}
		}
		if cmd == "L" || cmd == "R" {
			x, y := waypointX, waypointY
			if dist == 180 {
				waypointX = waypointX * -1
				waypointY = waypointY * -1
				continue
			}

			if (cmd == "L" && dist == 90) || (cmd == "R" && dist == 270) {
				waypointX = y * -1
				waypointY = x
				continue
			}
			waypointX = y
			waypointY = x * -1
		}
	}

	log.Println(manhattanDist(shipX, shipY))
}

func main() {

	data, err := ioutil.ReadFile("12.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
