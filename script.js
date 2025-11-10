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
