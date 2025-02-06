const quiz = [
  { question: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], correctAnswer: "New Delhi" },
  { question: "How many continents are there in the world?", options: ["5", "6", "7", "8"], correctAnswer: "7" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], correctAnswer: "Mars" },
  { question: "Who wrote the national anthem of India?", options: ["Rabindranath Tagore", "Mahatma Gandhi", "Subhash Chandra Bose", "Jawaharlal Nehru"], correctAnswer: "Rabindranath Tagore" },
  { question: "Which is the largest ocean on Earth?", options: ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"], correctAnswer: "Pacific Ocean" },
  { question: "How many states does India have?", options: ["28", "29", "30", "31"], correctAnswer: "28" },
  { question: "What is the national animal of India?", options: ["Elephant", "Tiger", "Lion", "Peacock"], correctAnswer: "Tiger" },
  { question: "Which festival is known as the festival of lights?", options: ["Holi", "Diwali", "Eid", "Christmas"], correctAnswer: "Diwali" },
  { question: "Which is the longest river in the world?", options: ["Ganga", "Amazon", "Nile", "Yangtze"], correctAnswer: "Nile" },
  { question: "What is 5 + 7?", options: ["10", "11", "12", "13"], correctAnswer: "12" },
  { question: "Which is the smallest state in India by area?", options: ["Goa", "Sikkim", "Tripura", "Manipur"], correctAnswer: "Goa" },
  { question: "Who was the first Prime Minister of India?", options: ["Sardar Patel", "Mahatma Gandhi", "Jawaharlal Nehru", "Dr. B.R. Ambedkar"], correctAnswer: "Jawaharlal Nehru" },
  { question: "How many colors are there in a rainbow?", options: ["5", "6", "7", "8"], correctAnswer: "7" },
  { question: "Which is the largest desert in the world?", options: ["Sahara", "Gobi", "Thar", "Kalahari"], correctAnswer: "Sahara" },
  { question: "Which animal is known as the Ship of the Desert?", options: ["Horse", "Camel", "Elephant", "Donkey"], correctAnswer: "Camel" },
  { question: "What is the national currency of India?", options: ["Dollar", "Pound", "Rupee", "Euro"], correctAnswer: "Rupee" },
  { question: "Which organ pumps blood in the human body?", options: ["Lungs", "Brain", "Heart", "Liver"], correctAnswer: "Heart" },
  { question: "Who discovered gravity?", options: ["Albert Einstein", "Galileo Galilei", "Isaac Newton", "Nikola Tesla"], correctAnswer: "Isaac Newton" },
  { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: "Carbon Dioxide" },
  { question: "Which is the national flower of India?", options: ["Rose", "Lotus", "Marigold", "Sunflower"], correctAnswer: "Lotus" },
  { question: "What is the capital of Japan?", options: ["Seoul", "Bangkok", "Tokyo", "Beijing"], correctAnswer: "Tokyo" },
  { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: "Jupiter" },
  { question: "Which sport is known as the 'Gentleman’s Game'?", options: ["Football", "Basketball", "Cricket", "Tennis"], correctAnswer: "Cricket" },
  { question: "Which is the fastest land animal?", options: ["Lion", "Cheetah", "Tiger", "Leopard"], correctAnswer: "Cheetah" },
  { question: "Which bird is known as the symbol of peace?", options: ["Eagle", "Pigeon", "Sparrow", "Dove"], correctAnswer: "Dove" },
];


const questionText = document.querySelector(".question-text");
const answerText = document.querySelectorAll("li");
const nextBtn = document.querySelector(".next");
const timer = document.querySelector(".timer span");
const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const screen3 = document.querySelector(".screen3");
const body = document.querySelector("body");
const time = document.querySelector(".time");
const questionNumber = document.querySelector(".question-no");
const correctSound = new Audio("./sounds/correct-6033.mp3");
const incorrectSound = new Audio("./sounds/windows-error-sound-effect-35894.mp3");
const playBtn = document.querySelector(".play");
const muteButton = document.querySelector(".pause");
const startBtn = document.querySelector(".start-btn");
const showScore = document.querySelector(".scores");
const finalScore = document.querySelector(".final-score");
const retryBtn = document.querySelector(".retry-btn");
const progressBar = document.querySelector(".small-div");
const highScore = document.querySelector(".high-scores");
const quote  = document .querySelector('.quote')

let currentQuestionIndex = 0;
let score = 0;
let timerId;
let highestScore = parseInt(localStorage.getItem("highScore")) || 0;
// highScore.style.display = 'none';

// Initially, sound is enabled
let isMuted = false;
correctSound.muted = false;
incorrectSound.muted = false;

// Show the mute button (to allow user to mute) and hide the play button initially.
muteButton.style.display = 'block';
playBtn.style.display = 'none';

