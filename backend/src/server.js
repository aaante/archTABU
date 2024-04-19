// Import essentials
import express from "express";
const app = express();
const port = 3000;
const __dirname = import.meta.dirname;

// Import model functions
import { SQLinsert } from "./models/SQLinsert.js";
import { SQLselect } from "./models/SQLselect.js";
import { SQLupdate } from "./models/SQLupdate.js";
import { SQLdelete } from "./models/SQLdelete.js";

app.use(express.static(__dirname + "/static"));
app.use(express.json());

// View: index.html
app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/", async (req, res) => {
    try {
        await SQLinsert(
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
        avg = await SQLselect();
    } catch (error) {
        console.error(error);
    } finally {
        res.send(`Average salary: ${avg}`);
    }
});

app.put("/", async (req, res) => {
    try {
        await SQLupdate(
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
        await SQLdelete(req.body.id);
    } catch (error) {
        console.error(error);
    } finally {
        res.send(`Architect deleted from database`);
    }
});

app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port}`);
});
