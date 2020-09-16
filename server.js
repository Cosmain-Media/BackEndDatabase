const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {res.send('The root route is working fine')});


app.listen(3000, () => {
    console.log('App is running on port 3000');
});