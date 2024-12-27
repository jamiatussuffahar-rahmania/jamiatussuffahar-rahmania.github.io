const toggleMenu = document.querySelector('.toggle-menu i');
  const navMenu = document.querySelector('.nav-menu');

  toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });