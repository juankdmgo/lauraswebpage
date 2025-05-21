document.addEventListener("DOMContentLoaded", function () {
  // ===============================================
  // 1. Lógica del Menú Hamburguesa
  // ===============================================
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const menuContent = document.getElementById("menu-content");
  const navLinks = document.querySelectorAll("#menu-content .menu-list a");
  const body = document.body; // Declaración única y correcta de 'body'

  // Variables para el header al hacer scroll
  const header = document.querySelector(".header");
  const headerTitleTemp = document.querySelector(".header-title-temp");
  let scrollThreshold = 0;

  // Calcula el umbral de scroll dinámicamente (altura del header + un margen)
  if (header) {
    setTimeout(() => {
      scrollThreshold = header.offsetHeight + 10;
    }, 100); // Pequeño retraso para asegurar que la altura esté calculada
  }

  // Función para alternar el estado del menú
  function toggleMenu() {
    if (hamburgerMenu) {
      hamburgerMenu.classList.toggle("open"); // Anima el icono de hamburguesa
    }
    if (menuContent) {
      menuContent.classList.toggle("open"); // Desliza el menú dentro/fuera de la vista
    }
    if (body) {
      body.classList.toggle("no-scroll"); // Evita el scroll del fondo
    }
    // Si usas un overlay para el menú, también necesitas alternar su visibilidad aquí:
    // const menuOverlay = document.getElementById('menu-overlay');
    // if (menuOverlay) menuOverlay.classList.toggle('open');
  }

  // Escucha clics en el icono de hamburguesa
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", toggleMenu);
  }

  // Escucha clics en los enlaces del menú para cerrarlo automáticamente
  if (navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (menuContent && menuContent.classList.contains("open")) {
          // Si el enlace clicado es un ancla interna, cierra el menú
          if (this.hash && this.hash.startsWith("#")) {
            toggleMenu();
          }
          // Si el enlace es a una página externa o no tiene hash, simplemente déjalo navegar
        }
      });
    });
  }

  // ===============================================
  // 2. Comportamiento del Header al Hacer Scroll
  // ===============================================

  // Escucha el evento de scroll en la ventana
  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      if (headerTitleTemp) {
        headerTitleTemp.classList.add("hidden"); // Oculta el título temporal
      }
      if (header) {
        header.classList.add("scrolled"); // Añade la clase 'scrolled' al header
      }
    } else {
      if (headerTitleTemp) {
        headerTitleTemp.classList.remove("hidden");
      }
      if (header) {
        header.classList.remove("scrolled"); // Quita la clase 'scrolled' del header
      }
    }
  });

  // Reajusta el umbral de scroll si la ventana cambia de tamaño
  window.addEventListener("resize", () => {
    if (header) {
      scrollThreshold = header.offsetHeight + 10;
    }
  });

  // ===============================================
  // 3. Lógica para Modales (Leer Más y Agendar Sesión)
  // ===============================================

  // Selecciona TODOS los botones que deben abrir modales
  const allModalTriggerButtons = document.querySelectorAll(
    ".focus-card-button, " + // Botones "Leer más"
      "a[href='#modal-overlay-agendar-sesion'], " + // Botones "Agenda tu Sesión" (Hero y Nav)
      ".nav-agenda-button" // El nuevo botón en el nav
  );

  if (allModalTriggerButtons) {
    allModalTriggerButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault(); // Previene el comportamiento por defecto del enlace

        const modalTargetId = this.getAttribute("href").substring(1); // Obtiene el ID del modal
        const targetModalOverlay = document.getElementById(modalTargetId);

        if (targetModalOverlay) {
          targetModalOverlay.classList.add("open"); // Muestra el modal
          if (body) {
            body.classList.add("no-scroll"); // Evita el scroll de fondo
          }
          if (header) {
            header.classList.add("hide-for-modal"); // Oculta el header
          }
        }
      });
    });
  }

  // Lógica para el botón "Solicita una Propuesta" (solo anclaje, no modal)
  const solicitaPropuestaButton = document.querySelector(
    '.service-contact-button[href="#contacto"]'
  );

  if (solicitaPropuestaButton) {
    solicitaPropuestaButton.addEventListener("click", function (e) {
      // NO usamos e.preventDefault() aquí, para que el enlace de anclaje funcione normalmente
      // El smooth scroll y el scroll-padding-top del HTML/CSS ya lo manejan.
    });
  }

  // Lógica para cerrar modales (botón de cierre y clic en el overlay)
  const modalCloseButtons = document.querySelectorAll(".modal-close-button");
  const modalOverlays = document.querySelectorAll(".modal-overlay");

  if (modalCloseButtons) {
    modalCloseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const modalOverlay = button.closest(".modal-overlay");
        if (modalOverlay) {
          modalOverlay.classList.remove("open"); // Oculta el modal
          if (body) {
            body.classList.remove("no-scroll"); // Permite el scroll de fondo
          }
          if (header) {
            header.classList.remove("hide-for-modal"); // Muestra el header
          }
        }
      });
    });
  }

  // Cierra el modal haciendo clic en el fondo (overlay)
  if (modalOverlays) {
    modalOverlays.forEach((overlay) => {
      overlay.addEventListener("click", function (e) {
        // Solo cierra si el clic fue directamente en el overlay, no en el contenido del modal
        if (e.target === overlay) {
          overlay.classList.remove("open");
          if (body) {
            body.classList.remove("no-scroll");
          }
          if (header) {
            header.classList.remove("hide-for-modal");
          }
        }
      });
    });
  }

  // ===============================================
  // 4. Inicialización de Swiper (Testimonios)
  // ===============================================
  const testimonialsSwiperElement = document.querySelector(
    ".testimonials-swiper"
  );
  if (testimonialsSwiperElement) {
    const testimonialsSwiper = new Swiper(testimonialsSwiperElement, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false, // Asegúrate de que loop: false sea intencional, demo usaba true
      freeMode: true,
      autoHeight: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        420: {
          slidesPerView: 1, // Aseguramos 1 slide por debajo de 768px
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 2.5,
          spaceBetween: 40,
        },
      },
    });
  }

  // ===============================================
  // 5. Inicialización de Swiper (Talleres Grupales)
  // ===============================================
  const workshopListSwiperElement = document.querySelector(
    ".workshop-list-swiper"
  );
  if (workshopListSwiperElement) {
    const workshopSwiper = new Swiper(workshopListSwiperElement, {
      slidesPerView: "auto",
      spaceBetween: 25,
      loop: true,
      freeMode: true,
      pagination: {
        el: ".workshop-pagination",
        clickable: true,
      },
      // Navegación (descomentar si se usan los divs de flechas)
      // navigation: {
      //   nextEl: '.workshop-button-next',
      //   prevEl: '.workshop-button-prev',
      // },
      breakpoints: {
        576: {
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }
});
