let score = 0;
let cross = true;

let crashAudio = new Audio("loose.mp3");

document.onkeydown = function (a) {
  if (a.keyCode == 38) {
    let nobi = document.querySelector(".nobita");
    nobi.classList.add("jump"); //adds class jump to class nobita (nobita character)
    setTimeout(() => {
      nobi.classList.remove("jump"); //removes class jump from class nobita (nobita character) after 700 miliseconds
    }, 700);
  } else if (a.keyCode == 39) {
    let nobita = document.querySelector(".nobita");
    let moveLeft = parseInt(
      window.getComputedStyle(nobita, null).getPropertyValue("left")
    );
    nobita.style.left = moveLeft + 60 + "px";
  } else if (a.keyCode == 37) {
    let nobita = document.querySelector(".nobita");
    let moveLeft = parseInt(
      window.getComputedStyle(nobita, null).getPropertyValue("left")
    );
    nobita.style.left = moveLeft + -60 + "px";
  }
};
setInterval(() => {
  let nobita = document.querySelector(".nobita");
  let obstacle = document.querySelector(".obstacle");
  let gameOver = document.querySelector(".gameOver");

  let nx = parseInt(
    window.getComputedStyle(nobita, null).getPropertyValue("left")
  );
  let ny = parseInt(
    window.getComputedStyle(nobita, null).getPropertyValue("bottom")
  );

  let ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  let oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("bottom")
  );

  let offsetX = Math.abs(nx - ox);
  let offsetY = Math.abs(ny - oy);
  if (offsetX < 145 && offsetY < 65) {
    gameOver.style.visibility = "visible";
    obstacle.classList.remove("obsMove");
    crashAudio.play();
    setTimeout(() => {
      crashAudio.pause();
    }, 5000);
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      let aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      let newDur = aniDur - 0.04;
      obstacle.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 100);
function updateScore(score) {
  let scoreCont = document.querySelector(".score");
  scoreCont.innerHTML = "Your Score is: " + score;
}
