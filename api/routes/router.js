const router = require('express').Router();

const compiler = require('../controllers/compiler');

const { upload } = require('../middlewares/multer');

router.get('/', (req, res) => {
    res.send('server running on locahost');
});

router.post('/v1/run', upload.single('source'), compiler.postRunFile); 

module.exports = router;