import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

// use the built-in keystone deleteCartItem method
const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
  });
  // &times; read to the screen as multiplication
  return (
    <BigButton
      onClick={removeFromCart}
      disabled={loading} // cannot fire off multiple mutations
      type="button"
      title="Remove This Item from Cart"
    >
      &times;
    </BigButton>
  );
}
