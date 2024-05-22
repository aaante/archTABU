import express from "express";
import { get } from "./routes/get.js";
import { post } from "./routes/post.js";
import { put } from "./routes/put.js";
import { deleteCrud } from "./models/deleteCrud.js";

const app = express();
const port = 3000;
const __dirname = import.meta.dirname;
const { index, averageSalary } = get;
const { insert } = post;
const { update } = put;

// const { updateUserData } = updateCrud;
const { deleteUserData } = deleteCrud;

app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port}`);
});

// Middleware
app.use(express.static(__dirname + "/static"));
app.use(express.json());

// API endpoint: Serving 'index.html'
app.use("/index", index);

// API endpoint: Get average salary
app.use("/", averageSalary);

// API endpoint: Insert user data
app.use("/", insert);

// API endpoint: Update user data
app.use("/", update);

// API endpont: Delete user data

app.delete("/", async (req, res) => {
    try {
        await deleteUserData(req.body.id);
    } catch (error) {
        console.error(error);
    } finally {
        res.send(`Architect deleted from database`);
    }
});
