const express = require('express');
const userController = require('../controllers/userController');
const checkAuthMiddleware = require('../middlewares/checkAuth');

const router = express.Router();

router
    .post("/", userController.post)
    .post("/login", userController.login)
    .get("/:id", checkAuthMiddleware.checkAuth, userController.getById)
    .get("/", checkAuthMiddleware.checkAuth, userController.getAll)
    .put("/:id", checkAuthMiddleware.checkAuth, userController.update)
    .delete("/:id", checkAuthMiddleware.checkAuth, userController.destroy);

module.exports = router;