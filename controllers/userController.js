// import model
const users = require('../Models/userSchema')

// import JWT
const jwt = require('jsonwebtoken')

// logic control for register
exports.register = async(req,res)=>{
    // logic
    console.log('inide userController - register logic');
    // destructuring data from the client request body (since json format is converted into javascript object by the .json() method used in index.js file)
    const {username,email,password} = req.body

   try {// since email is the unique value we are checking that thee email is already present i the database 
    // for that we are using findOne method whicch return entire document when the condition is true else return null
          const existingUser = await users.findOne({email})

          if(existingUser){
            // if findOne return document it means that the user already exists
            // so we are sending a response in the 400 series (client requeest error)
            res.status(406).json('Account alreadt Exists... please Login')
          }
          else{
            // if findOne returns null , it means the email or the user doesnot exist in the database 
            // we register the user
            const newUser = new users({
                username,
                email,
                password,
                github:'',
                linkedin:'',
                profile:''
            })
            // inorder to add the above object use save() method in mongoose
            newUser.save()

            // response
            res.status(200).json(newUser)

          }
        }
        catch(err){
            res.status(401).json('Registration request Failed due to',err)
        }

    
}

// logic for login

exports.login = async(req, res)=>{
  console.log('inside login function');
  const {email, password} = req.body


  try{
    const existingUser = await users.findOne({email,password})

  if(existingUser){
    // sign is the function used to create token
    //first tag - payload - the innformation that is secretly transmitted
    // second tag - secret key - based on which the token is generated
    const token =  jwt.sign({userId: existingUser._id},"dangerkey1234")
    res.status(200).json({
      existingUser,
      token
    })
  }
  else{
    res.status(404).json('Invalid emailId or password')
  }
}
catch(err){
  res.status(401).json('Login request failed due to :',err)
}
}