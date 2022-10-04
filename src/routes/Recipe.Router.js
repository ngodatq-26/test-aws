const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/Recipe.Controller');
const api = require('../api/Routes');
// const AuthRequest = require('');
const authMiddleware = require('../middlewares/Auth.Middleware');
const recipeRequest = require('../request/Recipe.Request');

// router.use(authMiddleware.checkJwtMiddleware);
router.get(api.recipe.all, RecipeController.all);
router.post(api.recipe.create, RecipeController.create);
router.get(api.recipe.get, RecipeController.get);
router.put(api.recipe.update, RecipeController.update);
router.delete(api.recipe.delete, RecipeController.delete);

module.exports = router;