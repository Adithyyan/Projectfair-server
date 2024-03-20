// import mongoose
const mongoose = require('mongoose')

// connection string on mongodb
const connectionString = process.env.DATABASE

// connect to mongodb using mongoose
mongoose.connect(connectionString).then((res)=>{
    console.log('Mongodb connected successfully');
}).catch((err)=>{
    console.log(`mongodb connection failed due to ${err}`);
})
