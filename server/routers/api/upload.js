import express from 'express';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinaryConfig from '../../config/cloudinary';
import Media from '../../models/media';

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

router.post('/', parser.array('images'), (req, res) => {
    let _media = new Media();
    let response = [];
    let images = [];
    for(var i= 0; i < req.files.length; i++){
        _media.uid = req.user._id;
        _media.src = req.files[i].url;
        _media.cid = req.files[i].public_id;
        _media.type = req.files[i].resource_type;
        _media.save();
        response.push(_media);
        images.push(_media._id);
    }
    res.json({
        images: images,
        response: response
    });
});

export default router;