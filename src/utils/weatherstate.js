const request = require('request')

const weatherState = ({latitude, longtitude}, callback) => {
    const locationString = latitude + ',' + longtitude
    const url = 'https://api.darksky.net/forecast/52e9c558107cbaf614443a6c72243182/' + encodeURIComponent(locationString) + '?units=si&lang=fr'

    request({url, json: true}, (error,{body} = {}) => {
        if (error) {
            callback('Erreur de connection aux services de météo!',undefined)
        } else if(body.error) {
            callback('Cordonnées non trouvées!', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' La temperature est égal à ' + body.currently.temperature + ' degrés et il y a ' + body.currently.precipProbability + '% chance qu\'il pleut.')
        }
    })
}

module.exports = weatherState