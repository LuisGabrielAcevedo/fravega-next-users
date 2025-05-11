import { renderHook, act } from "@testing-library/react";
import { useRouter } from "next/router";
import { useQueryParam } from "..";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("useQueryParam", () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/",
      query: { q: "test" },
      replace: mockReplace,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the query param q", () => {
    const { result } = renderHook(() => useQueryParam());
    expect(result.current.q).toBe("test");
  });

  it("should default to empty string if q is not present", () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      pathname: "/",
      query: {},
      replace: mockReplace,
    });

    const { result } = renderHook(() => useQueryParam());
    expect(result.current.q).toBe("");
  });

  it("should call replace when setQ is called", () => {
    const { result } = renderHook(() => useQueryParam());

    act(() => {
      result.current.setQ("github");
    });

    expect(mockReplace).toHaveBeenCalledWith(
      {
        pathname: "/",
        query: { q: "github" },
      },
      undefined,
      { shallow: true }
    );
  });

  it("should remove q param when setQ is called with empty string", () => {
    const { result } = renderHook(() => useQueryParam());

    act(() => {
      result.current.setQ("");
    });

    expect(mockReplace).toHaveBeenCalledWith(
      {
        pathname: "/",
        query: {},
      },
      undefined,
      { shallow: true }
    );
  });
});
