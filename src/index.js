import express from "express";
const app = express();
const port = 3000;

// Importing model functions
import { SQLinsert } from "./models/SQLinsert.js";

app.get("/insert", async (req, res) => {
    try {
        await SQLinsert("Marko", 5, 7000);
    } catch (error) {
        console.error(error);
    } finally {
        res.send("Architect inserted into database!");
    }
});

app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port}`);
});
