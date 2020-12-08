package main

import (
	"log"
	"strings"
	"strconv"
	"io/ioutil"
)

func a(input []string) {
	acc := 0
	op := 0
	visited := make(map[int]bool)
	for {
		if visited[op] {
			log.Println(acc)
			return
		}
		visited[op] = true
		parts := strings.Split(input[op], " ")
		cmd := parts[0]
		num, err := strconv.Atoi(parts[1])
		if err != nil {
			log.Fatal(err)
		}
		log.Println(op, cmd, num)
		switch cmd {
		case "acc":
			acc = acc + num
			op = op + 1
			break
		case "jmp":
			op = op + num
			break
		default:
			op = op + 1
			break
		}
	}
}

func b(input []string) {

}

func main() {
	data, err := ioutil.ReadFile("8.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}