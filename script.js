const modal = document.getElementById("contactModal");
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

function openModal() {
  modal.style.display = "block";
  setTimeout(() => modal.classList.add("show"), 10);
}

function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
    form.reset();
    clearErrors();
    successMessage.style.display = "none";
  }, 300);
}

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

function clearErrors() {
  document.querySelectorAll(".error").forEach((error) => {
    error.style.display = "none";
    error.textContent = "";
  });
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = "block";
  errorElement.parentElement.classList.add("shake");
  setTimeout(() => errorElement.parentElement.classList.remove("shake"), 600);
}

function validateField(value, errorId, errorMessage, validator) {
  if (!validator(value)) {
    showError(errorId, errorMessage);
    return false;
  }
  return true;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  clearErrors();

  const validations = [
    validateField(
      name.trim(),
      "nameError",
      "Name is required",
      (value) => value !== ""
    ),
    validateField(
      address.trim(),
      "addressError",
      "Address is required",
      (value) => value !== ""
    ),
    validateField(
      phone,
      "phoneError",
      "Phone number should start with +94 followed by 9 digits",
      (value) => /^\+94\d{9}$/.test(value)
    ),
    validateField(
      email,
      "emailError",
      "Please enter a valid email address (must include @ and .com)",
      (value) => /^[^\s@]+@[^\s@]+\.com$/.test(value)
    ),

    validateField(
      message,
      "messageError",
      "Message should be at least 10 characters long",
      (value) => value.length >= 10
    ),
  ];

  if (validations.every(Boolean)) {
    localStorage.setItem(
      "contactData",
      JSON.stringify({ name, address, phone, email, message })
    );
    form.reset();
    successMessage.style.display = "block";
    setTimeout(closeModal, 3000);
  }
});
