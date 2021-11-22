const levels = [
    [1, 25, 10],
    [100, 150, 5],
    [200, 500, 3],
  ],
  triesDOM = document.querySelector("#remaining-tries small"),
  resultDOM = document.querySelector("#result-screen h1"),
  userInput = document.querySelector("input");
document.querySelectorAll("#level-screen > div").forEach(
  (btn) => {
    let [from, to, tries] = levels[Array.from(document.querySelector("#level-screen").children).indexOf(btn)]
    btn.innerHTML += `<div>
      <small style="margin: -25px 0 5px 0;">Range <br> ${from} - ${to}</small>
      <small>Tries <br> ${tries}</small>
    </div>`
    btn.onclick = () => {
      let secretNum = Math.floor(Math.random() * (to - from + 1)) + from;
      triesDOM.innerHTML = tries;
      triesDOM.parentElement.querySelector("strong").innerHTML = `${from} - ${to}`;
      document.body.setAttribute("id", "game-window");
      document.querySelector("#guess-button").onclick = () => {
        if (userInput.value >= from && userInput.value <= to) {
          --tries;
          if (tries > 0) {
            triesDOM.innerHTML = tries;
            document.querySelector("#message").innerHTML = secretNum > userInput.value ? "Too Low!" : "Too High!";
          }
          else if (tries == 0) {
            resultDOM.innerHTML = `You Lose!<small>The Secret Number was ${secretNum}</small>`;
            document.body.setAttribute("id", "result-window");
          }
          if (userInput.value == secretNum) {
            resultDOM.innerHTML = "You Won!";
            document.body.setAttribute("id", "result-window");
          }
        } else {
          ++tries
          document.querySelector("#message").innerHTML = `Guess between ${from} - ${to}`
        }
      };
    }
  }
);