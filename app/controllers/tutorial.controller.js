const Receipe = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // console.log(req.body);return;
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "All parameters can not be empty!"
    });
  }

  // Create a Tutorial
  const tutorial = new Receipe({
    title: req.body.title,
    making_time: req.body.making_time,
    ingredients: req.body.ingredients,
    serves: req.body.serves,
    cost: req.body.cost,
  });

  // Save Recipes in the database
  Receipe.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recipes."
      });
    else res.send({
      "message": "Recipes successfully created",
      "recipes" : [data]});
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Receipe.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recipe."
      });
    else res.send({"recipes":data});
  });
};

// Find a single Receipe by Id
exports.findOne = (req, res) => {
  Receipe.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Recipe with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Recipe with id " + req.params.id
        });
      }
    } else {
      const { created_at,updated_at, ...result } = data;
      res.send({
      "message": "Recipes detail by id",
      "recipes" : [result]});
    }
  });
};


// Update a Receipe identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Receipe.updateById(
    req.params.id,
    new Receipe(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Recipe with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Recipe with id " + req.params.id
          });
        }
      } else {
        const { created_at,updated_at, ...result } = data;
        res.send({
        "message": "Recipe successfully update",
        "recipes" : [result]});
      }
    }
  );
};

// Delete a Receipe with the specified id in the request
exports.delete = (req, res) => {
  Receipe.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No Recipe found`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Recipe with id " + req.params.id
        });
      }
    } else res.send({ message: `Recipe successfully removed` });
  });
};
