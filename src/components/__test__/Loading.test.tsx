import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import { Loading } from "..";

const onMock = jest.fn();
const offMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    events: {
      on: onMock,
      off: offMock,
    },
  }),
}));

describe("Loading", () => {
  beforeEach(() => {
    onMock.mockClear();
    offMock.mockClear();
  });

  it("should render the loading component when the router starts", () => {
    const handlers: Record<string, () => void> = {};

    onMock.mockImplementation((event, cb) => {
      handlers[event] = cb;
    });

    render(<Loading />);

    act(() => {
      handlers.routeChangeStart();
    });
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    act(() => {
      handlers.routeChangeComplete();
    });
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });
});
