package main

import (
	"io/ioutil"
	"log"
	"reflect"
	"strings"

	mapset "github.com/deckarep/golang-set"
)

func InterfaceSlice(slice interface{}) []interface{} {
	s := reflect.ValueOf(slice)
	if s.Kind() != reflect.Slice {
		panic("InterfaceSlice() given a non-slice type")
	}

	// Keep the distinction between nil and empty slice input
	if s.IsNil() {
		return nil
	}

	ret := make([]interface{}, s.Len())

	for i := 0; i < s.Len(); i++ {
		ret[i] = s.Index(i).Interface()
	}

	return ret
}

func a(input []string) {
	sum := 0
	for _, group := range input {
		m := make(map[string]bool)
		lines := strings.Split(group, "\n")
		for _, line := range lines {
			chars := strings.Split(line, "")
			for _, char := range chars {
				m[char] = true
			}
		}
		keys := len(m)
		sum = sum + keys
	}
	log.Println(sum)
}

func b(input []string) {
	sum := 0
	for _, group := range input {
		lines := strings.Split(group, "\n")
		groupSets := make([]mapset.Set, len(lines))
		for i, line := range lines {
			chars := strings.Split(line, "")
			groupSets[i] = mapset.NewSetFromSlice(InterfaceSlice(chars))
		}

		finalGroupSet := groupSets[0]
		for i := 1; i < len(groupSets); i++ {
			finalGroupSet = finalGroupSet.Intersect(groupSets[i])
		}

		sum = sum + finalGroupSet.Cardinality()
	}

	log.Println(sum)
}

func main() {
	data, err := ioutil.ReadFile("6.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n\n")
	a(inputArr)
	b(inputArr)
}
