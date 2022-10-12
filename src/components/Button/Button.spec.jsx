import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../Button/index";

describe("<Button />", () => {
  it('should render the button with the text "Load More"', () => {
    render(<Button text="Load More" />);
    expect.assertions(1);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should be disabled when disabled is true"', () => {
    render(<Button text="Load More" disabled={true} />);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeDisabled();
  });

  it('should be enabled when disable is false"', () => {
    render(<Button text="Load More" disabled={false} />);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeEnabled();
  });
});
