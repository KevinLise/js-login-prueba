//import './style.css'
const app = document.getElementById("tap");

app.innerHTML = `
<div class="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-5">

  <!-- HEADER -->
  <header class="bg-white shadow-lg rounded-xl p-6">

    <!-- TITULO -->
    <h1 class="text-3xl font-bold text-gray-800 mb-8">
      CRUD Usuarios
    </h1>

    <!-- BARRA -->
    <div class="flex justify-between items-center">

      <!-- BUSCADOR -->
      <div class="flex gap-3">

        <input
          id="searchInput"
          type="text"
          placeholder="Ingrese el dato a buscar"
          class="border-2 border-gray-400 rounded-lg px-4 py-2 w-96 outline-none">

        <button
          class="bg-indigo-100 hover:bg-indigo-200 px-5 py-2 rounded-lg">
          Buscar
        </button>

      </div>

      <!-- BOTON NEW -->
      <button
        id="new"
        class="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white px-16 py-2 rounded-lg">
        New
      </button>

    </div>

  </header>

  <!-- FORMULARIO -->
  <section
    id="formulario"
    class="hidden bg-white mt-5 p-5 rounded-xl shadow-xl">

    <form id="formData" class="space-y-4">

      <input
        type="text"
        id="name"
        placeholder="Name"
        class="w-full border p-2 rounded"
        required>

      <input
        type="text"
        id="photo"
        placeholder="Photo URL"
        class="w-full border p-2 rounded"
        required>

      <textarea
        id="description"
        placeholder="Description"
        class="w-full border p-2 rounded"
        required></textarea>

      <div class="flex justify-between">

        <button
          type="button"
          id="cancel"
          class="bg-gray-400 text-white px-4 py-2 rounded">
          Cancel
        </button>

        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded">
          Create
        </button>

      </div>

    </form>
  </section>

  <!-- CARDS -->
  <section
    id="cards"
    class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
  </section>

</div>
`;


// ======================
// VARIABLES
// ======================
const newBtn = document.getElementById("new");
const formulario = document.getElementById("formulario");
const cancel = document.getElementById("cancel");
const formData = document.getElementById("formData");
const cards = document.getElementById("cards");

const searchInput = document.getElementById("searchInput");


// ======================
// SHOW FORM
// ======================
newBtn.addEventListener("click", () => {
  formulario.classList.remove("hidden");
});


// ======================
// CANCEL FORM
// ======================
cancel.addEventListener("click", () => {
  formulario.classList.add("hidden");
});


// ======================
// CREATE CARD
// ======================
formData.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const photo = document.getElementById("photo").value;
  const description = document.getElementById("description").value;

  cards.innerHTML += `
    <div class="card bg-white rounded-2xl overflow-hidden shadow-xl">

      <img src="${photo}" class="w-full h-56 object-cover">

      <div class="p-5">

        <h2 class="text-2xl font-bold">
          ${name}
        </h2>

        <p class="text-gray-600 mt-2">
          ${description}
        </p>

        <div class="flex gap-3 mt-4">

          <button class="delete bg-red-500 text-white px-3 py-1 rounded">
            Delete
          </button>

        </div>

      </div>

    </div>
  `;

  formData.reset();
  formulario.classList.add("hidden");
});


// ======================
// DELETE CARD
// ======================
cards.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.closest(".card").remove();
  }
});


// ======================
// SEARCH
// ======================
searchInput.addEventListener("input", () => {

  const value = searchInput.value.toLowerCase();
  const allCards = cards.querySelectorAll(".card");

  allCards.forEach(card => {

    const name = card.querySelector("h2").textContent.toLowerCase();

    if (name.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

});