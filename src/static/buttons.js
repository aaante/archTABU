const buttonGET = document.getElementById("GET");
const form = document.getElementById("form");

buttonGET.addEventListener("click", () => {
    console.log("GET button clicked");
    const http = new XMLHttpRequest();
    http.open("GET", "http://localhost:3000/");
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            alert(http.responseText);
        }
    };
    http.send();
});

// Get form values
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    return formProps;
}

form.addEventListener("submit", (event) => {
    const http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/");
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            alert(http.responseText);
        }
    };
    http.send(handleSubmit(event));
});
