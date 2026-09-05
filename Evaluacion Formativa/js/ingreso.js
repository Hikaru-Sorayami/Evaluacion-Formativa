import { validarContrasena, validarCorreo } from "./validadores.js";

const formulario = document.querySelector("#formulario-ingreso");
const resultado = document.querySelector("#resultado-ingreso");

function mostrarError(campo, mensaje) {
  const input = formulario.elements[campo];
  document.querySelector(`#error-${campo}`).textContent = mensaje || "";
  input.classList.toggle("is-invalid", Boolean(mensaje)); input.setAttribute("aria-invalid", Boolean(mensaje));
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); const datos = new FormData(formulario);
  const errores = { correo: validarCorreo(datos.get("correo")), contrasena: validarContrasena(datos.get("contrasena")) };
  Object.entries(errores).forEach(([campo, mensaje]) => mostrarError(campo, mensaje));
  const primerError = Object.keys(errores).find((campo) => errores[campo]);
  if (primerError) return formulario.elements[primerError].focus();
  resultado.textContent = "Datos válidos. En un sistema con backend, ahora se iniciaría tu sesión."; resultado.focus();
});
