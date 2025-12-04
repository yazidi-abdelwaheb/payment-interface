import { AppDataSource } from "../db/data-source.js";
import bcrypt from "bcrypt";
import { encrypt } from "../utils/crypty.utils.js";
import { v4 as uuidv4 } from "uuid";
import crypty from "crypto";

const cardRepo = AppDataSource.getRepository("CardInfo");
const tokenRepo = AppDataSource.getRepository("PaymentToekn");
const paymentHistoryRepo = AppDataSource.getRepository("PaymentHistory");
export default class PaymentController {
  static async payment(req, res) {
    try {
      const {
        firstName,
        lastName,
        amount,
        expiryMonth,
        expiryYear,
        cvv,
        cardNumber,
      } = req.body;
      console.log(req.body);
      const cardCrypty = encrypt(cardNumber);
      console.log(cardCrypty);

      const card = await cardRepo.findOneBy({ cardNumber: cardCrypty });

      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      const isCvvValid = await bcrypt.compare(cvv, card.cvv);
      if (!isCvvValid) {
        return res.status(400).json({ error: "Invalid card details" });
      }

      if (
        card.expiryMonth !== expiryMonth ||
        card.expiryYear !== expiryYear ||
        card.firstName !== firstName ||
        card.lastName !== lastName
      ) {
        return res.status(400).json({ error: "Invalid card details" });
      }
      if (card.amount < amount) {
        return res.status(400).json({ error: "Insufficient funds" });
      }

      const token = await tokenRepo.save(
        tokenRepo.create({
          id: uuidv4(),
          code: crypty.randomInt(100000, 999999),
          amount: amount,
          expiryIn: 5 * 60 * 1000,
          card: card.id,
        })
      );

      return res
        .status(200)
        .json({ message: "Payment processed successfully", tokenId: token.id });
    } catch (error) {
      console.error("Payment processing error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async checkIdToken(req, res) {
    try {
      const tokenId = req.params.id;
      console.log("Checking token ID:", tokenId);
      const paymentToekn = await tokenRepo.findOneBy({ id: tokenId });
      if (!paymentToekn) {
        return res.status(404).json({ error: "Token not found!" });
      }
      const expiry = parseInt(paymentToekn.createdAt) +parseInt(paymentToekn.expiryIn) ;
      
      if (expiry < Date.now) {
        return res.status(400).json({ error: "Code expired!" });
      }
      if (paymentToekn.attemps === 0) {
        return res.status(400).json({ error: "No attemps reset!" });
      }
      return res
        .status(200)
        .json({
          message: "token valid",
          details: {
            expiryIn: paymentToekn.expiryIn,
            attemps: paymentToekn.attemps,
            createdAt : paymentToekn.createdAt
          },
        });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async checkCode(req, res) {
    try {
      const tokenId = req.params.id;
      const { code } = req.body;
      
      const paymentToekn = await tokenRepo.findOneBy({ id: tokenId });
      if (!paymentToekn) {
        return res.status(404).json({ error: "Token not found!" });
      }
      const expiry = parseInt(paymentToekn.createdAt) +parseInt(paymentToekn.expiryIn) ;
      
      if (expiry < Date.now) {
        return res.status(400).json({ error: "Code expired!" });
      }
      if (paymentToekn.attemps === 0) {
        return res.status(400).json({ error: "No attemps reset!" });
      }

      if (paymentToekn.code !== code) {
        paymentToekn.attemps -= 1;
        await tokenRepo.save(paymentToekn);
        return res.status(400).json({ error: "Invalid code!" });
      }

      const card = await cardRepo.findOneBy({ id: paymentToekn.card });
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      card.amount -= paymentToekn.amount;
      await cardRepo.save(card);

      // add to payment history
      await paymentHistoryRepo.save(
        paymentHistoryRepo.create({
          id: uuidv4(),
          amount: paymentToekn.amount,
          card: card.id,
        })
      );
      return res
        .status(200)
        .json({ message: "Payment completed successfully!" });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
