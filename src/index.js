import express from "express";
const app = express();
const port = 3000;

// Import model functions
import { SQLinsert } from "./models/SQLinsert.js";
import { SQLselect } from "./models/SQLselect.js";

app.post("/", async (req, res) => {
    try {
        await SQLinsert("Josip", 3, 10000);
    } catch (error) {
        console.error(error);
    } finally {
        res.send(`<h1>Architect inserted into database!</h1>`);
    }
});

app.get("/", async (req, res) => {
    let avg;
    try {
        avg = await SQLselect();
    } catch (error) {
        console.error(error);
    } finally {
        res.send(`<h1>Average salary: ${avg}</h1>`);
    }
});

app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port}`);
});
