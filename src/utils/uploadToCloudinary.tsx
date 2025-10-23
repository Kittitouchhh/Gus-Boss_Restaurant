import axios from "axios";
import { CLOUDINARY } from "../config/cloudinary.config";

export const uploadToCloudinary = async (file: File, folder = "general") => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY.UPLOAD_PRESET);
  formData.append("folder", folder);

  const res = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.secure_url as string;
};
