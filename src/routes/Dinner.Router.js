const express = require('express');
const router = express.Router();
const api = require('../api/Routes');
const DinnerController = require('../controllers/Dinner.Controller');
const { validateCreateDinner, validateUpdateDinner, validateDeleteDinner } = require('../request/Dinner.Request');

router.get(api.dinner.getAll, DinnerController.getAll);
router.get(api.dinner.getOne, DinnerController.getAll);
router.post(api.dinner.createOne, validateCreateDinner(), DinnerController.createOne);
router.put(api.dinner.updateOne, validateUpdateDinner(), DinnerController.updateOne);
router.delete(api.dinner.deleteOne, validateDeleteDinner(), DinnerController.deleteOne);

module.exports = router;