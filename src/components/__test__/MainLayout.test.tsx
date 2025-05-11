import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MainLayout } from "..";

describe("MainLayout", () => {
  it("should render layout with subtitle and children", () => {
    render(
      <MainLayout
        title='Página de prueba'
        description='Descripción de prueba'
        subtitle='Subtítulo visible'
      >
        <p>Main content</p>
      </MainLayout>
    );

    expect(screen.getByTestId("main-layout")).toBeInTheDocument();

    expect(screen.getByText("Frávega")).toBeInTheDocument();

    expect(screen.getByAltText("favorite section")).toBeInTheDocument();

    expect(screen.queryByTestId("subtitle")).toBeInTheDocument();

    expect(screen.getByText("Main content")).toBeInTheDocument();
  });

  it("should not render subtitle when not provided", () => {
    render(
      <MainLayout title='test' description='test'>
        <p>Contenido sin subtítulo</p>
      </MainLayout>
    );

    expect(screen.queryByTestId("subtitle")).not.toBeInTheDocument();
  });
});
