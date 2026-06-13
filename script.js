const quizData = [
    {
        question: "Which language runs natively inside a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading System Sheets", "Control Style Sheets"],
        correct: 1
    },
    {
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopter Text Markup Language"],
        correct: 0
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-style", "font-size", "text-size"],
        correct: 2
    },
    {
        question: "In what year was JavaScript launched?",
        options: ["1996", "1995", "1994", "None of the above"],
        correct: 1
    }
];

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionCounter = document.getElementById('question-counter');
const progressFill = document.getElementById('progress-fill');
const currentScoreElement = document.getElementById('current-score');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const finalScoreElement = document.getElementById('final-score');
const totalPossibleElement = document.getElementById('total-possible');
const feedbackText = document.getElementById('feedback-text');

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    currentScoreElement.innerText = score;
    
    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    loadQuestion();
}

function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Set UI Texts
    questionText.innerText = currentQuestion.question;
    questionCounter.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    
    // Update Progress Bar
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Render Option Buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(button, index));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.disabled = true;
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(selectedButton, index) {
    const correctAnswerIndex = quizData[currentQuestionIndex].correct;
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    
    if (index === correctAnswerIndex) {
        selectedButton.classList.add('correct');
        score++;
        currentScoreElement.innerText = score;
    } else {
        selectedButton.classList.add('wrong');
        // highlight the right answer for transparency
        allButtons[correctAnswerIndex].classList.add('correct');
    }

    // Disable all options after submission
    allButtons.forEach(btn => btn.disabled = true);
    nextBtn.disabled = false;
}