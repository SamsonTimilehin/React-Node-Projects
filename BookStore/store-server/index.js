import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json()); //middleware to access node js server
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "segun123",
  database: "library",
});

app.get("/", (req, res) => {
  res.json("Hello this is the backend server");
});
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books;";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});
app.post("/books", (req, res) => {
  const q = "Insert into books (`title`,`desc`,`cover`,`price`) values (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Book has been created successfully");
  });
});
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) {
      return res.send(err);
    }
    return res.json("Book has been deleted successfully");
  });
});
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book has been updated successfully");
  });
});
app.listen(8800, () => {
  console.log("Connected to backend! and test");
});
