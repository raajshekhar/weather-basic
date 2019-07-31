const request = require('request');

const forcast = function ({location, longitude, latitude }, callback) {

    const url = `https://api.darksky.net/forecast/33154dabbabb01db31cea44fdc37b015/${latitude},${longitude}?units=si`;

    request.get({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (response.body.error) {
            callback('Unable to find the location', undefined);
        } else {
            let { currently: { temperature, precipProbability }, daily: {summary} } = response.body;
            let message = `${summary} <br/> <br/>
            It is currently <strong>${temperature}</strong> celsius out in ${location}. There is a <strong>${precipProbability}</strong>% chance of rain.`
            callback(undefined,message);
        }
    });
}

module.exports = forcast;