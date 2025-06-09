import { questions } from "./questions.js";// Uvoz niza pitanja iz posebnog fajla

// Pribavljanje elemenata iz DOM-a
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const resultContainer = document.getElementById("result-container");
const finalMessage = document.getElementById("final-message");
const emoji = document.getElementById("emoji");
const timerElement = document.getElementById("timer");

// Inicijalizacija stanja kviza
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;// Vreme po pitanju (u sekundama)

// Dodavanje event listenera za dugmad
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

// Funkcija za pokretanje kviza
function startGame() {
  startButton.classList.add("hide");// Sakriva dugme za početak
  resultContainer.classList.add("hide"); // Sakriva rezultat
  questionContainer.classList.remove("hide");// Prikazuje okvir sa pitanjima
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

// Funkcija za prikaz trenutnog pitanja i odgovora
function showQuestion() {
  resetState();// Resetuje prethodno stanje
  startTimer();// Pokreće tajmer
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  // Kreira dugmad za svaki odgovor
  currentQuestion.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    if (answer.correct) btn.dataset.correct = true;// Obeležava tačan odgovor
    btn.addEventListener("click", selectAnswer);// Dodaje događaj za klik
    answerButtons.appendChild(btn);
  });
}

// Resetovanje stanja za novo pitanje
function resetState() {
  clearInterval(timer); // Zaustavlja prethodni tajmer
  timeLeft = 30;
  timerElement.textContent = timeLeft;
  answerButtons.innerHTML = "";// Uklanja prethodnu dugmad
}

// Pokretanje tajmera za pitanje
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      disableAnswers();// Onemogućava odgovore
      setTimeout(nextQuestion, 1000);// Automatski prelazi na sledeće pitanje
    }
  }, 1000);
}

// Obrada odabranog odgovora
function selectAnswer(e) {
  clearInterval(timer);// Zaustavlja tajmer
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    selectedButton.classList.add("correct");// Boji tačan odgovor
    score++;// Povećava rezultat
  } else {
    selectedButton.classList.add("wrong");// Boji netačan odgovor
  }
  disableAnswers(); // Onemogućava dalji izbor
  setTimeout(nextQuestion, 1000);// Prelazak na sledeće pitanje
}

// Onemogućava svu dugmad i prikazuje tačan odgovor
function disableAnswers() {
  const buttons = answerButtons.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
}

// Prelazak na sledeće pitanje ili prikaz rezultata
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();// Ako su sva pitanja gotova, prikaži rezultat
  }
}

// Prikaz konačnog rezultata
function showResult() {
  questionContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  finalMessage.textContent = `Osvojili ste ${score} od ${questions.length} poena!`;

  // Prikaz emotikona na osnovu rezultata
  if (score === questions.length) {
    emoji.textContent = "🎉";// Savršen rezultat
  } else if (score >= questions.length / 2) {
    emoji.textContent = "🙂";// Dobar rezultat
  } else {
    emoji.textContent = "😢";// Loš rezultat
  }
}
