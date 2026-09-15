import ImageKit, { toFile } from "@imagekit/nodejs";

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  console.warn(
    "IMAGEKIT_PRIVATE_KEY is missing. Food image uploads will fail until it is set.",
  );
}

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
});

export const uploadToImageKit = async (file) => {
  const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

  const result = await imagekit.files.upload({
    file: await toFile(file.buffer, fileName),
    fileName,
    folder: "/tomato-food-images",
  });

  return {
    url: result.url,
    fileId: result.fileId,
  };
};

export const deleteFromImageKit = async (fileId) => {
  if (!fileId) return;
  await imagekit.files.delete(fileId);
};
