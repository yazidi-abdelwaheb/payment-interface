import { AppDataSource } from "../../db/data-source.js";
import { encrypt } from "../utils/crypty.utils.js";
import bcrypt from "bcrypt";

const cardRepo = AppDataSource.getRepository("CardInfo");
export default class CardController {
  static async list(req, res) {
    try {
      const { page, limit, fullName, email } = req.query;
      const query = cardRepo.createQueryBuilder("card");
      const [firstName, lastName] = fullName
        ? fullName.split(" ")
        : [null, null];
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;
      query.skip((pageNumber - 1) * pageSize).take(pageSize);
      if (firstName) {
        query.andWhere("card.firstName ILIKE :firstName", {
          firstName: `%${firstName}%`,
        });
      }
      if (lastName) {
        query.andWhere("card.lastName ILIKE :lastName", {
          lastName: `%${lastName}%`,
        });
      }
      if (email) {
        query.andWhere("card.email ILIKE :email", { email: `%${email}%` });
      }
      const [cards, total] = await query.getManyAndCount();
      res.status(200).json({ cards, total, page: pageNumber, limit: pageSize });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createOne(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        expiryMonth,
        expiryYear,
        cvv,
        amount,
        cardNumber,
      } = req.body;
      const encryptedCardNumber = encrypt(cardNumber);
      const hashedCvv = await bcrypt.hash(cvv, 10);
      const newCard = cardRepo.create({
        firstName,
        lastName,
        email,
        expiryMonth,
        expiryYear,
        cvv: hashedCvv,
        amount,
        cardNumber: encryptedCardNumber,
      });
      await cardRepo.save(newCard);
      res
        .status(201)
        .json({ message: "Card created successfully", card: newCard });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const card = await cardRepo.findOneBy({ id });
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      res.status(200).json(card);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateOne(req, res) {
    try {
      const { id } = req.params;
      const card = await cardRepo.findOneBy({ id });
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      await cardRepo.updateOne(card);
      res.status(200).json({ message: "Card updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addAmount(req, res) {
    try {
      const { id } = req.params;
      const { amount } = req.body;
      const card = await cardRepo.findOneBy({ id });
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      card.amount += amount;
      await cardRepo.save(card);
      res.status(200).json({ message: "Amount added successfully", card });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
