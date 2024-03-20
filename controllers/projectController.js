// import project Schema
const projects = require('../Models/projectSchema')

// add projecct
exports.addProject = async (req,res)=>{
    console.log('inside addproject request');
    const userId = req.payload
    console.log(userId);

    const projectimage = req.file.filename
    const {title, language, github, website, overview} = req.body
    console.log(`${title}, ${language}, ${github}, ${website}, ${overview}, ${projectimage}`);

    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exist... Upload new Project")
        }
        else{
            const newProject = new projects({
                title,language,github,website,overview,projectimage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

// getHomeProject
exports.getHomeProject = async(req,res)=>{
    try{
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

// getAllProject
exports.getAllProject = async(req,res)=>{

     const searchKey = req.query.search
     console.log(searchKey);

     const query={
        language:{
            //regular expression,option - to remove case sensitive property
            $regex:searchKey,$options:'i'
        }
     }
     
    try{
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}


//getUserProject
exports.getUserProject = async(req,res)=>{
    const userId = req.payload
   try {
      const userProject = await projects.find()
      res.status(200).json(userProject)
    
    } catch (err) {
       res.ststus(401).json(`Request failed due to ${err}`)
    
}
}

//editProject
exports.editUserProject = async (req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title,language,github,website,overview,projectimage}=req.body
    const UploadProjectImage = req.file?req.file.filename:projectimage

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectimage:UploadProjectImage,userId},{new:true})

        await updateProject.save()
        res.status(200).json(updateProject)
        
    } catch (err) {
        res.status(401).json(err)
        
    }
    
}

//deleteProject
exports.deleteUserProject = async(req,res)=>{
    const {id} = req.params

    try {
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
        
    } catch (err) {
        res.status(401).json(err)
        
    }
}