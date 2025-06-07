const questions = [
    {
        question: "“The world is a stage and all the men and women merely players.”",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Taylor Swift", correct: false }
        ]
    },
    {
        question: "“We never go out of style.”",
        answers: [
            { text: "William Shakespeare", correct: false },
            { text: "Taylor Swift", correct: true }
        ]
    },
    {
        question: "“Parting is such sweet sorrow.”",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Taylor Swift", correct: false }
        ]
    },
    {
        question: "“You belong with me.”",
        answers: [
            { text: "William Shakespeare", correct: false },
            { text: "Taylor Swift", correct: true }
        ]
    },
    {
        question: "“Double, double toil and trouble; Fire burn, and caldron bubble.”",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Taylor Swift", correct: false }
        ]
    },
    {
        question: "“Shake it off!”",
        answers: [
            { text: "William Shakespeare", correct: false },
            { text: "Taylor Swift", correct: true }
        ]
    }
];

// Constants
const TIME_PER_QUESTION = 15; // seconds

// DOM Elements
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-area');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const progressFill = document.getElementById('progress-fill');
const timerElement = document.getElementById('timer');

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;

// Set total questions count on load
totalQuestionsElement.innerText = questions.length;

// START QUIZ
startBtn.addEventListener('click', startGame);
// NEXT BUTTON
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startBtn.classList.add('hide');
    resultElement.innerText = '';
    score = 0;
    scoreElement.innerText = score;
    shuffledQuestions = shuffleArray(questions);
    currentQuestionIndex = 0;

    totalQuestionsElement.innerText = shuffledQuestions.length;
    updateProgressBar();
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    questionContainer.focus();
}

// Shuffle array helper
function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

// Show question and answers
function showQuestion(question) {
    resetState();

    // Set question text
    questionElement.innerText = question.question;

    // Create answer buttons
    question.answers = shuffleArray(question.answers);
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        button.dataset.correct = answer.correct;
        button.setAttribute('role', 'listitem');
        button.addEventListener('click', selectAnswer);
        button.tabIndex = 0;
        answerButtonsElement.appendChild(button);
    });

    // Set timer
    startTimer(TIME_PER_QUESTION);
    updateProgressBar();
}

// Clear old state
function resetState() {
    clearStatusClass(document.body);
    nextBtn.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    clearInterval(timer);
    timerElement.innerText = '';
}

// Timer countdown logic
function startTimer(seconds) {
    timeLeft = seconds;
    timerElement.innerText = `Time Remaining: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Remaining: ${timeLeft}s`;

        if (timeLeft <= 5 && timeLeft > 0) {
            timerElement.style.color = '#d62828';
            timerElement.classList.add('shake');
        } else {
            timerElement.style.color = '#d62828';
            timerElement.classList.remove('shake');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            // Disable buttons as time expired
            Array.from(answerButtonsElement.children).forEach(btn => btn.disabled = true);
            timerElement.innerText = "Time's up!";
            markCorrectAnswer();
            nextBtn.classList.remove('hide');
        }
    }, 1000);
}

// On answer selection
function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    if (correct) {
        score++;
        scoreElement.innerText = score;
    }

    setStatusClass(selectedButton, correct);

    // Disable all buttons once an answer is chosen
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button !== selectedButton) {
            setStatusClass(button, button.dataset.correct === 'true');
        }
    });

    nextBtn.classList.remove('hide');
}

// Mark correct answer when times up
function markCorrectAnswer() {
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            setStatusClass(button, true);
        }
    });
}

// Progress Bar update
function updateProgressBar() {
    const progressPercent = ((currentQuestionIndex) / shuffledQuestions.length) * 100;
    progressFill.style.width = progressPercent + '%';
}

// Set status classes for styling
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

// Move to next question or end quiz
function setNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        endGame();
    }
}

// End of quiz summary
function endGame() {
    resetState();
    resultElement.innerHTML = `
        <p>Quiz complete! Your score: <strong>${score} / ${shuffledQuestions.length}</strong></p>
        <button id="restart-btn" aria-label="Restart Quiz">Play Again</button>
    `;
    startBtn.classList.add('hide');
    nextBtn.classList.add('hide');
    timerElement.innerText = '';
    progressFill.style.width = '100%';

    // Restart on button click
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', () => {
        resultElement.innerText = '';
        startBtn.classList.remove('hide');
        scoreElement.innerText = '0';
        totalQuestionsElement.innerText = questions.length;
        progressFill.style.width = '0%';
    });
}