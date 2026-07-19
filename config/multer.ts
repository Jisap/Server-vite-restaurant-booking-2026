import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5mb limit
    },
    //   fileFilter: (req, file, cb) => {
    //     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    //     if (allowedTypes.includes(file.mimetype)) {
    //       cb(null, true);
    //     } else {
    //       cb(new Error('Invalid file type'));
    //     }
    //   }
});

export default upload;