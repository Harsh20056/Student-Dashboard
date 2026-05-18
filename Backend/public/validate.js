function validateForm() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("The entered credentials do not match. Please verify.");
    return false;
  }

  return true;
}