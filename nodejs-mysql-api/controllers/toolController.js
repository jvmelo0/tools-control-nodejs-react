const models = require('../models');
const Validator = require('fastest-validator');

function post(req, res) {
    const tool = {
        description: req.body.description,
        categoryId: req.body.categoryId
    }

    const schema = {
        description: {type: "string", optional: false, max: "100"},
        categoryId: {type: "number", optional: false}
    }

    const v = new Validator();
    const vResponse = v.validate(tool, schema);

    if(vResponse !== true) {
        return res.status(400).json({
            message: "Invalid content",
            errors: vResponse
        });
    }

    models.Category.findByPk(req.body.categoryId).then(result => {
        if(result !== null) {
            models.Tool.create(tool).then(result => {
                res.status(201).json({
                    message: "Tool created successfully",
                    tool: result
                })
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                })
            });
        } else {
            res.status(400).json({
                message: "Invalid category"
            })
        }
    })
}

function getById(req, res) {
    const id = req.params.id;

    models.Tool.findByPk(id, {
        include:[{model: models.Category, attributes: ['name']}]
    }).then(result => {
        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message:"Tool not found!",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    });
}

function getByName(req, res) {
    models.Tool.findAll({
        where: {description: req.params.description},
        include:[{model: models.Category, attributes: ['name']}]
    }).then(result => {
        if(result === null) {
            res.status(404).json({
                message:"Tool Name not found!"
            }); 
        } else {
            res.status(200).json(result);
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    });
}

function getByCategory(req, res) {
    models.Tool.findAll({
        where: {categoryId: req.params.categoryId},
        include:[{model: models.Category, attributes: ['name']}]
    }).then(result => {
        if(result === null) {
            res.status(404).json({
                message:"Category not found!"
            }); 
        } else {
            res.status(200).json(result);
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    });
}

function getByAvailable(req, res) {
    models.Tool.findAll({
        where: {available: req.params.available},
        include:[{model: models.Category, attributes: ['name']}]
    }).then(result => {
        if(result === null) {
            res.status(404).json({
                message:"Tool not found!"
            }); 
        } else {
            res.status(200).json(result);
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    });
}

function getAll(req, res) {
    models.Tool.findAll({
        include:[{model: models.Category, attributes: ['name']}]
    }).then(result => {
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
    const updatedTool = {
        description: req.body.description,
        categoryId: req.body.categoryId,
        available: req.body.available
    }

    const schema = {
        description: {type: "string", optional: false, max: "100"},
        categoryId: {type: "number", optional: false},
        available: {type: "boolean", optional: false}
    }

    const v = new Validator();
    const vResponse = v.validate(updatedTool, schema);


    if(vResponse !== true) {
        return res.status(400).json({
            message: "Invalid content",
            errors: vResponse
        });
    }

    models.Category.findByPk(req.body.categoryId).then(result => {
        if(result !== null) {
            models.Tool.update(updatedTool, {where: {id:id}}).then(result => {
                const rowsUpdated = result[0];
            
                if (rowsUpdated > 0) {
                    res.status(200).json({
                        message: "Tool updated successfully",
                        tool: updatedTool
                    })
                } else {
                    res.status(404).json({
                        message:"Tool not found!",
                    })
                }
            }).catch(error => {
                res.status(500).json({
                    message:"Something went wrong",
                    error: error
                })
            });
        } else {
            res.status(400).json({
                message:"Invalid category"
            })
        }
    })

}

function destroy(req, res) {
    const id = req.params.id;

    models.Tool.destroy({where:{id:id}}).then(result => {
        if(result) {
            res.status(200).json({
                message: "Tool deleted successfully"
            })
        } else {
            res.status(404).json({
                message:"Tool not found!",
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
    getById: getById,
    getByName: getByName,
    getByCategory: getByCategory,
    getByAvailable: getByAvailable,
    getAll: getAll,
    update: update,
    destroy: destroy
}