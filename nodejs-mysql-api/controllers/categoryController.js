const models = require('../models');

function post(req, res) {

    models.Category.findOne({where:{name:req.body.name}}).then(result => {
        if(result) {
            res.status(409).json({
                message:"Category already exists!"
            });
        } else {
            const category = {
                name: req.body.name
            }

            models.Category.create(category).then(result => {
                res.status(201).json({
                    message: "Category created successfully",
                    category: result
                })
            }).catch(error => {
                res.status(500).json({
                    message:"Something went wrong",
                    error: error
                })
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

    models.Category.findByPk(id).then(result => {
        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message:"Category not found!",
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
    models.Category.findAll().then(result => {
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
    const categoryUpdated = {
        name: req.body.name
    }

    models.Category.update(categoryUpdated, {where: {id:id}}).then(result => {
        const rowsUpdated = result[0];
        
        if (rowsUpdated > 0) {
            res.status(200).json({
                message: "Category updated successfully",
                category: categoryUpdated
            })
        } else {
            res.status(404).json({
                message:"Category not found!",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    });
}

function destroy(req, res) {
    const id = req.params.id;
    
    models.Category.destroy({where: {id:id}}).then(result => {
        if(result) {
            res.status(200).json({
                message: "Category deleted successfully"
            })
        } else {
            res.status(404).json({
                message:"Category not found!",
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
    getAll: getAll,
    update: update,
    destroy: destroy
}