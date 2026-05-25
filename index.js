const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');
let port = 8080;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

let path = require("path");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "812267590495@jJ",
});

let getRandomUser = () => {
  return [
    faker.datatype.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}
 
//Home Route
app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["COUNT(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    res.send("some error occurec");
  }
});

//Show Route
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    res.send("some error occurec");
  }
});

//Edit Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      console.log(result);
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    res.send("some error occurec");
  }
});

//Update (DB)
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  let { password: userPass, username: newUsername } = req.body;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (userPass != user.password) {
        res.send("Wrong Password");
      }else{
        let q2 = `UPDATE user SET username= '${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result)=>{
            if(err) throw err;
            res.redirect("/user");
        })
      }
    })
  } catch (err) {
    res.send("some error occurec");
  }
});

//Adding Route
app.get("/user/new", (req, res)=>{
  res.render("new.ejs");
});

app.post("/user/new", (req, res)=>{
  let {username, email, password} = req.body;
  let id = uuidv4();
  let q = `INSERT INTO user (id, username, email, password) VALUES ( '${id}', '${username}', '${email}', '${password}')`;
  try {
    connection.query(q, (err, result)=>{
      if(err) throw err;
      console.log("Added New Row Successfully");
      res.redirect("/user");
    })
  } catch (err) {
    res.send("Something went wrong....");
  }
});

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      console.log(result);
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.delete("/user/:id", (req, res)=>{
  let {id} = req.params;
  let {password} = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result)=>{
      if(err) throw err;
      let user = result[0];
      if (user.password != password) {
        res.send("Wrong password entered");
      }else{
        let q2 = `DELETE FROM user WHERE id='${id}'`;
        connection.query(q2, (err, result)=>{
          if (err) throw err;
          else{
            console.log("deleted");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some thing went wrong...");
  }
})

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
