import { Router } from "express";
import { updateCrud } from "../db/crudFunctions/updateCrud.js";

export const putRoute = (function() {
    const updateData = Router();
    const { updateUserData } = updateCrud;

    updateData.put("/", async (req, res) => {
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

    return { updateData };
})();
