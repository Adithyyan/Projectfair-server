// path to resolve the client request

// 1.  import express
const express = require('express')

// import controller
const userController = require('../controllers/userController')

// import projectController
const projectController = require('../controllers/projectController')

// import jwt middleware
const jwtMiddleware = require('../middlewares/jwtMiddleware')

// import multerconfig
const multerConfig = require('../middlewares/multerMiddleware')

// 2. create an object for the class router in express
const router = new express.Router()

// 3. logic
    // path for resolving the request
    // syntax - router.httprequest('path to resolve the request',()=>{how to resolve the request (inside controller)})

    // a) register
    router.post('/user/register',userController.register)

    // b) login
    router.post('/user/login',userController.login)

    // c) add project
    router.post('/project/add',jwtMiddleware,multerConfig.single('projectimage'),projectController.addProject)

    //get home project
    router.get('/projects/home-project',projectController.getHomeProject)

    //get all project
    router.get('/projects/all-project',jwtMiddleware,projectController.getAllProject)

    //get user project
    router.get('/user/all-project',jwtMiddleware,projectController.getUserProject)

    //edit project
    router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectimage'),projectController.editUserProject)

    //delete project
    router.delete('/project/remove/:id',jwtMiddleware,projectController,projectController.deleteUserProject)


// 4. export router
module.exports = router