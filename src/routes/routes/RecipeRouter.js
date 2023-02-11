const { Router } = require("express");
const { GetRecipe, GetRecipeById } = require("../handlers/RecipeHandler");
const { CreateRecipe } = require("../../models/controllers/RecipeController");
const RecipeRouter = Router();

RecipeRouter.get("/", GetRecipe);

RecipeRouter.get("/:id", GetRecipeById);

RecipeRouter.post("/", CreateRecipe);

module.exports = { RecipeRouter };
