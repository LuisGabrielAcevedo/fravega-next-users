import { toCssPixelValue } from "../toCssPixelValue";

describe("toCssPixelValue", () => {
  it("should convert number to px string", () => {
    expect(toCssPixelValue(10)).toBe("10px");
    expect(toCssPixelValue(0)).toBe("0px");
    expect(toCssPixelValue(100)).toBe("100px");
  });

  it("should return string as is", () => {
    expect(toCssPixelValue("10%")).toBe("10%");
    expect(toCssPixelValue("auto")).toBe("auto");
    expect(toCssPixelValue("100vh")).toBe("100vh");
  });

  it("should return undefined if value is undefined", () => {
    expect(toCssPixelValue(undefined)).toBeUndefined();
  });
});
