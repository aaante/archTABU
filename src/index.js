// Import essentials
import express from "express";
const app = express();
const port = 3000;
const __dirname = import.meta.dirname;

// Import model functions
import { SQLinsert } from "./models/SQLinsert.js";
import { SQLselect } from "./models/SQLselect.js";

app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/:avg", async (req, res) => {
    console.log(req.params);
    if (req.params.avg === "avg") {
        let avg;
        try {
            avg = await SQLselect();
        } catch (error) {
            console.error(error);
        } finally {
            res.send(`<h1>Average salary: ${avg}</h1>`);
        }
    } else {
        res.send(`<h1>No salaries</h1>`);
    }
});

// app.post("/", async (req, res) => {
//     try {
//         await SQLinsert("Ante", 8, 12000);
//     } catch (error) {
//         console.error(error);
//     } finally {
//         res.send(`<h1>Architect inserted into database!</h1>`);
//     }
// });

app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port}`);
});
