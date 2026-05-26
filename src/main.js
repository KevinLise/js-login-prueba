//import './style.css'

const users = [
  { username: "neyder.ramirez", password: "123Admin.**" },
  {
    username: "juan.bustamante",
    password: "123Admin.**",
  },
  { username: "kevin.mendoza", password: "123Admin.**" }
];
const app = document.getElementById("app");
app.innerHTML = `

    <div class="min-h-screen flex items-center justify-center">
      <form id="loginForm"
      class = "bg-white p-8 rounded-2xl shadow-2xl w-960 max-w-md" >
      <h1 class="font-bold text-center text-2xl mt-1">Login</h1>
        <label class="block text-gray-700 mb-2" for="username">Username</label>
        <input class ="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="example@gmail.com"type="text"  id="username" name="username">
        <label class="block text-gray-700 mb-2 mt-4" for="password">Password</label>
        <input class = "w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="*********"type="password" id="password" name="password">
        <button class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-8" id="login">Login</button>
        <h1 class="text-center mt-3"> Don't you have an account?
  <button type="button" id="registro" class="text-blue-500 font-bold hover:underline"> Register</button> </h1>
    </div>
`;

const body = document.body;
body.classList.add("bg-gradient-to-r", "from-blue-300", "to-red-300")

const form = document.getElementById("loginForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Hey no hay username o password");
    return;
  }

  if (username === "kevinsenta" && password === "Admin123") {
   sessionStorage.setItem("user", username)
   localStorage.setItem("user", username)
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});
const registro =() => {
  localStorage.setItem("registro","registros.html");
  window.location.href = "registros.html";
};
document.getElementById("registro")
.addEventListener("click" , registro);