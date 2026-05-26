// ============================================================
// app.test.js — Pruebas unitarias con Vitest + jsdom
// ============================================================
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  users,
  tryLogin,
  tryRegister,
  logout,
  filterCards,
  createCard,
  handleDeleteClick,
  navigateTo,
} from "./app.js";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/** Crea el esqueleto mínimo del DOM que usa navigateTo() */
function buildPages() {
  ["login", "registro", "dashboard"].forEach((id) => {
    const div = document.createElement("div");
    div.id = `page-${id}`;
    div.className = "hidden";
    document.body.appendChild(div);
  });
}

/** Limpia el body entre tests */
function clearBody() {
  document.body.innerHTML = "";
}

/** Crea un contenedor de cards limpio */
function buildContainer() {
  const container = document.createElement("div");
  container.id = "cardsContainer";
  document.body.appendChild(container);
  return container;
}

/** Agrega N cards de prueba al contenedor */
function addCards(container, names) {
  names.forEach((name) =>
    createCard(container, { name, photo: "", description: "desc" })
  );
}

// ─────────────────────────────────────────────────────────────
// 1. NAVEGACIÓN SPA
// ─────────────────────────────────────────────────────────────
describe("navigateTo()", () => {
  beforeEach(() => {
    clearBody();
    buildPages();
  });

  it("muestra la página destino y oculta las demás", () => {
    navigateTo("dashboard");

    expect(document.getElementById("page-dashboard").classList.contains("hidden")).toBe(false);
    expect(document.getElementById("page-login").classList.contains("hidden")).toBe(true);
    expect(document.getElementById("page-registro").classList.contains("hidden")).toBe(true);
  });

  it("puede navegar a cada página disponible", () => {
    ["login", "registro", "dashboard"].forEach((page) => {
      navigateTo(page);
      expect(document.getElementById(`page-${page}`).classList.contains("hidden")).toBe(false);
    });
  });

  it("oculta la página anterior al navegar a otra", () => {
    navigateTo("dashboard");
    navigateTo("login");

    expect(document.getElementById("page-login").classList.contains("hidden")).toBe(false);
    expect(document.getElementById("page-dashboard").classList.contains("hidden")).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────
// 2. LOGIN
// ─────────────────────────────────────────────────────────────
describe("tryLogin()", () => {
  it("acepta credenciales válidas", () => {
    const result = tryLogin("kevinsenta", "Admin123");
    expect(result.ok).toBe(true);
    expect(result.username).toBe("kevinsenta");
  });

  it("acepta todos los usuarios del array inicial", () => {
    const validos = [
      ["neyder.ramirez",  "123Admin.**"],
      ["juan.bustamante", "123Admin.**"],
      ["kevin.mendoza",   "123Admin.**"],
      ["kevinsenta",      "Admin123"],
    ];
    validos.forEach(([u, p]) => {
      expect(tryLogin(u, p).ok).toBe(true);
    });
  });

  it("rechaza contraseña incorrecta", () => {
    const result = tryLogin("kevinsenta", "wrongpass");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Usuario o contraseña incorrectos");
  });

  it("rechaza usuario inexistente", () => {
    const result = tryLogin("noexiste", "Admin123");
    expect(result.ok).toBe(false);
  });

  it("rechaza si username está vacío", () => {
    const result = tryLogin("", "Admin123");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Ingresa usuario y contraseña");
  });

  it("rechaza si password está vacío", () => {
    const result = tryLogin("kevinsenta", "");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Ingresa usuario y contraseña");
  });

  it("es sensible a mayúsculas/minúsculas", () => {
    expect(tryLogin("Kevinsenta", "Admin123").ok).toBe(false);
    expect(tryLogin("kevinsenta", "admin123").ok).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────
// 3. REGISTRO
// ─────────────────────────────────────────────────────────────
describe("tryRegister()", () => {
  const initialCount = users.length;

  it("registra un usuario válido y lo agrega al array", () => {
    const result = tryRegister("nuevo.user", "nuevo@mail.com", "Pass123!", "Pass123!");
    expect(result.ok).toBe(true);
    expect(users.find((u) => u.username === "nuevo.user")).toBeDefined();
  });

  it("incrementa el array de usuarios en 1", () => {
    const before = users.length;
    tryRegister("otro.user", "otro@mail.com", "Pass123!", "Pass123!");
    expect(users.length).toBe(before + 1);
  });

  it("rechaza si las contraseñas no coinciden", () => {
    const result = tryRegister("x", "x@x.com", "Pass1", "Pass2");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Las contraseñas no coinciden");
  });

  it("no agrega el usuario si las contraseñas no coinciden", () => {
    const before = users.length;
    tryRegister("fantasma", "f@f.com", "abc", "xyz");
    expect(users.length).toBe(before);
  });

  it("rechaza si el username está vacío", () => {
    const result = tryRegister("", "mail@mail.com", "Pass1", "Pass1");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Completa todos los campos");
  });

  it("rechaza si el email está vacío", () => {
    const result = tryRegister("user", "", "Pass1", "Pass1");
    expect(result.ok).toBe(false);
  });

  it("rechaza si la contraseña está vacía", () => {
    const result = tryRegister("user", "u@u.com", "", "");
    expect(result.ok).toBe(false);
  });

  it("permite login con el usuario recién registrado", () => {
    tryRegister("brand.new", "b@b.com", "MyPass1", "MyPass1");
    const login = tryLogin("brand.new", "MyPass1");
    expect(login.ok).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────
// 4. LOGOUT
// ─────────────────────────────────────────────────────────────
describe("logout()", () => {
  it("elimina 'user' del storage recibido", () => {
    const storage = { store: {}, getItem: (k) => storage.store[k], setItem: (k, v) => (storage.store[k] = v), removeItem: (k) => delete storage.store[k] };
    storage.setItem("user", "kevinsenta");
    logout(storage);
    expect(storage.getItem("user")).toBeUndefined();
  });

  it("no lanza error si 'user' no existe en el storage", () => {
    const storage = { removeItem: vi.fn() };
    expect(() => logout(storage)).not.toThrow();
  });
});

// ─────────────────────────────────────────────────────────────
// 5. CREAR CARD
// ─────────────────────────────────────────────────────────────
describe("createCard()", () => {
  beforeEach(() => {
    clearBody();
  });

  it("inserta una card en el contenedor", () => {
    const container = buildContainer();
    createCard(container, { name: "Ana", photo: "https://img.co/a.jpg", description: "Dev" });
    expect(container.querySelectorAll(".card").length).toBe(1);
  });

  it("muestra el nombre correcto en el h2", () => {
    const container = buildContainer();
    createCard(container, { name: "Carlos", photo: "", description: "" });
    expect(container.querySelector("h2").textContent).toBe("Carlos");
  });

  it("incluye un botón Delete con clase 'delete'", () => {
    const container = buildContainer();
    createCard(container, { name: "Test", photo: "", description: "" });
    expect(container.querySelector(".delete")).not.toBeNull();
  });

  it("acumula múltiples cards sin sobrescribir las anteriores", () => {
    const container = buildContainer();
    createCard(container, { name: "A", photo: "", description: "" });
    createCard(container, { name: "B", photo: "", description: "" });
    createCard(container, { name: "C", photo: "", description: "" });
    expect(container.querySelectorAll(".card").length).toBe(3);
  });
});

// ─────────────────────────────────────────────────────────────
// 6. ELIMINAR CARD
// ─────────────────────────────────────────────────────────────
describe("handleDeleteClick()", () => {
  beforeEach(() => {
    clearBody();
  });

  it("elimina la card al hacer clic en el botón delete", () => {
    const container = buildContainer();
    addCards(container, ["Ana"]);
    const btn = container.querySelector(".delete");

    handleDeleteClick({ target: btn });

    expect(container.querySelectorAll(".card").length).toBe(0);
  });

  it("elimina solo la card correspondiente cuando hay varias", () => {
    const container = buildContainer();
    addCards(container, ["Ana", "Luis", "María"]);
    const btns = container.querySelectorAll(".delete");

    handleDeleteClick({ target: btns[1] }); // elimina "Luis"

    const remaining = [...container.querySelectorAll("h2")].map((h) => h.textContent);
    expect(remaining).toEqual(["Ana", "María"]);
    expect(container.querySelectorAll(".card").length).toBe(2);
  });

  it("retorna true cuando el clic era en un botón delete", () => {
    const container = buildContainer();
    addCards(container, ["Ana"]);
    const btn = container.querySelector(".delete");
    expect(handleDeleteClick({ target: btn })).toBe(true);
  });

  it("no elimina nada si el clic no es en un botón delete", () => {
    const container = buildContainer();
    addCards(container, ["Ana"]);
    const h2 = container.querySelector("h2");
    handleDeleteClick({ target: h2 });
    expect(container.querySelectorAll(".card").length).toBe(1);
  });

  it("retorna false cuando el clic no era en un botón delete", () => {
    const container = buildContainer();
    addCards(container, ["Ana"]);
    const h2 = container.querySelector("h2");
    expect(handleDeleteClick({ target: h2 })).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────
// 7. BÚSQUEDA / FILTRO DE CARDS
// ─────────────────────────────────────────────────────────────
describe("filterCards()", () => {
  let container;

  beforeEach(() => {
    clearBody();
    container = buildContainer();
    addCards(container, ["Alice", "Bob", "Alberto"]);
  });

  it("muestra solo las cards cuyo nombre contiene el texto buscado", () => {
    filterCards(container, "Al");
    const visible = [...container.querySelectorAll(".card")].filter(
      (c) => c.style.display !== "none"
    );
    expect(visible.length).toBe(2); // Alice y Alberto
  });

  it("oculta las cards que no coinciden", () => {
    filterCards(container, "Bob");
    const hidden = [...container.querySelectorAll(".card")].filter(
      (c) => c.style.display === "none"
    );
    expect(hidden.length).toBe(2); // Alice y Alberto
  });

  it("retorna el número de cards visibles", () => {
    const count = filterCards(container, "al"); // case-insensitive
    expect(count).toBe(2);
  });

  it("con búsqueda vacía muestra todas las cards", () => {
    const count = filterCards(container, "");
    expect(count).toBe(3);
  });

  it("con texto que no coincide con ninguna card retorna 0", () => {
    const count = filterCards(container, "zzz");
    expect(count).toBe(0);
  });

  it("la búsqueda es case-insensitive", () => {
    expect(filterCards(container, "ALICE")).toBe(1);
    expect(filterCards(container, "alice")).toBe(1);
  });
});
