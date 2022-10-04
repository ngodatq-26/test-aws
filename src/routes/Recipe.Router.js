const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/Recipe.Controller');
const api = require('../api/Routes');
// const AuthRequest = require('');
const authMiddleware = require('../middlewares/Auth.Middleware');
const recipeRequest = require('../request/Recipe.Request');

// router.use(authMiddleware.checkJwtMiddleware);
router.get(api.recipe.all, RecipeController.all);
router.post(api.recipe.createOne, RecipeController.createOne);
router.get(api.recipe.getOne, RecipeController.getOne);
router.put(api.recipe.updateOne, RecipeController.updateOne);
router.delete(api.recipe.deleteOne, RecipeController.deleteOne);

module.exports = router;