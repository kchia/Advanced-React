import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship } from "@keystone-next/fields";
import { permissions, rules } from "../access";

export const User = list({
  access: {
    create: () => true, // User should be able to sign up
    read: rules.canManageUsers, // only manage yourself or if you're admin
    update: rules.canManageUsers, // only manage yourself or if you're admin
    // only people with the permission can delete themselves!
    // You can't delete yourself
    delete: permissions.canManageUsers,
  },
  ui: {
    // hide the backend UI from regular users
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    cart: relationship({
      ref: "CartItem.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    orders: relationship({ ref: "Order.user", many: true }),
    role: relationship({
      ref: "Role.assignedTo",
      access: {
        // you can put access control on specific fields
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    products: relationship({
      ref: "Product.user",
      many: true, // one user can have many products
    }),
  },
});
