  // variables to keep track of quiz state
var questionsIndex = 0;
var time = questions.length * 15;
var timerId;
var timerInterval;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("time");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var highScores = document.getElementById("highscores");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function setTime() {
  timerInterval = setInterval(function() {
  time--;
  timerEl.innerHTML = time;

    if(time=== 0) {
      clearInterval(timerInterval);
      quizEnd ();
    }

  }, 1000);
}

function startQuiz() {
  // hide start screen
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class","hide");
  console.log(startScreen);
  // un-hide questions section
  questionsEl.removeAttribute("class");
  getQuestion();
  console.log(questionsIndex);
  // start timer
  setTime (); 
  // show starting time
  timerEl.innerHTML = time;
}

function getQuestion() {
  // get current question object from array

  // update title with current question
  questionTitle.innerHTML = questions[questionsIndex].title;

  // clear out any old question choices
  choicesEl.innerHTML = "";
  var choicesOpt = questions[questionsIndex].choices;
  console.log(choicesOpt);
  
  // loop over choices
  for (i =0; i < choicesOpt.length; i++) {
    // create new button for each choice
    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = choicesOpt[i];
    choicesEl.appendChild(choiceBtn);

    // attach click event listener to each choice
    choiceBtn.addEventListener("click", questionClick);
  }
  console.log(choicesEl);
  // display on the page
}

function questionClick(event) {
  console.log(event.target.textContent);
  console.log(questions[questionsIndex].answer);
  // check if user guessed wrong
  if (questions[questionsIndex].answer !== event.target.textContent) {
    // penalize time
    time = time - 10;
    // display new time on page
    timerEl.innerHTML = time;
    // play "wrong" sound effect
  sfxWrong.play ();
  }
  else {
  // else 
    // play "right" sound effect
    sfxRight.play ();
    // flash right/wrong feedback on page for half a second
    // questions.createElement("<div>You are right</div>");
  }
  // move to next question
      questionsIndex ++;
      console.log(questionsIndex);
  // check if we've run out of questions
  if (questionsIndex >= questions.length) {
    // quizEnd
    quizEnd();
  }
  else {
      // else 
    // getQuestion
    getQuestion ();
  }

}

function quizEnd() {
  // stop timer
  clearInterval(timerInterval);

  // show end screen
  endScreen.removeAttribute("class");
  // show final score
  finalScore.innerHTML = time; 

  // hide questions section
  questionsEl.setAttribute("class","hide");
}

// function clockTick() {
//   // update time

//   // check if user ran out of time
// }

function saveHighscore() {
    // make sure value wasn't empty
    if (initialsEl.value === "") {
      alert("Please add you initials to save score");
    }

  // get value of input box
  var currentUserscore = {
    initials: initialsEl.value,
    score: time,
  }
  console.log(currentUserscore);
   // get saved scores from localstorage, or if not any, set to empty array
  var allScores = JSON.parse(localStorage.getItem("score"));
  if ( allScores === null ) {
    // save to localstorage
    var storage = [currentUserscore];
    localStorage.setItem("score", JSON.stringify(storage));
  }
  else {
    allScores.push(currentUserscore);
    localStorage.setItem("score",JSON.stringify(allScores));
  }
    // format new score object for current user

    // redirect to next page
    window.location.replace("highscores.html");
}

function checkForEnter(event) {
  // check if event key is enter
  initialsEl.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submitBtn").click();
    }
  });
    // saveHighscore
    saveHighscore ();

  }

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
