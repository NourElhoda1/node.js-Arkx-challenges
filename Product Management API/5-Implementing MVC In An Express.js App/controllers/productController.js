const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel'); 

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
  