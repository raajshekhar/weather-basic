const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Defines paths for Express config
const publicPath = path.join(__dirname , '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory  to serve
app.use(express.static(publicPath));


// Define routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Weather'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        created: 'Rajashekhar'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        created: 'Rajashekhar'
    });
});

app.get('/object', (req, res) => {
    res.send({
        name: 'Raj'
    });
}); // express detect the OBJECT then automatically goes to stringify the OBJECT

app.get('/string', (req, res) => {
    res.send('About page');
})

app.get('/weather', (req, res) => {
    if(!req.query.address)return res.send({error: 'You must provide the address'});
    geocode(req.query.address, (error, geoData) => {
        if(error){
            return res.send({
                error: 'Data not found'
            });
        }
    
        forecast(geoData, (error, forecastData) => {
            if(error){
                return res.send({
                    error: 'Unable to fetch the weather report'
                });
            }
             res.send({
                 data:forecastData
             })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) return res.send({error: 'You must provide a search term'});
    console.log(req.query.games);
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage: 'Help Article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: 'Page Not Found'
    });
})


app.listen(3000, () => console.log('server is up on 3000'))