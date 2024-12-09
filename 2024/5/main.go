package main

import (
	"log"
	"os"
	"slices"
	"strconv"
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

type ContraintRule []int

type Page = []int

func stringsToInts(s []string) ([]int, error) {
	r := make([]int, len(s))
	for i, v := range s {
		x, err := strconv.Atoi(v)
		if err != nil {
			return nil, err
		}
		r[i] = x
	}
	return r, nil
}

func parseData(data string) ([]ContraintRule, []Page) {
	parts := strings.Split(data, "\n\n")
	constraintLines := strings.Split(parts[0], "\n")
	constraints := make([]ContraintRule, len(constraintLines))
	for i, c := range constraintLines {
		rule, err := stringsToInts(strings.Split(c, "|"))
		if err != nil {
			log.Fatalln(err)
		}
		constraints[i] = rule
	}

	ruleLines := strings.Split(parts[1], "\n")
	pages := make([]Page, len(ruleLines))
	for i, l := range ruleLines {
		page, err := stringsToInts(strings.Split(l, ","))
		if err != nil {
			log.Fatalln(err)
		}
		pages[i] = page
	}

	return constraints, pages
}

func part1(data string) {
	constraints, pages := parseData(data)
	total := 0
	for _, page := range pages {
		isOrdered := true
		for _, constraint := range constraints {
			indexes := []int{-1, -1}
			for i, v := range page {
				for x := 0; x < 2; x++ {
					if v == constraint[x] {
						indexes[x] = i
					}
				}
			}
			if indexes[0] == -1 || indexes[1] == -1 {
				continue
			}
			if indexes[0] > indexes[1] {
				isOrdered = false
				break
			}
		}
		if isOrdered {
			total += page[int(len(page)/2)]
		}
	}
	log.Println(total)
}

func part2(data string) {
	constraints, _ := parseData(data)

	numToThingsItComesBefore := make(map[int][]int)
	numToThingsItComesAfter := make(map[int][]int)

	for _, c := range constraints {
		numToThingsItComesBefore[c[0]] = append(numToThingsItComesBefore[c[0]], c[1])
		if _, ok := numToThingsItComesBefore[c[1]]; !ok {
			numToThingsItComesBefore[c[1]] = []int{}
		}
		numToThingsItComesAfter[c[1]] = append(numToThingsItComesAfter[c[1]], c[0])
		if _, ok := numToThingsItComesAfter[c[0]]; !ok {
			numToThingsItComesAfter[c[0]] = []int{}
		}
	}

	var start, end int
	for k, v := range numToThingsItComesBefore {
		if len(v) == 0 {
			end = k
		}
	}
	for k, v := range numToThingsItComesAfter {
		if len(v) == 0 {
			start = k
		}
	}
	log.Println(start)
	log.Println(end)

	order := []int{}
	stack := []int{end}
	visited := make(map[int]bool)
	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if visited[current] {
			continue
		}
		isValid := true
		for _, n := range numToThingsItComesBefore[current] {
			if !visited[n] {
				isValid = false
				break
			}
		}
		if !isValid {
			continue
		}
		order = append(order, current)
		stack = append(stack, numToThingsItComesAfter[current]...)
		visited[current] = true
	}

	slices.Reverse(order)
	log.Println(order)

	// TODO TODO TODO
	// Turns out this isn't a DAG, so gotta throw out this approach and try something different

}
