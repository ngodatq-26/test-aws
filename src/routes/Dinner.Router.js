const express = require('express');
const router = express.Router();
const api = require('../api/Routes');
const DinnerController = require('../controllers/Dinner.Controller');
const { validateCreateDinner, validateUpdateDinner, validateDeleteDinner, validateGetDinner } = require('../request/Dinner.Request');
const authMiddleware = require('../middlewares/Auth.Middleware');



router.get(api.dinner.getAll, validateGetDinner(), DinnerController.getAll);
router.get(api.dinner.getOne, DinnerController.getAll);
router.post(api.dinner.createOne, authMiddleware.checkJwtMiddleware, validateCreateDinner(), DinnerController.createOne);
router.put(api.dinner.updateOne, authMiddleware.checkJwtMiddleware, validateUpdateDinner(), DinnerController.updateOne);
router.delete(api.dinner.deleteOne, authMiddleware.checkJwtMiddleware, validateDeleteDinner(), DinnerController.deleteOne);

module.exports = router;