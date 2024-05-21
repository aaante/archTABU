import express from "express";
const app = express();
const __dirname = import.meta.dirname;

import { readCrud } from "../models/readCrud.js";
const { getAverageSalary } = readCrud;

app.use(express.static(__dirname + "/static"));

app.get("/index", (req, res) => {
    res.sendFile(__dirname + "../public/index.html");
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
