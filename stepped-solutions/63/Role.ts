import { relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { permissionFields } from "./fields";

// define Role schema
export const Role = list({
  fields: {
    name: text({ isRequired: true }),
    ...permissionFields, // assign roles to users
    assignedTo: relationship({
      // create a two way relationship.
      ref: "User.role", // TODO: Add this to the User
      many: true, // many users can have this role
      ui: {
        itemView: { fieldMode: "read" },
      },
    }),
  },
});
