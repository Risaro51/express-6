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
  database
    .query("select * from users")
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

  if (users != null) {
    res.json(users);
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

module.exports = {
  getUsers,
  getUserById,
  postUser,
};
