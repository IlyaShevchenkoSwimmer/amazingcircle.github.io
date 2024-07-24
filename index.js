const field = document.getElementById("field");
const player = document.getElementById("player");
const firstDot = document.getElementById("firstDot");
const secondDot = document.getElementById("secondDot");
const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");
const block3 = document.getElementById("block3");
const scoreDiv = document.getElementById("scoreDiv");
const lose = document.getElementById("lose");
const tap = document.getElementById("tap");
const finalScore = document.getElementById("finalScore");

const body = document.querySelector("body");
body.addEventListener("click", () => {
  clicks++;
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let clicks = 0;
let score = 0;
let games = 0;
let loseScore = 0;
let bouncing = 0;

let block1pos = [];
let block2pos = [];
let block3pos = [];
let coordsDot1 = [];
let coordsDot2 = [];

let xValues = [];
let yValues = [];
let centerX = 150;
let centerY = 150;
let radius = 152;
let steps = 360;

for (var i = 0; i < steps; i++) {
  xValues[i] = centerX + radius * Math.cos((2 * Math.PI * i) / steps);
  yValues[i] = centerY + radius * Math.sin((2 * Math.PI * i) / steps);
}

let inxValues = [];
let inyValues = [];
let inradius = 130;

for (var i = 0; i < steps; i++) {
  inxValues[i] = centerX + inradius * Math.cos((2 * Math.PI * i) / steps);
  inyValues[i] = centerY + inradius * Math.sin((2 * Math.PI * i) / steps);
}

let outxValues = [];
let outyValues = [];
let outradius = 174;

for (var i = 0; i < steps; i++) {
  outxValues[i] = centerX + outradius * Math.cos((2 * Math.PI * i) / steps);
  outyValues[i] = centerY + outradius * Math.sin((2 * Math.PI * i) / steps);
}

let smallXValues = [];
let smallYValues = [];
let smallCenterX = 5;
let smallCenterY = 5;
let smallRadius = 17;
let smallSteps = 360;

for (let i = 0; i < smallSteps; i++) {
  smallXValues[i] =
    smallCenterX + smallRadius * Math.cos((2 * Math.PI * i) / smallSteps);
  smallYValues[i] =
    smallCenterY + smallRadius * Math.sin((2 * Math.PI * i) / smallSteps);
}

player.style.position = "relative";
player.style.left = "145px";
player.style.top = "145px";
player.style.width = "10px";
player.style.height = "10px";
field.style.animation = "firstappearance 2s linear";
//player.style.outline = "1px solid red";
//player.style.backgroundColor = "red"
//player.style.borderRadius = "50%"

block1.style.position = "absolute";
block1.style.height = "2px";
block1.style.width = "16px";
block2.style.position = "absolute";
block2.style.height = "2px";
block2.style.width = "16px";
block3.style.position = "absolute";
block3.style.height = "2px";
block3.style.width = "16px";

firstDot.style.position = "absolute";
firstDot.style.width = "10px";
firstDot.style.height = "10px";
firstDot.style.backgroundColor = "black";
firstDot.style.left = `0px`;
firstDot.style.top = `0px`;
firstDot.style.borderRadius = "50%";
secondDot.style.position = "absolute";
secondDot.style.width = "10px";
secondDot.style.height = "10px";
secondDot.style.backgroundColor = "black";
secondDot.style.left = `0px`;
secondDot.style.top = `$0px`;
secondDot.style.borderRadius = "50%";

tap.style.animation = "loseApp 2s ease-out";
setTimeout(() => {
  tap.style.animation = "multiApp 2s linear infinite";
}, 2000);

function touching(el1, el2) {
  let ox = Math.abs(el1.x - el2.x) < (el1.x < el2.x ? el2.width : el1.width);
  let oy = Math.abs(el1.y - el2.y) < (el1.y < el2.y ? el2.height : el1.height);
  return ox && oy;
}

let playerI = 0;
let blockI = 0;
let blockStep = 130;
let rounds = 0;
let block1j = 360;
let block2j = 360;
let block3j = 360;

const changePos = async () => {
  while (true) {
    await delay(25);
    if (clicks > 0) {
      if (blockI == blockStep) {
        let randSide = Math.round(Math.random());
        block1j = (playerI + 90) % 360;
        if (randSide == 0) {
          block1.style.left = `${inxValues[block1j] - 8}px`;
          block1.style.top = `${inyValues[block1j] - 1}px`;
        }
        if (randSide == 1) {
          block1.style.left = `${outxValues[block1j] - 8}px`;
          block1.style.top = `${outyValues[block1j] - 1}px`;
        }
        block1.style.backgroundColor = "black";
        block1.style.transform = `rotate(${block1j + 1}deg)`;
        block1.style.animation = "appearance 750ms linear";
      }
      if (blockI == 2 * blockStep) {
        let randSide = Math.round(Math.random());
        block2j = (playerI + 90) % 360;
        if (randSide == 0) {
          block2.style.left = `${inxValues[block2j] - 8}px`;
          block2.style.top = `${inyValues[block2j] - 1}px`;
        }
        if (randSide == 1) {
          block2.style.left = `${outxValues[block2j] - 8}px`;
          block2.style.top = `${outyValues[block2j] - 1}px`;
        }
        block2.style.backgroundColor = "black";
        block2.style.transform = `rotate(${block2j + 1}deg)`;
        block2.style.animation = "appearance 750ms linear";
      }
      if (blockI == 3 * blockStep) {
        let randSide = Math.round(Math.random());
        let randCol = Math.round(Math.random());
        block3j = (playerI + 90) % 360;
        if (randSide == 0) {
          block3.style.left = `${inxValues[block3j] - 8}px`;
          block3.style.top = `${inyValues[block3j] - 1}px`;
        }
        if (randSide == 1) {
          block3.style.left = `${outxValues[block3j] - 8}px`;
          block3.style.top = `${outyValues[block3j] - 1}px`;
        }
        if (randCol == 1) {
          block3.style.backgroundColor = "black";
          bouncing = 0;
        }
        if (randCol == 0) {
          block3.style.backgroundColor = "#37EB34";
          bouncing = 1;
        }
        block3.style.transform = `rotate(${block3j + 1}deg)`;
        block3.style.animation = "appearance 750ms linear";
      }
      blockI++;
      if (rounds == 0) {
        if (blockI == 3 * blockStep + 1) {
          blockI = 1;
          rounds++;
        }
      }
      if (rounds > 0) {
        if (blockI == blockStep - 26) {
          block1.style.animation = "disappearance 750ms linear";
        }
        if (blockI == 2 * blockStep - 26) {
          block2.style.animation = "disappearance 750ms linear";
        }
        if (blockI == 3 * blockStep - 26) {
          block3.style.animation = "disappearance 750ms linear";
        }
        if (blockI == 3 * blockStep + 1) {
          blockI = 0;
          if (blockStep > 40) {
            blockStep -= 10;
          }
          rounds++;
        }
      }
      if (playerI == block1j || playerI == block2j || playerI == block3j) {
        score++;
        loseScore++;
        scoreDiv.innerHTML = score;
      }
    }
    player.style.left = `${xValues[playerI] - 5}px`;
    player.style.top = `${yValues[playerI] - 5}px`;
    playerI++;
    if (playerI >= xValues.length) {
      playerI = 0;
    }
    if (clicks == 1) {
    }
  }
};

let firstDotI = 0;
let secondDotI = 180;
let tailI1 = 0;
let tailI2 = 0;
let tailI3 = 0;
let tailI4 = 0;
let tailI5 = 0;

const meteors = async () => {
  while (true) {
    await delay(1);
    tailI1++;
    tailI2++;
    tailI3++;
    tailI4++;
    tailI5++;

    if (clicks == 0) {
      firstDot.style.position = "absolute";
      firstDot.style.width = "10px";
      firstDot.style.height = "10px";
      firstDot.style.backgroundColor = "black";
      firstDot.style.left = `0px`;
      firstDot.style.top = `0px`;
      firstDot.style.borderRadius = "50%";
      secondDot.style.position = "absolute";
      secondDot.style.width = "10px";
      secondDot.style.height = "10px";
      secondDot.style.backgroundColor = "black";
      secondDot.style.left = `0px`;
      secondDot.style.top = `0px`;
      secondDot.style.borderRadius = "50%";
    }

    if (clicks != 0) {
      if (clicks == 1) {
        player.style.animation = "firstappearance 2s linear";
        scoreDiv.style.animation = "firstappearance 2s linear";
        scoreDiv.innerHTML = score;
        tap.innerHTML = "";
        finalScore.innerHTML = "";
        finalScore.style.animation = "empAnim 1s linear";
        loseScore = 0;
      }
      if (clicks % 2 == 0) {
        firstDot.style.position = "absolute";
        firstDot.style.width = "10px";
        firstDot.style.height = "10px";
        firstDot.style.backgroundColor = "black";
        firstDot.style.left = `${smallXValues[firstDotI] - 5}px`;
        firstDot.style.top = `${smallYValues[firstDotI] - 5}px`;
        firstDot.style.borderRadius = "50%";
        secondDot.style.position = "absolute";
        secondDot.style.width = "10px";
        secondDot.style.height = "10px";
        secondDot.style.backgroundColor = "black";
        secondDot.style.left = `${smallXValues[secondDotI] - 5}px`;
        secondDot.style.top = `${smallYValues[secondDotI] - 5}px`;
        secondDot.style.borderRadius = "50%";
        if (firstDotI <= 0) {
          firstDotI = 360;
        }
        if (secondDotI <= 0) {
          secondDotI = 360;
        }
        firstDotI--;
        secondDotI--;
      }
      if (clicks % 2 == 1) {
        firstDot.style.position = "absolute";
        firstDot.style.width = "10px";
        firstDot.style.height = "10px";
        firstDot.style.backgroundColor = "black";
        firstDot.style.left = `${smallXValues[firstDotI] - 5}px`;
        firstDot.style.top = `${smallYValues[firstDotI] - 5}px`;
        secondDot.style.left = `${smallXValues[secondDotI] - 5}px`;
        secondDot.style.top = `${smallYValues[secondDotI] - 5}px`;
        firstDot.style.borderRadius = "50%";
        secondDot.style.position = "absolute";
        secondDot.style.width = "10px";
        secondDot.style.height = "10px";
        secondDot.style.backgroundColor = "black";
        secondDot.style.borderRadius = "50%";
        if (firstDotI >= smallXValues.length) {
          firstDotI = 0;
        }
        if (secondDotI >= smallXValues.length) {
          secondDotI = 0;
        }
        firstDotI++;
        secondDotI++;
      }
      let dot1Coord = firstDot.getBoundingClientRect();
      let dot2Coord = secondDot.getBoundingClientRect();
      let b1coord = block1.getBoundingClientRect();
      let b2coord = block2.getBoundingClientRect();
      let b3coord = block3.getBoundingClientRect();

      let t11 = touching(dot1Coord, b1coord);
      let t12 = touching(dot2Coord, b1coord);
      let t21 = touching(dot1Coord, b2coord);
      let t22 = touching(dot2Coord, b2coord);
      let t31 = touching(dot1Coord, b3coord);
      let t32 = touching(dot2Coord, b3coord);

      if (
        t11 === true ||
        t12 === true ||
        t21 === true ||
        t22 === true ||
        (t31 === true && bouncing === 0) ||
        (t32 === true && bouncing === 0)
      ) {
        field.style.animation = "totaldis 3s ease-out";
        lose.innerHTML = "YOU LOST";
        lose.style.animation = "loseApp 2s linear";
        setTimeout(() => {
          score = 0;
          scoreDiv.innerHTML = "";
          scoreDiv.style.animation = "empAnim 500ms linear";
          clicks = 0;
          playerI = 0;
          blockI = 0;
          blockStep = 130;
          rounds = 0;
          block1j = 360;
          block2j = 360;
          block3j = 360;
          block1.style.left = "0px";
          block1.style.top = "0px";
          block1.style.backgroundColor = "white";
          block1.style.animation = "empAnim 500ms linear";
          block2.style.left = "0px";
          block2.style.top = "0px";
          block2.style.backgroundColor = "white";
          block2.style.animation = "empAnim 500ms linear";
          block3.style.left = "0px";
          block3.style.top = "0px";
          block3.style.backgroundColor = "white";
          block3.style.animation = "empAnim 500ms linear";
          field.style.animation = "appearance 2s ease-out";
          player.style.animation = "appearance 1s linear";
          tap.innerHTML = "TAP TO PLAY AGAIN";
          tap.style.animation = "loseApp 2s ease-out";
          finalScore.style.animation = "loseApp 2s ease-out";
          finalScore.innerHTML = `YOU MADE ${loseScore}`;
          setTimeout(() => {
            tap.style.animation = "multiApp 2s linear infinite";
          }, 2000);
          lose.style.animation = "disappearance 1s linear";
          setTimeout(() => {
            lose.innerHTML = "";
          }, 900);
        }, 2500);
      }
      if (
        (t31 === true && bouncing === 1) ||
        (t32 === true && bouncing === 1)
      ) {
        clicks++;
      }
    }

    if (tailI1 == 10) {
      let div11 = document.createElement("div");
      div11.setAttribute("id", "tail11");
      player.appendChild(div11);
      let tail11 = document.getElementById("tail11");
      const coords11 = firstDot.getBoundingClientRect();
      tail11.style.position = "fixed";
      tail11.style.top = `${coords11["top"] + 1}px`;
      tail11.style.left = `${coords11["left"] + 1}px`;
      tail11.style.width = "8px";
      tail11.style.height = "8px";
      tail11.style.borderRadius = "50%";
      tail11.style.backgroundColor = "rgba(0, 0, 0, 1)";
      tail11.style.animation = "disappearance 400ms linear";
      let div21 = document.createElement("div");
      div21.setAttribute("id", "tail21");
      player.appendChild(div21);
      let tail21 = document.getElementById("tail21");
      const coords21 = secondDot.getBoundingClientRect();
      tail21.style.position = "fixed";
      tail21.style.top = `${coords21["top"] + 1}px`;
      tail21.style.left = `${coords21["left"] + 1}px`;
      tail21.style.width = "8px";

      tail21.style.height = "8px";
      tail21.style.borderRadius = "50%";
      tail21.style.backgroundColor = "rgba(0, 0, 0, 1)";
      tail21.style.animation = "disappearance 400ms linear";
    }
    if (tailI2 == 20) {
      let div12 = document.createElement("div");
      div12.setAttribute("id", "tail12");
      player.appendChild(div12);
      let tail12 = document.getElementById("tail12");
      const coords12 = firstDot.getBoundingClientRect();
      tail12.style.position = "fixed";
      tail12.style.top = `${coords12["top"] + 1}px`;
      tail12.style.left = `${coords12["left"] + 1}px`;
      tail12.style.width = "8px";
      tail12.style.height = "8px";

      tail12.style.borderRadius = "50%";
      tail12.style.backgroundColor = "rgba(0, 0, 0, 1)";
      tail12.style.animation = "disappearance 400ms linear";
      let div22 = document.createElement("div");
      div22.setAttribute("id", "tail22");
      player.appendChild(div22);
      let tail22 = document.getElementById("tail22");
      const coords22 = secondDot.getBoundingClientRect();
      tail22.style.position = "fixed";
      tail22.style.top = `${coords22["top"] + 1}px`;
      tail22.style.left = `${coords22["left"] + 1}px`;
      tail22.style.width = "8px";
      tail22.style.height = "8px";
      tail22.style.borderRadius = "50%";
      tail22.style.backgroundColor = "rgba(0, 0, 0, 1)";
      tail22.style.animation = "disappearance 400ms linear";
    }
    if (tailI3 == 30) {
      let div13 = document.createElement("div");
      div13.setAttribute("id", "tail13");
      player.appendChild(div13);
      let tail13 = document.getElementById("tail13");
      const coords13 = firstDot.getBoundingClientRect();
      tail13.style.position = "fixed";
      tail13.style.top = `${coords13["top"] + 1}px`;
      tail13.style.left = `${coords13["left"] + 1}px`;
      tail13.style.width = "8px";
      tail13.style.height = "8px";
      tail13.style.borderRadius = "50%";
      tail13.style.backgroundColor = "rgba(0, 0, 0, 1)";
      tail13.style.animation = "disappearance 400ms linear";
      let div23 = document.createElement("div");
      div23.setAttribute("id", "tail23");
      player.appendChild(div23);
      let tail23 = document.getElementById("tail23");
      const coords23 = secondDot.getBoundingClientRect();
      tail23.style.position = "fixed";
      tail23.style.top = `${coords23["top"] + 1}px`;
      tail23.style.left = `${coords23["left"] + 1}px`;
      tail23.style.width = "8px";
      tail23.style.height = "8px";
      tail23.style.borderRadius = "50%";
      tail23.style.backgroundColor = "rgba(0, 0, 0, 1)";
      tail23.style.animation = "disappearance 400ms linear";
    }
    if (tailI4 == 40) {
      let div14 = document.createElement("div");
      div14.setAttribute("id", "tail14");
      player.appendChild(div14);
      let tail14 = document.getElementById("tail14");
      const coords14 = firstDot.getBoundingClientRect();
      tail14.style.position = "fixed";
      tail14.style.top = `${coords14["top"] + 1}px`;
      tail14.style.left = `${coords14["left"] + 1}px`;
      tail14.style.width = "8px";
      tail14.style.height = "8px";
      tail14.style.borderRadius = "50%";
      tail14.style.backgroundColor = "rgba(0, 0, 0, 1)";
      tail14.style.animation = "disappearance 400ms linear";
      let div24 = document.createElement("div");
      div24.setAttribute("id", "tail24");
      player.appendChild(div24);
      let tail24 = document.getElementById("tail24");
      const coords24 = secondDot.getBoundingClientRect();
      tail24.style.position = "fixed";
      tail24.style.top = `${coords24["top"] + 1}px`;
      tail24.style.left = `${coords24["left"] + 1}px`;
      tail24.style.width = "8px";
      tail24.style.height = "8px";
      tail24.style.borderRadius = "50%";
      tail24.style.backgroundColor = "rgba(0, 0, 0, 1)";
      tail24.style.animation = "disappearance 400ms linear";
    }
    if (tailI5 == 50) {
      let div15 = document.createElement("div");
      div15.setAttribute("id", "tail15");
      player.appendChild(div15);
      let tail15 = document.getElementById("tail15");
      const coords15 = firstDot.getBoundingClientRect();
      tail15.style.position = "fixed";
      tail15.style.top = `${coords15["top"] + 1}px`;
      tail15.style.left = `${coords15["left"] + 1}px`;
      tail15.style.width = "8px";
      tail15.style.height = "8px";
      tail15.style.borderRadius = "50%";
      tail15.style.backgroundColor = "rgba(0, 0, 0, 1)";
      tail15.style.animation = "disappearance 400ms linear";
      let div25 = document.createElement("div");
      div25.setAttribute("id", "tail25");
      player.appendChild(div25);
      let tail25 = document.getElementById("tail25");
      const coords25 = secondDot.getBoundingClientRect();
      tail25.style.position = "fixed";
      tail25.style.top = `${coords25["top"] + 1}px`;
      tail25.style.left = `${coords25["left"] + 1}px`;
      tail25.style.width = "8px";
      tail25.style.height = "8px";
      tail25.style.borderRadius = "50%";
      tail25.style.backgroundColor = "rgba(0, 0, 0, 1)";
      tail25.style.animation = "disappearance 400ms linear";
    }
    if (tailI1 == 60) {
      tail11.remove();
      tail21.remove();
      tailI1 = 9;
    }
    if (tailI2 == 70) {
      tail12.remove();
      tail22.remove();
      tailI2 = 19;
    }
    if (tailI3 == 80) {
      tail13.remove();
      tail23.remove();
      tailI3 = 29;
    }
    if (tailI4 == 90) {
      tail14.remove();
      tail24.remove();
      tailI4 = 39;
    }
    if (tailI5 == 100) {
      tail15.remove();
      tail25.remove();
      tailI5 = 49;
    }
  }
};

meteors();

changePos();
