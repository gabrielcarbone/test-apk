import { sum } from "../src/utils/math";

describe("sum", () => {
  it("adds two numbers correctly", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("handles negative numbers", () => {
    expect(sum(-2, -3)).toBe(-5);
  });
});
