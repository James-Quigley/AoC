package main

import (
	"io/ioutil"
	"log"
	"math"
	"sort"
	"strings"
)

func binSearch(s string, min, max int, l, r rune) int {
	for _, ch := range s {
		switch ch {
		case r:
			min = min + int(math.Ceil(float64((max-min))/2))
			break
		case l:
			max = min + ((max - min) / 2)
			break
		}
	}
	return min
}

func a(input []string) {
	maxId := 0
	for _, line := range input {
		row := binSearch(line[0:7], 0, 127, 'F', 'B')
		column := binSearch(line[7:], 0, 7, 'L', 'R')
		id := (row * 8) + column
		if id > maxId {
			maxId = id
		}
	}

	log.Println(maxId)

}

/**
It's a completely full flight, so your seat should be the only missing boarding pass in your list.
However, there's a catch:
some of the seats at the very front and back of the plane don't exist on this aircraft,
so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though;
the seats with IDs +1 and -1 from yours will be in your list.
*/
func b(input []string) {
	ids := make([]int, 927, 927)
	for i, line := range input {
		row := binSearch(line[0:7], 0, 127, 'F', 'B')
		column := binSearch(line[7:], 0, 7, 'L', 'R')
		id := (row * 8) + column
		ids[i] = id
	}
	sort.Ints(ids)
	for idx, id := range ids {
		if idx != 0 && idx != 926 {
			if (id != ids[idx-1]+1) || (id != ids[idx+1]-1) {
				log.Println(id, ids[idx-1], ids[idx+1])
				break
			}
		}
	}
}

func main() {

	data, err := ioutil.ReadFile("5.txt")
	if err != nil {
		log.Fatal(err)
	}
	input := string(data)
	inputArr := strings.Split(input, "\n")
	a(inputArr)
	b(inputArr)
}
