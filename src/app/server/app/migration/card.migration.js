import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "../db/data-source.js";
import { encrypt } from "../utils/crypty.utils.js";

const generateCards = async () => {
  const cards = [];
  for (let i = 1; i <= 10; i++) {
    const cardNumber = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const cvv = Math.floor(100 + Math.random() * 900).toString();

    cards.push({
      id: uuidv4(),
      firstName: `First${i}`,
      lastName: `Last${i}`,
      email: `user${i}@example.com`,
      cardNumber: encrypt(cardNumber),
      expiryMonth: `${(i % 12) + 1}`.padStart(2, "0"),
      expiryYear: `202${i % 10}`,
      cvv: await bcrypt.hash(cvv, 10),
      amount: parseFloat((Math.random() * 10000).toFixed(2)),
    });
  }

  cards.push({
      id: uuidv4(),
      firstName: `yazidi`,
      lastName: `abdelwaheb`,
      email: `yazidiabdelwaheb@gmail.com`,
      cardNumber: encrypt("0000000000000000"),
      expiryMonth: "05",
      expiryYear: `2026`,
      cvv: await bcrypt.hash("000", 10),
      amount: parseFloat((Math.random() * 10000).toFixed(2)),
    });

  const repo = AppDataSource.getRepository("CardInfo");

  for (const card of cards) {
    await repo.save(repo.create(card));
  }

  console.log("10 cards inserted successfully!");
};

export default generateCards;
