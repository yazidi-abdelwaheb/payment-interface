import { EntitySchema } from "typeorm";
import { v4 as uuidv4 } from "uuid";

const PaymentHistory = new EntitySchema({
  name: "PaymentHistory",
  tableName: "PaymentHistory",
  columns: {
    id: {
      primary: true,
      type: "text",
      default: () => `'${uuidv4()}'`
    },
    amount: { type: "real" },
    createdAt: { type: "int", createDate: true ,  default : Date.now() }
  },
  relations: {
    card: {
      type: "many-to-one",       
      target: "CardInfo",         
      joinColumn: {
        name: "cardId",           
        referencedColumnName: "id"
      },
      nullable: false
    }
  }
});

export default PaymentHistory;
