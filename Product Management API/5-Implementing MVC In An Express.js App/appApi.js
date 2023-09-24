const express = require('express');
const bodyParser = require("body-parser");
const products = require('./models/productModel');
const controllers = require('./controllers/productController');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use('/', controllers); 

//Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});