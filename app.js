if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');

const router = require('./api/routes/router');

const { mkdir } = require('./api/utils/directory');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();
mkdir('code');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', router);

app.listen(PORT, HOST, () => {
    console.log(`server running on ${HOST}:${PORT}`);
});