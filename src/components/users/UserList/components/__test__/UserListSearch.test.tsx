import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { UserListSearch } from "../UserListSearch/UserListSearch";

jest.useFakeTimers();

describe("UserListSearch", () => {
  it("should render input with defaultValue", () => {
    render(<UserListSearch defaultValue='Luis' onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText(
      "Buscar usuarios ..."
    ) as HTMLInputElement;
    expect(input.value).toBe("Luis");
  });

  it("should update input value and call debounced onSearch", () => {
    const mockSearch = jest.fn();
    render(<UserListSearch defaultValue='' onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText("Buscar usuarios ...");

    fireEvent.change(input, { target: { value: "test" } });

    expect(input).toHaveValue("test");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockSearch).toHaveBeenCalledWith("test");
  });

  it("should debounce multiple quick changes", () => {
    const mockSearch = jest.fn();
    render(<UserListSearch defaultValue='' onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText("Buscar usuarios ...");

    fireEvent.change(input, { target: { value: "o" } });
    fireEvent.change(input, { target: { value: "oc" } });
    fireEvent.change(input, { target: { value: "oct" } });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith("oct");
  });
});
