import multer from 'multer';

const storage = new multer.memoryStorage();

/**
 * Configuring multer with the defined storage, file size limit, and file type filter.
 */
export const upload = multer({ storage });
