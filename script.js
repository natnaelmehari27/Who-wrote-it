const questions = [
    {
        question: 'Now you hang from my lips, like the garden of Babylon. With your boots beneath my bed, forever is the sweetest con.',
        answers: [
            { text: 'Taylor Swift', correct: true },
            { text: 'William Shakespeare', correct: false },
        ]
    },
    {
        question: 'You kept me like a secret, but i kept you like an oath.',
        answers: [
            { text: 'Taylor Swift', correct: true },
            { text: 'William Shakespeare', correct: false },
        ]
    },
    {
        question: 'I made you my temple, my mural, my sky, now im begging for footnotes in the story of your life.',
        answers: [
            { text: 'Taylor Swift', correct: true },
            { text: 'William Shakespeare', correct: false },
        ]
    },
    {
        question: 'And all we are is skin and bones, trained to get along, forever going with the flow, but you are friction',
        answers: [
            { text: 'Taylor Swift', correct: true },
            { text: 'William Shakespeare', correct: false },
        ]
    },
    {
        question: 'Say a solemn prayer, Place a poppy in my hair, There is no morning glory. it was war; it was not fair.',
        answers: [
            { text: 'Taylor Swift', correct: true },
            { text: 'William Shakespeare', correct: false },
        ]
    },
    {
        question: 'You can plan for a change in weather and time, But i never planned on you changing your mind.',
        answers: [
            { text: 'Taylor Swift', correct: true },
            { text: 'William Shakespeare', correct: false },
        ]
    },
    {
        question: 'you said it was a great love, one for the ages. But if the story is over, Why am i still writing pages?',
        answers: [
            { text: 'Taylor Swift', correct: true },
            { text: 'William Shakespeare', correct: false },
        ]
    },
    {
        question: 'Im just gonna shake, shake, I shake it off, I shake it off',
        answers: [
            { text: 'Taylor Swift', correct: true },
            { text: 'William Shakespeare', correct: false },
        ]
    },
    {
        question: 'Be not afraid of greatness. Some are born great, some achieve greatness, and others have greatness thrust upon them.',
        answers: [
            { text: 'Taylor Swift', correct: false },
            { text: 'William Shakespeare', correct: true },
        ]
    },
    {
        question: 'Uneasy lies the head that wears the crown.',
        answers: [
            { text: 'Taylor Swift', correct: false },
            { text: 'William Shakespeare', correct: true },
        ]
    },
    {
        question: 'Though she be but little, she is fierce.',
        answers: [
            { text: 'Taylor Swift', correct: false },
            { text: 'William Shakespeare', correct: true },
        ]
    },
    {
        question: 'Talking isnt doing. It is a kind of good deed to say well, and yet words are not deeds.',
        answers: [
            { text: 'Taylor Swift', correct: false },
            { text: 'William Shakespeare', correct: true },
        ]
    },
    {
        question: 'In time we hate that which we often fear.',
        answers: [
            { text: 'Taylor Swift', correct: false },
            { text: 'William Shakespeare', correct: true },
        ]
    },
    {
        question: 'You and I are past our dancing days.',
        answers: [
            { text: 'Taylor Swift', correct: false },
            { text: 'William Shakespeare', correct: true },
        ]
    },
    {
        question: 'Sad hours seem long.',
        answers: [
            { text: 'Taylor Swift', correct: false },
            { text: 'William Shakespeare', correct: true },
        ]
    },
]

// hide the next button from the starting page and the questions before answered.
document.addEventListener('DOMContentLoaded', () => {
    nextButton.classList.add('hide');
  });
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const questionAreaElement = document.getElementById('question-area');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const quizAreaElement = document.getElementById('quiz-area');

  let shuffledQuestions, currentQuestionIndex;