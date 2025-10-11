document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    const questions = [
        {
            question: "Um desconhecido pede para ser seu amigo online e pergunta onde você estuda. O que você faz?",
            answers: [
                { text: "Aceito e conto tudo, pois gosto de fazer amigos.", isCorrect: false },
                { text: "Não aceito e conto para um adulto de confiança.", isCorrect: true },
                { text: "Aceito, mas não respondo a pergunta.", isCorrect: false }
            ]
        },
        {
            question: "Qual das senhas abaixo é a mais forte e segura?",
            answers: [
                { text: "12345678", isCorrect: false },
                { text: "O-n0m3-d0-m3u-C@ch0rr0", isCorrect: true },
                { text: "senhaforte", isCorrect: false }
            ]
        },
        {
            question: "Você vê um comentário maldoso sobre seu colega em uma foto. Qual a atitude de um Herói da Segurança?",
            answers: [
                { text: "Respondo o comentário com raiva para defender.", isCorrect: false },
                { text: "Aviso meu colega, conto para um adulto e denuncio o comentário.", isCorrect: true },
                { text: "Finjo que não vi para não me envolver.", isCorrect: false }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const resultContainer = document.getElementById('result-container');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add('hide');
        quizContainer.querySelector('.quiz-game').classList.remove('hide');
        showQuestion();
    }

    function showQuestion() {
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.isCorrect) {
                button.dataset.correct = answer.isCorrect;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const isCorrect = selectedButton.dataset.correct === 'true';
        
        if (isCorrect) {
            score++;
        }

        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
            button.disabled = true;
        });

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 1500);
    }

    function setStatusClass(element, correct) {
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function showResult() {
        quizContainer.querySelector('.quiz-game').classList.add('hide');
        resultContainer.classList.remove('hide');
        scoreElement.innerText = `Você acertou ${score} de ${questions.length} perguntas! Parabéns, Herói!`;
    }

    restartButton.addEventListener('click', startQuiz);

    startQuiz();
});