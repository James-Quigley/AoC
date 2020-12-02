package main

import (
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

type Password struct {
	char     string
	min      int
	max      int
	password string
}

func parsePassword(line string) Password {
	splitLine := strings.Split(line, ":")
	p := splitLine[1]
	rules := strings.Split(splitLine[0], " ")
	minMax := strings.Split(rules[0], "-")
	min, _ := strconv.Atoi(minMax[0])
	max, _ := strconv.Atoi(minMax[1])

	return Password{
		char:     rules[1],
		min:      min,
		max:      max,
		password: p,
	}

}

func a(input []string) {
	count := 0
	for _, line := range input {
		password := parsePassword(line)
		c := strings.Count(password.password, password.char)
		if c >= password.min && c <= password.max {
			count = count + 1
		}
	}
	log.Println(count)
}

func b(input []string) {
	count := 0
	for _, line := range input {
		password := parsePassword(line)
		first := password.password[password.min:password.min+1] == password.char
		second := password.password[password.max:password.max+1] == password.char
		if (first || second) && !(first && second) {
			count = count + 1
		}
	}
	log.Println(count)
}

func main() {

	data, err := ioutil.ReadFile("2.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
