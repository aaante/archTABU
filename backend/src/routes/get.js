import { Router } from "express";
import path from "node:path";

export const get = (function() {
    const __dirname = import.meta.dirname;
    const index = Router();

    index.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    });

    return { index };
})();
