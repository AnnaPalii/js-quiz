var highScores = document.getElementById("highscores");
var scores = JSON.parse(localStorage.getItem("score"));

function printHighscores() {
  // either get scores from localstorage or set to empty array
  for ( i = 0; i < scores.length; i++) {
    var initialsTx = document.createElement("li");
    initialsTx.textContent = scores[i].initials +" "+ scores[i].score;
    highScores.appendChild(initialsTx);
  }
  // (optional) sort highscores by score property in descending order

  // for each score
    // create li tag for each high score

    // display on page
}

function clearHighscores() {
  // (and reload)
}

// attache clear event to clear score button

// run printhighscore when page loads

printHighscores ();
