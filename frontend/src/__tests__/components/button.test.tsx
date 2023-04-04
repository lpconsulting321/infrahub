import {cleanup, render, screen} from "@testing-library/react";
import { BUTTON_TYPES, Button } from "../../components/button";

afterEach(cleanup);

describe("Button component", () => {
  it("should create a button component", () => {
    render(
      <Button type={BUTTON_TYPES.VALIDATE}>
        {
          "That's working"
        }
      </Button>
    );

    const linkElement = screen.getByText(/That's working/i);

    expect(linkElement).toBeInTheDocument();
  });
});