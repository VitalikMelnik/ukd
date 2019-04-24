let multer = require('multer');
let path = require('path');

/**
 returns a multer upload object to be used in express routes
 for uploading Image
 @param fieldname { String } - The `name` of the file field in the form on frontend
 @param destination {String } - The destination of the uploaded image
 @param maxSize { Number } - The max size of the file in bytes
 */
function getImageUpload(destination = './client/public/images/', fieldname = 'blogs-images', maxSize = 2000 * 1024) {
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destination)
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '_' + Date.now() + '_' + (file.originalname.replace(/[^\w.]/ig, '')))
        }
    });

    return multer({
        fileFilter: function (req, file, cb) {

            var filetypes = /jpeg|jpg|png|gif/;
            var mimetype = filetypes.test(file.mimetype);
            var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

            if (mimetype && extname) {
                return cb(null, true);
            }
            cb("FILE_TYPE_ERR");
        },
        storage: storage,
        limits: {
            fileSize: maxSize
        }
    })
        .single(fieldname);

}

/**
 Uploads an image in the req object and returns a promise
 which resolves to the name of the uploaded file
 @param req - The express request object
 @param res - The express response object
 @param { String } destination - The directory to upload image to
 @param { String } fieldname - The `name` of the file field in the form on frontend
 @param maxSize
 @return { Promise }
 */
function uploadImage(req, res, destination, fieldname, maxSize) {
    return new Promise((resolve, reject) => {
        getImageUpload(destination, fieldname, maxSize)(req, res, (err) => {
            if (err) {
                if (String(err) === "FILE_TYPE_ERR")
                    err = "Only jpeg/png/jpg/gif file types are supported";

                if (String(err).toLowerCase() === 'error: file too large')
                    err = 'Only 2 MiB or Lower File Sizes are allowed';

                console.log('Error in uploadImage()', err);

                return reject([String(err), err])
            }

            if (!req.file) return reject(['File must not be empty']);
            //console.log(req.file);

            let {filename} = req.file;
            resolve(filename)
        })
    })
}

module.exports = uploadImage;
