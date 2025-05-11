import { formatDate } from "..";

describe("formatDate", () => {
  it("should format an ISO string date correctly", () => {
    expect(formatDate("2019-08-13T13:36:47Z")).toBe("13/08/2019");
  });
  it("should format a Date instance correctly", () => {
    const date = new Date(2025, 0, 1);
    expect(formatDate(date)).toBe("01/01/2025");
  });
});
