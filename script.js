document
  .getElementById("leadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitBtn = document.querySelector("#leadForm button[type='submit']");
    const responseMessage = document.getElementById("responseMessage");

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    // Phone validation
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      responseMessage.textContent =
        "Please enter a valid 10-digit phone number.";
      responseMessage.style.color = "red";
      return;
    }

    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    responseMessage.textContent = "Submitting...";
    responseMessage.style.color = "blue";

    try {

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyeCKwLizdE0-NYNewe_TuIZO5PSwcsWlputksMlTtRG0g0NtZCTH6XLU-z2Z3PXcaRYg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      console.log(response);

      responseMessage.textContent =
        "Thank you! Your information has been submitted. We will get back to you shortly!";
      responseMessage.style.color = "green";

      document.getElementById("leadForm").reset();
      submitBtn.textContent = "Submitted";
    } catch (error) {
      responseMessage.textContent =
        "An error occurred while submitting the form. Please try again.";
      responseMessage.style.color = "red";

      // Re-enable button on error
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
