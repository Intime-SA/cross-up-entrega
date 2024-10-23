import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

it("renders home page", () => {
  render(<Home />);

  expect(
    screen.getByText((content) => content.includes("RAMA PUTO"))
  ).toBeInTheDocument();
});
