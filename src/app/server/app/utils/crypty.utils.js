import crypto from "crypto";


const key = crypto
  .createHash("sha256")
  .update(process.env.SECRET_KEY || "")
  .digest();

export function encrypt(text) {
  const iv = "afe3hls5skds5c1b";
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return iv.toString("hex") + "." + encrypted.toString("hex");
}

export function decrypt(data) {
  const [ivHex, encryptedHex] = data.split(".");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    Buffer.from(ivHex, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final()
  ]);
  return decrypted.toString();
}
