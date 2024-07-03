import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
import axios from "axios";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "yourUsername",
    host: "localhost",
    database: "book",
    password: "yourPassword",
    port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let updateId = 1;
let oldData = []

async function getUrl(title, author) {
    try {
        const response = await axios.get(
        `https://bookcover.longitood.com/bookcover?book_title=${title}&author_name=${author}`
        );
        const url = response.data["url"];
        console.log("Image URL ->", url);
        return url;
    } catch (error) {
        console.log(error);
    }
    
}

async function getData() {
    try {
        const result = await db.query(
        "SELECT * FROM book_note ORDER BY id ASC"
        );
        const data = result.rows;
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
    
}

app.get("/", async (req, res) => {
    const data = await getData();
    res.render("index.ejs", {data: data});
});

app.get("/book", (req, res) => {
    res.render("login.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post("/submit", async (req, res) => {

    console.log("Submitted body -> ", req.body);
    const title = req.body["title"] == '' ? oldData[0]["title"] : req.body["title"];
    const author = req.body["author"] == '' ? oldData[0]["author"] : req.body["author"];
    const description = req.body["description"] == '' ? oldData[0]["description"] : req.body["description"];
    const recommendation = req.body["recommendation"] == '' ? oldData[0]["recommendation"] : req.body["recommendation"];
    const url = await getUrl(title.split(" ").join("+"), author.split(" ").join("+"));

    if (oldData === undefined || oldData.length === 0) {
        try {
            const result = await db.query(
                "INSERT INTO book_note (title, author, description, recommendation, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [title, author, description, recommendation, url]
            );
            console.log("Added Data -> ", result.rows);
    
            res.redirect("/"); 
         } catch(error) {
             console.log(error);
         }
    } else {
         try {
            await db.query(
                "UPDATE book_note SET title=$1 , author=$2, description=$3, recommendation=$4 WHERE id=$5",
                [title, author, description, recommendation, updateId]
            );
            oldData.pop();
            res.redirect("/"); 
        } catch (error) {
            console.log("Error occurred when updated -> ", error);
        }
    }
});

app.post("/update", async (req, res) => {
    const updateButtonId = parseInt(req.body["updateButtonId"]);
    console.log("Update id -> ", updateButtonId);

    try {
        const data = await db.query(
            "SELECT * FROM book_note WHERE id = $1", [updateButtonId]
        );
        console.log("Old data -> ", data.rows);
        oldData.push(data.rows[0]);
        updateId = updateButtonId;
        res.render("login.ejs")
    } catch (error) {
        console.log(error);
    }
});

app.post("/delete", async (req, res) => {
    const deleteButtonId = parseInt(req.body["deleteButtonId"]);
    console.log(deleteButtonId);
    try {
        const result = await db.query(
            "DELETE FROM book_note WHERE id = $1 RETURNING *", [deleteButtonId]
        );
        console.log("Deleted data -> ", result.rows);
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
