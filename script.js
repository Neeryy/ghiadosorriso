/* =================================================== */
/* SCRIPT.JS FINAL (COM RESIZE LISTENER)
/* =================================================== */

document.addEventListener('DOMContentLoaded', function() {

  // ===== 1. EFEITO DE 'LOAD' E ANIMAÇÕES DE SCROLL =====
  
  // Adiciona classe para iniciar animações de 'fade-in'
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
  // Observer para animações de 'animate-in' ao rolar
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const animationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, 600);
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll(
    '.beneficio-card, .depoimento, .servico-item, .dentistas-list li, .empresas-lista li, .sobre-img, .sobre-text, .dentistas-image, .section-title, .section-subtitle, .empresas-text, .cta-negocio-section h1, .cta-description, .features-list, .cta-buttons, .footer-col'
  );
  animatedElements.forEach(el => animationObserver.observe(el));
  
  // Animação de fade progressivo para o footer
  const footerCols = document.querySelectorAll('.footer-col');
  footerCols.forEach((col, index) => {
    col.style.animationDelay = `${index * 0.1}s`;
  });

  // Parallax da Hero
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrolled = window.pageYOffset;
        const heroDecorative = document.querySelector('.hero-decorative');
        
        if (heroDecorative && scrolled < 800) {
          heroDecorative.style.transform = `translateX(-50%) translateY(${scrolled * 0.05}px)`;
        }
        
        ticking = false;
      });
      ticking = true;
    }
  });


  // ===== 2. LÓGICA DO MENU HAMBÚRGUER (MOBILE) =====
  const navToggle = document.querySelector('.nav-toggle');
  const navOverlay = document.querySelector('.nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.nav a'); 
  
  if (navToggle) {
    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };

    navToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      document.body.classList.toggle('nav-open');
    });
    
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        closeMenu();
      }
    });
  }


  // ===== 3. LÓGICA DE NAVEGAÇÃO ATIVA (CLICK + SCROLL) =====
  const navLinks = document.querySelectorAll('.nav a[href^="#"]'); 
  const sections = document.querySelectorAll('section[id], #home');

  if (navLinks.length > 0 && sections.length > 0) {
    
    const observerNavOptions = {
      rootMargin: '-40% 0px -60% 0px', 
      threshold: 0
    };
    
    const navObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerNavOptions);
    
    sections.forEach(section => navObserver.observe(section));
  }
  

  // ===== 4. LÓGICA DE SCROLL SUAVE (SMOOTH SCROLL) =====
  const header = document.querySelector('.header');
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') {
        e.preventDefault();
        return;
      }

      if (href === '#home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (navLinks.length > 0) {
          navLinks.forEach(nav => nav.classList.remove('active'));
          // Encontra o link específico de home e ativa
          document.querySelector('.nav a[href="#home"]').classList.add('active');
        }
        return;
      }
  
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        if (navLinks.length > 0) {
          navLinks.forEach(nav => nav.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });


  // ===== 5. LÓGICA DO CARROSSEL DE DEPOIMENTOS (RESPONSIVO) =====
  const depoimentosWrapper = document.querySelector('.depoimentos-wrapper');
  const depoimentosGrid = document.querySelector('.depoimentos-grid');
  const depoimentosCards = document.querySelectorAll('.depoimento:not(.cloned-node)');
  
  // Referência para o timer do mobile
  let mobileCarouselInterval = null;
  // Guarda o estado atual (true = desktop, false = mobile)
  let isDesktop = window.innerWidth > 768;

  function setupCarousel() {
    // 1. ZERA TUDO (limpa clones, timers e estilos inline)
    clearInterval(mobileCarouselInterval);
    depoimentosGrid.querySelectorAll('.cloned-node').forEach(node => node.remove());
    depoimentosGrid.style.animation = '';
    depoimentosGrid.style.width = '';
    depoimentosGrid.style.transform = '';

    // 2. VERIFICA O TAMANHO E RODA A LÓGICA CORRETA
    if (window.innerWidth > 768) {
      // --- LÓGICA DESKTOP (SCROLL CONTÍNUO) ---
      
      // Duplica os cards
      depoimentosCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('cloned-node'); 
        depoimentosGrid.appendChild(clone);
      });
      
      const totalCards = depoimentosCards.length * 2;
      const animationDuration = totalCards * 4; // 4s por card
      depoimentosGrid.style.animation = `scrollDepoimentos ${animationDuration}s linear infinite`;

    } else {
      // --- LÓGICA MOBILE (STEPPER DE 3 SEGUNDOS) ---
      
      let currentIndex = 0;
      const totalSlides = depoimentosCards.length; // Ex: 6 slides
      
      // Define a largura total do grid (ex: 6 slides = 600%)
      depoimentosGrid.style.width = `${totalSlides * 100}%`;
      
      mobileCarouselInterval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= totalSlides) {
          currentIndex = 0; // Volta ao início
        }
        // Move o grid em frações (ex: 1/6, 2/6... que é -16.66%, -33.33%)
        const offsetPercent = -currentIndex * (100 / totalSlides);
        depoimentosGrid.style.transform = `translateX(${offsetPercent}%)`;
      }, 3000); // Muda a cada 3 segundos
    }
  }

  // --- OUVIR O RESIZE (A MÁGICA ACONTECE AQUI) ---
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newIsDesktop = window.innerWidth > 768;
      // Só roda o setup DE NOVO se o estado mudou (cruzou a barreira dos 768px)
      if (newIsDesktop !== isDesktop) {
        isDesktop = newIsDesktop;
        setupCarousel();
      }
    }, 250); // Debounce de 250ms
  });

  // --- HOVER (PAUSA) ---
  // (Listeners de hover ficam fora do setup)
  depoimentosGrid.addEventListener('mouseenter', function() {
    if (isDesktop) { // Só pausa no desktop
      this.style.animationPlayState = 'paused';
    }
  });
  
  depoimentosGrid.addEventListener('mouseleave', function() {
    if (isDesktop) { // Só pausa no desktop
      this.style.animationPlayState = 'running';
    }
  });

  // --- CHAMADA INICIAL ---
  // Roda o setup na primeira vez que a página carrega
  setupCarousel();

}); // FIM DO DOMCONTENTLOADED PRINCIPAL


// ===== 6. LÓGICA DO HEADER (EFEITO 'SCROLLED') =====
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});