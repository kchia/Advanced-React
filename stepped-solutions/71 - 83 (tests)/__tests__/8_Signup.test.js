import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import userEvent from "@testing-library/user-event"; // simulate user events
import wait from "waait";
import Signup, { SIGNUP_MUTATION } from "../components/SignUp";
import { CURRENT_USER_QUERY } from "../components/User";
import { fakeUser } from "../lib/testUtils"; // mock user data

const me = fakeUser();
const password = "wes";
const mocks = [
  // Mutation Mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password,
      },
    },
    result: {
      // mock the user data from the server
      data: {
        createUser: {
          __typename: "User",
          id: "abc123",
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // Current user mock
  // {
  //   request: { query: CURRENT_USER_QUERY },
  //   result: { data: { authenticatedItem: me } },
  // },
];

describe("<SignUp/>", () => {
  it("render and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it("calls the mutation properly", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <Signup />
      </MockedProvider>
    );
    // Type into the boxes with userEvent
    // better to use getByRole I think.
    await userEvent.type(screen.getByPlaceholderText(/name/i), me.name);
    await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);
    // Click the submit
    await userEvent.click(screen.getByText("Sign Up!"));
    // async
    await screen.findByText(
      `Signed up with ${me.email} - Please Go Head and Sign in!`
    );
  });
});
