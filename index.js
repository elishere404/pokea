const express = require('express');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 3000;

const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'AUD': 'A$',
    'CAD': 'C$',
    'CHF': 'CHF',
    'CNY': '¥',
    'INR': '₹',
    'NZD': 'NZ$'
};

function getCurrencySymbol(currencyCode) {
    return currencySymbols[currencyCode] || currencyCode;
}

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const productsData = require('./data/products.json');

app.locals.getCurrencySymbol = getCurrencySymbol;

app.get('/', (req, res) => {
    res.redirect('/products');
});

app.get('/products', (req, res) => {
    res.render('products', { 
        products: productsData.products,
        paypalClientId: process.env.PAYPAL_CLIENT_ID || '',
        currency: process.env.CURRENCY || 'EUR'
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use((req, res) => {
    res.status(200).send(':(, something bad happened ');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 