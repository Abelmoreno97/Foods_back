const { Diet } = require("../../db");

let diets = [
  {
    name: "gluten free",
  },
  {
    name: "ketogenic",
  },
  {
    name: "vegetarian",
  },
  {
    name: "lacto vegetarian",
  },
  {
    name: "ovo vegetarian",
  },
  {
    name: "vegan",
  },
  {
    name: "pescatarian",
  },
  {
    name: "paleolithic",
  },
  {
    name: "primal",
  },
  {
    name: "whole 30",
  },
  {
    name: "dairy free",
  },
  {
    name: "lacto ovo vegetarian",
  },
];

async function getAllDiets(req, res, next) {
  try {
    const response = await Diet.findAll();
    if (response.length > 0) return res.send(response);
    else {
      try {
        const dietsDB = await Diet.bulkCreate(diets);
        return res.send(dietsDB);
      } catch {
        (error) => next(error);
      }
    }
  } catch {
    (error) => next(error);
  }
}

module.exports = { getAllDiets };
