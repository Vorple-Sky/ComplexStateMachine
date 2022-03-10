/*******************************************************************************************************************
    Complex State Machine
    by Hannah Gabany
 
  Color Palette Values:

  Black: #031927
  Dark blue: #3ED8D2
  Cream: #FFF689
  Sizzling Red: #F2545B
  yellow: #E9D6EC
*********************************************************************************************************************/

var complexStateMachine;           // the ComplexStateMachine class
var clickablesManager;             // our clickables manager
var clickables;   
var gDebugMode = false;            // an array of clickable objects

var currentStateName = "";
var moodImage;

var bkColor = '#031927';
var textColor = '#E9D6EC';

var displayPecentages = true; //double check if nessicary
var displayHorizontalBars = true;

var xLeftMargin = 50;     // for percentages
var xBarOffset = 30;
var yTopMargin = 50;
var yOffset = 50;
var xOffset = 50;
var barWidth = 30;
var barSpacing = 50;

var happyScores = [];
const FranciscoH = 0;
const PamelaH = 1;
const PierreH = 2;
const StaceyH = 3;

var moneyScores = [];
const FranciscoM = 0;
const PamelaM = 1;
const PierreM = 2;
const StaceyM = 3;

var buttonFont;

const nextIndex = 0;

var nextImg;
var nextHoverImg;

function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  complexStateMachine = new ComplexStateMachine("data/interactionTable.csv", "data/clickableLayout.csv");

  buttonFont = loadFont('assets/CourierPrime-Bold.ttf');

  nextImg  = loadImage("assets/next.png");
  nextHoverImg = loadImage("assets/next_hover.png");
}

// Setup code goes here
function setup() {
  createCanvas(1280, 720);
  imageMode(CENTER);
  text(CENTER);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // setup the state machine with callbacks
  complexStateMachine.setup(clickablesManager, setImage, stateChanged);

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  console.log("happyScores = ");
  console.log(happyScores);
  console.log("moneyScores = ");
  console.log(moneyScores);
  initializeScores();

 }


// Draw code goes here
function draw() {
  drawBackground();
  drawImage();
  drawOther();
  drawUI();
  
  //
  if(currentStateName === "FranciscoGo1" ){
   drawPercentages();
  }
  if(currentStateName === "FranciscoGo2" ){
    drawPercentages();
  }
  if(currentStateName === "PamelaGo1" ){
    drawPercentages();
  }
  if(currentStateName === "PamelaGo2" ){
    drawPercentages();
  }
  if(currentStateName === "PierreGo1" ){
    drawPercentages();
  }
  if(currentStateName === "PierreGo2" ){
    drawPercentages();
  }
  if(currentStateName === "StaceyGo1" ){
    drawPercentages();
  }
  if(currentStateName === "StaceyGo2" ){
    drawPercentages();
  }

  if(gDebugMode == true ){
    drawDebugInfo();
  }
}


function keyTyped(){
  if(key === ' '){
    gDebugMode = !gDebugMode;
  }
}

//debug function
function drawDebugInfo(){
  fill(225);
  text("X: " + mouseX + "  Y:" + mouseY, 20, height - 20);
}

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].textFont = loadFont('assets/CourierPrime-Bold.ttf');
    clickables[i].textSize =textSize(24);
    clickables[i].width = 220;
  }

  clickables[0].drawImageOnly = true;
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#EE964B";
  this.noTint = false;
  this.tint = "#FF0000";

  if( this.id === nextIndex ) {
    this.setImage(nextHoverImg);
  } 
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#F4D35E";

  if( this.id === nextIndex ) {
    this.setImage(nextImg);
  } 
}

clickableButtonPressed = function() {
  complexStateMachine.clickablePressed(this.name);
}

// this is a callback, which we use to set our display image
function setImage(imageFilename) {
  moodImage = loadImage(imageFilename);
} 

// this is a callback, which we can use for different effects
function stateChanged(newStateName) {
    currentStateName = newStateName;
    console.log(currentStateName);

    //Good for model and textile worker
    if(newStateName === "FranciscoAs1"){
      happyScores[FranciscoH] -= 10;
      moneyScores[FranciscoM] += 10;
      happyScores[PamelaH] -= 10;
      moneyScores[PamelaM] += 10;
      happyScores[PierreH] += 5;
      moneyScores[PierreM] += 15;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] += 0;
    }
    //good for most 
    if(newStateName === "FranciscoAs2"){
      happyScores[FranciscoH] += 10;
      moneyScores[FranciscoM] -= 15;
      happyScores[PamelaH] += 10;
      moneyScores[PamelaM] += 10;
      happyScores[PierreH] += 5;
      moneyScores[PierreM] += 0;
      happyScores[StaceyH] += 10;
      moneyScores[StaceyM] += 0;
    }
    //good for pierre
    if(newStateName === "FranciscoAs3"){
      happyScores[FranciscoH] -= 10;
      moneyScores[FranciscoM] -= 5;
      happyScores[PamelaH] -= 10;
      moneyScores[PamelaM] -= 5;
      happyScores[PierreH] += 5;
      moneyScores[PierreM] += 20;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] -= 10;
    }
    //good for Francisco
    if(newStateName === "FranciscoAs4"){
      happyScores[FranciscoH] += 15;
      moneyScores[FranciscoM] += 15;
      happyScores[PamelaH] -= 5;
      moneyScores[PamelaM] += 10;
      happyScores[PierreH] += 0;
      moneyScores[PierreM] += 0;
      happyScores[StaceyH] += 0;
      moneyScores[StaceyM] -= 10;
    }
    //good for pierre
    if(newStateName === "FranciscoAs5"){
      happyScores[FranciscoH] -= 10;
      moneyScores[FranciscoM] += 10;
      happyScores[PamelaH] -= 10;
      moneyScores[PamelaM] += 10;
      happyScores[PierreH] += 5;
      moneyScores[PierreM] += 15;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] += 0;
    }
    //bad for almost everyone
    if(newStateName === "FranciscoAs6"){
      happyScores[FranciscoH] += 10;
      moneyScores[FranciscoM] += 5;
      happyScores[PamelaH] += 0;
      moneyScores[PamelaM] += 0;
      happyScores[PierreH] -= 15;
      moneyScores[PierreM] -= 15;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] -= 5;
    }
    //not great for anyone
    if(newStateName === "PamelaAs1"){
      happyScores[FranciscoH] -= 10;
      moneyScores[FranciscoM] += 0;
      happyScores[PamelaH] -= 10;
      moneyScores[PamelaM] += 0;
      happyScores[PierreH] += 0;
      moneyScores[PierreM] += 0;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] += 0;
    }
    //Good for model 
    if(newStateName === "PamelaAs2"){
      happyScores[FranciscoH] += 5;
      moneyScores[FranciscoM] += 0;
      happyScores[PamelaH] += 15;
      moneyScores[PamelaM] += 10;
      happyScores[PierreH] -= 10;
      moneyScores[PierreM] -= 10;
      happyScores[StaceyH] += 10;
      moneyScores[StaceyM] += 0;
    }
    //not great for anyone
    if(newStateName === "PamelaAs3"){
      happyScores[FranciscoH] -= 10;
      moneyScores[FranciscoM] += 0;
      happyScores[PamelaH] -= 10;
      moneyScores[PamelaM] += 0;
      happyScores[PierreH] += 0;
      moneyScores[PierreM] += 0;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] += 0;
    }
    //not good for model or designer
    if(newStateName === "PamelaAs4"){
      happyScores[FranciscoH] -= 10;
      moneyScores[FranciscoM] += 0;
      happyScores[PamelaH] -= 20;
      moneyScores[PamelaM] -= 10;
      happyScores[PierreH] -= 5;
      moneyScores[PierreM] -= 10;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] += 0;
    }
    //not great for anyone
    if(newStateName === "PamelaAs5"){
      happyScores[FranciscoH] += 0;
      moneyScores[FranciscoM] += 0;
      happyScores[PamelaH] -= 15;
      moneyScores[PamelaM] -= 10;
      happyScores[PierreH] += 0;
      moneyScores[PierreM] -= 5;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] += 5;
    }
    //not great for anyone
    if(newStateName === "PamelaAs6"){
      happyScores[FranciscoH] -= 5;
      moneyScores[FranciscoM] -= 5;
      happyScores[PamelaH] += 10;
      moneyScores[PamelaM] += 10;
      happyScores[PierreH] += 5;
      moneyScores[PierreM] += 5;
      happyScores[StaceyH] += 5;
      moneyScores[StaceyM] += 0;
    }
    //good for low income and worker
    if(newStateName === "PierreAs1"){
      happyScores[FranciscoH] -= 5;
      moneyScores[FranciscoM] += 0;
      happyScores[PamelaH] -= 5;
      moneyScores[PamelaM] += 0;
      happyScores[PierreH] += 5;
      moneyScores[PierreM] += 10;
      happyScores[StaceyH] += 5;
      moneyScores[StaceyM] += 5;
    }
    //Okay for everyone
    if(newStateName === "PierreAs2"){
      happyScores[FranciscoH] += 5;
      moneyScores[FranciscoM] += 0;
      happyScores[PamelaH] += 5;
      moneyScores[PamelaM] += 0;
      happyScores[PierreH] += 5;
      moneyScores[PierreM] += 5;
      happyScores[StaceyH] += 5;
      moneyScores[StaceyM] -= 5;
    }
    //really good for pierre
    if(newStateName === "PierreAs3"){
      happyScores[FranciscoH] -= 5;
      moneyScores[FranciscoM] -= 5;
      happyScores[PamelaH] -= 5;
      moneyScores[PamelaM] += 0;
      happyScores[PierreH] += 10;
      moneyScores[PierreM] += 15;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] += 5;
    }
    //good for most
    if(newStateName === "PierreAs4"){
      happyScores[FranciscoH] += 5;
      moneyScores[FranciscoM] += 5;
      happyScores[PamelaH] += 5;
      moneyScores[PamelaM] += 5;
      happyScores[PierreH] += 10;
      moneyScores[PierreM] += 5;
      happyScores[StaceyH] += 5;
      moneyScores[StaceyM] -= 10;
    }
    //split
    if(newStateName === "PierreAs5"){
      happyScores[FranciscoH] += 10;
      moneyScores[FranciscoM] += 0;
      happyScores[PamelaH] += 10;
      moneyScores[PamelaM] += 0;
      happyScores[PierreH] -= 15;
      moneyScores[PierreM] -= 15;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] -= 5;
    }
    //good for all
    if(newStateName === "PierreAs6"){
      happyScores[FranciscoH] += 5;
      moneyScores[FranciscoM] += 5;
      happyScores[PamelaH] += 5;
      moneyScores[PamelaM] += 5;
      happyScores[PierreH] += 10;
      moneyScores[PierreM] += 10;
      happyScores[StaceyH] += 5;
      moneyScores[StaceyM] += 0;
    }
    //okay for all
    if(newStateName === "StaceyAs1"){
      happyScores[FranciscoH] += 5;
      moneyScores[FranciscoM] += 5;
      happyScores[PamelaH] += 5;
      moneyScores[PamelaM] += 5;
      happyScores[PierreH] += 0;
      moneyScores[PierreM] += 0;
      happyScores[StaceyH] += 10;
      moneyScores[StaceyM] -= 5;
    }
    //not good
    if(newStateName === "StaceyAs2"){
      happyScores[FranciscoH] -= 5;
      moneyScores[FranciscoM] -= 5;
      happyScores[PamelaH] -= 5;
      moneyScores[PamelaM] += 0;
      happyScores[PierreH] += 5;
      moneyScores[PierreM] += 10;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] -= 5;
    }
    //only effects stacey
    if(newStateName === "StaceyAs3"){
      happyScores[FranciscoH] += 0;
      moneyScores[FranciscoM] += 0;
      happyScores[PamelaH] += 0;
      moneyScores[PamelaM] += 0;
      happyScores[PierreH] += 0;
      moneyScores[PierreM] += 0;
      happyScores[StaceyH] -= 5;
      moneyScores[StaceyM] += 5;
    }
    //only good for pierre
    if(newStateName === "StaceyAs4"){
      happyScores[FranciscoH] -= 5;
      moneyScores[FranciscoM] += 0;
      happyScores[PamelaH] -= 5;
      moneyScores[PamelaM] += 0;
      happyScores[PierreH] += 5;
      moneyScores[PierreM] += 10;
      happyScores[StaceyH] += 5;
      moneyScores[StaceyM] -= 5;
    }
    //good for most
    if(newStateName === "StaceyAs5"){
      happyScores[FranciscoH] += 10;
      moneyScores[FranciscoM] += 5;
      happyScores[PamelaH] += 10;
      moneyScores[PamelaM] += 5;
      happyScores[PierreH] += 0;
      moneyScores[PierreM] += 0;
      happyScores[StaceyH] += 15;
      moneyScores[StaceyM] -= 5;
    }
    //Bad or neutral for most
    if(newStateName === "StaceyAs6"){
      happyScores[FranciscoH] -= 5;
      moneyScores[FranciscoM] += 0;
      happyScores[PamelaH] -= 5;
      moneyScores[PamelaM] += 0;
      happyScores[PierreH] += 0;
      moneyScores[PierreM] += 10;
      happyScores[StaceyH] -= 15;
      moneyScores[StaceyM] += 5;
    }
    

    console.log(happyScores);
    console.log(moneyScores);
} 




//==== MODIFY THIS CODE FOR UI =====/

function drawBackground() {
  background(color(bkColor));
}

function initializeScores() {
  moneyScores = [50,50,50,50];
  happyScores = [50,50,50,50];
  console.log(happyScores);
  console.log(moneyScores);
}

function drawImage() {
  if( moodImage !== undefined ) {
    image(moodImage, width/2, height/2);
  }  
}

function drawOther() {
  push();

  pop();
}

function drawPercentages() {
  fill(0);
  textSize(20);
  textFont('assets/CourierPrime-Bold.ttf');
  for( let i = 0; i < happyScores.length; i++ ) {
    text( Math.round(happyScores[i]) + "%", 616, 407 + (i*xOffset));
  }
  for( let i = 0; i < moneyScores.length; i++ ) {
    text( Math.round(moneyScores[i]) + "%", 680, 407 + (i*xOffset));
  }
  text("Francisco",525,407);
  text("Pamela",525,457);
  text("Pierre",525,507);
  text("Stacey",525,557);
  text("H:",623,381);
  text("M:",690,381);
  
}

//-- right now, it is just the clickables
function drawUI() {
  push();
  imageMode(CORNER);
  clickablesManager.draw();
  pop();
}
