const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question:'Which car among the following doesnot belong to the "Holy-Trinity" ',

    choice1:'Mc Laren P1',
    choice2:'Ferrari LaFerrari',
    choice3:'Koenigsegg Agera',
    choice4:'Porsche 918 Spyder',
    answer:3,
},
{
    question:'The new koenigsegg family car with 2300hp & twin-turbo charged HV8 Engine',

    choice1:'One',
    choice2:'Agera',
    choice3:'Gemera',
    choice4:'Jesko',
    answer:3,
},
{
    question:'Which car was named after as a memory of a racer ? ',

    choice1:'McLaren senna',
    choice2:'Bugatti Bolide',
    choice3:'Pagani Hyuara',
    choice4:'Dodge charger',
    answer:3,
},
{
    question:'which is the fastest Porsche',

    choice1:'Porsche 911 GT2 RS',
    choice2:'Porsche 918 Spyder',
    choice3:'Porsche 917',
    choice4:'Porsche 959 Sport',
    answer:4,
}
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();


