const models = require('../models');
const Validator = require('fastest-validator');

function borrow(req, res) {
    const record = {
        toolId: req.body.toolId,
        userId: req.body.userId
    }

    const schema = {
        toolId: {type: "number", optional: false},
        userId: {type: "number", optional: false}
    }

    const v = new Validator();
    const vResponse = v.validate(record, schema);

    if(vResponse !== true) {
        return res.status(400).json({
            message: "Invalid content",
            errors: vResponse
        });
    }

    models.Tool.findByPk(req.body.toolId).then(resultTool => {
        if(resultTool !== null) {
            if(resultTool.available === 'Disponível') {
                models.Tool.update({available: 0}, {where: {id: record.toolId}})
                models.User.findByPk(req.body.userId).then(resultUser => {
                    if(resultUser !== null) {
                        models.Record.create({toolId: record.toolId, userId: record.userId, movementType: 1}).then(result => {
                            res.status(201).json({
                                message: "Tool borrowed successfully",
                                record: result
                            })
                        }).catch(error => {
                            res.status(500).json({
                                message: "Something went wrong",
                                error: error
                            })
                        })
                    } else {
                        res.status(404).json({
                            message: "User Not Found"
                        })
                    }
                }).catch(error => {
                    res.status(500).json({
                        message: "Something went wrong",
                        error: error
                    })
                })
            } else {
                res.status(400).json({
                    message: "Tool not available"
                })
            }
        } else {
            res.status(404).json({
                message: "Tool Not Found"
            })
        }
    })
}

function giveback(req, res) {
    const record = {
        toolId: req.body.toolId,
        userId: req.body.userId
    }

    const schema = {
        toolId: {type: "number", optional: false},
        userId: {type: "number", optional: false}
    }

    const v = new Validator();
    const vResponse = v.validate(record, schema);

    if(vResponse !== true) {
        return res.status(400).json({
            message: "Invalid content",
            errors: vResponse
        });
    }

    models.Tool.findByPk(req.body.toolId).then(resultTool => {
        if(resultTool !== null) {
            if(resultTool.available === 'Indisponível') {
                models.Tool.update({available: 1}, {where: {id: record.toolId}})
                models.User.findByPk(req.body.userId).then(resultUser => {
                    if(resultUser !== null) {
                        models.Record.create({toolId: record.toolId, userId: record.userId, movementType: 0}).then(result => {
                            res.status(201).json({
                                message: "Tool returned successfully",
                                record: result
                            })
                        }).catch(error => {
                            res.status(500).json({
                                message: "Something went wrong",
                                error: error
                            })
                        })
                    } else {
                        res.status(404).json({
                            message: "User Not Found"
                        })
                    }
                }).catch(error => {
                    res.status(500).json({
                        message: "Something went wrong",
                        error: error
                    })
                })
            } else {
                res.status(400).json({
                    message: "Tool available, return failed"
                })
            }
        } else {
            res.status(404).json({
                message: "Tool Not Found"
            })
        }
    })
}

function getAll(req, res) {
    models.Record.findAll({
        include:[{model: models.Tool, attributes: ['description']}, {model: models.User, attributes: ['name']}]
    }).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    })
}

function getMovement(req, res) {
    models.Record.findAll({
            where: {movementType: req.params.movementType},
            include:[{model: models.Tool, attributes: ['description']}, {model: models.User, attributes: ['name']}]
        }).then(result => {
        if(result === null) {
            res.status(404).json({
                message:"Movement not found!"
            }); 
        } else {
            res.status(200).json(result);
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    })
}

module.exports = {
    borrow: borrow,
    giveback: giveback,
    getAll: getAll,
    getMovement: getMovement
}