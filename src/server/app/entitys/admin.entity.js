import { EntitySchema } from "typeorm";
import { v4 as uuidv4 } from "uuid";

const Admin = new EntitySchema({
  name: "Admin",
  tableName: "Admin",
  columns: {
    id: {
      primary: true,
      type: "text",
      default: () => `'${uuidv4()}'`,
    },
    firstName: { type: "text" },
    lastName: { type: "text" },
    email: { type: "text" },
    password: { type: "text" },
    role : { type: "text" , enum : ["super" , "admin" , "agent"] },
    isActive : { type : "boolean" , default : true},
    createdAt : { type : "datetime" , createDate : true },
  }
});

export default Admin;
