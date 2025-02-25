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
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(morgan("combined"));

app.get("/", (req, res) => {
    // res.send("Hello");
    res.render("index.ejs", {posts: posts});
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/newblog", (req, res) => {
    res.render("newblog.ejs");
});

app.post("/newblog", (req, res) => {
   const newBlog = {
    date: new Date().toLocaleString(),
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content
   };
   posts.push(newBlog);
   res.redirect("/");
});

app.get("/post/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if(!post){
        return res.status(404).send("Post not found");
    }
    res.render("post.ejs", { post });
});

app.post("/delete/:id", (req,res) => {
    const postID = req.params.id;
    posts = posts.filter(post => post.id !== postID);
    res.redirect("/");
    console.log(`---------Post ${postID} deleted successfully!----------`);
});

app.get("/edit/:id", (req,res) => {
    const post = posts.find(p => p.id == req.params.id);
    if(!post){
        return res.status(404).send("Post not found");
    }
    res.render("editpost.ejs", { post });
});

app.post("/update/:id", (req,res) => {
    const postID = req.params.id;
    const postIndex = posts.findIndex(p => p.id === postID);

    if (postIndex === -1) {
        return res.status(404).send("Post not found");
    }

    // Update the post
    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;
    posts[postIndex].date = new Date().toLocaleString(); // Update timestamp

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});