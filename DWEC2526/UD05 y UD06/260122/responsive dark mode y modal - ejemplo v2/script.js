// ⚡ JavaScript
// Seleccionamos los elementos del DOM
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Escuchamos el clic en el botón hamburguesa
menuToggle.addEventListener('click', () => {
  // Alternamos la clase "open" → esto activará el CSS
  nav.classList.toggle('open');
});


// ⚡ JavaScript
// === MODO OSCURO ===
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement; // <html>

// Recuperar tema guardado (si existe)
const savedTheme = localStorage.getItem('theme') || 'light-mode';
htmlElement.className = savedTheme;

// Actualizar ícono del botón
themeToggle.textContent = savedTheme === 'light-mode' ? '🌙' : '☀️';

// Cambiar tema al hacer clic
themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.className;
  const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
  
  htmlElement.className = newTheme;
  localStorage.setItem('theme', newTheme); // Guardar en el navegador
  
  // Actualizar ícono
  themeToggle.textContent = newTheme === 'light-mode' ? '🌙' : '☀️';
});


// ⚡ JavaScript
// === MODAL ===
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
console.log(closeModalBtn);

// Abrir modal
openModalBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Evita que el enlace recargue la página
  modal.style.display = 'block';
});

// Cerrar modal (con la X)
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});