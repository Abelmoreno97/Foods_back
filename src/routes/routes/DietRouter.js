const { Router } = require("express");
const { getAllDiets } = require("../../models/controllers/DietController");
const DietRouter = Router();

//all this routes start with "/diets"
DietRouter.get("/", getAllDiets);

module.exports = { DietRouter };
