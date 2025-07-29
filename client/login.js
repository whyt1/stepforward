const baseURL = "http://localhost:3000/api" // get from env file? 

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginBtn");

  loginButton.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(baseURL+"/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      console.log("login", response)
      if (response.ok) {
        window.location.href = "dashboard.html";
      } else {
        alert("Login failed. Please check your credentials.");
      }
    })
    .catch(error => {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    });
  });
});
