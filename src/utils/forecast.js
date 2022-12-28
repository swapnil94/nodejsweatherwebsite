const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2c970f617891e55a349aa81fa089f375&query=${lat+','+lon}`
    request({ url, json: true}, (error, { body } = {})=>{
        if(error){
            callback('Unable to connect to weather services', undefined);
        }else if(body.error){
            callback('Unable to find location', undefined);
        }else{
            const data = body.current;
            callback(undefined, `It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`);
            //console.log(`It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`)
        }
    });
}


module.exports = forecast;