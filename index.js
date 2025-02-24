import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();  
const port = 3000;
let posts = []; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    // res.send("Hello");
    res.render("index.ejs", {posts: posts});
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})