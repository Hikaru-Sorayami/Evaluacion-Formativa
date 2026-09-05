document.querySelectorAll(".btn-secondary").forEach((boton) => {
  boton.addEventListener("click", () => {
    boton.textContent = "Agregado al carrito";
    boton.disabled = true;
  });
});
