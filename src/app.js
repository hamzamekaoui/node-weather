const path = require('path')
var hbs = require('express-handlebars');
const express = require('express')
const geoCode = require('./utils/geocode.js')
const weatherState = require('./utils/weatherstate.js')

const app = express()
const port = process.env.PORT || 3000

//Setting path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')

//Setting handlebars engine
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultLayout: false,
    layoutsDir: path.join(__dirname,'../views/layouts'),
    partialsDir: path.join(__dirname,'../views/partials')
  }));
app.set('view engine', 'hbs')

//Using public folder
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Météo',
        name: 'Hamza Mekaoui'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'À Propos',
        name: 'Hamza Mekaoui'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Aide',
        name: 'Hamza Mekaoui',
        message: 'Pour fermer l\'application taper ctrl + c!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.adress) {
        return res.send({
            error: 'Entrez une adresse de recherche!'
        })
    }

    geoCode(req.query.adress, (error, {latitude, longtitude, location}  = {}) => {
        if(error){
            return res.send({error})
        }
        weatherState({latitude, longtitude}, (error,weatherResult) => {
            if(error){
                return res.send({error})
            }

            res.send({
                location: location,
                weather: weatherResult
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hamza Mekaoui',
        errorMessage: 'Article d\'aide n\'est pas trouvé'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hamza Mekaoui',
        errorMessage: 'Page n\'est pas trouvé'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})