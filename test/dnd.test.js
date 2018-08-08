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
