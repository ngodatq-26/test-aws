const express = require('express');
const router = express.Router();
const AboutController = require('../controllers/About.Controller');
const api = require('../api/Routes');
const authMiddleware = require('../middlewares/Auth.Middleware');
const aboutRequest = require('../request/About.Request');

router.get(api.about.getAll, AboutController.getAll);
router.get(api.about.getOne, AboutController.getOne);
router.post(api.about.createOne, authMiddleware.checkJwtMiddleware, aboutRequest.validateCreate(), AboutController.createOne);
router.put(api.about.updateOne, authMiddleware.checkJwtMiddleware, aboutRequest.validateUpdate(), AboutController.updateOne);
router.delete(api.about.deleteOne, authMiddleware.checkJwtMiddleware, aboutRequest.validataDelete(), AboutController.deleteOne);
module.exports = router;