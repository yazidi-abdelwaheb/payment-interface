import'reflect-metadata';
import { DataSource }  from'typeorm';
import path from'path';
import { fileURLToPath } from 'url';
import PaymentHistory from "../entitys/payment.entity.js";
import CardInfo from '../entitys/card.entity.js';
import PaymentToekn from '../entitys/token.payment.entity.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "database.sqlite"),
  synchronize: true, 
  logging: false,
  entities: [PaymentHistory,CardInfo,PaymentToekn],
});

export  { AppDataSource };
