const baseURL = "https://stepforward.onrender.com/api";

// Function to show custom message box
function showMessageBox(title, message) {
  const messageBox = document.getElementById('messageBox');
  const messageBoxTitle = document.getElementById('messageBoxTitle');
  const messageBoxMessage = document.getElementById('messageBoxMessage');
  const messageBoxClose = document.getElementById('messageBoxClose');

  messageBoxTitle.textContent = title;
  messageBoxMessage.textContent = message;
  messageBox.classList.add('show');

  messageBoxClose.onclick = () => {
    messageBox.classList.remove('show');
  };
}

// Function to convert rating number to stars
function getStars(rating) {
  let stars = '';
  for (let i = 0; i < rating; i++) {
    stars += '★';
  }
  for (let i = rating; i < 5; i++) {
    stars += '☆'; // Optional: for empty stars
  }
  return stars;
}

// Function to calculate time ago (simple approximation)
function timeAgo(dateString) {
  const now = new Date();
  const pastDate = new Date(dateString); // Assuming dateString is a valid date format
  const seconds = Math.floor((now - pastDate) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}


// Function to render feedback cards
function renderFeedback(feedbackList) {
  const container = document.getElementById('feedbackCardsContainer');
  container.innerHTML = ''; // Clear existing feedback

  if (feedbackList.length === 0) {
    container.innerHTML = '<p>No feedback available yet.</p>';
    return;
  }

  feedbackList.forEach(feedback => {
    const feedbackCard = document.createElement('div');
    feedbackCard.classList.add('feedback-card');

    // Assuming a placeholder for author and time for now,
    // as API schema doesn't include them directly.
    // In a real app, you'd fetch user info or timestamp the feedback.
    const author = feedback.userId || "Anonymous User"; // Placeholder
    const feedbackDate = feedback.createdAt ? new Date(feedback.createdAt) : new Date(); // Use createdAt if available
    const timeDisplay = feedback.createdAt ? timeAgo(feedback.createdAt) : "Just now";


    feedbackCard.innerHTML = `
      <div class="top-row">
        <strong>${feedback.game || 'N/A'}</strong>
        <span>${timeDisplay}</span>
      </div>
      <div class="stars">${getStars(feedback.educationalValue)}</div>
      <p>"${feedback.comments || 'No specific comments.'}"</p>
      <div class="author">${author}</div>
      <a href="#" class="reply">Reply</a>
    `;
    container.appendChild(feedbackCard);
  });
}

// Function to update statistics
function updateStatistics(feedbackList) {
  const totalReviews = feedbackList.length;
  let totalRating = 0;
  let positiveCount = 0;
  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let newThisMonthCount = 0;
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  feedbackList.forEach(feedback => {
    totalRating += feedback.educationalValue; // Using educationalValue as general rating
    if (feedback.educationalValue >= 4) { // Assuming 4 and 5 stars are positive
      positiveCount++;
    }
    ratingCounts[feedback.educationalValue]++;

    if (feedback.createdAt && new Date(feedback.createdAt) > oneMonthAgo) {
      newThisMonthCount++;
    }
  });

  const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 'N/A';
  const positivePercentage = totalReviews > 0 ? ((positiveCount / totalReviews) * 100).toFixed(0) : 'N/A';

  document.getElementById('averageRating').textContent = averageRating;
  document.getElementById('totalReviews').textContent = totalReviews;
  document.getElementById('positiveFeedback').textContent = positivePercentage + '%';
  document.getElementById('newThisMonth').textContent = newThisMonthCount;

  // Update rating distribution bars
  for (let i = 1; i <= 5; i++) {
    const percent = totalReviews > 0 ? ((ratingCounts[i] / totalReviews) * 100).toFixed(0) : 0;
    document.getElementById(`fill${i}Stars`).style.width = `${percent}%`;
    document.getElementById(`percent${i}Stars`).textContent = `${percent}%`;
  }
}

// Function to fetch feedback from API
async function fetchFeedback() {
  try {
    const response = await fetch(baseURL + "/feedback");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const feedback = await response.json();
    console.log("Fetched feedback:", feedback);
    renderFeedback(feedback);
    updateStatistics(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    showMessageBox("Error", "Failed to load feedback. Please try again later.");
    document.getElementById('feedbackCardsContainer').innerHTML = '<p>Could not load feedback. Please check your internet connection or try again later.</p>';
  }
}

// Call fetchFeedback when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchFeedback);
