package main

import (
	"errors"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

func runProgram(input []string) (int, bool, error) {
	var err error
	loop := false
	acc := 0
	op := 0
	visited := make(map[int]bool)
	for {
		if visited[op] {
			loop = true
			break
		}
		if op >= len(input) {
			break
		}
		if op > len(input) || op < 0 {
			err = errors.New("array index out of bounds")
			break
		}
		visited[op] = true
		parts := strings.Split(input[op], " ")
		cmd := parts[0]
		num, err := strconv.Atoi(parts[1])
		if err != nil {
			log.Fatal(err)
		}
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
	return acc, loop, err
}

func a(input []string) {
	acc, _, _ := runProgram(input)
	log.Println(acc)
}

func b(input []string) {
	for i := 0; i < len(input); i++ {
		dst := make([]string, len(input))
		copy(dst, input)
		if strings.HasPrefix(dst[i], "jmp") {
			dst[i] = strings.Replace(dst[i], "jmp", "nop", -1)
		} else if strings.HasPrefix(dst[i], "nop") {
			dst[i] = strings.Replace(dst[i], "nop", "jmp", -1)
		}
		acc, loop, err := runProgram(dst)
		if err != nil {
		    log.Fatalln(err)
		}
		if !loop {
			log.Println(acc)
			return
		}
	}
	log.Println("no match")
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
