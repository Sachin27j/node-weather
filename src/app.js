const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express();
const port=process.env.PORT || 3000
//setting paths
const realPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//hbs configuration
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(realPath))

// app.get('',(req,res)=>{
//     res.send('<h1>Home Page</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send({
//         name:'Sachin',
//         age:21
//     })
// })
// app.get('/about',(req,res)=>{
//     res.send('<p style="color:red"> This site is gonna be colored red bruh</p>')
// })


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name : 'Sachin Kumar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Sachin ',
        title:'About'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Refer the documentation',
        title:'Help',
        name:'Sachin'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'Bad Url Found for Help',
        title:'Error',
        name:'Kumar'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search)
        return res.send('Search value is necessary')
    res.send({
        products:[]
    })   
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
        return res.send('address value is necessary')
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        return res.send({error})
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            return res.send({error})
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Bad Url Found',
        title:'Error',
        name:'DilKaChor'
    })
})
app.listen(port,()=>{
    console.log('Server is up on '+port)
})