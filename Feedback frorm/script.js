let selectedRating = 0;

// Add event listener for rating stars
document.querySelectorAll('#rating span').forEach(star => {
  star.addEventListener('click', function () {
    selectedRating = parseInt(this.getAttribute('data-value'));
    updateRatingDisplay();
  });
});

// Update the rating display (highlight stars)
function updateRatingDisplay() {
  document.querySelectorAll('#rating span').forEach((s, index) => {
    s.classList.toggle('selected', index < selectedRating);
  });
}

// Handle form submission
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear previous error messages
  clearErrors();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const photo = document.getElementById('photo').files[0];

  // Validate inputs
  if (!name || !email || !message || selectedRating === 0) {
    displayError('nameError', 'Please fill out all fields.');
    displayError('emailError', 'Please fill out all fields.');
    displayError('messageError', 'Please fill out all fields.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const card = createFeedbackCard(name, email, message, selectedRating, reader.result);
    document.getElementById('feedback-cards').appendChild(card);

    // Reset the form
    document.getElementById('form').reset();
    selectedRating = 0;
    updateRatingDisplay();
  };

  if (photo) {
    reader.readAsDataURL(photo);
  } else {
    reader.onload(); // Proceed without photo
  }
});

// Clear error messages
function clearErrors() {
  document.querySelectorAll('.error').forEach(errorDiv => {
    errorDiv.textContent = '';
  });
}

// Display error messages
function displayError(elementId, message) {
  const errorDiv = document.getElementById(elementId);
  if (errorDiv) {
    errorDiv.textContent = message;
  }
}

// Create the feedback card element
function createFeedbackCard(name, email, message, rating, photoUrl) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3>${name}</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
    <p><strong>Rating:</strong> ${'★'.repeat(rating)}</p>
    ${photoUrl ? `<img src="${photoUrl}" alt="Uploaded photo">` : ''}
  `;
  return card;
}
