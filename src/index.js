import express from "express";
const app = express();
const port = 3000;

// Import model functions
import { SQLinsert } from "./models/SQLinsert.js";
import { SQLselect } from "./models/SQLselect.js";

// Modify to `.post`
app.get("/insert", async (req, res) => {
    try {
        await SQLinsert("Josip", 3, 10000);
    } catch (error) {
        console.error(error);
    } finally {
        res.send("Architect inserted into database!");
    }
});

app.get("/avg", async (req, res) => {
    let avg;
    try {
        avg = await SQLselect();
    } catch (error) {
        console.error(error);
    } finally {
        res.send(avg);
    }
});

app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port}`);
});
