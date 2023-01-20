"use strict";

(() => {
  const FIGURES_RUS = ["камень", "ножницы", "бумага"];
  const FIGURES_ENG = ["rock", "scissors", "paper"];
  const MESSAGE_RUS = {
    tie: "Ничья!",
    win: "Вы выиграли!",
    lose: "Вы проиграли!",
    cancel: "Вы отменили игру",
    exit: "Действительно ли вы хотите выйти?",
    result: "Игрок: %s Компьютер: %s",
    move: "Введите ваш ход (камень, ножницы, бумага)",
    invalid: "Неверный ход, пожалуйста, попробуйте еще раз.",
  };
  const MESSAGE_ENG = {
    tie: "Tie!",
    win: "You win!",
    lose: "You lose!",
    cancel: "You canceled the game",
    exit: "Do you really want to exit?",
    result: "Player: %s Computer: %s",
    move: "Enter your move (rock, paper, scissors)",
  };
  const getRandomIntInclusive = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const game = (language = "RUS") => {
    let result = {
      player: 0,
      computer: 0,
    };
    let figures, messages;
    if (language === "RUS" || language === "") {
      figures = FIGURES_RUS;
      messages = MESSAGE_RUS;
    } else {
      figures = FIGURES_ENG;
      messages = MESSAGE_ENG;
    }

    const compareResults = (playerMove, computerMove) => {
      if (figures.indexOf(playerMove) === -1) {
        alert(messages.invalid);
        return start();
      }
      if (playerMove === computerMove) {
        alert(messages.tie);
        return "tie";
      } else if (
        (language === "RUS" &&
          ((playerMove === "камень" && computerMove === "ножницы") ||
            (playerMove === "ножницы" && computerMove === "бумага") ||
            (playerMove === "бумага" && computerMove === "камень"))) ||
        (language === "EN" &&
          ((playerMove === "rock" && computerMove === "scissors") ||
            (playerMove === "scissors" && computerMove === "paper") ||
            (playerMove === "paper" && computerMove === "rock")))
      ) {
        alert(messages.win);
        return "win";
      } else {
        alert(messages.lose);
        return "lose";
      }
    };

    const start = () => {
      let playerMove = prompt(messages.move);
      if (playerMove === null || playerMove === "") {
        let confirmExit = confirm(messages.exit);
        if (confirmExit) {
          alert(
            messages.result
              .replace("%s", result.player)
              .replace("%s", result.computer)
          );
          return;
        } else {
          return start();
        }
      }
      let computerMove = figures[getRandomIntInclusive(0, 2)];
      let outcome = compareResults(playerMove, computerMove);
      if (outcome === "win") {
        result.player++;
      } else if (outcome === "lose") {
        result.computer++;
      }
      start();
    };

    return start();
  };

  window.RPS = game;
})();
