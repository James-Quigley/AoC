package main

import (
	"io/ioutil"
	"log"
	"regexp"
	"strconv"
	"strings"
)

type Rule struct {
	Field string
	X1    int
	X2    int
	X3    int
	X4    int
}

var ruleRegex = regexp.MustCompile("([a-z ]+): (\\d+)-(\\d+) or (\\d+)-(\\d+)")

func a(input []string) {
	rulesStr := input[0]
	rulesArr := strings.Split(rulesStr, "\n")
	rules := make([]Rule, len(rulesArr))
	for i, r := range rulesArr {
		parts := ruleRegex.FindStringSubmatch(r)
		ints := make([]int, 4)
		for j := 2; j < len(parts); j++ {
			x, _ := strconv.Atoi(parts[j])
			ints[j-2] = x
		}
		rules[i] = Rule{parts[1], ints[0], ints[1], ints[2], ints[3]}
	}

	nearbyTicketsStr := input[2]
	nearbyTickets := strings.Split(nearbyTicketsStr, "\n")
	nearbyTickets = nearbyTickets[1:]
	tser := 0
	validTickets := make([][]int, 0)
	for _, ticket := range nearbyTickets {
		vals := strings.Split(ticket, ",")
		nums := make([]int, len(vals))
		for i, v := range vals {
			x, _ := strconv.Atoi(v)
			nums[i] = x
		}
		valid := true
		for _, x := range nums {
			invalid := true
			for _, rule := range rules {
				if (x >= rule.X1 && x <= rule.X2) || (x >= rule.X3 && x <= rule.X4) {
					invalid = false
					break
				} else {
					valid = false
				}
			}
			if invalid {
				tser = tser + x
			}
		}
		if valid {
			validTickets = append(validTickets, nums)
		}
	}
	log.Println(tser)
	b(input, rules, validTickets)
}

func doesFieldMatchRule(x int, r Rule) bool {
	return (x >= r.X1 && x <= r.X2) || (x >= r.X3 && x <= r.X4)
}

func deleteItem(s []int, v int) []int {
	idx := -1
	for i, x := range s {
		if x == v {
			idx = i
			break
		}
	}
	if idx == -1 {
		return s
	}
	return remove(s, idx)
}

func remove(s []int, i int) []int {
	s[i] = s[len(s)-1]
	return s[:len(s)-1]
}

func b(input []string, rules []Rule, validTickets [][]int) {
	myTicketStr := input[1]
	myTicket := strings.Split(strings.Split(myTicketStr, "\n")[1], ",")
	myTicketInts := make([]int, len(myTicket))
	for i, v := range myTicket {
		x, _ := strconv.Atoi(v)
		myTicketInts[i] = x
	}
	validTickets = append(validTickets, myTicketInts)

	m := make(map[string][]int)
	for _, rule := range rules {
		log.Println("finding matches for rule", rule)
		m[rule.Field] = make([]int, 0)
		for j := 0; j < len(rules); j++ {
			valid := true
			for _, ticket := range validTickets {
				if !doesFieldMatchRule(ticket[j], rule) {
					log.Println("ticket", ticket, "doesn't match rule for index", j)
					valid = false
					break
				}
			}
			if valid {
				log.Println("valid", rule, j)
				m[rule.Field] = append(m[rule.Field], j)
			}
		}
	}
	fixed := make(map[string]int)
	for len(fixed) < len(m) {
		log.Println("rule map")
		log.Println(m)
		log.Println(len(m))
		log.Println("fixed")
		log.Println(fixed)
		log.Println(len(fixed))
		for k, v := range m {
			if _, exists := fixed[k]; !exists {
				if len(v) == 1 {
					fixed[k] = v[0]
					for k2, v2 := range m {
						if k != k2 {
							log.Println("removing", v[0], "from", k2, v2)
							m[k2] = deleteItem(v2, v[0])
							log.Println(m[k2])
						}
					}
					delete(m, k)
				}
			}
		}
	}
	// total := 1

	// // for i, rule := range orderedRules {
	// // 	log.Println(rule.Field)
	// // 	if strings.HasPrefix(rule.Field, "departure") {
	// // 		total = total * myTicketInts[i]
	// // 	}
	// // }
	// log.Println(total)
}

func main() {
	data, err := ioutil.ReadFile("16.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n\n")
	a(inputArr)
	// b(inputArr)
}
