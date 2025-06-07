import { questions } from "./questions.js";

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const resultContainer = document.getElementById("result-container");
const finalMessage = document.getElementById("final-message");
const emoji = document.getElementById("emoji");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

function startGame() {
  startButton.classList.add("hide");
  resultContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    if (answer.correct) btn.dataset.correct = true;
    btn.addEventListener("click", selectAnswer);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  clearInterval(timer);
  timeLeft = 30;
  timerElement.textContent = timeLeft;
  answerButtons.innerHTML = "";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      disableAnswers();
      setTimeout(nextQuestion, 1000);
    }
  }, 1000);
}

function selectAnswer(e) {
  clearInterval(timer);
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
  }
  disableAnswers();
  setTimeout(nextQuestion, 1000);
}

function disableAnswers() {
  const buttons = answerButtons.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  finalMessage.textContent = `Osvojili ste ${score} od ${questions.length} poena!`;

  if (score === questions.length) {
    emoji.textContent = "🎉";
  } else if (score >= questions.length / 2) {
    emoji.textContent = "🙂";
  } else {
    emoji.textContent = "😢";
  }
}
