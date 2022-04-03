import { render, screen } from "@testing-library/react";
import wait from "waait";
import CartCount from "../components/CartCount";

describe("<CartCount/>", () => {
  // renders without throwing
  it("Renders", () => {
    render(<CartCount count={10} />);
  });
  it("Matches snapshot", () => {
    const { container } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });

  // attests that something changes
  it("updates via props", async () => {
    const { container, rerender, debug } = render(<CartCount count={11} />);
    expect(container.textContent).toBe("11");
    // expect(container).toHaveTextContent('11');
    // Update the props
    rerender(<CartCount count="12" />);
    expect(container.textContent).toBe("1211");
    // wait for __ ms for animation/transition effects to complete
    await wait(400);
    expect(container.textContent).toBe("12");
    expect(container).toMatchSnapshot();

    // or
    // await screen.findByText("12");
  });
});
