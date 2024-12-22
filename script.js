document
  .getElementById("leadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    const responseMessage = document.getElementById("responseMessage");

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      responseMessage.textContent =
        "Please enter a valid 10-digit phone number.";
      responseMessage.style.color = "red";
      return;
    }

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
    } catch (error) {
      responseMessage.textContent =
        "An error occurred while submitting the form. Please try again.";
      responseMessage.style.color = "red";
    }
  });
