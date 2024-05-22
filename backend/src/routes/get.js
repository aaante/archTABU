import { Router } from "express";
import path from "node:path";
import { readCrud } from "../models/readCrud.js";

export const get = (function() {
    const __dirname = import.meta.dirname;
    const index = Router();
    const averageSalary = Router();
    const { getAverageSalary } = readCrud;

    index.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    });

    averageSalary.get("/", async (req, res) => {
        let avg;
        try {
            avg = await getAverageSalary();
        } catch (error) {
            console.error(error);
        } finally {
            res.send(`Average salary: ${avg}`);
        }
    });

    return { index, averageSalary };
})();