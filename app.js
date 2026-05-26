// ============================================================
// app.js — lógica extraída del HTML (app.html)
// Este archivo permite importar las funciones en los tests.
// ============================================================

// Usuarios válidos en memoria
export const users = [
  { username: "neyder.ramirez",  password: "123Admin.**" },
  { username: "juan.bustamante", password: "123Admin.**" },
  { username: "kevin.mendoza",   password: "123Admin.**" },
  { username: "kevinsenta",      password: "Admin123"    },
];

// ── Navegación SPA ──────────────────────────────────────────
const PAGES = ["login", "registro", "dashboard"];

export function navigateTo(page) {
  PAGES.forEach((p) => {
    document.getElementById("page-" + p).classList.add("hidden");
  });
  document.getElementById("page-" + page).classList.remove("hidden");
}

// ── Login ────────────────────────────────────────────────────
/**
 * Valida las credenciales contra el array `users`.
 * @returns {{ ok: boolean, error?: string, username?: string }}
 */
export function tryLogin(username, password) {
  if (!username || !password) {
    return { ok: false, error: "Ingresa usuario y contraseña" };
  }
  const match = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!match) {
    return { ok: false, error: "Usuario o contraseña incorrectos" };
  }
  return { ok: true, username };
}

// ── Registro ─────────────────────────────────────────────────
/**
 * Valida los datos del formulario de registro.
 * Si todo está bien, agrega el usuario al array.
 * @returns {{ ok: boolean, error?: string }}
 */
export function tryRegister(username, email, password, confirm) {
  if (password !== confirm) {
    return { ok: false, error: "Las contraseñas no coinciden" };
  }
  if (!username || !email || !password) {
    return { ok: false, error: "Completa todos los campos" };
  }
  users.push({ username, password });
  return { ok: true };
}

// ── Logout ───────────────────────────────────────────────────
export function logout(storage) {
  storage.removeItem("user");
}

// ── Búsqueda de cards ────────────────────────────────────────
/**
 * Filtra las cards del DOM según el texto buscado.
 * Retorna la cantidad de cards visibles.
 */
export function filterCards(container, query) {
  const cards = container.querySelectorAll(".card");
  let visible = 0;
  cards.forEach((card) => {
    const name = card.querySelector("h2").textContent.toLowerCase();
    const show = name.includes(query.toLowerCase());
    card.style.display = show ? "block" : "none";
    if (show) visible++;
  });
  return visible;
}

// ── Crear card ───────────────────────────────────────────────
/**
 * Inserta una nueva card en el contenedor y retorna el elemento creado.
 */
export function createCard(container, { name, photo, description }) {
  const div = document.createElement("div");
  div.className = "card bg-white rounded-2xl overflow-hidden shadow-xl";
  div.innerHTML = `
    <img src="${photo}" class="w-full h-56 object-cover"
         onerror="this.src='https://placehold.co/400x224?text=Sin+imagen'">
    <div class="p-5">
      <h2 class="text-2xl font-bold">${name}</h2>
      <p class="text-gray-600 mt-2">${description}</p>
      <div class="flex gap-3 mt-4">
        <button class="delete bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  `;
  container.appendChild(div);
  return div;
}

// ── Eliminar card ────────────────────────────────────────────
/**
 * Elimina la card padre al hacer clic en un botón con clase "delete".
 * Retorna true si se eliminó, false si el target no era un botón delete.
 */
export function handleDeleteClick(event) {
  if (event.target.classList.contains("delete")) {
    event.target.closest(".card").remove();
    return true;
  }
  return false;
}
