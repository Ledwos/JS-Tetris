const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + 'frontend/index.html'));
});

app.get('/test', (req, res) => {
    res.send(`dash home, ${process.env.TEST_VAR || 'env file not here, nice!'}`);
});

app.listen(port, () => {
    console.log(`Live on port: ${port}`)
});