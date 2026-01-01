import { EntitySchema } from "typeorm";
import { v4 as uuidv4 } from "uuid";

const CardInfo = new EntitySchema({
  name: "CardInfo",
  tableName: "CardInfo",
  columns: {
    id: {
      primary: true,
      type: "text",
      default: () => `'${uuidv4()}'`,
    },
    firstName: { type: "text" },
    lastName: { type: "text" },
    email: { type: "text" },
    expiryMonth: { type: "text" },
    expiryYear: { type: "text" },
    cvv: { type: "text" },
    amount: { type: "real" },
    cardNumber: { type: "text" , unique: true },
  }
});

export default CardInfo;
