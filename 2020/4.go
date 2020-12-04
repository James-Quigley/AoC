package main

import (
	"io/ioutil"
	"log"
	"regexp"
	"strconv"
	"strings"
)

func isValidA(p map[string]string) bool {
	return p["byr"] != "" &&
		p["iyr"] != "" &&
		p["eyr"] != "" &&
		p["hgt"] != "" &&
		p["hcl"] != "" &&
		p["ecl"] != "" &&
		p["pid"] != ""
}

func isValidB(p map[string]string) bool {
	allPresent := p["byr"] != "" &&
		p["iyr"] != "" &&
		p["eyr"] != "" &&
		p["hgt"] != "" &&
		p["hcl"] != "" &&
		p["ecl"] != "" &&
		p["pid"] != ""
	if !allPresent {
		log.Println("Missing field")
		return false
	}

	byr, _ := strconv.Atoi(p["byr"])
	if byr < 1920 || byr > 2002 {
		log.Println("Invalid byr", byr)
		return false
	}

	iyr, _ := strconv.Atoi(p["iyr"])
	if iyr < 2010 || iyr > 2020 {
		log.Println("Invalid iyr", iyr)
		return false
	}

	eyr, _ := strconv.Atoi(p["eyr"])
	if eyr < 2020 || eyr > 2030 {
		log.Println("Invalid eyr", eyr)
		return false
	}

	re := regexp.MustCompile("^(\\d{2,3})(cm|in)$")
	parts := re.FindStringSubmatch(p["hgt"])
	if len(parts) < 3 {
		log.Println("Missing parts of height", p["hgt"], parts)
		return false
	}
	hgt, _ := strconv.Atoi(parts[1])
	switch parts[2] {
	case "cm":
		if hgt < 150 || hgt > 193 {
			log.Println("Invalid hgt: cm ", p["hgt"], parts)
			return false
		}
		break
	case "in":
		if hgt < 59 || hgt > 76 {
			log.Println("Invalid hgt: in", p["hgt"], parts)
			return false
		}
		break
	default:
		log.Println("Invalid hgt default", p["hgt"], parts)
		return false
	}

	re = regexp.MustCompile("^#[\\da-f]{6}$")
	if !re.MatchString(p["hcl"]) {
		log.Println("Invalid hcl", p["hcl"])
		return false
	}

	eclrs := []string{"amb", "blu", "brn", "gry", "grn", "hzl", "oth"}
	ecl := p["ecl"]
	found := false
	for _, clr := range eclrs {
		if ecl == clr {
			found = true
			break
		}
	}
	if !found {
		log.Println("Invalid ecl", p["ecl"])
		return false
	}

	re = regexp.MustCompile("^\\d{9}$")
	if !re.MatchString(p["pid"]) {
		log.Println("Invalid pid", p["pid"])
		return false
	}

	return true

}

func a(input []string) {
	valid := 0
	p := make(map[string]string)
	for _, line := range input {
		if line == "" {
			if isValidA(p) {
				valid = valid + 1
			}
			p = make(map[string]string)
			continue
		}

		fields := strings.Split(line, " ")
		for _, field := range fields {
			kv := strings.Split(field, ":")
			k := kv[0]
			value := kv[1]
			p[k] = value
		}
	}
	log.Println(valid)

}

func b(input []string) {
	valid := 0
	p := make(map[string]string)
	for _, line := range input {
		if line == "" {
			if isValidB(p) {
				valid = valid + 1
			}
			p = make(map[string]string)
			continue
		}

		fields := strings.Split(line, " ")
		for _, field := range fields {
			kv := strings.Split(field, ":")
			k := kv[0]
			value := kv[1]
			p[k] = value
		}
	}
	log.Println(valid)
}

func main() {

	data, err := ioutil.ReadFile("4.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
