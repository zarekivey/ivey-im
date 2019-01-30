const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
let app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})