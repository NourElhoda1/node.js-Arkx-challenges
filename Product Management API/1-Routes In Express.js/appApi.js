const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//array of products
let products = [
  { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
  { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
  { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

//GET/products
app.get('/products', (req, res) => {
  res.json(products);
});

//GET/products/:id
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

//GET/products/search
app.get('/products/search', (req, res) => {
  const { q, minPrice, maxPrice } = req.query;
  let filterProducts = products;

  if (q) {
    filterProducts = filterProducts.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  }

  if (minPrice) {
    filterProducts = filterProducts.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filterProducts = filterProducts.filter(p => p.price <= parseFloat(maxPrice));
  }

  res.json(filterProducts);
});

//POST/products
app.post('/products', (req, res) => {
  const newProduct = {
    name: req.body.name,
    price: parseFloat(req.body.price),
  };
  newProduct.id = products.length + 1;
  console.log(newProduct);
  products.push(newProduct);
  res.status(201).json(newProduct);
});

//PUT/products/:id
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = {
    id: productId,
    name: req.body.name,
    price: parseFloat(req.body.price),
  };
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index] = updatedProduct;
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

//DELETE/products/:id
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

//Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});