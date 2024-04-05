const buttonGET = document.getElementById("GET");
const buttonPOST = document.getElementById("POST");

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

// For 'No Form'
buttonPOST.addEventListener("click", () => {
    console.log("POST button clicked");
    const http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/")
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            alert(http.responseText);
        }
    };
    http.send();
});
