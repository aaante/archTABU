import express from "express";
import cors from "cors";
import { getRoute } from "./routes/getRoute.js";
import { postRoute } from "./routes/postRoute.js";
import { putRoute } from "./routes/putRoute.js";
import { deleteRoute } from "./routes/deleteRoute.js";

export const server = (function () {
    const app = express();
    const port = 3001;
    const __dirname = import.meta.dirname;
    const { index, averageSalary } = getRoute;
    const { insertData } = postRoute;
    const { updateData } = putRoute;
    const { deleteData } = deleteRoute;

    app.listen(port, () => {
        console.log(`App listening on: http://localhost:${port}`);
    });

    // Middleware
    app.use(cors());
    app.use(express.static(__dirname + "/static"));
    app.use(express.json());

    // API endpoints
    app.use("/index", index);
    app.use("/", averageSalary);
    app.use("/", insertData);
    app.use("/", updateData);
    app.use("/", deleteData);

    return { port };
})();
