package main

import (
	"io/ioutil"
	"log"
	"math"
	"regexp"
	"strconv"
	"strings"
)

// strconv.FormatInt(n, base)

func a(input []string) {
	mask := "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
	re := regexp.MustCompile("mem\\[(\\d+)\\]")
	m := make(map[int]int)
	for _, line := range input {
		parts := strings.Split(line, " = ")
		if parts[0] == "mask" {
			mask = parts[1]
			continue
		}
		value, _ := strconv.Atoi(parts[1])
		binary := strconv.FormatInt(int64(value), 2)
		binString := string(binary)
		for len(binString) < 36 {
			binString = "0" + binString
		}

		matches := re.FindStringSubmatch(parts[0])
		address, _ := strconv.Atoi(matches[1])

		resultStr := ""
		for i, char := range binString {
			if mask[i] == 'X' {
				resultStr = resultStr + string(char)
			} else {
				resultStr = resultStr + string(mask[i])
			}
		}
		result, _ := strconv.ParseInt(resultStr, 2, 0)

		m[address] = int(result)
	}
	sum := 0
	for _, v := range m {
		sum = sum + v
	}
	log.Println(sum)
}

func countX(s string) int {
	total := 0
	for _, char := range s {
		if char == 'X' {
			total++
		}
	}
	return total
}

func b(input []string) {
	mask := "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
	re := regexp.MustCompile("mem\\[(\\d+)\\]")
	m := make(map[int]int)
	for _, line := range input {
		parts := strings.Split(line, " = ")
		if parts[0] == "mask" {
			mask = parts[1]
			continue
		}

		value, _ := strconv.Atoi(parts[1])

		matches := re.FindStringSubmatch(parts[0])
		address, _ := strconv.Atoi(matches[1])
		addressBinary := strconv.FormatInt(int64(address), 2)
		for len(addressBinary) < 36 {
			addressBinary = "0" + addressBinary
		}

		resultStr := ""
		for i, char := range addressBinary {
			if mask[i] == '0' {
				resultStr = resultStr + string(char)
			} else {
				resultStr = resultStr + string(mask[i])
			}
		}

		xCount := countX(resultStr)
		if xCount == 0 {
			add, _ := strconv.ParseInt(resultStr, 2, 0)
			m[int(add)] = value
			continue
		}
		for i := 0; i < int(math.Pow(2, float64(xCount))); i++ {
			binString := string(strconv.FormatInt(int64(i), 2))
			for len(binString) < xCount {
				binString = "0" + binString
			}
			tmpAddress := resultStr
			idx := 0

			finalAddress := ""
			for _, char := range tmpAddress {
				if char == 'X' {
					finalAddress = finalAddress + string(binString[idx])
					idx++
				} else {
					finalAddress = finalAddress + string(char)
				}
			}
			addrStr, _ := strconv.ParseInt(finalAddress, 2, 0)
			m[int(addrStr)] = value
		}
	}

	sum := 0
	for _, v := range m {
		sum = sum + v
	}
	log.Println(sum)
}

func main() {
	data, err := ioutil.ReadFile("14.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
