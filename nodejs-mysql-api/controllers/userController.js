const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const timer = '15m';

function post(req, res) {

    models.User.findOne({where:{email:req.body.email}}).then(result => {
        if(result) {
            res.status(409).json({
                message:"E-mail already exists!"
            });
        } else {
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }

                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "User created successfully!"
                        })
                    }).catch(error => {
                        res.status(500).json({
                            message:"Something went wrong",
                            error: error
                        })
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong"
        })
    });
}

function login(req, res) {
    models.User.findOne({where:{email:req.body.email}}).then(user => {
        if(user === null) {
            res.status(401).json({
                message:"Invalid Credentials"
            })
        } else {
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id,
                    }, process.env.JWT_KEY, { expiresIn: timer}, function(err, token){
                        res.status(200).json({
                            message:"Authentication sucessfully!",
                            token: token
                        })
                    });
                } else {
                    res.status(401).json({
                        message:"Invalid Credentials"
                    })
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong"
        })
    });
}

function getById(req, res) {
    const id = req.params.id;

    models.User.findByPk(id).then(result => {
        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message:"User not found!",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    });
}

function getAll(req, res) {
    models.User.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    });
}

function update(req, res) {
    const id = req.params.id;
    bcryptjs.genSalt(10, function(err, salt){
        bcryptjs.hash(req.body.password, salt, function(err, hash){
            const userUpdated = {
                name: req.body.name,
                email: req.body.email,
                password: hash
            }

            models.User.update(userUpdated, {where: {id:id}}).then(result => {
                const rowsUpdated = result[0];
        
                if (rowsUpdated > 0) {
                    res.status(200).json({
                        message: "User updated successfully",
                        user: userUpdated
                    })
                } else {
                    res.status(404).json({
                        message:"User not found!",
                    })
                }
            })
        });
    });
}

function destroy(req, res) {
    const id = req.params.id;

    models.User.destroy({where:{id:id}}).then(result => {
        if(result) {
            res.status(200).json({
                message: "User deleted successfully"
            })
        } else {
            res.status(404).json({
                message:"User not found!",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    });
}

module.exports = {
    post: post,
    login: login,
    getById: getById,
    getAll: getAll,
    update: update,
    destroy: destroy
}