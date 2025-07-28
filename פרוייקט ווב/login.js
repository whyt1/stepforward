document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginBtn");

  loginButton.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (response.ok) {
        // התחברות הצליחה – עבור לדשבורד
        window.location.href = "dashboard.html";
      } else {
        // התחברות נכשלה – הודעה למשתמש
        alert("Login failed. Please check your credentials.");
      }
    })
    .catch(error => {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    });
  });
});
