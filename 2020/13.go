package main

import (
	"io/ioutil"
	"log"
	"sort"
	"strconv"
	"strings"
)

func closestMultipleOverThreshold(threshold, x int) int {
	if threshold%x == 0 {
		return threshold
	}
	return ((threshold / x) + 1) * x
}

func a(input []string) {
	t, err := strconv.Atoi(input[0])
	if err != nil {
		panic(err)
	}
	buses := strings.Split(input[1], ",")
	inService := make([]int, 0)
	for _, bus := range buses {
		if bus != "x" {
			id, err := strconv.Atoi(bus)
			if err != nil {
				panic(err)
			}
			inService = append(inService, id)
		}
	}
	sort.Ints(inService)
	closestBus := 0
	minutes := 99999999
	for _, bus := range inService {
		if t%bus == 0 {
			log.Println(0)
			return
		}
		multiple := closestMultipleOverThreshold(t, bus)
		diff := multiple - t
		if diff < minutes {
			closestBus = bus
			minutes = diff
		}
	}
	log.Println(closestBus * minutes)
}

func b(input []string) {
	busesStr := strings.Split(input[1], ",")
	buses := make([]int, len(busesStr))
	for i, bus := range busesStr {
		if bus == "x" {
			buses[i] = 1
		} else {
			id, err := strconv.Atoi(bus)
			if err != nil {
				panic(err)
			}
			buses[i] = id
		}
	}

	timestamp := 1
	for {
		found := true
		offsetIfNoMatch := 1
		for j := 0; j < len(buses); j++ {
			if (timestamp+j)%buses[j] != 0 {
				found = false
				break
			}
			offsetIfNoMatch *= buses[j]
		}
		if found {
			log.Println(timestamp)
			return
		}
		timestamp += offsetIfNoMatch
	}
}

func main() {

	data, err := ioutil.ReadFile("13.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
