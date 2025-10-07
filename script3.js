document.addEventListener("DOMContentLoaded", function() {

    // --- Animação de fade-in ao rolar a página ---
    const fadeElems = document.querySelectorAll('.fade-in');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeElems.forEach(elem => { observer.observe(elem); });

    // --- LÓGICA PARA O FILTRO DE RECURSOS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona 'active' ao botão clicado
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            resourceCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex'; // ou 'block'
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});