const request = require('request')

const forecast =(longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f3fe9b4a4cc9884363bd11a9287243b5/' + longitude + ', ' + latitude + '?units=si&lang=nl'
    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another search', undefined)
        }  else {
            // console.log(body.daily.data[0])
            const temperatureHigh = body.daily.data[0].temperatureHigh
            const temperatureLow = body.daily.data[0].temperatureLow

            callback(undefined, 
                body.daily.data[0].summary + ' Het is op dit moment ' + body.currently.temperature + ' graden buiten '
                + 'en er is ' + body.currently.precipProbability + '% kans op regen. Hoogst en laagst gemeten temperatuur bedragen respectievelijk ' + temperatureHigh +
                ' en ' + temperatureLow + 'graden.')
        }
    })
}

module.exports = forecast