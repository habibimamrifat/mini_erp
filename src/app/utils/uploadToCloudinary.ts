import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = async (
    filePath: string,
    folder: string
) => {
    const result = await cloudinary.uploader.upload(filePath, {
        folder,
    });

    return result.secure_url;
};