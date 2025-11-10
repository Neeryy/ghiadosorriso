document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.depoimentos-wrapper');
    const grid = document.querySelector('.depoimentos-grid');
    const cards = document.querySelectorAll('.depoimento');

    if (!wrapper || !grid || cards.length === 0) {
        console.error('Elementos do carrossel de depoimentos não encontrados.');
        return;
    }

    // Duplica os cards para criar um loop contínuo
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        grid.appendChild(clone);
    });

    // Calcula a duração da animação com base no número de cards
    // 6 cards originais + 6 clones = 12 cards no total
    const totalCards = cards.length * 2;
    const animationDuration = totalCards * 4; // 4 segundos por card (ajustável)

    // Aplica a animação CSS
    grid.style.animation = `scrollDepoimentos ${animationDuration}s linear infinite`;
});


// ===== ANIMAÇÕES DE ENTRADA =====
document.addEventListener('DOMContentLoaded', function() {
  // Adiciona classe para iniciar animações após um pequeno delay
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
  // Observer para animações ao scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Remove will-change após animação para otimizar performance
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, 600);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Elementos para animar
  const animatedElements = document.querySelectorAll(
    '.beneficio-card, .depoimento, .servico-item, .dentistas-list li, .empresas-lista li, .sobre-img, .sobre-text, .dentistas-image, .section-title, .section-subtitle, .empresas-text, .cta-negocio-section h1, .cta-description, .features-list, .cta-buttons, .footer-col'
  );
  
  animatedElements.forEach(el => observer.observe(el));
  
  // Adiciona efeito parallax suave ao hero com requestAnimationFrame
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.mulher-sorrindo');
        const heroDecorative = document.querySelector('.hero-decorative');
        
        if (heroImage && scrolled < 800) {
          heroImage.style.transform = `translate(-50px, ${60 + scrolled * 0.1}px)`;
        }
        
        if (heroDecorative && scrolled < 800) {
          heroDecorative.style.transform = `translateX(-50%) translateY(${scrolled * 0.05}px)`;
        }
        
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Animação de fade-in progressivo para o footer
  const footerCols = document.querySelectorAll('.footer-col');
  footerCols.forEach((col, index) => {
    col.style.animationDelay = `${index * 0.1}s`;
  });
});

// ===== NAVEGAÇÃO ATIVA =====
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove a classe 'active' de todos os links
      navLinks.forEach(nav => nav.classList.remove('active'));
      
      // Adiciona a classe 'active' ao link clicado
      this.classList.add('active');
    });
  });
  
  // Detecta a seção visível e atualiza a navegação
  const sections = document.querySelectorAll('section[id]');
  
  const observerNavOptions = {
    threshold: 0.3
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
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== SMOOTH SCROLL PARA ÂNCORAS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Ignora links vazios ou apenas "#"
    if (href === '#' || href === '') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== ANIMAÇÃO DOS DEPOIMENTOS (CARROSSEL INFINITO) =====
document.addEventListener('DOMContentLoaded', function() {
  const depoimentosGrid = document.querySelector('.depoimentos-grid');
  
  if (depoimentosGrid) {
    // Clone dos depoimentos para criar efeito infinito
    const depoimentos = document.querySelectorAll('.depoimento');
    depoimentos.forEach(depoimento => {
      const clone = depoimento.cloneNode(true);
      depoimentosGrid.appendChild(clone);
    });
    
    // Inicia a animação
    depoimentosGrid.style.animation = 'scrollDepoimentos 30s linear infinite';
    
    // Pausa a animação ao passar o mouse
    depoimentosGrid.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
    });
    
    depoimentosGrid.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
    });
  }
});