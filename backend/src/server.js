import express from "express";
import { get } from "./routes/get.js";
import { createCrud } from "./models/createCrud.js";
// import { readCrud } from "./models/readCrud.js";
import { updateCrud } from "./models/updateCrud.js";
import { deleteCrud } from "./models/deleteCrud.js";

const app = express();
const port = 3000;
const __dirname = import.meta.dirname;
const { index, averageSalary } = get;

const { insertUserData } = createCrud;
// const { getAverageSalary } = readCrud;
const { updateUserData } = updateCrud;
const { deleteUserData } = deleteCrud;

// Middleware
app.use(express.static(__dirname + "/static"));
app.use(express.json());

// API endpoint: Serving 'index.html'
app.use("/index", index);

// API endpoint: Get average salary
app.use("/", averageSalary);

// API endpoint: Insert user data

// API endpoint: Update user data

// API endpoint: Delete user data

app.post("/", async (req, res) => {
    try {
        await insertUserData(
            req.body.name,
            parseInt(req.body.experience),
            parseInt(req.body.salary),
        );
    } catch (error) {
        console.error(error);
    } finally {
        res.send(`Architect inserted into database!`);
    }
});

app.put("/", async (req, res) => {
    try {
        await updateUserData(
            parseInt(req.body.id),
            req.body.name,
            parseInt(req.body.experience),
            parseInt(req.body.salary),
        );
    } catch (error) {
        console.error(error);
    } finally {
        res.send(`Architect's data updated!`);
    }
});

app.delete("/", async (req, res) => {
    try {
        await deleteUserData(req.body.id);
    } catch (error) {
        console.error(error);
    } finally {
        res.send(`Architect deleted from database`);
    }
});

app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port}`);
});
