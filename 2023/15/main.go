package main

import (
	"log"
	"os"
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

func HASH(word string) int {
	h := 0
	for _, c := range word {
		h += int(c)
		h *= 17
		h %= 256
	}
	return h
}

func part1(data string) {
	words := strings.Split(data, ",")

	total := 0
	for _, word := range words {
		total += HASH(word)
	}

	log.Println(total)
}

func part2(data string) {
	words := strings.Split(data, ",")

	m := make(map[int][]string)
	for _, w := range words {
		if strings.HasSuffix(w, "-") {
			label := strings.Replace(w, "-", "", -1)
			h := HASH(label)
			for i, s := range m[h] {
				if strings.HasPrefix(s, label) {
					m[h] = append(m[h][:i], m[h][i+1:]...)
				}
			}
			continue
		}
		parts := strings.Split(w, "=")
		label := parts[0]
		value := parts[1]
		h := HASH(label)
		alreadyExists := false
		for i, s := range m[h] {
			if strings.HasPrefix(s, label) {
				m[h][i] = label + "=" + value
				alreadyExists = true
				break
			}
		}
		if !alreadyExists {
			m[h] = append(m[h], label+"="+value)
		}
	}
	total := 0

	for k, v := range m {
		if len(v) == 0 {
			continue
		}
		for i, s := range v {
			parts := strings.Split(s, "=")
			valueStr := parts[1]
			value, err := strconv.Atoi(valueStr)
			if err != nil {
				log.Fatalln(err)
			}
			power := (1 + k) * (i + 1) * value
			total += power
		}
	}
	log.Println(total)
}
