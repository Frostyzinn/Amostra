document.addEventListener("DOMContentLoaded", () => {
    const missionCards = document.querySelectorAll('.mission-card');
    if (missionCards.length === 0) return;

    // Carrega o estado salvo ao iniciar a página
    function loadMissionStatus() {
        missionCards.forEach(card => {
            const missionId = card.dataset.missionId;
            if (localStorage.getItem(missionId) === 'completed') {
                card.classList.add('completed');
                const button = card.querySelector('.mission-button');
                button.innerText = 'Concluída!';
                button.disabled = true;
            }
        });
    }

    missionCards.forEach(card => {
        const button = card.querySelector('.mission-button');
        const missionId = card.dataset.missionId;

        button.addEventListener('click', () => {
            // Salva o estado no localStorage
            localStorage.setItem(missionId, 'completed');
            
            // Atualiza a aparência
            card.classList.add('completed');
            button.innerText = 'Concluída!';
            button.disabled = true;
        });
    });

    loadMissionStatus();
});