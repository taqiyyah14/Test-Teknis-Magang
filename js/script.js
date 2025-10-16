// === DARK/LIGHT MODE ===
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// cek tema tersimpan
if (localStorage.theme === 'dark') {
  html.classList.add('dark');
  themeToggle.textContent = '☀️ Light Mode';
}

// ganti tema manual
themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.theme = isDark ? 'dark' : 'light';
});

// === FETCH RANDOM USERS ===
async function getUsers() {
  const grid = document.getElementById('user-grid');
  grid.innerHTML = `<p id="loading" class="text-gray-500 dark:text-gray-300 col-span-full text-center">Loading users...</p>`;

  try {
    const res = await fetch('https://randomuser.me/api/?results=4');
    const data = await res.json();

    grid.innerHTML = data.results.map(user => `
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transform transition hover:scale-105">
        <img src="${user.picture.large}" alt="User Photo"
          class="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-md mb-3" />
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">${user.name.first} ${user.name.last}</h2>
        <p class="text-gray-600 dark:text-gray-300 text-sm">${user.email}</p>
        <p class="text-gray-700 dark:text-gray-200 mt-2">${user.location.city}, ${user.location.country}</p>

        <div class="flex justify-center gap-3 mt-3">
          <a href="mailto:${user.email}" 
            class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-lg transition">📧 Email</a>
          <a href="tel:${user.phone}" 
            class="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg transition">📞 Call</a>
        </div>
      </div>
    `).join('');
  } catch (error) {
    grid.innerHTML = `<p class="text-red-500 col-span-full text-center">Failed to load users 😢</p>`;
    console.error(error);
  }
}

// tombol refresh
document.getElementById('refresh-btn').addEventListener('click', getUsers);

// jalankan saat pertama kali
getUsers();
