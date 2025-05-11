import { toCamelCase } from "..";

describe("toCamelCase", () => {
  it("should convert kebab-case to camelCase", () => {
    expect(toCamelCase("background-color")).toBe("backgroundColor");
  });

  it("should return an empty string when input is undefined", () => {
    expect(toCamelCase(undefined)).toBe("");
  });
});
