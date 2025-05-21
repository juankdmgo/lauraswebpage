document.addEventListener("DOMContentLoaded", function () {
  // --- Código existente del Menú Hamburguesa y Título del Header ---
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const menuContent = document.getElementById("menu-content");
  const navLinks = document.querySelectorAll("#menu-content .menu-list a");
  const body = document.body;
  const header = document.querySelector(".header"); // Asegúrate de que 'header' esté definido
  const headerTitleTemp = document.querySelector(".header-title-temp");
  let scrollThreshold = 0;

  if (header) {
    setTimeout(() => {
      scrollThreshold = header.offsetHeight + 10;
    }, 100);
  }

  function toggleMenu() {
    hamburgerMenu.classList.toggle("open");
    menuContent.classList.toggle("open");
    body.classList.toggle("no-scroll");
  }

  hamburgerMenu.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (menuContent.classList.contains("open")) {
        toggleMenu();
      }
    });
  });

  // --- CÓDIGO ACTUALIZADO PARA SWIPER EN TESTIMONIOS (SIEMPRE ACTIVO) ---
  const testimonialsSwiper = new Swiper(".testimonials-swiper", {
    // Parámetros básicos del swiper
    slidesPerView: 1, // Por defecto: 1 testimonial a la vez (para móviles pequeños)
    spaceBetween: 20, // Ajustado a 20px para móviles, puedes cambiarlo
    loop: false, // Carrusel infinito
    freeMode: true, // HABILITADO: Desplazamiento libre como en la demo
    // centeredSlides: true, // Opcional: si quieres que la diapositiva activa esté centrada    // Paginación (los puntos en la parte inferior)
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // Botones de navegación (flechas izquierda/derecha) - Si los incluyes en HTML
    navigation: {
      nextEl: ".swiper-button-next" /* Clase del botón siguiente */,
      prevEl: ".swiper-button-prev" /* Clase del botón anterior */,
    },

    // Configuración responsive con breakpoints
    breakpoints: {
      420: {
        slidesPerView: 1.5, // Sigue siendo 1, pero aquí puedes ajustar el espacio
        spaceBetween: 20, // Puedes reducirlo a 15, 10 si quieres menos espacio
      },
      // Para pantallas >= 768px (tablets)
      768: {
        slidesPerView: 2, // Muestra 2 testimonios a la vez
        spaceBetween: 20, // Espacio entre slides
      },
      // Para pantallas >= 992px (desktop)
      992: {
        slidesPerView: 2.5, // Muestra 3 testimonios a la vez
        spaceBetween: 20, // Espacio entre slides
      },
      // No necesitamos un breakpoint específico para móviles (ej. 577px)
      // si queremos que `slidesPerView: 1` sea el valor por defecto por debajo de 768px.
    },
  });

  // --- CÓDIGO ACTUALIZADO para cambiar estilo al hacer scroll ---
  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      headerTitleTemp.classList.add("hidden");
      header.classList.add("scrolled"); // AÑADE ESTA LÍNEA: Añade la clase 'scrolled' al header
    } else {
      headerTitleTemp.classList.remove("hidden");
      header.classList.remove("scrolled"); // AÑADE ESTA LÍNEA: Quita la clase 'scrolled' del header
    }
  });

  // Opcional: Reajustar el umbral en redimensionamiento
  window.addEventListener("resize", () => {
    if (header) {
      scrollThreshold = header.offsetHeight + 10;
    }
  });
});
