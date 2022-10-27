const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/Recipe.Controller');
const api = require('../api/Routes');
// const AuthRequest = require('');
const authMiddleware = require('../middlewares/Auth.Middleware');
const recipeRequest = require('../request/Recipe.Request');

router.use(authMiddleware.checkJwtMiddleware);
router.get(api.recipe.getAll, RecipeController.getAll);
router.get(api.recipe.getOne, RecipeController.getOne);
router.post(api.recipe.createOne, recipeRequest.validateCreate(), RecipeController.createOne);
router.put(api.recipe.updateOne, recipeRequest.validateUpdate(), RecipeController.updateOne);
router.delete(api.recipe.deleteOne, RecipeController.deleteOne);

module.exports = router;