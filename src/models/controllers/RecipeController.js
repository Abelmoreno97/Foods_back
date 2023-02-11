const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../../db");
const { getAllDiets } = require("./DietController");
require('dotenv').config();

// Filtra toda la info de la funcion Main id, name, summary, healthScore,steps .replace(/<[^>]*>?/g, "")
const shorterArray = (array) =>
  array.map((elem) => {
    return {
      id: elem.id,
      name: elem.title,
      summary: elem.summary,
      healthScore: elem.healthScore,
      steps: elem.analyzedInstructions[0]?.steps.map((e) => {
        return e.number + " " + e.step;
      }),
      diets: elem.diets,
      dishTypes: elem.dishTypes.join(", "),
      image: elem.image,
    };
  });

// trae toda la info de la api
const Main = async () => {
  const results = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  return results.data.results;
};

const GetApiRecipeController = async () => {
  const apilist = await Main();
  const apiarray = shorterArray(apilist);
  return apiarray;
};

// ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo //

// trae las recetas de la base de datos
const getDbRecipes = async () => {
  try {
    const getDBinfo = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return getDBinfo;
  } catch (error) {
    console.log(error + " #getDBInfo fail");
  }
};

const processedDbRecipes = async () => {
  try {
    const dataDb = await getDbRecipes();
    const obj = dataDb.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      healthScore: recipe.healthScore,
      image: recipe.image,
      summary: recipe.summary,
      steps: recipe.steps,
      like: recipe.like,
      dishTypes:recipe.dishTypes,
      diets: recipe.Diets.map((rec) => {
        return rec.name;
      }),
      // // .join(", "),
    }));
    return obj;
  } catch (err) {
    console.log(err);
  }
};

// ejecuta Main dentro del parametro de shorterArray y retorna solo lo necesario de la api
const GetDbRecipeController = async () => {
  const ApiArray = await processedDbRecipes();
  return ApiArray;
};

// ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo //

const GetRecipeController = async () => {
  const apiinfo = await GetApiRecipeController();
  const dbinfo = await GetDbRecipeController();
  const allinfo = dbinfo.concat(apiinfo);
  return allinfo;
};

// ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo //

const CreateRecipeController = async (
  name,
  summary,
  healthScore,
  steps,
  dishTypes,
  like,
  image,
  diets
) => await Recipe.create({ name, summary, healthScore, steps, dishTypes, like, image, diets });

const CreateRecipe = async (req, res) => {
  try {
    const { name, summary, healthScore, image, dishTypes, like, steps, diets } = req.body;

    const recipeCreated = await Recipe.create({
      name,
      summary,
      healthScore,
      image,
      like,
      dishTypes,
      steps,
    });

    await getAllDiets();

    const filterDiets = await Diet.findAll({
      where: { name: diets },
    });

    recipeCreated.addDiet(filterDiets);
    res.status(200).send(" Recipe created!!! 🟢🟢🟢🟢");
  } catch (error) {
    res.status(404).send(error + " #createRecipe fail!!!");
  }
};

module.exports = { CreateRecipeController, GetRecipeController, CreateRecipe };
