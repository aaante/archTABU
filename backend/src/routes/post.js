import { Router } from "express";
import { createCrud } from "../models/createCrud.js";

export const post = (function() {
    const insert = Router();
    const { insertUserData } = createCrud;

    insert.post("/", async (req, res) => {
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

    return { insert };
})();
