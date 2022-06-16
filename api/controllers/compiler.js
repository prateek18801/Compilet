// const { spawn } = require('child_process');
// const path = require('path');
const compile = require('../utils/compiler');


exports.postRunFile = async (req, res) => {
    const { input } = req.body;

    const [FILENAME, EXTENSION] = req.file.filename.split('.');

    try {
        const response = await compile.c(FILENAME, input);
        return res.json({
            body: req.body,
            file: req.file,
            stdout: response.toString(),
            stderr: '...'
        });
    } catch(err) {
        return res.json({
            body: req.body,
            file: req.file,
            error: err.message
        });
    }

    res.json({
        body: req.body,
        file: req.file,
        filename: req.file.filename
    });
}