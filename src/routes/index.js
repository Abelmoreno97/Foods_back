const { Router } = require("express");
const { DietRouter } = require("./routes/DietRouter");
const { RecipeRouter } = require("./routes/RecipeRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", RecipeRouter);
router.use("/diets", DietRouter);

module.exports = router;
