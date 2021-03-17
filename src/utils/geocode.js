const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FjaGluMjdqIiwiYSI6ImNrbTB2NjZ6ODNxbTQyb253djRkYW5mdHcifQ.e-FjUiA5Yz6XplTWs75NFw'
    request({url,json:true},(error,{body})=>{
        if(error)
        callback('Error Occurred',undefined)
        else if(body.features.length==0)
        callback('URL Broken')
        else
        {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}
module.exports=geocode;