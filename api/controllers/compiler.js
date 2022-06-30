const compile = require('../utils/compiler');


exports.postRunFile = async (req, res) => {
    const { input } = req.body;
    
    const [FILENAME, EXTENSION] = req.file.filename.split('.');
    
    try {
        let response;
        if (EXTENSION === 'c') {
            response = await compile.c(FILENAME, input);
        } else if (EXTENSION === 'cpp') {
            response = await compile.cpp(FILENAME, input);
        } else if (EXTENSION === 'py') {
            response = await compile.py(FILENAME, input);
        } else if (EXTENSION === 'java') {
            // response = await compile.java(FILENAME, input);
        } else {
            throw(new Error('cannot read file'));
        }
        return res.json({
            body: req.body,
            file: req.file,
            stdout: response.toString(),
            stderr: '...'
        });
    
    } catch (err) {
        return res.json({
            body: req.body,
            file: req.file,
            error: err.message
        });
    }
}