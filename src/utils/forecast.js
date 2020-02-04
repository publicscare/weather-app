const request = require('request');
// console.log(process.env.DARKSKY_API_KEY);
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_API_KEY + '/' + latitude + ',' + longitude
    // console.log(`forecast: latitude=${latitude}`);
    // console.log(`forecast: longitude=${longitude}`);
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // console.log('forecast: got data')
            // console.log(`forecast: daily summary: ${body.daily.data[0].summary}`);
            // console.log(`forecast: temp: ${body.currently.temperature}`);
            // console.log(`forecast: precipitation: ${body.currently.precipProbability}`);
            // console.log(body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.');
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast