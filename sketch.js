let eyes = [], //create two arrays
  pupils = [];
let eyeWidth,
  eyeHeight,
  pupil,
  verticalSpace,
  startX,
  startY,
  randomEye,
  xpupil,
  ypupil,
  rando,
  colorPupil;
const orizontalSpace = 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");
  //define the sizes of the eyes and their pupils basing them on the window's size to adapt them by keeping always the same proportions
  eyeWidth = (windowWidth - 8 * orizontalSpace) / 14; //the width is based on a line containing 7 eyes
  eyeHeight = eyeWidth / 1.5;
  verticalSpace = (windowHeight - 10 * eyeHeight) / 6; //the vertical spacing is calculated base on the height of the eyes and by creating columns of 5 eyes
  pupil = eyeWidth / 1.4;
  //define the starting position of the firts eye and pupil
  startX = orizontalSpace + eyeWidth;
  startY = verticalSpace + eyeHeight;
  //create a for that fill the two arrays with objects created by using the classes that take the positions to create eyes and pupils
  for (let i = 0; i < 3; i++) {
    //to check the row
    for (let k = 0; k < 7; k++) {
      //to check the column
      eyes.push(new Eye(startX, startY));
      pupils.push(new Pupil(startX, startY));
      startX = startX + orizontalSpace + 2 * eyeWidth; //the x position incrises every time
    }
    startX = orizontalSpace + eyeWidth;
    startY = startY + 2 * (verticalSpace + 2 * eyeHeight); //the y position incrises when switching line
  }
  //restoring the starting positions for the first eye of the lines composed by 6 eyes instead of 7
  startX = 1.5 * orizontalSpace + 2 * eyeWidth;
  startY = 2 * verticalSpace + 3 * eyeHeight;
  for (let c = 0; c < 2; c++) {
    for (let k = 0; k < 6; k++) {
      eyes.push(new Eye(startX, startY));
      pupils.push(new Pupil(startX, startY));
      startX = startX + orizontalSpace + 2 * eyeWidth;
    }
    startX = 1.5 * orizontalSpace + 2 * eyeWidth;
    startY = startY + 2 * (verticalSpace + 2 * eyeHeight);
  }
}

function draw() {
  background("black");
  //create a for that calls the function show for each object contained in the array
  for (let m = 0; m < eyes.length; m++) {
    eyes[m].show();
    pupils[m].show();
  }
  //create the text and put it in the center
  textAlign(CENTER);
  textFont("Helvetica");
  textSize(20);
  fill("white");
  text("Click to see the eyes turn red", windowWidth / 2, verticalSpace / 2);
}

//class eye that gets the position of the eye as an input
class Eye {
  constructor(positionX, positionY) {
    this.x = positionX;
    this.y = positionY;
  }

  //function show that defines which shape each eye has and its style
  show() {
    push();
    translate(this.x, this.y);
    beginShape();
    vertex(-eyeWidth, 0);
    noStroke();
    fill("white");
    bezierVertex(
      -eyeWidth / 2,
      -eyeHeight,
      eyeWidth / 2,
      -eyeHeight,
      eyeWidth,
      0
    );
    bezierVertex(
      eyeWidth / 2,
      eyeHeight,
      -eyeWidth / 2,
      eyeHeight,
      -eyeWidth,
      0
    );
    endShape();
    pop();
  }
}

//class pupil that gets the position of the pupil as an input. It also sets the default fill color as black
class Pupil {
  constructor(positionX, positionY) {
    this.xp = positionX;
    this.yp = positionY;
    this.colore = "black";
  }
  //function show that defines which shape each pupil has and its style
  show() {
    push();
    translate(this.xp, this.yp);
    fill(this.colore);
    noStroke();
    //the pupil's position follows the mouse inside of a range
    xpupil = map(mouseX, 0, width, -eyeWidth * 0.5, eyeWidth * 0.5, true);
    ypupil = map(mouseY, 0, height, -eyeHeight * 0.35, eyeHeight * 0.35, true);
    ellipse(xpupil, ypupil, pupil);
    pop();
  }
}

//function activated when the window is resized, it defines the new default values by updating the old values
function windowResized() {
  createCanvas(windowWidth, windowHeight);
  background("black");
  eyeWidth = (windowWidth - 8 * orizontalSpace) / 14;
  eyeHeight = eyeWidth / 1.5;
  verticalSpace = (windowHeight - 10 * eyeHeight) / 6;
  pupil = eyeWidth / 1.4;
  startX = orizontalSpace + eyeWidth;
  startY = verticalSpace + eyeHeight;
  let t = 0; //to keep track of whick object inside of the arrays is being modifed
  for (let i = 0; i < 3; i++) {
    for (let k = 0; k < 7; k++) {
      //instead of creating new objects the positions of the existing ones are being modified based on the new window size
      eyes[t].x = startX;
      eyes[t].y = startY;
      pupils[t].xp = startX;
      pupils[t].yp = startY;
      startX = startX + orizontalSpace + 2 * eyeWidth;
      t++;
    }
    startX = orizontalSpace + eyeWidth;
    startY = startY + 2 * (verticalSpace + 2 * eyeHeight);
  }
  startX = 1.5 * orizontalSpace + 2 * eyeWidth;
  startY = 2 * verticalSpace + 3 * eyeHeight;
  for (let c = 0; c < 2; c++) {
    for (let k = 0; k < 6; k++) {
      eyes[t].x = startX;
      eyes[t].y = startY;
      pupils[t].xp = startX;
      pupils[t].yp = startY;
      startX = startX + orizontalSpace + 2 * eyeWidth;
      t++;
    }
    startX = 1.5 * orizontalSpace + 2 * eyeWidth;
    startY = startY + 2 * (verticalSpace + 2 * eyeHeight);
  }
}

//create the function that allows to change a random eye's pupil color when the mouse is clicked
function mouseClicked() {
  rando = round(random(0, pupils.length - 1));
  for (let i = 0; i < pupils.length; i++) {
    if (rando != i) {
      pupils[i].colore = "black";
    } else {
      pupils[i].colore = "red";
    }
  }
}
