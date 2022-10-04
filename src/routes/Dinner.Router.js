const express = require('express');
const router = express.Router();
const api = require('../api/Routes');
const DinnerController = require('../controllers/Dinner.Controller');

router.get(api.dinner.getAll, DinnerController.getAll);
router.get(api.dinner.getOne, DinnerController.getOne);
router.post(api.dinner.createOne, DinnerController.createOne);
router.put(api.dinner.updateOne, DinnerController.updateOne);
router.delete(api.dinner.deleteOne, DinnerController.deleteOne);

module.exports = router;