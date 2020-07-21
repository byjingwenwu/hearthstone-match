let backList = ["back-1", "back-2", "back-3", "back-4", "back-5", "back-6", "back-7",
  "back-8", "back-9", "back-10", "back-11", "back-12", "back-13", "back-14", "back-15", "back-16", "back-17",
  "back-18", "back-19", "back-20"];

var firstCardClicked,
  secondCardClicked,
  firstCardClass,
  secondCardClass,
  clickCard = document.querySelector("#gameCards");

var cardList = [];
var gameLevel;
var newGameLevel;
var winMatches,
  matches = 0,
  attempt = 0,
  gamesPlayed = 0;

document.querySelector("#easyLevel").addEventListener("click", beforeGame);
document.querySelector("#midLevel").addEventListener("click", beforeGame);
document.querySelector("#hardLevel").addEventListener("click", beforeGame);
document.querySelector("#backToMain").addEventListener("click", backToMainPage);
document.querySelector("#restart").addEventListener("click", resetGame);

function beforeGame() {
  gameLevel = this.dataset.level * 1;
  document.querySelector(".modalStartOverlay").className += " hidden";
  document.querySelector(".gameContainer").classList.remove("hidden");
  winMatches = gameLevel;
  newCardlist(gameLevel);
}

function createFrontStyle() {
  var sheet = document.createElement("style");
  document.querySelector("head").appendChild(sheet);
  let x = "";
  for (i = 1; i < 87; i++) {
    x += ".card-" + i + " {background-image: url(assets/images/front/gif/p" + i + ".gif);}\r\n";
  }
  sheet.innerHTML = x;
}
createFrontStyle();

function shuffleImage() {
  var arr = [];
  for (let i = 1; i < 87; i++) {
    arr.push(i);
  }

  let newPos, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    newPos = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[newPos];
    arr[newPos] = temp;
  }

  for (let i = 0; i < cardList.length/2; i++) {
    cardList[i * 2] = arr[i];
    cardList[2 * i + 1] = arr[i];
  }
}

function cardShuffle() {
  shuffleImage();
  let newPos, temp;
  for (let i = cardList.length - 1; i > 0; i--) {
    newPos = Math.floor(Math.random() * (i + 1));
    temp = cardList[i];
    cardList[i] = cardList[newPos];
    cardList[newPos] = temp;
  }
}

function resetCard() {
  var field = document.querySelectorAll("#flipCon");
  for (let i = 0; i < field.length; i++) {
    if (field.length / 2 == 9) {
      field[i].className = "col-2";
    } else if (field.length / 2 == 16) {
      field[i].className = "col-mid";
    } else {
      field[i].className = "col-hard";
    }

  }
  var hiddenCard = document.querySelectorAll(".card-back");
  let p = Math.floor(Math.random() * backList.length);
  for (let i = 0; i < hiddenCard.length; i++) {
    hiddenCard[i].className = "card-back " + backList[p];
  }
  var frontCard = document.querySelectorAll(".card-front");
  cardShuffle();
  for (let i = 0; i < frontCard.length; i++) {
    frontCard[i].className = "card-front " + "card-" + cardList[i];
  }
}

function newCardlist(len) {
  cardList = new Array(len * 2);
  let r = Math.floor(Math.random() * backList.length);
  cardShuffle();
  for (let i = 0; i < cardList.length; i++) {
    var cardContainer = document.createElement("div");
    document.querySelector("main").appendChild(cardContainer);
    if (cardList.length / 2 == 9) {
      cardContainer.className = "col-2";
    } else if (cardList.length / 2 == 16) {
      cardContainer.className = "col-mid";
    } else {
      cardContainer.className = "col-hard";
    }
    cardContainer.setAttribute("id", "flipCon");
    var cardFront = document.createElement("div");
    cardFront.className = "card-front " + "card-" + cardList[i];
    cardContainer.appendChild(cardFront);
    var cardBack = document.createElement("div");
    cardBack.className = "card-back " + backList[r];
    cardContainer.appendChild(cardBack);
  }
}


