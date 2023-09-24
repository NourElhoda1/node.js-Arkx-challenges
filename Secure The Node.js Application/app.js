const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const validator = require('validator'); 
const bcrypt = require('bcrypt'); 

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(csurf({ cookie: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!validator.isAlphanumeric(username) || !validator.isLength(password, { min: 6 })) {
    return res.redirect('/');
  }

  const hashedPassword = 'hashed-password';
  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err || !result) {
      return res.redirect('/');
    }

    req.session.isAuthenticated = true;
    res.redirect('/dashboard');
  });
});

app.get('/dashboard', (req, res) => {
  // Secure the dashboard route to only allow authenticated users
  if (req.session.isAuthenticated) {
    res.render('dashboard');
  } else {
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
