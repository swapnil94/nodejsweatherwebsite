const request = require('request')

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3dhcG5pbHByaiIsImEiOiJjbDR6dzcwYTUyNjVpM3JwaDYyMzkyaGgxIn0.5eq9aGs1ajsHnESWubVbGw&limit=1`;

    request({ url, json: true}, (error, { body } = {})=>{
        if(error){
            callback('Unable to connect to location services', undefined);
        }else if(body?.features?.length == 0){
            callback('Place not found');
        }else{
            const data = body.features[0];
            const lat = data.center[1];
            const lon = data.center[0];
            const placename = data.place_name;
            //console.log(placename);
            callback(undefined, {lat, lon, placename});
        }
    });

}

module.exports = geocode;