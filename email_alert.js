const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById('email').value;
  const confirmEmail = document.getElementById('confirmEmail').value;

  if (email !== confirmEmail) {
    alert("Email addresses do not match.");
  } else {
    // If emails match, you can add logic here 
    // to handle form submission (e.g., send data to a server)
    alert("Form submitted successfully!"); 
  }
});