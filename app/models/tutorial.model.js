const sql = require("./db.js");

// constructor
const Tutorial = function(tutorial) {
  this.title = tutorial.title;
  this.making_time = tutorial.making_time;
  this.ingredients = tutorial.ingredients;
  this.serves = tutorial.serves;
  this.cost = tutorial.cost;
};

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO recipes SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // console.log(res.id);return;
    result(null, { id: res.id, created_at: res.created_at, updated_at: res.updated_at, ...newTutorial });
  });
};

Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM recipes WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Receipe: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Receipe with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM recipes";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("recipes: ", res);
    result(null, res);
  });
};


Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE recipes SET title = ?, making_time = ?, ingredients = ? , serves = ? , cost = ? WHERE id = ?",
    [tutorial.title, tutorial.making_time, tutorial.ingredients, tutorial.serves, tutorial.cost, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Receipe with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Receipe: ", { id: id, ...tutorial });
      result(null, tutorial);
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM recipes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found recipes with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted recipes with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = result => {
  sql.query("DELETE FROM recipes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} recipes`);
    result(null, res);
  });
};

module.exports = Tutorial;
