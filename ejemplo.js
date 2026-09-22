// ---------------------------------------------------------
// Ejemplo práctico de EXPRESIONES REGULARES en JavaScript
// Investigación Aplicada 2 - Escuela de Computación UDB
// ---------------------------------------------------------

// 1) Definimos las expresiones regulares (RegExp) que vamos a usar.
//    Cada una se crea con la sintaxis literal /patrón/banderas

// Valida un correo simple: texto@texto.texto
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Valida un teléfono salvadoreño: 8 dígitos, con o sin guion (7123-4567 o 71234567)
const regexTelefono = /^\d{4}-?\d{4}$/;

// Valida una contraseña segura: mínimo 8 caracteres, al menos
// una mayúscula, una minúscula, un número y un símbolo.
// Usa "lookaheads" (?=...) para exigir cada condición sin consumir texto.
const regexClave = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

// 2) Mostramos las expresiones en pantalla (para fines didácticos)
document.getElementById("codigo-regex").textContent =
`Correo:    ${regexCorreo}
Teléfono:  ${regexTelefono}
Contraseña:${regexClave}`;

// 3) Función genérica de validación en tiempo real
function validarCampo(inputId, hintId, regex, mensajeValido, mensajeInvalido) {
  const input = document.getElementById(inputId);
  const hint = document.getElementById(hintId);

  input.addEventListener("input", () => {
    const valor = input.value.trim();

    if (valor === "") {
      input.classList.remove("valid", "invalid");
      hint.classList.remove("valid", "invalid");
      return;
    }

    // .test() devuelve true/false según si el texto cumple el patrón
    const esValido = regex.test(valor);

    input.classList.toggle("valid", esValido);
    input.classList.toggle("invalid", !esValido);
    hint.classList.toggle("valid", esValido);
    hint.classList.toggle("invalid", !esValido);
    hint.textContent = esValido ? mensajeValido : mensajeInvalido;
  });
}

// 4) Aplicamos la validación a cada campo del formulario
validarCampo(
  "correo", "hint-correo", regexCorreo,
  "✓ Correo válido",
  "✗ Formato inválido (ej. usuario@dominio.com)"
);

validarCampo(
  "telefono", "hint-telefono", regexTelefono,
  "✓ Teléfono válido",
  "✗ Debe tener 8 dígitos (ej. 7123-4567)"
);

validarCampo(
  "clave", "hint-clave", regexClave,
  "✓ Contraseña segura",
  "✗ Falta mayúscula, minúscula, número o símbolo"
);
