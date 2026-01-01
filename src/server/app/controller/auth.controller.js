import { AppDataSource } from "../../db/data-source.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminRepo = AppDataSource.getRepository("Admin");
export default class AuthController {
  // Controller methods here
  static async login(req, res) {
    try {
        const { email, password } = req.body;
        const admin = await adminRepo.findOneBy({ email });
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }
        if (!admin.isActive) {
            return res.status(403).json({ error: "Admin account is inactive, please contact support!" });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
