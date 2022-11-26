const express = require('express');
const router = express.Router();
const ToolController = require('../controllers/Tool.Controller');
const api = require('../api/Routes');
const authMiddleware = require('../middlewares/Auth.Middleware');
const toolRequest = require('../request/Tool.Request');


router.get(api.tool.getAll, ToolController.getAll);
router.get(api.tool.getOne, ToolController.getOne);
router.use('', authMiddleware.checkJwtMiddleware, (router) => {
    router.post(api.tool.createOne, toolRequest.validateCreate(), ToolController.createOne);
    router.put(api.tool.updateOne, toolRequest.validateUpdate(), ToolController.updateOne);
    router.delete(api.tool.deleteOne, toolRequest.validataDelete(), ToolController.deleteOne);
})

module.exports = router;