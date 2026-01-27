import cloudinary from "./cloudinary";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder = "nextjs-companyuploads"
): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });
};