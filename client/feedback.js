const baseURL = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", function () {
  const feedbackButton = document.getElementById("feedbackButton");

  feedbackButton.addEventListener("click", function (e) {
    e.preventDefault();

    const game = document.getElementById("game").value;
    const educationalValue = parseInt(document.querySelector('input[name="edu"]:checked')?.value || 0);
    const engagementLevel = parseInt(document.querySelector('input[name="engagement"]:checked')?.value || 0);
    const userInterface = parseInt(document.querySelector('input[name="ui"]:checked')?.value || 0);
    const comments = document.querySelector('.feedback-form textarea').value;

    // Validate required fields
    if (!game || !educationalValue || !engagementLevel || !userInterface) {
      alert("Please fill out all required fields.");
      return;
    }

    fetch(baseURL + "/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        game,
        educationalValue,
        engagementLevel,
        userInterface,
        comments
      })
    })
    .then(response => {
      console.log("feedback", response)
      if (response.status === 201) {
        alert("Feedback submitted successfully!");
        // Optionally clear form fields here
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again later.");
    });
  });
});
