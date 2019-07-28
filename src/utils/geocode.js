const request = require('request')

const geocode =(adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiYXJpZWJhYXMiLCJhIjoiY2p5aWNtcDU1MDg3aDNja3oyeHZ2NWxmOCJ9.qwuClSlapkJde4oD4XawhA&limit=1'
    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        }  else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            }) 
        }
    })
}

module.exports = geocode