clickCard.addEventListener("click", handleClick);

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }

  if (!firstCardClicked) {
    event.target.className += " hidden card-back-flip";
    event.target.previousElementSibling.className += " card-front-flip";
    event.target.parentElement.className += " flip";
    firstCardClicked = event.target;
    firstCardClass = firstCardClicked.previousElementSibling.className;
  } else {
    event.target.className += " hidden card-back-flip";
    event.target.previousElementSibling.className += " card-front-flip";
    event.target.parentElement.className += " flip";
    secondCardClicked = event.target;
    secondCardClass = secondCardClicked.previousElementSibling.className

    clickCard.removeEventListener("click", handleClick);

    if (firstCardClass === secondCardClass) {
      firstCardClicked.classList.remove("card-back-flip");
      firstCardClicked.previousElementSibling.classList.remove("card-front-flip");
      firstCardClicked.parentElement.classList.remove("flip");
      setTimeout(function() {
        secondCardClicked.classList.remove("card-back-flip");
        secondCardClicked.previousElementSibling.classList.remove("card-front-flip");
        secondCardClicked.parentElement.classList.remove("flip");
      }, 500);
      matches = matches + 1;
      attempt = attempt + 1;
      displayStats();
      if (matches == winMatches) {
        setTimeout(function () {
          document.querySelector(".modal-overlay").classList.remove("hidden");
        }, 800);
      }
      firstCardClicked = null;
      secondCardClicked = null;
      clickCard.addEventListener("click", handleClick);
    } else {
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        firstCardClicked.classList.remove("card-back-flip");
        firstCardClicked.previousElementSibling.classList.remove("card-front-flip");
        firstCardClicked.parentElement.classList.remove("flip");
        secondCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("card-back-flip");
        secondCardClicked.previousElementSibling.classList.remove("card-front-flip");
        secondCardClicked.parentElement.classList.remove("flip");
        attempt = attempt + 1;
        displayStats();
        firstCardClicked = null;
        secondCardClicked = null;
        clickCard.addEventListener("click", handleClick);
      }, 1000);
    }
  }
}

function displayStats() {
  document.querySelector("#attemptsNum").textContent = attempt;
  document.querySelector("#accuracyNum").textContent = (matches * 100 / attempt).toPrecision(3) + "%";
}


function resetGame() {
  matches = 0;
  attempt = 0;
  gamesPlayed++;
  document.querySelector("#gamePlayedNum").textContent = gamesPlayed;
  document.querySelector("#attemptsNum").textContent = attempt;
  document.querySelector("#accuracyNum").textContent = "0%";
  resetCard();
}

function removeAllCard() {
  while (clickCard.hasChildNodes()) {
    clickCard.removeChild(clickCard.firstChild);
  }
}

function resetToMain() {
  matches = 0;
  attempt = 0;
  gamesPlayed = 0;
  document.querySelector("#gamePlayedNum").textContent = gamesPlayed;
  document.querySelector("#attemptsNum").textContent = attempt;
  document.querySelector("#accuracyNum").textContent = "0%";
  removeAllCard();
}

document.querySelector("#startNewButton").addEventListener("click", function () {
  resetGame();
  document.querySelector(".modal-overlay").className += " hidden";
})

function backToMainPage() {
  resetToMain();
  document.querySelector(".modal-overlay").className += " hidden";
  document.querySelector(".modalStartOverlay").classList.remove("hidden");
}

document.querySelector("#chooseLevel").addEventListener("click", function() {
  document.querySelector(".modal-overlay").className += " hidden";
  document.querySelector(".level-overlay").classList.remove("hidden");
})

document.querySelector("#goBack").addEventListener("click", function() {
  document.querySelector(".modal-overlay").classList.remove("hidden");
  document.querySelector(".level-overlay").className = "level-overlay hidden";
})

function chooseNewGameLevel() {
  document.querySelector(".level-overlay").className = "level-overlay hidden";
  matches = 0;
  attempt = 0;
  gamesPlayed++;
  document.querySelector("#gamePlayedNum").textContent = gamesPlayed;
  document.querySelector("#attemptsNum").textContent = attempt;
  document.querySelector("#accuracyNum").textContent = "0%";
  removeAllCard();
  gameLevel = this.dataset.level * 1;
  newCardlist(gameLevel);
}

document.querySelector("#newEasy").addEventListener("click", chooseNewGameLevel);
document.querySelector("#newMid").addEventListener("click", chooseNewGameLevel);
document.querySelector("#newHard").addEventListener("click", chooseNewGameLevel);
