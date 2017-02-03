import express from 'express';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinaryConfig from '../../config/cloudinary';

cloudinary.config(cloudinaryConfig);

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'social-network',
    allowedFormats: [
        'jpg', 'png'
    ],
    filename: function (req, file, cb) {
        cb(undefined, Date.now());
    }
});

const parser = multer({storage: storage});

const router = express.Router();

router.post('/', parser.array('images', 10), (req, res) => {
    res.json(req.files);
});

export default router;