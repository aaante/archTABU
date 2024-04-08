const buttonGET = document.getElementById("GET");
const form = document.getElementById("form");

// Get average salary using AJAX
// buttonGET.addEventListener("click", () => {
//     console.log("GET button clicked");
//     const http = new XMLHttpRequest();
//     http.open("GET", "http://localhost:3000/");
//     http.onreadystatechange = () => {
//         if (http.readyState === 4) {
//             alert(http.responseText);
//         }
//     };
//     http.send();
// });

// GET average salary using Fetch
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

// Get form values
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    return formProps;
}

// POST data
// Add event listener on submit button
// ...
form.addEventListener("submit", (event) => {
    const http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/");
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            // alert(http.responseText);
            alert();
        }
    };
    http.send(handleSubmit(event));
});
