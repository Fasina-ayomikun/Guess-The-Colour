const score = document.querySelector(".score");
const options = document.querySelector(".options");
const quitBtn = document.querySelector(".quit-btn");
const retryBtn = document.querySelector(".retry-btn");
const confirmBtn = document.querySelector(".confirm-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const envelope = document.querySelector(".envelope");
const alert = document.querySelector(".alert");
const model = document.querySelector(".model");
const winningModel = document.querySelector(".winner-page");
const winningModelText = document.querySelector(".winner-page h1");

const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
let currentScore = 0;
let numOfTries = 0;
const randomColorGenerator = () => {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[Math.floor(Math.random() * hex.length)];
  }
  return hexColor;
};

const startGame = () => {
  let color1 = randomColorGenerator();
  let color2 = randomColorGenerator();
  let color3 = randomColorGenerator();
  const colorsArray = [color1, color2, color3];
  let mainColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];
  const option = colorsArray
    .map((color) => {
      return `  <li class="option">
            <div class="option-colour"></div>
            <h5>${color}</h5>
          </li>`;
    })
    .join("");
  options.innerHTML = option;

  const singleColor = document.querySelectorAll(".option");

  // Add background color to options
  singleColor[0].firstElementChild.style.backgroundColor = color1;
  singleColor[1].firstElementChild.style.backgroundColor = color2;
  singleColor[2].firstElementChild.style.backgroundColor = color3;
  envelope.style.backgroundColor = mainColor;

  singleColor.forEach((color) => {
    color.addEventListener(
      "click",
      () => {
        // Increase number of tries by 1
        numOfTries++;
        const colorType =
          color.firstElementChild.nextElementSibling.textContent;
        if (colorType === mainColor) {
          // Increase score by 1
          currentScore++;
          score.innerHTML = `<b>Score:</b> ${currentScore}/5`;
          envelope.classList.add("show-envelope");

          alert.classList.add("show-alert");
          alert.classList.remove("danger");
          alert.classList.add("success");
          alert.innerHTML = `<p>Nicely Done 🌟🌟🌟</p>`;

          // Remove alert after 1sec
          setTimeout(() => {
            alert.classList.remove("show-alert");
          }, 500);
        } else {
          alert.classList.add("show-alert");
          alert.classList.remove("success");
          alert.classList.add("danger");
          alert.innerHTML = `<p>Oops! You guessed wrong</p>`;
          setTimeout(() => {
            alert.classList.remove("show-alert");
          }, 500);
        }

        if (numOfTries < 6) {
          setTimeout(() => {
            startGame();
            envelope.classList.remove("show-envelope");
          }, 500);
        }

        // Check if the game is over

        if (numOfTries === 5) {
          winningModel.classList.add("show-model");
          if (currentScore > 2) {
            winningModelText.textContent = `Yay! You won.`;
            winningModel.firstElementChild.classList.remove("lost");
            winningModel.firstElementChild.classList.add("win");
          } else {
            winningModelText.textContent = `Oops! You lost.`;
            winningModel.firstElementChild.classList.remove("win");
            winningModel.firstElementChild.classList.add("lost");
          }
        }
      },
      { once: true }
    );
  });
};

quitBtn.addEventListener("click", () => {
  model.classList.add("show-model");
});
cancelBtn.addEventListener("click", () => {
  model.classList.remove("show-model");
});
confirmBtn.addEventListener("click", () => {
  score.innerHTML = `<b>Score:</b> 0/5`;
  currentScore = 0;
  startGame();
  model.classList.remove("show-model");
});
retryBtn.addEventListener("click", () => {
  score.innerHTML = `<b>Score:</b> 0/5`;
  winningModel.classList.remove("show-model");
  startGame();
  currentScore = 0;
  numOfTries = 0;
});
startGame();
