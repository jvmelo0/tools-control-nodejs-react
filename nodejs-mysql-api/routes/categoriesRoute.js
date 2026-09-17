const express = require('express');
const categoryController = require('../controllers/categoryController');
const checkAuthMiddleware = require('../middlewares/checkAuth');

const router = express.Router();

router
    .post("/", checkAuthMiddleware.checkAuth, categoryController.post)
    .get("/:id", checkAuthMiddleware.checkAuth, categoryController.getById)
    .get("/",checkAuthMiddleware.checkAuth, categoryController.getAll)
    .put("/:id", checkAuthMiddleware.checkAuth, categoryController.update)
    .delete("/:id", checkAuthMiddleware.checkAuth, categoryController.destroy);

module.exports = router;