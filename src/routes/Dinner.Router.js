const express = require('express');
const router = express.Router();
const api = require('../api/Routes');
const DinnerController = require('../controllers/Dinner.Controller');
const AuthMiddleware = require('../middlewares/Auth.Middleware');
const { validateCreateDinner, validateUpdateDinner, validateDeleteDinner, validateGetDinner } = require('../request/Dinner.Request');

router.use(AuthMiddleware.checkJwtMiddleware);
router.get(api.dinner.getAll, validateGetDinner(), DinnerController.getAll);
router.get(api.dinner.getOne, DinnerController.getAll);
router.post(api.dinner.createOne, validateCreateDinner(), DinnerController.createOne);
router.put(api.dinner.updateOne, validateUpdateDinner(), DinnerController.updateOne);
router.delete(api.dinner.delete, validateDeleteDinner(), DinnerController.deleteOne);

module.exports = router;