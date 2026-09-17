const express = require('express');
const recordController = require('../controllers/recordController');
const checkAuthMiddleware = require('../middlewares/checkAuth');

const router = express.Router();

router
    .post("/", checkAuthMiddleware.checkAuth, recordController.borrow)
    .post("/return", checkAuthMiddleware.checkAuth, recordController.giveback)
    .get("/", checkAuthMiddleware.checkAuth, recordController.getAll)
    .get("/movimento/:movementType", checkAuthMiddleware.checkAuth, recordController.getMovement)

module.exports = router;