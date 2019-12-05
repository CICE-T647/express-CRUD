const express = require("express");
const app = express();

const PORT = 3000;

const fs = require("fs");
const bodyParser = require("body-parser");

const { validateEmail, validateAge } = require("./validations/users");

const usersBuffer = fs.readFileSync("./data.json");
let users;

try {
  users = JSON.parse(usersBuffer);
} catch (e) {
  console.log(e);
  users = [];
}

// const users = JSON.parse(usersBuffer);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  if (!users || !user.length) {
    res.status(404).json({ message: "No hay usuarios en la 'base de datos'" });
  }
  res.status(200).json(users);
});

app.put("/user", (req, res) => {
  const { username, password, email, age } = req.body;

  const user = {
    id: users.length + 1,
    username,
    password,
    email,
    age
  };

  try {
    validateUser(user);

    users.push(user);

    fs.writeFileSync("./data.json", JSON.stringify(users, null, 4));

    res.status(200).json({ message: "guardado correctamente" });
  } catch (err) {
    console.log(err);
    if (err.status)
      res.status(err.status).json({ message: err.message, ok: err.ok });
    else res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user/:id", (req, res) => {
  const { username, password, age } = req.body;
  console.log(req.params);
  const { id } = req.params;

  const newUsers = users.map(user => {
    console.log(user);
    if (user) {
      if (user.id == id) {
        user.username = username ? username : user.username;
        user.password = password ? password : user.password;
        user.age = age ? age : user.age;
      }
    }
    return user;
  });

  const stringifyUsers = JSON.stringify(newUsers, null, 4);

  fs.writeFileSync("./data.json", stringifyUsers);

  res.status(200).json({ message: "Actualizado correctamente" });
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;

  users[parseInt(id) - 1] = null;

  const stringifyUsers = JSON.stringify(users, null, 4);
  fs.writeFileSync("./data.json", stringifyUsers);

  res.status(200).json({ message: "Borrado correctamente" });
});

app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.listen(PORT, () => {
  console.log(`serves listen on port ${PORT}`);
});
