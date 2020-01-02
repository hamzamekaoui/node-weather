const request = require('request')

const geoCode = (adress,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiaGFtemFtZSIsImEiOiJjazR2YTlxcTUwODAwM2twMnJ3ZHN2MXJhIn0.KjXCClX0z5dbD3XZqggDtg&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Erreur de connection aux services de location!', undefined)
        } else if((body.message ==='Not Found' || body.features.length === 0)) {
            callback('Adresse non trouvée!', undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode