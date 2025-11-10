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