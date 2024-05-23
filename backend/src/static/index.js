// Get html elements
const post = document.getElementById("post");
const get = document.getElementById("get");
const update = document.getElementById("update");
const del = document.getElementById("del");

// Function for getting form values into object
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    return formProps;
}

/* POST data */
post.addEventListener("submit", async (event) => {
    try {
        const h2newInsert = document.getElementById("new-insert");
        const jsonRequest = handleSubmit(event);
        const result = await fetch("http://localhost:3001/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(jsonRequest),
        });
        h2newInsert.innerHTML = await result.text();
    } catch (error) {
        console.log("Error posting data");
    }
});

/* GET average salary */
get.addEventListener("click", async () => {
    try {
        const h2avgSalary = document.getElementById("avg-salary");
        const result = await fetch(`http://localhost:3001/`, { method: "GET" });
        const avgSalary = await result.text();
        h2avgSalary.innerHTML = avgSalary;
    } catch (error) {
        console.log("Error getting average salary");
    }
});

/* UPDATE data */
update.addEventListener("submit", async (event) => {
    try {
        const h2newUpdate = document.getElementById("new-update");
        const jsonRequest = handleSubmit(event);
        const result = await fetch("http://localhost:3001/", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(jsonRequest),
        });
        h2newUpdate.innerHTML = await result.text();
    } catch (error) {
        console.log("Error updating data");
    }
});

/* DELETE data */
del.addEventListener("submit", async (event) => {
    try {
        const h2newDelete = document.getElementById("new-delete");
        const jsonRequest = handleSubmit(event);
        const result = await fetch("http://localhost:3001/", {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(jsonRequest),
        });
        h2newDelete.innerHTML = await result.text();
    } catch (error) {
        console.log("Error deleting data");
    }
});
