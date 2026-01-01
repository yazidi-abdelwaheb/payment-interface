import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "../../db/data-source.js";

const createSuperAdmin = async () => {
  const repo = AppDataSource.getRepository("Admin");

  if ((await repo.count({ where: { role: "super" } })) > 0) {
    return;
  }
  const superAdmin = repo.create({
    id: uuidv4(),
    firstName: "Yazidi",
    lastName: "Abdelwaheb",
    email: "yazidiabdelwaheb@gmail.com",
    password: await bcrypt.hash("123456789", 10),
    role: "super",
    isActive: true,
  });
  await repo.save(superAdmin);
  console.log("Super admin created successfully.");
};

export default createSuperAdmin;
