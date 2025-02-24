import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();  
const port = 3000;
let posts = []; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("combined"));

app.get("/", (req, res) => {
    // res.send("Hello");
    res.render("index.ejs", {posts: posts});
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/newblog", (req, res) => {
    res.render("newblog.ejs");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})