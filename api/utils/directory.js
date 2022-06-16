const fs = require('fs');

const mkdir = (dirname) => {
    fs.mkdirSync(dirname, { recursive: true });
}

module.exports = { mkdir };