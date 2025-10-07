// script5.js
document.addEventListener("DOMContentLoaded", function() {

    // --- Animação de fade-in ao rolar a página ---
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElems.forEach(elem => observer.observe(elem));

    // --- LÓGICA DE VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitButton');

    // Função para mostrar erro
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        input.classList.add('invalid');
        errorDiv.innerText = message;
        errorDiv.style.display = 'block';
    }

    // Função para limpar erro
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        input.classList.remove('invalid');
        errorDiv.style.display = 'none';
    }

    // Função para validar email com Regex
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Função principal de validação
    function validateForm() {
        let isValid = true;
        
        // Limpa erros antigos
        [nameInput, emailInput, subjectInput, messageInput].forEach(clearError);

        // Valida Nome
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'O campo nome é obrigatório.');
            isValid = false;
        }

        // Valida Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'O campo e-mail é obrigatório.');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Por favor, insira um e-mail válido.');
            isValid = false;
        }

        // Valida Assunto
        if (subjectInput.value === '') {
            showError(subjectInput, 'Por favor, selecione um assunto.');
            isValid = false;
        }
        
        // Valida Mensagem
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'O campo mensagem é obrigatório.');
            isValid = false;
        }

        return isValid;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        if (validateForm()) {
            // Se o formulário for válido, mostra um feedback de sucesso
            submitButton.style.backgroundColor = '#28a745'; // Verde sucesso
            submitButton.innerText = 'Mensagem Enviada com Sucesso!';
            
            // Aqui você poderia adicionar o código para enviar os dados para um servidor
            // Ex: usando fetch() para uma API

            setTimeout(() => {
                form.reset();
                submitButton.style.backgroundColor = 'var(--aquamarine)';
                submitButton.innerText = 'Enviar Mensagem';
                 [nameInput, emailInput, subjectInput, messageInput].forEach(clearError);
            }, 3000);
        }
    });

    // --- LÓGICA PARA O FAQ (ACORDEÃO) ---
    const allDetails = document.querySelectorAll('.faq-container details');
    
    allDetails.forEach(details => {
        details.addEventListener('toggle', (event) => {
            // Se um item foi aberto
            if (details.open) {
                // Fecha todos os outros
                allDetails.forEach(otherDetails => {
                    if (otherDetails !== details) {
                        otherDetails.removeAttribute('open');
                    }
                });
            }
        });
    });

});