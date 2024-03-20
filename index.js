// 1. import . env
// Loads .env file contents into process.env by default.
require('dotenv').config()

// 2. import express
const express = require('express')

// 3. import cors
const cors = require('cors')

// import router
const router = require('./Routes/router')

// import connection.js / mongoose
require('./DB/connection')

// 4. create server - Creates an Express application. The express() function is a top-level function exported by the express module.
const pfserver = express()

// 5. use of cors by server
pfserver.use(cors())

// 6. Returns middleware that only parses json and convert into javascript object
pfserver.use(express.json())

// server use
pfserver.use(router)

//pf server should use uploads folder
//first arg - how the other application should use this file
//sec arg - to export the upload folder
pfserver.use('/uploads',express.static('./uploads'))




// 7. customize the port - by default runs at - 3000
const PORT = 4000 || process.env.PORT 

// 8. run server
pfserver.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUUMBER ${PORT}`);
})

// 9. get http request to baseurl - http://localhost:4000/
pfserver.get('/',(req,res)=>{
    res.send('get request')
})

/* // post
pfserver.post('/',(req,res)=>{
    res.send('post request')
})

//put
pfserver.put('/',(req,res)=>{
    res.send('put request')
}) */

