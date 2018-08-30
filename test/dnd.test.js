import * as dnd from "../src/plugins/dnd/dnd.js";


describe("ability", () => {
  [
    {score: "1", expected: "1 (−5)"},
    {score: "5", expected: "5 (−3)"},
    {score: "10", expected:  "10 (+0)"},
    {score: "15", expected:  "15 (+2)"},
    {score: "20", expected:  "20 (+5)"},
    {score: "30", expected:  "30 (+10)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for score "${example.score}"`, () => {
      expect(dnd.ability(example.score)).toBe(example.expected);
    });
  });
});


describe("average", () => {
  [
    {expr: "10", expected: "10"},
    {expr: "d20", expected: "10 (1d20)"},
    {expr: "1d20", expected: "10 (1d20)"},
    {expr: "2d20+10", expected:  "31 (2d20 + 10)"},
    {expr: "2d20-10", expected:  "11 (2d20 − 10)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for score "${example.expr}"`, () => {
      expect(dnd.average(example.expr)).toBe(example.expected);
    });
  });
});


describe("capitalize", () => {
  [
    {description: "small beast, unaligned", expected: "Small beast, unaligned"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for description "${example.description}"`, () => {
      expect(dnd.capitalize(example.description)).toBe(example.expected);
    });
  });
});


describe("italicize", () => {
  [
    {description: "Small beast, unaligned", expected: "//Small beast, unaligned//"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for description "${example.description}"`, () => {
      expect(dnd.italicize(example.description)).toBe(example.expected);
    });
  });
});


describe("ordinal", () => {
  [
    {value: 0, expected: "0th"},
    {value: 1, expected: "1st"},
    {value: 2, expected: "2nd"},
    {value: 3, expected: "3rd"},
    {value: 4, expected: "4th"},
    {value: 11, expected: "11th"},
    {value: 12, expected: "12th"},
    {value: 13, expected: "13th"},
    {value: 14, expected: "14th"},
    {value: 21, expected: "21st"},
    {value: 22, expected: "22nd"},
    {value: 23, expected: "23rd"},
    {value: 24, expected: "24th"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for value "${example.value}"`, () => {
      expect(dnd.ordinal(example.value)).toBe(example.expected);
    });
  });
});


describe("xp", () => {
  [
    {rating: "0", expected: "0 (0 XP)"},
    {rating: "1", expected: "1 (200 XP)"},
    {rating: "10", expected: "10 (5,900 XP)"},
    {rating: "30", expected: "30 (155,000 XP)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for rating "${example.rating}"`, () => {
      expect(dnd.xp(example.rating)).toBe(example.expected);
    });
  });

  [
    {rating: "1/2", expected: "1/2 (100 XP)"},
    {rating: "'1/2'", expected: "1/2 (100 XP)"},
    {rating: '"1/2"', expected: "1/2 (100 XP)"}, // eslint-disable-line
  ].forEach((example) => {
    it(`should strip quotes and return "${example.expected}" for rating "${example.rating}"`, () => {
      expect(dnd.xp(example.rating)).toBe(example.expected);
    });
  });

  [
    {rating: "0 (10 XP)", expected: "0 (10 XP)"},
    {rating: "10 (5000 XP)", expected: "10 (5000 XP)"},
    {rating: "40", expected: "40"},
    {rating: "40 (255,000 XP)", expected: "40 (255,000 XP)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for arbitrary rating "${example.rating}"`, () => {
      expect(dnd.xp(example.rating)).toBe(example.expected);
    });
  });
});
