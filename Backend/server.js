const dotenv=require('dotenv')
dotenv.config()
const express=require('express')

const app=require('./src/app')

let port=process.env.PORT || 4000
app.listen(port , (req, res)=>{
    console.log('server is running on the port -> ', port)
})