const request = require('request');

const geocode = function(address, callback){
    const addressEncode = encodeURIComponent(address);

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressEncode}.json?access_token=pk.eyJ1IjoidnJ1cnMiLCJhIjoiY2p5cHM1dmt4MDcxYTNtcmoyZzBtbWV0MyJ9.sEKh6F36paNWqpAPQGIlrQ`;

    request.get({url,json:true},(error, response) => {
    
        if(error){
            callback('Unable to connect to map service', undefined);
        } else if(!response.body.features.length){
            callback('Unable to find the location coordinates, Try another search', undefined);
        } else {
            const { features } = response.body;
            const {center, place_name: location } = features[0];
            const [longitude, latitude] = center;
            callback(undefined, {location, longitude, latitude});
        }
        
    })
};


module.exports = geocode;