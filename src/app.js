const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handle bars engine and view
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, resp) => {
    resp.render('index',{
        title: 'Weather',
        name: 'Arie Baas'
    })
})

app.get('/about', (req, resp) => {
    resp.render('about',{
        title: 'About me',
        name: 'Arie Baas'
    })
})

app.get('/help', (req, resp) => {
    resp.render('help',{
        title: 'Help',
        helptext: 'Message',
        name: 'Arie Baas'
    })
})

app.get('/weather', (req, resp) => {
    if(!req.query.address){
        return resp.send({
            error: 'You must provide an address'
        })
    } 

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return resp.send({
                error: error
            })
        } 
            forecast(latitude, longitude, (error, forecastdata) => {
                if(error){
                    return resp.send({
                        error: error
                    })
                } 
                    resp.send({
                        forecast: forecastdata,
                        location: location,
                        adddress: req.query.address
                    })
                
            })
        
    })
})

app.get('/products', (req,resp) => {
    if(!req.query.search){
        return resp.send({
            error: 'You must provide a search term'
        })
    } 
    //console.log(req.query.search)
    resp.send({
        products:[]
    })
})

app.get('/help/*', (req, resp) => {
    resp.render('404',{
        title: '404',
        name: 'Arie Baas',
        errormessage: 'Help article not found'
    })
})


app.get('*', (req, resp) => {
    resp.render('404',{
        title: '404',
        name: 'Arie Baas',
        errormessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})