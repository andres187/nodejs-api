module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const user = require('../controllers/userController.js')
    const protected = require('../config/middlewareJwt.js')
    
    router.post('/auth', user.auth);

    router.get('/users', protected, user.getUsers)
    router.get('/users/:id', protected, user.getUserById)
    router.post('/users', protected, user.createUser)
    router.put('/users/:id', protected, user.updateUser)
    router.delete('/users/:id', protected, user.deleteUser)

    app.use("/api", router);
}