const database = require("./database");

const users = [
  {
    id: 1,
    lastname: "Couto",
    firstname: "Henri",
    age: "34",
    birthday: "1941",
  },
  {
    id: 2,
    lastname: "Jiney",
    firstname: "Hugo",
    age: "22",
    birthday: "1972",
  },
  {
    id: 3,
    lastname: "Rinar",
    firstname: "Charles",
    age: "68",
    birthday: "1994",
  },
];

const getUsers = (req, res) => {
  let queryUserFilter;
  let sqlUserValues = [];
  if (req.query.language && req.query.city) {
    sqlUserValues.push(req.query.language, req.query.city);
    queryUserFilter = "select * from users where language = ? and city = ?";
  } else if (req.query.language) {
    sqlUserValues.push(req.query.language);
    queryUserFilter = "select * from users where language = ?";
  } else if (req.query.city) {
    sqlUserValues.push(req.query.city);
    queryUserFilter = "select * from users where city = ?";
  } else {
    queryUserFilter = "select * from users";
  }

  database
    .query(queryUserFilter, sqlUserValues)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  if (user != null) {
    res.json(user);
  } else {
    res.status(404).send("Not Found");
  }
};

const postUser = (req, res) => {
  database
    .query(
      "INSERT INTO users (id, firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?, ?,)",
      [id, firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  const { firstname, lastname, email, city, language } = req.body;

  database

    .query(
      "update user set (firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?)",

      [id, firstname, lastname, email, city, language]
    )

    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })

    .catch((err) => {
      console.error(err);

      res.status(500).send("Error editing the user");
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database

    .query("delete from users where id = ?", [id])

    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })

    .catch((err) => {
      console.error(err);

      res.status(500).send("Error deleting the user");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
};
