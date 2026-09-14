import fs from "fs";
import os from "os";
import path from "path";

// Vercel serverless has a read-only filesystem except /tmp
export const uploadDir = process.env.VERCEL
  ? path.join(os.tmpdir(), "uploads")
  : path.join(process.cwd(), "uploads");

export const ensureUploadDir = () => {
  fs.mkdirSync(uploadDir, { recursive: true });
};
