import { Router } from "express";
import { deleteCrud } from "../models/deleteCrud.js";

export const deleteRoute = (function() {
    const deleteData = Router();
    const { deleteUserData } = deleteCrud;

    deleteData.delete("/", async (req, res) => {
        try {
            await deleteUserData(req.body.id);
        } catch (error) {
            console.error(error);
        } finally {
            res.send(`Architect deleted from database`);
        }
    });

    return { deleteData };
})();
