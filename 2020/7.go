package main

import (
	"io/ioutil"
	"log"
	"regexp"
	"strconv"
	"strings"
)

type SubBag struct {
	color string
	count int
}

type Bag struct {
	color string
	bags  []SubBag
}

func buildBagMap(input []string) map[string]Bag {
	bagMap := make(map[string]Bag)
	re := regexp.MustCompile("(\\d+) (.+) bags?")
	for _, line := range input {
		parts := strings.Split(line, " bags contain ")
		color := parts[0]
		var subBags []string
		if parts[1] == "no other bags." {
			subBags = make([]string, 0)
		} else {
			subBags = strings.Split(parts[1], ",")
		}
		bag := Bag{
			color: color,
			bags:  make([]SubBag, len(subBags)),
		}
		log.Println(bag)
		for i, sub := range subBags {
			match := re.FindStringSubmatch(sub)
			for _, x := range match {
				log.Println(x)
			}
			log.Println("matches", match)
			count, _ := strconv.Atoi(match[1])
			subColor := match[2]
			bag.bags[i] = SubBag{subColor, count}
		}
		log.Println(bag)
		bagMap[color] = bag
	}
	return bagMap
}

func bagContainsColor(bag Bag, color string, bagMap map[string]Bag) bool {
	if len(bag.bags) == 0 {
		return false
	}
	for _, subBag := range bag.bags {
		if subBag.color == color {
			return true
		}
	}
	for _, subBag := range bag.bags {
		found := bagContainsColor(bagMap[subBag.color], color, bagMap)
		if found {
			return true
		}
	}

	return false
}

func countBags(bag Bag, bagMap map[string]Bag) int {
	count := 0
	for _, subBag := range bag.bags {
		count = count + (countBags(bagMap[subBag.color], bagMap)+1) * subBag.count
	}

	return count
}

func a(input []string) {
	bagMap := buildBagMap(input)
	count := 0
	for _, bag := range bagMap {
		if bagContainsColor(bag, "shiny gold", bagMap) {
			count = count + 1
		}
	}
	log.Println(count)
}

func b(input []string) {
	bagMap := buildBagMap(input)
	log.Println(countBags(bagMap["shiny gold"], bagMap))
}

func main() {
	data, err := ioutil.ReadFile("7.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
