document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input, textarea");
  const submitBtn = form.querySelector(".btn");

  // Función para validar campos
  function validate() {
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = "#ff4d4d";
        valid = false;
      } else {
        input.style.borderColor = "#268bff";
      }

      // Validación simple para email
      if (input.type === "email" && input.value) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(input.value)) {
          input.style.borderColor = "#ff4d4d";
          valid = false;
        }
      }
    });

    submitBtn.disabled = !valid;
  }

  inputs.forEach(input => {
    input.addEventListener("input", validate);
  });

  // Validar al cargar la página
  validate();
});
