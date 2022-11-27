const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/Recipe.Controller');
const api = require('../api/Routes');
// const AuthRequest = require('');
const authMiddleware = require('../middlewares/Auth.Middleware');
const recipeRequest = require('../request/Recipe.Request');

router.get(api.recipe.getAll, RecipeController.getAll);
router.get(api.recipe.getOne, RecipeController.getOne);
router.post(api.recipe.createOne, authMiddleware.checkJwtMiddleware, recipeRequest.validateCreate(), RecipeController.createOne);
router.put(api.recipe.updateOne, authMiddleware.checkJwtMiddleware, recipeRequest.validateUpdate(), RecipeController.updateOne);
router.delete(api.recipe.deleteOne, authMiddleware.checkJwtMiddleware, RecipeController.deleteOne);

module.exports = router;