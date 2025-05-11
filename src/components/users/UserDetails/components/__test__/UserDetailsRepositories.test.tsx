import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserDetailsRepositories } from "../UserDetailsRepositories/UserDetailsRepositories";
import { IGithubRepository } from "@/interfaces";

const generateRepo = (id: number): IGithubRepository => ({
  id,
  name: `repo-${id}`,
  url: `https://github.com/user/repo-${id}`,
  updated_at: new Date(2025, 0, id + 1).toISOString(),
});

describe("UserDetailsRepositories", () => {
  it("should render the component container", () => {
    const repos = [generateRepo(1)];
    render(<UserDetailsRepositories repositories={repos} />);
    expect(screen.getByTestId("user-details-repos")).toBeInTheDocument();
  });

  it("should render fallback text when there are no repositories", () => {
    render(<UserDetailsRepositories repositories={[]} />);
    expect(
      screen.getByText("No hay repositorios disponibles.")
    ).toBeInTheDocument();
  });

  it("should render up to 5 repositories initially", () => {
    const repos = Array.from({ length: 10 }, (_, i) => generateRepo(i));
    render(<UserDetailsRepositories repositories={repos} />);
    const visible = screen.getAllByTestId("repository");
    expect(visible.length).toBe(5);
  });

  it("should toggle show all repositories when 'Ver más' is clicked", async () => {
    const user = userEvent.setup();
    const repos = Array.from({ length: 7 }, (_, i) => generateRepo(i));
    render(<UserDetailsRepositories repositories={repos} />);

    expect(screen.getByText("Ver más")).toBeInTheDocument();

    await user.click(screen.getByText("Ver más"));
    const allRepos = screen.getAllByTestId("repository");
    expect(allRepos.length).toBe(7);

    await user.click(screen.getByText("Ver menos"));
    const reducedRepos = screen.getAllByTestId("repository");
    expect(reducedRepos.length).toBe(5);
  });

  it("should not render 'Ver más' if there are 5 or fewer repositories", () => {
    const repos = Array.from({ length: 4 }, (_, i) => generateRepo(i));
    render(<UserDetailsRepositories repositories={repos} />);
    expect(screen.queryByText("Ver más")).not.toBeInTheDocument();
  });
});
