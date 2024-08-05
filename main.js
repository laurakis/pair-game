(() => {
  class Card {
    _open = false;
    _success = false;

    constructor(container, number, action) {
      this.card = document.createElement("div");
      this.card.classList.add("card");
      this.card.textContent = number;
      this.number = number;
      this.card.addEventListener("click", () => {
        if (this.open === false && this.success == false) {
          this.open = true;
          action(this);
        }
      });

      container.append(this.card);
    }

    set open(value) {
      this._open = value;
      if (value) {
        this.card.classList.add("open");
      } else {
        this.card.classList.remove("open");
      }
    }

    get open() {
      return this._open;
    }

    set success(value) {
      this._success = value;
      if (value) {
        this.card.classList.add("success");
      } else {
        this.card.classList.remove("success");
      }
    }

    get success() {
      return this._open;
    }
  }

  let cardsCount = Number(prompt("Enter the number of pairs", 6));

  function NewGame(container, cardsCount) {
    let cardsNumberArray = [];
    cardsArray = [];
    firstCard = null;
    secondCard = null;
    for (let i = 1; i <= cardsCount / 2; i++) {
      cardsNumberArray.push(i);
      cardsNumberArray.push(i);
    }
    cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);

    for (const cardNumber of cardsNumberArray) {
      cardsArray.push(new Card(container, cardNumber, flip));
    }

    function flip(card) {
      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number !== secondCard.number) {
          firstCard.open = false;
          secondCard.open = false;
          firstCard = null;
          secondCard = null;
        }
      }

      if (firstCard === null) {
        firstCard = card;
      } else {
        if (secondCard === null) {
          secondCard = card;
        }
      }

      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number === secondCard.number) {
          firstCard.success = true;
          secondCard.success = true;
          firstCard = null;
          secondCard = null;
        }
      }

      if (
        document.querySelectorAll(".card.success").length ===
        cardsNumberArray.length
      ) {
        setTimeout(function () {
          alert("Game over");
          container.innerHTML = "";
          cardsNumberArray = [];
          cardsArray = [];
          firstCard = null;
          secondCard = null;
          NewGame(container, cardsCount);
        }, 400);
      }
    }
  }

  NewGame(document.getElementById("game"), cardsCount * cardsCount);
})();
