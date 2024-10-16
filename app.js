var tl = gsap.timeline();

tl.from(".nav h1", {
  y: -30,
  opacity: 0,
  duration: 0.3,
  delay: 1,
});

tl.from(".nav h3", {
  y: -30,
  opacity: 0,
  duration: 0.3,
  stagger: 1,
});

tl.from(".nav h2", {
  y: -30,
  opacity: 0,
  duration: 0.3,
  stagger: 1,
});

// Retrieve the saved mode from localStorage and apply it
function applySavedMode() {
  const savedMode = localStorage.getItem("mode");
  if (savedMode) {
    document.body.classList.add(savedMode);
  } else {
    // Default to light mode if no saved mode is found
    document.body.classList.add("light-mode");
  }
}

// Apply the saved mode when the page loads
applySavedMode();

let darkMode = document.getElementById("dark-mode");

darkMode.addEventListener("click", function () {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    localStorage.setItem("mode", "light-mode"); // Save the light mode preference
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    localStorage.setItem("mode", "dark-mode"); // Save the dark mode preference
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// GSAP animations for home and projects sections
gsap.from(".home h2", {
  y: -30,
  opacity: 0,
  duration: 0.5,
  delay: 1,
});
gsap.from(".home h1", {
  opacity: 0,
  duration: 0.5,
  delay: 1,
});
gsap.from(".home button", {
  opacity: 0,
  duration: 0.5,
  delay: 1,
});

gsap.from(".Projects h1", {
  y: -30,
  opacity: 0,
  duration: 0.5,
  delay: 1,
});

// Initialize EmailJS
(function () {
  emailjs.init("_HTahKbghc1voDr5P"); // actual public key from EmailJS
})();

// Form submission with EmailJS
let myForm = document.getElementById("myForm");
let formOutput = document.getElementById("formOutput");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Retrieve form values
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let msg = document.getElementById("message").value.trim();

  // Check if any fields are empty
  if (!name || !email || !msg) {
    formOutput.innerHTML = `<p style="color: red;">Please fill in all fields before submitting.</p>`;
    return; // Stop form submission
  }

  // Prepare EmailJS parameters
  let templateParams = {
    from_name: name,
    from_email: email,
    message: msg,
  };

  // Send the email
  emailjs.send("service_gswv17u", "template_602lwco", templateParams).then( 
    function (response) {
      // Success message
      formOutput.innerHTML = `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${msg}</p>
            <p style="color: green;">Message successfully sent!</p>
        `;
      myForm.reset(); // Clear the form fields
    },
    function (error) {
      // Error message
      formOutput.innerHTML = `<p style="color: red;">Failed to send message. Please try again later.</p>`;
    }
  );
});
