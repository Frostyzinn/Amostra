document.addEventListener("DOMContentLoaded", function() {

    // Animação de fade-in ao rolar a página
    const fadeElems = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // usa o viewport como área de observação
        rootMargin: '0px',
        threshold: 0.1 // o elemento é considerado visível quando 10% dele está na tela
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: para de observar o elemento uma vez que ele já apareceu
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });

});