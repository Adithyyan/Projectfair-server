// 1) import multer
const multer = require('multer')

// storage creation - diskStorage
const storage = multer.diskStorage({
    // it have two keys - 1. destination , 2. filename
    // destination - where the file is stored
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },

     // filename - the name in which the file stored in the destination
     filename:(req,file,callback)=>{
       const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
     }

})

const fileFilter = (req,file,callback)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("only png, jpeg, jpg files will be allowed"))
    }
}

// 2) create multerconfiguration
const multerConfig = multer({
    storage,
    fileFilter
})

// export multer
module.exports = multerConfig