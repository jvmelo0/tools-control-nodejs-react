const express = require('express');
const toolController = require('../controllers/toolController'); 
const checkAuthMiddleware = require('../middlewares/checkAuth');

const router = express.Router();

router
    .post("/", checkAuthMiddleware.checkAuth, toolController.post)
    .get("/:id", checkAuthMiddleware.checkAuth, toolController.getById)
    .get("/nome/:description", checkAuthMiddleware.checkAuth, toolController.getByName)
    .get("/categoria/:categoryId", checkAuthMiddleware.checkAuth, toolController.getByCategory)
    .get("/disponibilidade/:available", checkAuthMiddleware.checkAuth, toolController.getByAvailable)
    .get("/", checkAuthMiddleware.checkAuth, toolController.getAll)
    .put("/:id", checkAuthMiddleware.checkAuth, toolController.update)
    .delete("/:id", checkAuthMiddleware.checkAuth, toolController.destroy);

module.exports = router;