import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship } from "@keystone-next/fields";

export const User = list({
  // access:
  // ui
  fields: {
    // a user has a name, email, password to start
    // keystone will tell you which fields to index
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    // TODO, add roles, cart and orders
  },
});
