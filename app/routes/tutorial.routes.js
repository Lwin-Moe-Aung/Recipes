module.exports = app => {
  const recipes = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Recipes
  router.post("/", recipes.create);

  // Retrieve all Recipes
  router.get("/", recipes.findAll);

  // Retrieve a single Recipes with id
  router.get("/:id", recipes.findOne);

  // Update a Recipes with id
  router.patch("/:id", recipes.update);

  // Delete a Recipes with id
  router.delete("/:id", recipes.delete);

  app.use('/recipes', router);
};
