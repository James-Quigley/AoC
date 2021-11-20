import re
from itertools import chain, ifilterfalse
from operator import mul

with open('16.txt') as f:
  rules, my_ticket, nearby = f.read().split('\n\n')
  rules = {r[0]: (map(int, r[1:3]), map(int, r[3:5])) for r in re.findall(r'(.*): (\d+)-(\d+) or (\d+)-(\d+)', rules)}
  my_ticket = list(map(int, re.findall(r'\d+', my_ticket)))
  nearby = list(map(int, re.findall(r'\d+', t)) for t in nearby.strip().split('\n'))[1:]

all_ranges = list(chain.from_iterable(rules.values()))
valid_value = lambda v: any(r[0] <= v <= r[1] for r in all_ranges)

print 'part 1: %d' % sum(ifilterfalse(valid_value, chain.from_iterable(nearby)))

valid_nearby = filter(lambda t: all(valid_value(v) for v in t), nearby)
print len(valid_nearby)
field_candidates = {
  rule_name: reduce(lambda idxs, i:
                      idxs | set([i])
                        if all(any(r[0] <= n[i] <= r[1] for r in ranges) for n in valid_nearby)
                        else idxs,
                    range(len(my_ticket)),
                    set())
  for rule_name, ranges in rules.items()
}
print field_candidates
field_numbers = {}
for _ in range(len(field_candidates)):
  field_name, idx = next((n, i.pop()) for n,i in field_candidates.items() if len(i) == 1)
  field_numbers[field_name] = idx
  field_candidates = {n: i - set([idx]) for n,i in field_candidates.items()}

print 'part 2: %d' % reduce(mul, iter(my_ticket[i] for _,i in filter(lambda (f,i): f.startswith('departure '), field_numbers.items())))
