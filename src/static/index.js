const buttonGET = document.getElementById("GET");
const form = document.getElementById("form");

/* GET average salary using Fetch */
buttonGET.addEventListener("click", async () => {
    try {
        const h2avgSalary = document.getElementById("avg-salary");
        const result = await fetch("http://localhost:3000/", { method: "GET" });
        const avgSalary = await result.text();
        h2avgSalary.innerHTML = avgSalary;
    } catch (error) {
        console.log("Error getting average salary");
    }
});

/* POST data */
// Get form values into object
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    return formProps;
}

// Send object to route 
form.addEventListener("submit", async (event) => {
    try {
        const h2newInsert = document.getElementById("new-insert");
        const jsonRequest = handleSubmit(event);
        const result = await fetch("http://localhost:3000/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(jsonRequest),
        });
        h2newInsert.innerHTML = await result.text();
    } catch (error) {
        console.log("Error posting data");
    }
});

/* DELETE data */
// ...
