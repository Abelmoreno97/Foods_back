const {
  GetRecipeController,
} = require("../../models/controllers/RecipeController");

const GetRecipe = async (req, res) => {
  try {
    let allRecipes = await GetRecipeController();
    const { name } = req.query;
    if (name) {
      let recipeName = await allRecipes.filter((obj) =>
        obj.name.toLowerCase().includes(name.toLowerCase())
      );
      recipeName.length
        ? res.status(200).send(recipeName)
        : res.status(404).send(`Recipe called "${name}" not found`);
    } else {
      res.status(200).send(allRecipes);
    }
  } catch (error) {
    res.status(404).send(error + " #getAllRecipesOrName fail");
  }
};

// ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo //

const GetRecipeById = async (req, res) => {
  try {
    const allRecipes = await GetRecipeController();
    const { id } = req.params;
    if (id) {
      let recipeId = await allRecipes.filter((obj) => obj.id == id);
      recipeId.length
        ? res.status(200).send(recipeId)
        : res.status(404).send("Recipe ID Not Found");
    }
  } catch (error) {
    res.status(404).send(error + " #getRecipeById fail");
  }
};

module.exports = { GetRecipe, GetRecipeById };
