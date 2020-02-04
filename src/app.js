
const path = require('path');
const dotenv = require('dotenv').config({path: path.join(__dirname, '.env')});
const express = require('express');
const hbs = require('hbs');
const author = '(c) BCyberHard';
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Create the express object - refer to expressjs.com for API reference
const app = express();
const port = process.env.PORT || 3000;

// configure static pages
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

// setup templating engine, using handlebars, and customize view directory
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,"../templates/partials");
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup route handlers
//
app.route('/').all((req, res, next) => {
        next();
})
.get( (req, res, next) => { 
    res.render('index', { 
        title: 'Weather App',
        author: author
    });
});

app.get('/help', (req, res) => { 
    res.render('help', {
        title: 'Help',
        helpText: 'a liitle help for my friends',
        author: author
    }); 
});

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        author: author
    });
})

// JSON endpoint for querying mapbox and darksky for forecast data
//
app.get('/weather',(req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address location'
        })
    }

    // API call to get forecast, setting default params = {} to catch bad address data
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData ) => {
            if(error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({ 
            error: 'you must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    })

})
// example json response
// app.get('/examplejsonresponse',(req, res) => {
//     res.send({
//         name: 'BC',
//         age: 53
//     });
// })


// 404 handlers
app.get('/help/*', (req, res, next) => {
    res.render('404',{
        errorMessage: 'Help article not found.',
        author: author
    });
});

app.get('*', (req, res, next) => {
    res.render('404',{
        errorMessage: 'Page not found.',
        author: author
    });
});


// start the server listening on port 3000
app.listen(port, () => {
    console.log(`Express, listening on port ${port}`);
})