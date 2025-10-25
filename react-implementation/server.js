// server.js
import jsonServer from "json-server";
import { v4 as uuidv4 } from "uuid";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/auth/signup", (req, res) => {
  const { username, password } = req.body;
  const db = router.db;
  const userExists = db.get("users").find({ username }).value();

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { id: uuidv4(), username, password };
  db.get("users").push(newUser).write();
  res.status(201).json({ message: "Signup successful", user: newUser });
});

server.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const db = router.db;
  const user = db.get("users").find({ username, password }).value();

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const sessionToken = uuidv4();
  res.status(200).json({ token: sessionToken, user });
});

server.use(router);
server.listen(5000, () => {
  console.log("JSON Server running at http://localhost:5000");
});
