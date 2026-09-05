import { validarApellidos, validarContrasena, validarCorreo, validarNombre, obligatorio } from "./validadores.js";

const formulario = document.querySelector("#formulario-registro");
const resultado = document.querySelector("#resultado-registro");

function mostrarError(campo, mensaje) {
  const input = formulario.elements[campo];
  document.querySelector(`#error-${campo}`).textContent = mensaje || "";
  input.classList.toggle("is-invalid", Boolean(mensaje));
  input.setAttribute("aria-invalid", Boolean(mensaje));
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const datos = new FormData(formulario);
  const errores = {
    nombre: validarNombre(datos.get("nombre")), apellidos: validarApellidos(datos.get("apellidos")),
    correo: validarCorreo(datos.get("correo")), contrasena: validarContrasena(datos.get("contrasena")),
    terminos: obligatorio(datos.get("terminos") === "on", "Debes aceptar los términos y condiciones"),
  };
  Object.entries(errores).forEach(([campo, mensaje]) => mostrarError(campo, mensaje));
  const primerError = Object.keys(errores).find((campo) => errores[campo]);
  if (primerError) return formulario.elements[primerError].focus();
  formulario.reset(); resultado.textContent = "Tu cuenta fue creada correctamente. Ya puedes ingresar."; resultado.focus();
});
