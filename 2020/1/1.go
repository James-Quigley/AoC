package main

import (
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

func a(input []string) {
	TARGET := 2020
	set := make(map[int]bool)
	for _, s := range input {
		x, _ := strconv.Atoi(s)
		set[x] = true
		compl := TARGET - x
		exists := set[compl]
		if exists {
			log.Println(x, compl, x*compl)
			break
		}

	}

}

func b(input []string) {
	TARGET := 2020
	set := make(map[int]bool)
	for idx, s := range input {
		x, _ := strconv.Atoi(s)
		set[x] = true
		for idx2, s2 := range input {
			if idx2 != idx {
				x2, _ := strconv.Atoi(s2)
				set[x2] = true
				compl := TARGET - x - x2
				exists := set[compl]
				if exists {
					log.Println(x, x2, compl, x*x2*compl)
					return
				}
			}
		}

	}
}

func main() {

	data, err := ioutil.ReadFile("1.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
