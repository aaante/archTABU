import express from "express";
import "dotenv/config";
import cors from "cors";
import { getRoute } from "./routes/getRoute.js";
import { postRoute } from "./routes/postRoute.js";
import { putRoute } from "./routes/putRoute.js";
import { deleteRoute } from "./routes/deleteRoute.js";
import { dbInit } from "./db/dbInit.js";

export const server = (async function() {
    const app = express();
    const port = process.env.EXPRESS_PORT;
    const { init } = dbInit;
    const { index, averageSalary } = getRoute;
    const { insertData } = postRoute;
    const { updateData } = putRoute;
    const { deleteData } = deleteRoute;

    try {
        await init();
    } catch (ex) {
        throw ex;
    }
    app.listen(port, () => {
        console.log(`App listening on: http://localhost:${port}`);
    });

    // Middleware
    app.use(cors());
    app.use(express.json());

    // API endpoints
    app.use("/index", index);
    app.use("/", averageSalary);
    app.use("/", insertData);
    app.use("/", updateData);
    app.use("/", deleteData);
})();
