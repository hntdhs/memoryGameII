const gameContainer = document.getElementById("game");

let noClicking = false;
let cardOne = null;
let cardTwo = null;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    console.log(counter);    
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");

    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    newDiv.setAttribute("id", "card");

    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {

  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  clickedCard.classList.add("flipped");

  // cardOne = clickedCard || cardOne; //card1 will always be clickedCard with that order
  cardOne = cardOne || clickedCard;
  cardTwo = cardOne === clickedCard ? null : clickedCard;

  if (cardOne.classList.contains("flipped") && cardTwo.classList.contains("flipped")) {
    noClicking = true;
      if (cardOne.style.backgroundColor === cardTwo.style.backgroundColor) {
          cardOne.removeEventListener("click", handleCardClick);
          cardTwo.removeEventListener("click", handleCardClick);
          cardOne = null;
          cardTwo = null;
          noClicking = false;
      }  else {
          setTimeout(function() {
              cardOne.classList.remove("flipped");
              cardTwo.classList.remove("flipped");
              cardOne.style.backgroundColor = '';
              cardTwo.style.backgroundColor = '';
              cardOne = null;
              cardTwo = null;
              noClicking = false;
          }, 1000);
        }
    }
}

// when the DOM loads
createDivsForColors(shuffledColors);
