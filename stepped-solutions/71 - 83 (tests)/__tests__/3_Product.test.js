import { render, screen } from "@testing-library/react"; // screen is the browser window in test mode
import { MockedProvider } from "@apollo/react-testing"; // this is nice
import Product from "../components/Product";
import { fakeItem } from "../lib/testUtils";

const product = fakeItem();

describe("<Product/>", () => {
  // dont test implementation detail, but test what the user sees
  it("renders out the price tag and title", () => {
    // Product relies on Apollo client to make queries,
    // so you have to fake it here
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    // debug() allows you to see what gets rendered out
    // into the component
    const priceTag = screen.getByText("$50");
    expect(priceTag).toBeInTheDocument();
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/product/abc123");
    expect(link).toHaveTextContent(product.name);
  });

  // snapshot testing - take a picture of what the HTML looks like
  // if anything fails, you have to manually accept the changes
  // never edit snapshots manually
  // built into jest
  it("Renders and matches the snapshot", () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  // grab items based on what the user is seeing
  it("renders the image properly", () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    // grab the image by alt text
    const img = screen.getByAltText(product.name);
    expect(img).toBeInTheDocument();
  });
});