// Mute Button: When clicked, mute the audio and switch to the play button.
muteButton.addEventListener("click", () => {
  // Mute both audio elements
  correctSound.muted = true;
  incorrectSound.muted = true;
  
  // Update state
  isMuted = true;
  
  // Update UI: Hide mute button and show play button
  muteButton.style.display = 'none';
  playBtn.style.display = 'block';
});

// Play Button: When clicked, unmute the audio and switch back to the mute button.
playBtn.addEventListener("click", () => {
  // Unmute both audio elements
  correctSound.muted = false;
  incorrectSound.muted = false;
  
  // Update state
  isMuted = false;
  
  // Update UI: Hide play button and show mute button
  playBtn.style.display = 'none';
  muteButton.style.display = 'block';
});

body.classList.add("bstart");


startBtn.addEventListener("click", () => {
  screen2.style.display = "block";
  screen1.style.display = "none";
  body.classList.remove("bstart");

  let savedIndex = localStorage.getItem("questionIndex");
  if (savedIndex != null) {
    currentQuestionIndex = parseInt(savedIndex);
  } else {
    currentQuestionIndex = 0;
  }

  showTimer();
  displayQuiz();
});

function displayQuiz() {
   highScore.innerText = ``;
  const currentQuestion = quiz[currentQuestionIndex];
  questionNumber.innerText = `${currentQuestionIndex + 1} / ${quiz.length}`;
  questionText.innerText = currentQuestion.question;

  answerText.forEach((option, i) => {
    option.innerText = ``;
    option.innerText = currentQuestion.options[i];
    option.classList.remove("correct", "incorrect");
  });

  answerText.forEach((option) => {
    option.addEventListener("click", chooseAnswer);
  });
  localStorage.setItem("questionIndex", currentQuestionIndex);
}

function chooseAnswer(e) {
  const selectedOption = e.target;
  const currentQuestion = quiz[currentQuestionIndex];

  answerText.forEach((option) => {
    option.removeEventListener("click", chooseAnswer);
  });
  clearInterval(timerId);

  if (selectedOption.innerText === currentQuestion.correctAnswer) {
    selectedOption.classList.add("correct");
    correctSound.play();
    score++;
  } else {
    selectedOption.classList.add("incorrect");
    incorrectSound.play();
    answerText.forEach((option) => {
      if (option.innerText === currentQuestion.correctAnswer) {
        option.classList.add("correct");
      }
    });
  }
}

function showTimer() {
  let seconds = 30;

  timerId = setInterval(() => {
    if (seconds === 15) {
      body.classList.add("half");
      nextBtn.classList.add("btn-half");
      time.classList.add("time-half");
    } else if (seconds === 5) {
      body.classList.add("less");
      nextBtn.classList.add("btn-less");
      time.classList.add("time-less");
    } else if (seconds === 0) {
      clearInterval(timerId);

      answerText.forEach((option) => {
        option.removeEventListener("click", chooseAnswer);
      });
    }

    timer.innerText = seconds;
    seconds--;
  }, 1000);
}

function showResult() {
  screen2.style.display = "none";
  screen3.style.display = "block";
  body.classList.add("bstart");

  if(score === 0){
     quote.innerText = `“you didn't answerd any question”`
  }
  else if(score< 5){
    quote.innerText = `“you don't have good score”`
  }else{
 quote.innerText = `“Keep learning, you have a good score!”`
  }

  finalScore.innerText = `${score} / ${quiz.length}`;
  progressBar.style.width = (score / quiz.length) * 100 + "%";
  updateHighScore();
  highScore.style.display = 'none';
}

retryBtn.addEventListener("click", () => {
  clearInterval(timerId);
  stopTimer();
  resetQuiz();
});

nextBtn.addEventListener("click", () => {
  stopTimer()
  clearInterval(timerId);

  if (currentQuestionIndex !== quiz.length - 1) {
    currentQuestionIndex++;
    displayQuiz();
  } else {
    showResult();

    // screen2.style.display = "none";
  }
  localStorage.setItem("questionIndex", currentQuestionIndex);
  showTimer();
});

function updateHighScore() {
  highScore.style.display = "block";

  if (score > highestScore) {
    highestScore = score;
    localStorage.setItem("highScore", highestScore);
  }

  highScore.innerText = `${highestScore} / ${quiz.length}`;
}

function resetQuiz() {
  localStorage.removeItem("questionIndex");
  score = 0;
  currentQuestionIndex = 0;

  screen1.style.display = "block";
  screen3.style.display = "none";
  body.classList.add("bstart");
}

function stopTimer() {
  seconds = 0;
  body.classList.remove("half", "less");
  nextBtn.classList.remove("btn-half", "btn-less");
  time.classList.remove("time-half", "time-less");
}

window.addEventListener("load", () => {
  highScore.style.display = 'block';
  highScore.innerText = `Higest Score : ${highestScore} / ${quiz.length}`;
});
