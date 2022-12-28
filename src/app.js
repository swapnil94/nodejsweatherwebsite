const path = require('path');

const express = require('express');
const hbs = require('hbs');
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebar config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Express config
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Swapnil Prajapati'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send('Address required!');
    }

    geocode(req.query.address, (error, {lat, lon, placename} = {}) => {
        if(error){
            return res.send({
                error
            });
        }
        forecast(lat, lon, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                });
            }
    
            res.send({
                placename,
                weather: forecastData,
                location: req.query.address
            })
        })
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Swapnil Prajapati'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Swapnil Prajapati',
        message: 'Some help message here'
    });
});

app.get('/help/*',(req, res) => {
    res.render('404', {
        title: '404 Help',
        message: 'Help page not found'
    });
});

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        message: 'Not found'
    });
});

app.listen(3000, () => {
    console.log('Server up on port 3000');
});