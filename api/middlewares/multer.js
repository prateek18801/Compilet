const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'code');
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.')[1];
        cb(null, `test.${extension}`);
    },
});

const fileFilter = (req, file, cb) => {
    const extension = file.originalname.split('.')[1];
    if (extension === 'c' || extension === 'cpp' || extension === 'java' || extension === 'py') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };