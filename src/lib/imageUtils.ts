// Image compression utility for storing images in localStorage
// Compresses images to a reasonable quality for web display

export interface CompressedImage {
    base64: string;
    width: number;
    height: number;
}

/**
 * Compresses an image file to a quality suitable for web display
 * @param file - The image file to compress
 * @param maxWidth - Maximum width (default 800px)
 * @param quality - JPEG quality 0-1 (default 0.7 for good quality with compression)
 */
export const compressImage = (
    file: File,
    maxWidth: number = 800,
    quality: number = 0.7
): Promise<CompressedImage> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();

            img.onload = () => {
                // Calculate new dimensions maintaining aspect ratio
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                // Create canvas for compression
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Could not get canvas context"));
                    return;
                }

                // Draw and compress
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to JPEG with specified quality
                const base64 = canvas.toDataURL("image/jpeg", quality);

                resolve({
                    base64,
                    width,
                    height,
                });
            };

            img.onerror = () => {
                reject(new Error("Failed to load image"));
            };

            img.src = event.target?.result as string;
        };

        reader.onerror = () => {
            reject(new Error("Failed to read file"));
        };

        reader.readAsDataURL(file);
    });
};

/**
 * Validates if a file is an image
 */
export const isValidImageFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    return validTypes.includes(file.type);
};

/**
 * Gets file size in MB
 */
export const getFileSizeMB = (file: File): number => {
    return file.size / (1024 * 1024);
};
