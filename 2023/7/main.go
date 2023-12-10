package main

import (
	"log"
	"os"
	"sort"
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

type Hand struct {
	cards    string
	bid      int
	handType int
}

func getHandType(cards string) int {
	// Determine hand type
	// 0: High card
	// 1: Pair
	// 2: Two pair
	// 3: Three of a kind
	// 4: Full House
	// 5: Four of a kind
	// 6: Five of a kind

	chars := strings.Split(cards, "")
	sort.Strings(chars)

	// Check for five of a kind
	if chars[0] == chars[4] {
		return 6
	}

	// Check for four of a kind
	if chars[0] == chars[3] || chars[1] == chars[4] {
		return 5
	}

	// Check for full house
	if (chars[0] == chars[2] && chars[3] == chars[4]) || (chars[0] == chars[1] && chars[2] == chars[4]) {
		return 4
	}

	// Check for three of a kind
	if chars[0] == chars[2] || chars[1] == chars[3] || chars[2] == chars[4] {
		return 3
	}

	// Check for two pair
	if
	// odd card in 5th position
	(chars[0] == chars[1] && chars[2] == chars[3]) ||
		// odd card in middle position
		(chars[0] == chars[1] && chars[3] == chars[4]) ||
		// odd card in first position
		(chars[1] == chars[2] && chars[3] == chars[4]) {
		return 2
	}
	// Check for pair
	if chars[0] == chars[1] || chars[1] == chars[2] || chars[2] == chars[3] || chars[3] == chars[4] {
		return 1
	}
	return 0
}

// A hand consists of five cards labeled one of A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2.
// The relative strength of each card follows this order, where A is the highest and 2 is the lowest.
func getCardValue(card string) int {
	switch card {
	case "A":
		return 14
	case "K":
		return 13
	case "Q":
		return 12
	case "J":
		return 11
	case "T":
		return 10
	default:
		n, err := strconv.Atoi(card)
		if err != nil {
			log.Fatalln(err)
		}
		return n
	}
}

func part1(data string) {
	lines := strings.Split(data, "\n")
	hands := make([]Hand, len(lines))
	for i, line := range lines {
		parts := strings.Split(line, " ")
		bid, err := strconv.Atoi(parts[1])
		if err != nil {
			log.Fatalln(err)
		}
		hands[i] = Hand{
			cards:    parts[0],
			bid:      bid,
			handType: getHandType(parts[0]),
		}
	}

	sort.Slice(hands, func(i, j int) bool {
		if hands[i].handType == hands[j].handType {
			for x := 0; x < len(hands[i].cards); x++ {
				if hands[i].cards[x] == hands[j].cards[x] {
					continue
				}

				return getCardValue(string(hands[i].cards[x])) < getCardValue(string(hands[j].cards[x]))
			}
		}
		return hands[i].handType < hands[j].handType
	})

	total := 0
	for i := 0; i < len(hands); i++ {
		total += hands[i].bid * (i + 1)
	}
	log.Println(total)

}

func part2GetCardValue(card string) int {
	switch card {
	case "A":
		return 14
	case "K":
		return 13
	case "Q":
		return 12
	case "J":
		return 1
	case "T":
		return 10
	default:
		n, err := strconv.Atoi(card)
		if err != nil {
			log.Fatalln(err)
		}
		return n
	}
}

func part2GetHandType(cards string) int {
	// Determine hand type
	// 0: High card
	// 1: Pair
	// 2: Two pair
	// 3: Three of a kind
	// 4: Full House
	// 5: Four of a kind
	// 6: Five of a kind
	// J counts as a wildcard

	chars := strings.Split(cards, "")
	sort.Strings(chars)

	m := make(map[string]int)
	for _, c := range chars {
		m[c]++
	}

	jokers := m["J"]
	delete(m, "J")

	highestCount := 0
	for _, v := range m {
		if v > highestCount {
			highestCount = v
		}
	}

	newHighestCount := highestCount + jokers
	if newHighestCount == 5 {
		return 6
	}
	if newHighestCount == 4 {
		return 5
	}

	// Check for full house
	if newHighestCount == 3 && len(m) == 2 {
		return 4
	}

	// Check for three of a kind
	if newHighestCount == 3 {
		return 3
	}

	// Check for two pair
	if newHighestCount == 2 && len(m) == 3 {
		return 2
	}
	// Check for pair
	if newHighestCount == 2 {
		return 1
	}
	return 0
}

func part2(data string) {
	lines := strings.Split(data, "\n")
	hands := make([]Hand, len(lines))
	for i, line := range lines {
		parts := strings.Split(line, " ")
		bid, err := strconv.Atoi(parts[1])
		if err != nil {
			log.Fatalln(err)
		}
		hands[i] = Hand{
			cards:    parts[0],
			bid:      bid,
			handType: part2GetHandType(parts[0]),
		}
	}

	sort.Slice(hands, func(i, j int) bool {
		if hands[i].handType == hands[j].handType {
			for x := 0; x < len(hands[i].cards); x++ {
				if hands[i].cards[x] == hands[j].cards[x] {
					continue
				}

				return part2GetCardValue(string(hands[i].cards[x])) < part2GetCardValue(string(hands[j].cards[x]))
			}
		}
		return hands[i].handType < hands[j].handType
	})

	total := 0
	for i := 0; i < len(hands); i++ {
		total += hands[i].bid * (i + 1)
	}
	log.Println(total)
}
