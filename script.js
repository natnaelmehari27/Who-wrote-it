const questions = [
    {
        question: 'Now you hang from my lips, like the garden of Babylon. With your boots beneath my bed, forever is the sweetest con.',
        answers: [
            { text: 'William Shakespeare', correct: false },
            { text: 'Taylor Swift', correct: true }
        ]
    },
    {
        question: 'You kept me like a secret, but I kept you like an oath.',
        answers: [
            { text: 'William Shakespeare', correct: false },
            { text: 'Taylor Swift', correct: true }
        ]
    },
    {
        question: 'I made you my temple, my mural, my sky, now im begging for footnotes in the story of your life.',
        answers: [
            { text: 'William Shakespeare', correct: false },
            { text: 'Taylor Swift', correct: true }
        ]
    },
    {
        question: 'And all we are is skin and bones, trained to get along, forever going with the flow, but you are friction',
        answers: [
            { text: 'William Shakespeare', correct: false },
            { text: 'Taylor Swift', correct: true }
        ]
    },
    {
        question: 'Say a solemn prayer, Place a poppy in my hair, There is no morning glory. it was war; it was not fair.',
        answers: [
            { text: 'William Shakespeare', correct: false },
            { text: 'Taylor Swift', correct: true }
        ]
    },
    {
        question: 'You can plan for a change in weather and time, But i never planned on you changing your mind.',
        answers: [
            { text: 'William Shakespeare', correct: false },
            { text: 'Taylor Swift', correct: true }
        ]
    },
    {
        question: 'you said it was a great love, one for the ages. But if the story is over, Why am i still writing pages?',
        answers: [
            { text: 'William Shakespeare', correct: false },
            { text: 'Taylor Swift', correct: true }
        ]
    },
    {
        question: 'Im just gonna shake, shake, I shake it off, I shake it off',
        answers: [
            { text: 'William Shakespeare', correct: false },
            { text: 'Taylor Swift', correct: true }
        ]
    },
    {
        question: 'Be not afraid of greatness. Some are born great, some achieve greatness, and others have greatness thrust upon them.',
        answers: [
            { text: 'William Shakespeare', correct: true },
            { text: 'Taylor Swift', correct: false }
        ]
    },
    {
        question: 'Uneasy lies the head that wears the crown.',
        answers: [
            { text: 'William Shakespeare', correct: true },
            { text: 'Taylor Swift', correct: false }
        ]
    },
    {
        question: 'Though she be but little, she is fierce.',
        answers: [
            { text: 'William Shakespeare', correct: true },
            { text: 'Taylor Swift', correct: false }
        ]
    },
    {
        question: 'Talking isnt doing. It is a kind of good deed to say well, and yet words are not deeds.',
        answers: [
            { text: 'William Shakespeare', correct: true },
            { text: 'Taylor Swift', correct: false }
        ]
    },
    {
        question: 'In time we hate that which we often fear.',
        answers: [
            { text: 'William Shakespeare', correct: true },
            { text: 'Taylor Swift', correct: false }
        ]
    },
    {
        question: 'You and I are past our dancing days.',
        answers: [
            { text: 'William Shakespeare', correct: false },
            { text: 'Taylor Swift', correct: true }
        ]
    },
    {
        question: 'Sad hours seem long.',
        answers: [
            { text: 'William Shakespeare', correct: true },
            { text: 'Taylor Swift', correct: false }
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
    timerElement.style.color = ''; // Reset timer color
    timerElement.classList.remove('shake'); // Remove shake animation
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