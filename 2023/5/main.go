package main

import (
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	testBytes, err := os.ReadFile("test.txt")
	if err != nil {
		panic(err)
	}

	testData := string(testBytes)

	inputBytes, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	inputData := string(inputBytes)

	log.Println("Part 1")
	part1(testData)
	part1(inputData)

	log.Println("Part 2")
	part2(testData)
	part2(inputData)

}

func makeMap(data string) Map {
	lines := strings.Split(data, "\n")
	m := Map{}
	for _, line := range lines[1:] {
		mr := MapRule{}
		numStr := strings.Split(line, " ")
		nums := make([]int, len(numStr))
		for i, num := range numStr {
			n, err := strconv.Atoi(num)
			if err != nil {
				panic(err)
			}
			nums[i] = n
		}

		mr.Dest = nums[0]
		mr.Src = nums[1]
		mr.Length = nums[2]
		m.Rules = append(m.Rules, mr)
	}
	return m
}

type Map struct {
	Rules []MapRule
}

type MapRule struct {
	Src    int
	Dest   int
	Length int
}

func part1(data string) {
	parts := strings.Split(data, "\n\n")
	seedsStr := strings.Split(strings.Split(parts[0], ": ")[1], " ")
	seeds := make([]int, len(seedsStr))
	for i, seedStr := range seedsStr {
		seed, err := strconv.Atoi(seedStr)
		if err != nil {
			panic(err)
		}
		seeds[i] = seed
	}

	maps := make([]Map, len(parts)-1)

	for i, part := range parts[1:] {
		maps[i] = makeMap(part)
	}

	lowestLocation := -1
	for _, seed := range seeds {
		val := seed
		for _, m := range maps {
			for _, mr := range m.Rules {
				if val >= mr.Src && val < mr.Src+mr.Length {
					val = mr.Dest + (val - mr.Src)
					break
				}
			}
		}
		if lowestLocation == -1 || val < lowestLocation {
			lowestLocation = val
		}
	}
	log.Println(lowestLocation)

}

type Range struct {
	Start  int
	Length int
}

func (r Range) Contains(val int) bool {
	return val >= r.Start && val < r.Start+r.Length
}

func (r Range) Overlap(other Range) *Range {
	// Three cases. No overlap, total overlap, partial overlap

	// No overlap
	if (r.Start+r.Length) < other.Start || r.Start > (other.Start+other.Length) {
		return nil
	}

	// Total overlap
	if other.Start >= r.Start && (other.Start+other.Length) <= (r.Start+r.Length) {
		return &other
	}
	if r.Start >= other.Start && (r.Start+r.Length) <= (other.Start+other.Length) {
		return &r
	}

	// Partial overlap
	overlap := &Range{}
	if r.Start > other.Start {
		overlap.Start = r.Start
		overlap.Length = other.Start + other.Length - r.Start
	} else {
		overlap.Start = other.Start
		overlap.Length = r.Start + r.Length - other.Start
	}
	return overlap
}

func (r Range) Sub(other Range) []Range {
	// Three cases. No overlap, total overlap, partial overlap

	// No overlap
	if (r.Start+r.Length) < other.Start || r.Start > (other.Start+other.Length) {
		return []Range{r}
	}

	// Total overlap conditions
	if r.Start == other.Start && r.Length == other.Length {
		return []Range{}
	}

	if other.Start >= r.Start && (other.Start+other.Length) <= (r.Start+r.Length) {

		if other.Start == r.Start {
			return []Range{Range{Start: other.Start + other.Length, Length: r.Length - other.Length}}
		}

		if (other.Start + other.Length) == (r.Start + r.Length) {
			return []Range{Range{Start: r.Start, Length: r.Length - other.Length}}
		}

		return []Range{
			Range{Start: r.Start, Length: other.Start - r.Start},
			Range{Start: other.Start + other.Length, Length: (r.Start + r.Length) - (other.Start + other.Length)},
		}
	}
	if r.Start >= other.Start && (r.Start+r.Length) <= (other.Start+other.Length) {
		return []Range{}
	}

	// Partial overlap
	if r.Start > other.Start {
		return []Range{Range{Start: other.Start + other.Length, Length: r.Start + r.Length - other.Start + other.Length}}
	}
	return []Range{Range{Start: r.Start, Length: other.Start - r.Start}}
}

func part2(data string) {
	parts := strings.Split(data, "\n\n")
	seedsStr := strings.Split(strings.Split(parts[0], ": ")[1], " ")
	seedNums := make([]int, len(seedsStr))
	for i, seedStr := range seedsStr {
		seed, err := strconv.Atoi(seedStr)
		if err != nil {
			panic(err)
		}
		seedNums[i] = seed
	}

	seeds := make([]Range, 0)
	for i := 0; i < len(seedNums); i = i + 2 {
		seeds = append(seeds, Range{Start: seedNums[i], Length: seedNums[i+1]})
	}

	maps := make([]Map, len(parts)-1)

	for i, part := range parts[1:] {
		maps[i] = makeMap(part)
	}

	lowestLocation := -1
	for _, m := range maps {
		newRanges := make([]Range, 0)
		for {
			if len(seeds) == 0 {
				break
			}
			seed := seeds[0]
			seeds = seeds[1:]
			newSeed := []Range{seed}
			for {
				if len(newSeed) == 0 {
					break
				}
				s := newSeed[0]
				newSeed = newSeed[1:]
				hasAnyOverlap := false
				for _, mr := range m.Rules {
					overlap := s.Overlap(Range{Start: mr.Src, Length: mr.Length})
					if overlap != nil {
						newRanges = append(newRanges, Range{Start: mr.Dest + (overlap.Start - mr.Src), Length: overlap.Length})
						// Need to remove overlap from seed
						res := s.Sub(*overlap)
						newSeed = append(newSeed, res...)
						hasAnyOverlap = true
					}
				}
				if !hasAnyOverlap {
					newRanges = append(newRanges, s)
				}
			}
		}
		seeds = newRanges
	}

	// get lowest location
	for _, seed := range seeds {
		if lowestLocation == -1 || seed.Start < lowestLocation {
			lowestLocation = seed.Start
		}
	}

	log.Println(lowestLocation)

}
