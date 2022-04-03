import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import SingleProduct, { SINGLE_ITEM_QUERY } from "../components/SingleProduct";
import { fakeItem } from "../lib/testUtils";

const product = fakeItem();

// don't go to the network for this
const mocks = [
  {
    // When someone requests this query and variable combo
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: {
        id: "123",
      },
    },
    // Return this data
    result: {
      data: {
        Product: product,
      },
    },
  },
];

describe("<Single Product/>", () => {
  it("renders with proper data", async () => {
    // We need to make some fake data
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    // Wait for the test ID to show up
    // since there's an intermediate loading state
    await screen.findByTestId("singleProduct"); // findBy is async and will wait
    expect(container).toMatchSnapshot();
  });

  it("Errors out when an item is no found", async () => {
    const errorMock = [
      {
        request: {
          query: SINGLE_ITEM_QUERY,
          variables: {
            id: "123",
          },
        },
        result: {
          errors: [{ message: "Item not found!!!" }],
        },
      },
    ];
    const { container, debug } = render(
      <MockedProvider mocks={errorMock}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    await screen.findByTestId("graphql-error");
    expect(container).toHaveTextContent("Shoot!");
    expect(container).toHaveTextContent("Item not found!!!");
  });
});
