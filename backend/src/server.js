// Import essentials
import express from "express";
const app = express();
const port = 3000;
const __dirname = import.meta.dirname;

// Import model functions
import { createCrud } from "./models/createCrud.js";
const { insertUserData } = createCrud;
import { readCrud } from "./models/readCrud.js";
const { getAverageSalary } = readCrud;
import { updateCrud } from "./models/updateCrud.js";
const { updateUserData } = updateCrud;
import { deleteCrud } from "./models/deleteCrud.js";
const { deleteUserData } = deleteCrud;

app.use(express.static(__dirname + "/static"));
app.use(express.json());

// View: index.html
app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

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

app.get("/", async (req, res) => {
    let avg;
    try {
        avg = await getAverageSalary();
    } catch (error) {
        console.error(error);
    } finally {
        res.send(`Average salary: ${avg}`);
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
