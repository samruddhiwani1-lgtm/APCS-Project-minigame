const emojis = ["🍎","🍌","🍇","🍉","🍒","🥝","🍍","🥥"];
let cards = [...emojis, ...emojis];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    const board = document.getElementById("gameBoard");
    board.innerHTML = "";
    shuffle(cards);

    cards.forEach(emoji => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.innerHTML = "❓";
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.innerHTML = this.dataset.emoji;
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

   if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
       firstCard.classList.add("matched");
       secondCard.classList.add("matched");
       resetTurn();
   } else {
        setTimeout(() => {
            firstCard.innerHTML = "❓";
            secondCard.innerHTML = "❓";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restartGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    createBoard();
}

createBoard();