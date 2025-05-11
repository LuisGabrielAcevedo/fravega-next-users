import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "..";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should delay the callback execution", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn, 500));

    act(() => {
      result.current("test");
    });

    expect(mockFn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledWith("test");
  });

  it("should only call the callback once with the latest arguments", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn, 300));

    act(() => {
      result.current("first");
      result.current("second");
      result.current("third");
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("third");
  });

  it("should reset the timer on each call", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn, 200));

    act(() => {
      result.current("A");
      jest.advanceTimersByTime(100);
      result.current("B");
      jest.advanceTimersByTime(100);
      result.current("C");
    });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("C");
  });
});
