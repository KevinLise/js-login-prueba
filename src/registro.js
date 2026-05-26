import './style.css'
const app = document.getElementById("lono");
app.innerHTML =`
<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-purple-400">
  
  <form id="registerForm"
    class="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
      Register
    </h1>

    <div class="mb-4">
      <label class="block text-gray-700 mb-2">
        Username
      </label>

      <input
        type="text"
        id="username"
        placeholder="Enter your username"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-purple-400">
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 mb-2">
        Email
      </label>

      <input
        type="email"
        id="email"
        placeholder="example@gmail.com"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-purple-400">
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 mb-2">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="********" class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-purple-400">
    </div>

    <div class="mb-6">
      <label class="block text-gray-700 mb-2">
        Confirm Password
      </label>

    <input
     type="password" id="confirmPassword" placeholder="********" class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400">
    </div>

    <button class="w-full bg-purple-500 hover:bg-purple-600 transition duration-300
      text-white py-3 rounded-lg font-semibold shadow-lg"> Create Account </button>

    <p class="text-center text-gray-600 mt-5"> Already have an account?<button type="button" id="login" 
    class="text-purple-500 font-bold cursor-pointer hover:underline">Login</button></p>

  </form>

</div>
`;


const login = document.getElementById("login")
login.addEventListener("click", function(){
window.location.href = "index.html"
})
