import { EntitySchema } from "typeorm";
import { v4 as uuidv4 } from "uuid";

const PaymentToekn = new EntitySchema({
  name: "PaymentToekn",
  tableName: "PaymentToekn",
  columns: {
    id: {
      primary: true,
      type: "text",
      default: () => `'${uuidv4()}'`
    },
    amount: { type: "real" },
    attemps : {
        type :"int",
        default : 5
    },
    code : {
        type : "text",
    },
    expiryIn:{
        type : "int"
    },
    createdAt: { type: "int", createDate: true ,  default : Date.now() }
  },
  relations: {
    card: {
      type: "many-to-one",        // type correct
      target: "CardInfo",         // nom exact de l’entité
      joinColumn: {
        name: "cardId",           // colonne dans PaymentHistory
        referencedColumnName: "id"
      },
      nullable: false
    }
  }
});

export default PaymentToekn;
