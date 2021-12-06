import * as R from "ramda";

const a = (input: string): string => {
  let fish = input.split(",").map((s) => parseInt(s));
  let fishCountByAge = R.countBy(R.identity, fish);
  for (let i = 0; i < 80; i++) {
    const newFish = {};
    for (let [age, count] of Object.entries(fishCountByAge)) {
      if (age == "0") {
        newFish[8] = count;
        newFish[6] = newFish[6] ? newFish[6] + count : count;
      } else {
        newFish[parseInt(age) - 1] = newFish[parseInt(age) - 1]
          ? count + newFish[parseInt(age) - 1]
          : count;
      }
    }
    fishCountByAge = newFish;
  }
  return R.sum(Object.values(fishCountByAge)).toString();
};

const b = (input: string): string => {
  let fish = input.split(",").map((s) => parseInt(s));
  let fishCountByAge = R.countBy(R.identity, fish);
  for (let i = 0; i < 256; i++) {
    const newFish = {};
    for (let [age, count] of Object.entries(fishCountByAge)) {
      if (age == "0") {
        newFish[8] = count;
        newFish[6] = newFish[6] ? newFish[6] + count : count;
      } else {
        newFish[parseInt(age) - 1] = newFish[parseInt(age) - 1]
          ? count + newFish[parseInt(age) - 1]
          : count;
      }
    }
    fishCountByAge = newFish;
  }
  return R.sum(Object.values(fishCountByAge)).toString();
};

export default {
  a,
  b,
};
