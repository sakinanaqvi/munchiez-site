document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlist-form');
  
    // Handle form submission
    waitlistForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from submitting the traditional way
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
  
      // Show success message or send form data to the server
      alert(`Thank you, ${name}! You've been added to the waitlist.`);
  
      fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }), // Send data as JSON
      })
      .then((response) => {
        if (response.ok) {
          console.log('Data successfully sent to the server');
        } else {
          console.error('Error sending data to the server');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  
      waitlistForm.reset();
    });
  });
  