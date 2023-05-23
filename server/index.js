const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// An array containing all the users
const users = [];

// Generates a random string as the ID
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/register", (req, res) => {
  // Get the user's credentials
  const { email, password, tel, username } = req.body;

  // Checks if there is an existing user with the same email or password
  let result = users.filter((user) => user.email === email || user.tel === tel);

  if (result.length === 0) {
    // Creates the structure for the user
    const newUser = { id: generateID(), email, password, username, tel };
    // Adds the user to the array of users
    users.push(newUser);
    // Returns a message
    return res.json({
      message: "Account created successfully!",
    });
  }

  // Runs if a user exists
  res.json({
    error_message: "User already exists",
  });
});

app.post("/api/login", (req, res) => {
  // Accepts the user's credentials
  const { email, password } = req.body;
  // Checks for user(s) with the same email and password
  let result = users.filter(
    (user) => user.email === email && user.password === password
  );

  if (result.length !== 1) {
    // If no user exists, it returns an error message
    return res.json({
      error_message: "Incorrect credentials",
    });
  }

  // Returns the username of the user after a successful login
  res.json({
    message: "Login successfully",
    data: {
      username: result[0].username,
    },
  });
});

// GET route handler for /api/register
app.get("/api/register", (req, res) => {
  res.status(405).json({
    error_message: "Method Not Allowed",
  });
});

// GET route handler for /api/login
app.get("/api/login", (req, res) => {
  res.status(405).json({
    error_message: "Method Not Allowed",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

