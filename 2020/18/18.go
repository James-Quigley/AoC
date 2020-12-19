package main

import (
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

func contains(slice []rune, r rune) bool {
	for _, char := range slice {
		if r == char {
			return true
		}
	}
	return false
}

func doMath(line string) int {
	line = strings.ReplaceAll(line, " ", "")

	for i := strings.Index(line, "("); i != -1; i = strings.Index(line, "(") {
		parenCount := 1
		parenIdx := i
		for j := i + 1; j < len(line); j++ {
			if line[j] == '(' {
				parenCount++
				continue
			}
			if line[j] == ')' {
				parenCount--
				if parenCount == 0 {
					result := strconv.Itoa(doMath(line[parenIdx+1 : j]))
					line = line[:parenIdx] + result + line[j+1:]
					break
				}
			}
		}
	}

	ops := []rune{'*', '+', '(', ')'}
	stack := make([]string, 0)
	currentNum := ""
	for _, char := range line {
		if !contains(ops, char) {
			currentNum = currentNum + string(char)
			continue
		}

		if len(stack) < 2 {
			stack = append(stack, currentNum, string(char))
			currentNum = ""
			continue
		}
		op := stack[len(stack)-1]
		a := stack[len(stack)-2]
		stack = stack[:len(stack)-2]
		x, _ := strconv.Atoi(a)
		y, _ := strconv.Atoi(currentNum)
		var result int
		switch op {
		case "+":
			result = x + y
		case "*":
			result = x * y
		}
		currentNum = ""
		stack = append(stack, strconv.Itoa(result), string(char))
	}
	stack = append(stack, currentNum)
	for len(stack) > 1 {
		op := stack[len(stack)-2]
		a := stack[len(stack)-3]
		b := stack[len(stack)-1]
		stack = stack[:len(stack)-3]
		x, _ := strconv.Atoi(a)
		y, _ := strconv.Atoi(b)
		var result int
		switch op {
		case "+":
			result = x + y
		case "*":
			result = x * y
		}
		stack = append(stack, strconv.Itoa(result))
	}
	final, _ := strconv.Atoi(stack[0])
	return final
}

func doMathB(line string) int {
	line = strings.ReplaceAll(line, " ", "")

	for i := strings.Index(line, "("); i != -1; i = strings.Index(line, "(") {
		parenCount := 1
		parenIdx := i
		for j := i + 1; j < len(line); j++ {
			if line[j] == '(' {
				parenCount++
				continue
			}
			if line[j] == ')' {
				parenCount--
				if parenCount == 0 {
					result := strconv.Itoa(doMathB(line[parenIdx+1 : j]))
					line = line[:parenIdx] + result + line[j+1:]
					break
				}
			}
		}
	}

	multis := strings.Split(line, "*")
	for i, s := range multis {
		adds := strings.Split(s, "+")
		sum := 0
		for _, n := range adds {
			x, _ := strconv.Atoi(n)
			sum = sum + x
		}
		multis[i] = strconv.Itoa(sum)
	}

	total := 1
	for _, s := range multis {
		x, _ := strconv.Atoi(s)
		total = total * x
	}
	return total
}

func a(input []string) {
	total := 0
	for _, line := range input {
		total = total + doMath(line)
	}
	log.Println(total)
}

func b(input []string) {
	total := 0
	for _, line := range input {
		total = total + doMathB(line)
	}
	log.Println(total)
}

func main() {
	data, err := ioutil.ReadFile("18.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
