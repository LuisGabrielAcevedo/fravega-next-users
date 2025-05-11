import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserListEmptyState } from "../UserListEmptyState/UserListEmptyState";

describe("UserListEmptyState", () => {
  it("should render message when no query is provided", () => {
    render(<UserListEmptyState q='' />);

    expect(screen.getByTestId("user-list-empty-state")).toBeInTheDocument();
    expect(screen.getByText("No hay usuarios registrados")).toBeInTheDocument();
    expect(
      screen.queryByText("Te recomendamos revisar la escritura de la palabra.")
    ).not.toBeInTheDocument();
  });

  it("should render search-related message when query is provided", () => {
    const query = "luis";
    render(<UserListEmptyState q={query} />);

    expect(
      screen.getByText("No encontramos resultados para")
    ).toBeInTheDocument();
    expect(screen.getByText(`"${query}"`)).toBeInTheDocument();
    expect(
      screen.getByText("Te recomendamos revisar la escritura de la palabra.")
    ).toBeInTheDocument();
  });
});
