const request=require('request')
const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=643ee4b06bd705dc95d8bf57319e8f5b&query='+lat+','+long
    request({url,json:true},(error,{body})=>{
        if(error)
        callback('Error in connection',undefined)
        else if(body.error)
        callback('Cannot find location',undefined)
        else
        {
            callback(undefined,body.current.weather_descriptions[0]+'. Temp is '+body.current.temperature+'. Feels Like it is '+body.current.feelslike)
        }
    })
}
module.exports=forecast