/* eslint-disable */
import { KeystoneContext, SessionStore } from "@keystone-next/types";
import { CartItem } from "../schemas/CartItem";
import { Session } from "../types";

import { CartItemCreateInput } from "../.keystone/schema-types"; // automatically generated for us

// this is just a custom resolver
async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // promise that resolves to a cart item
  console.log("ADDING TO CART!");
  // 1. Query the current user see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error("You must be logged in to do this!");
  }
  // 2. Query the current users cart
  // go directly to database to fetch the lists!
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: "id,quantity", // have to explicitly say which fields you want
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(existingCartItem);
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!`
    );
    // 3. See if the current item is in their cart
    // 4. if itis, increment by 1
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
      resolveFields: false,
    });
  }
  // 4. if it isnt, create a new cart item!
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
    resolveFields: false,
  });
}

export default addToCart;
