
//main variables
let onMainScreen=true;
let onJobLevel=false;
let onRehearsalLevel=false;
let onEnduranceLevel=false;
let onFinalLevel=false;
let acceptedTriggered=false;
let mainBGMusic;

//======================================

//main screen variables
let currentLevel=1;
let xRect=0;
let moveRect=10;
let moveDirection=1;
let levelBox1,levelBox2,levelBox3,levelBox4;
let levelBoxes=[];

//======================================

//job level variables
let computer;
let check;
let check1,check2,check3,check4,check5,check6;
let computerSource="computerScreen.png";
let checkSource="check.png";
let jobBGMusic;
let goodTab;
let badTab;
let startingBrowser;
let goodBrowser;
let badBrowser;
let goStartingBrowser=true;
let goGoodBrowser=false;
let goBadBrowser=false;
let acceptedApp=false;

//======================================

//rehearsal level variables
let numNotes=2;
let activeNotes=numNotes;
let levelNum=1;
let notes=[];
let directorBox,costumesBox,propsBox,setBox;
let noteBoxes=[];
let noteTypes=["Director","Costumes","Props","Set"];
let noteTypeChoice=0;
let activeNote=null;
let correctPoints=0;
let gameStarted=false;
let gameOverWin=false;
let gameOverLose=false;
let gachaBGMusic;
let dingSound;

  //timer stuff
let totalCountdown=40;
let startTimer;
let decreaseTimer=0;

  //ui Start and End Screen
let uiScreen;

//======================================

//endurance level variables
let redBullets=[];
let blueBullets=[];
let numCoffee=1;
let numBullets=9;
let bulletScene = 0;
let bulletSpeed;
let hero1;
let theStaminaBar;
let bulletGameStarted=false;
let loseSoundPlayed=false;
let winSoundPlayed=false;

  //bullet pics and music
let depressionSource="sad.png";
let coffeeSource="cof.png";
let depression, coffee, nyanBGMusic, coffeeSlurp, hurtSound, winSound, loseSound;

  //bullet timer stuff
let bulletTotalCountdown=45;
let bulletStartTimer;
let bulletDecreaseTimer=0;
let speedIncreased=false;

//======================================

//final level variables
let moneySource="money.png";
let emptyWalletSource="emptyWallet.png";
let filledWalletSource="filledWallet.png";
let moneyImage, emptyWallet, filledWallet;
let theMoney, theWallet;
let walletFilled=false;
let moneyPaid=false;
let rentDue=1356;
let finalBGMusic;

//======================================


function preload(){
  //main screen preload
  mainBGMusic=loadSound("lobby.mp3");

  //job level preload

    computer=loadImage(computerSource);
    check=loadImage(checkSource);
    jobBGMusic=loadSound("scaryOpera.mp3");
    

  //rehearsal level preload
    gachaBGMusic=loadSound("gacha.mp3");
    dingSound=loadSound("ding.mp3");

  //endurance level preload
    depression=loadImage(depressionSource)
    coffee=loadImage(coffeeSource);
    nyanBGMusic=loadSound("nyanCat.mp3");
    coffeeSlurp=loadSound("slurpingSound.mp3");
    hurtSound=loadSound("oofSound.mp3");
    winSound=loadSound("win.mp3");
    loseSound=loadSound("lose.mp3");

    //final level preload
    moneyImage=loadImage(moneySource);
    emptyWallet=loadImage(emptyWalletSource);
    filledWallet=loadImage(filledWalletSource);
    finalBGMusic=loadSound("bubblegumKK.mp3");
}

function setup() {
  createCanvas(400, 400);
  resetSetup(); //ITS THE LAST FUNCTION AT THE BOTTOM

}


function draw() {
  //draw for MainScreen=================================
  if (onMainScreen){
    clear();
    background(220);
  
    //invisible moving Rect
    xRect += moveRect * moveDirection;

    if (xRect > width - 10 || xRect < 0) {
      moveDirection *= -1; // reverse direction
    }
    
    rect(xRect,200,10,10);
    
    //BG and title
    push();
    fill("grey");
    rect(0,0,400,400);
    fill(255);
    rect(25,25,350,350);
    textSize(26);
    fill(0);
    text("Stage Management?",83,55);
    textSize(29);
    text("Challenge Accepted.",68,90);
    line(50,101,350,101);
    textAlign(CENTER);
    fill(0);
    textSize(15);
    text("Created by: Taylor Bertman",200,360);
    pop();
    
    //level boxes
    push();
    strokeWeight(3);
    line(200,127,200,332);
    pop();
    levelBoxes.forEach(levelBox => levelBox.display());
    levelBoxes.forEach(levelBox => levelBox.levelCompleted());
    
    whichLevel();    

  }

  //draw for Job level=====================================
  if (onJobLevel){
    background(0);

    //job scene
    push();
    image(computer,-15,-20);
    goodTab.display();
    badTab.display();
    goodTab.update();
    badTab.update();
    rect(37,70,330,260);
    pop();

    //draws whatever is the current browser
    browser.display();

  }

  //draw for rehearsal Level=================================
  if (onRehearsalLevel){
    background(170);
  
    noteBoxes.forEach(noteBox=>{
      noteBox.display();
    })
    
    for (let i=0;i<numNotes;i++){
      notes[i].display();
    }
    
    //timer and correct notes
    push();
    textSize(25);
    fill(255);
    stroke(0);
    strokeWeight(3);
    text("Time: ",153,70);
    //timer text
    text(decreaseTimer,220,70);
    text("Notes  ",148,323);
    textSize(25);
    text("Score:  ",148,350);
    //score text
    textSize(30);
    text(correctPoints.toString(),225,352);
    pop();
    
      //more timer shit
    if (gameStarted){
      let timePassing=int((millis()-startTimer)/1000).toFixed(1);
      decreaseTimer=totalCountdown-timePassing;
    }else if (!gameStarted){
      uiScreen.display();
    }
    
    
    if (decreaseTimer <= 0 && gameStarted) {
    decreaseTimer = 0;
    gameStarted = false;
    
      if (correctPoints >= 25) {
        gameOverWin = true;
        if (!winSoundPlayed){
          winSound.play();
          winSoundPlayed=true;
        }
      } else {
        gameOverLose = true;
        if (!loseSoundPlayed){
          loseSound.play();
          loseSoundPlayed=true;
        }
      }
    }
  }
    
  //draw for endurance level=================================
  if (onEnduranceLevel){
    if (bulletScene==0){
      background(0);
      redBullets.forEach(coffee => coffee.display());
      blueBullets.forEach(bullet => bullet.display());
      redBullets.forEach(coffee => coffee.update());
      blueBullets.forEach(bullet => bullet.update());
      
      push();
      stroke("red");
      textAlign(CENTER);
      fill(255,255,255,100);
      rect(200,200,300,300);
      fill(255);
      strokeWeight(1);
      textSize(20);
      text("Press Space to Start",200,330);
      line(60,150,340,150);
      textSize(25);
      text("Welcome to the",200,100);
      textSize(29);
      text("Endurance Challenge",200,133);
      line(60,145,340,145);
      textSize(15);
      text("Now that you've reached the show period,",200,170);
      text("all you've got to do is endure the run!",200,190);
      text("Use WASD to avoid the depression,",200,240);
      text("or grab the coffee to regenerate stamina!",200,260);
      text("Endure under the timer runs out to win!",200,300);
      pop();
      
    }
    if(bulletScene == 1 ){
      background(0);
      hero1.display();
      hero1.update();
      
      redBullets.forEach((coffee)=>{
        coffee.update();
        if(dist(coffee.x,coffee.y,hero1.x,hero1.y) < hero1.size/2 + coffee.size/2*0.8){
          theStaminaBar.addHealth(15);
          coffee.resetBullet();
        }
        coffee.display();
      })
      blueBullets.forEach((bullet)=>{
        bullet.update();
        if(dist(bullet.x,bullet.y,hero1.x,hero1.y) < hero1.size/2 + bullet.size/2*0.8){
          theStaminaBar.decreaseHealth(20);
          // print(theStaminaBar.currentHealth);
          bullet.resetBullet();
        }
        bullet.display();
      })
    
    //timer and correct notes
    push();
    textAlign(CENTER);
    textSize(20);
    fill(255);
    stroke("rgb(75,229,236)");
    strokeWeight(3);
    text("Time: ",40,40);
    //timer text
    text(bulletDecreaseTimer,80,40);
    pop();

    //more timer shit
    if (bulletGameStarted){
      let bulletTimePassing = floor((millis() - bulletStartTimer) / 1000);
      bulletDecreaseTimer = max(0, bulletTotalCountdown - bulletTimePassing);
    }
    if (bulletDecreaseTimer <1 && hero1.alive)     {
      bulletScene = 3;
    }
    
    // increase da speed
    if (bulletDecreaseTimer > 0 && bulletDecreaseTimer<45 && bulletDecreaseTimer % 15 == 0 && !speedIncreased) {
      redBullets.forEach(coffee => coffee.addSpeed());
      blueBullets.forEach(bullet => bullet.addSpeed());
      // Add one coffee
      redBullets.push(new Bullet(0));
      speedIncreased=true;
    }if (bulletDecreaseTimer%15!=0){
      speedIncreased=false;
    }
    
    //heath/stamina bar
    theStaminaBar.display();
    
    if (theStaminaBar.currentHealth<11){
      bulletScene=2;
    }
    
    }if(bulletScene == 2){
        if (!loseSoundPlayed) {
      loseSound.play();
      loseSoundPlayed = true;
    }
    push();
    noStroke();
    textAlign(CENTER);
    background(0, 5);
    stroke(1);
    fill(255, 255, 255, 100);
    rect(200, 200, 200, 100);
    textSize(20);
    fill("rgb(0,233,255)");
    text("YOU PASSED OUT!", 200, 185);
    textSize(16);
    noStroke();
    fill("red");
    text("Seems like a Skill Issue...",200,210);
    text("Press Space to Restart",200,235);
    pop();
  }
    if(bulletScene == 3){ 
        if (!winSoundPlayed){
          winSound.play();
          winSoundPlayed=true;
        }
      push();
      noStroke();
      textAlign(CENTER);
      background(0, 5);
      stroke(1);
      fill(255, 255, 255, 100);
      rect(200, 200, 200, 100);
      textSize(23);
      fill("rgb(0,233,255)");
      text("YOU SURVIVED!", 200, 190);
      textSize(14);
      fill("red");
      noStroke();
      text("You ended on a good note!",200,215);
      text("Press Space for Main Screen",200,235);
      pop();
    }
  }


  //draw for final level=====================================
  if (onFinalLevel){
    background("rgb(188,224,255)");
  
    theWallet.display();
    theMoney.display();
    
    push();
    textAlign(CENTER);
    textSize(22);
    text("Good job! You finally reached the end!",200,45);
    textSize(23);
    text("NOW COLLECT THAT MONEY!",200,80);
    text("Total Money:",265,275);
    displayFinalText();
    pop();
  }

}





function mousePressed(){
//main screen mousePress===================================
if (onMainScreen){
  levelBoxes.forEach(levelBox => levelBox.changeScene());
}
  
//jobLevel mousePress======================================
  if (onJobLevel){
    goodTab.mousePressed();
    badTab.mousePressed();
    if (goodTab.mousePressed()){
      goGoodBrowser=true;
      goBadBrowser=false;
      goStartingBrowser=false;
      goodTab.active=true;
      badTab.active=false;
      browser=new jobBrowser(1,65,90,278);
      
    }
    if (badTab.mousePressed()){
      goBadBrowser=true;
      goGoodBrowser=false;
      goStartingBrowser=false;
      goodTab.active=false;
      badTab.active=true;
      browser=new jobBrowser(2,65,90,278);
    }
  }

  //rehearsal level mousePress================================
  if (onRehearsalLevel){
      if (!gameStarted) {
        uiScreen.uiButtonClick();
      }
    for (let i=notes.length -1;i>=0;i--){
      if(notes[i].inBubble(mouseX,mouseY) && !notes[i].gone){
        activeNote=notes[i];
        activeNote.startDrag();
        break;
      }
    }
  }

  //FINAL LEVEL MOUSE PRESS===================================
  if (onFinalLevel){
    if (theMoney.inMouse(mouseX,mouseY) && !theMoney.gone){
    theMoney.startDrag();
    }if (walletFilled){
      if (mouseX>30 && mouseX<190 && mouseY>200 && mouseY<235){
        walletFilled=false;
        moneyPaid=true;
        rentDue-=100;
        hurtSound.play();
      }
    }
  }
  
}

//rehersal level and final level dragged and release==========================
function mouseDragged(){
  if (onRehearsalLevel && gameStarted){
    if (activeNote){
      activeNote.dragNote();
    }
  }
  if (onFinalLevel){
    theMoney.dragMoney();
  }
}
function mouseReleased(){
  if (onRehearsalLevel && gameStarted){
    if (activeNote){
      activeNote.stopMove();
      activeNote=null;
    }
  }
  if (onFinalLevel){
    theMoney.stopMove();
  }
}

//========================ENDURNACE LEVEL  AND FINAL LEVEL KEY PRESS SHIT
function keyPressed(){
  if (onEnduranceLevel){
    if (key === " ") {
      if (bulletScene === 0) {
        // Start the endurance run
        resetBulletGame();
        bulletScene = 1;
        bulletGameStarted = true;
        bulletStartTimer = int(millis());
      } else if (bulletScene === 2) {
        // Lose --> go back to bullet scene 0 so restart
        bulletScene = 0;
        resetBulletGame();
        bulletGameStarted = false;
      } else if (bulletScene === 3) {
        //win --> next level and return to main screen
        nextLevel();
        onEnduranceLevel = false;
        onMainScreen = true;
        //set mainBGMusic
        if (!mainBGMusic.isPlaying()) {
          mainBGMusic.loop();
        }
        bulletGameStarted = false;
        //reset some variables so no spooky town shit
        xRect = 0;
        rectMode(CORNER);
        moveDirection = 1;
        // stroke(0);
        // fill(0);
        // noStroke();
        // stop background music
        if (nyanBGMusic && nyanBGMusic.isPlaying && nyanBGMusic.isPlaying()) {
          nyanBGMusic.stop();
        }
        // reset win/lose flags so next time is clean
        winSoundPlayed = false;
        loseSoundPlayed = false;
        // reset bullet scene so it's ready next time
        bulletScene = 0;
      }
    }
  }
  if (onFinalLevel){
    if (moneyPaid){
      if (key === " "){
        print("STARTING OVER");
        resetGame();
      }
    }
  }
}

//=====================MAIN SCREEN CLASSES AND FUNCTIONS=======================
class levelBox{
  constructor(x,y,textX,levelTitle,whichLevel){
    this.x=x;
    this.y=y;
    this.textX=textX;
    this.levelTitle=levelTitle;
    this.fill=255;
    this.whichLevel=whichLevel
  }display(){
    push();
    fill(this.fill);
    rect(this.x,this.y,310,40);
    fill(0);
    textSize(20);
    text(this.levelTitle,this.textX,this.y+27);
    pop();
  }changeScene(){
    if (currentLevel==this.whichLevel){
      if (mouseX>this.x && mouseX<this.x+310 && mouseY>this.y && mouseY<this.y+40){
          if  (this.whichLevel==1){
            print("Going to job level");
            onJobLevel=true;
            onMainScreen=false;
            if (mainBGMusic && mainBGMusic.isPlaying && mainBGMusic.isPlaying()) {
              mainBGMusic.stop();
            }
            //set music
            if (!jobBGMusic.isPlaying()) {
              jobBGMusic.loop();
            }
            winSound.setVolume(3);
            hurtSound.setVolume(2);
          }else if (this.whichLevel==2){
            print("going to rehearsal level");
            onRehearsalLevel=true;
            onMainScreen=false;
            if (mainBGMusic && mainBGMusic.isPlaying && mainBGMusic.isPlaying()) {
              mainBGMusic.stop();
            }
            //set music
            if (!gachaBGMusic.isPlaying()) {
              gachaBGMusic.loop();
            }
            dingSound.setVolume(.5);
            hurtSound.setVolume(1);
          }else if (this.whichLevel==3){
            print("going to endurance level")
            onEnduranceLevel=true;
            onMainScreen=false;
            if (mainBGMusic && mainBGMusic.isPlaying && mainBGMusic.isPlaying()) {
              mainBGMusic.stop();
            }
            //set music and rect mode
            rectMode(CENTER);
            if (!nyanBGMusic.isPlaying()) {
              nyanBGMusic.loop();
            }
            hurtSound.setVolume(5);
            coffeeSlurp.setVolume(5);
            winSound.setVolume(5);
            loseSound.setVolume(5);
          }else if (this.whichLevel==4){
            print("going to final level");
            onFinalLevel=true;
            onMainScreen=false;
            if (mainBGMusic && mainBGMusic.isPlaying && mainBGMusic.isPlaying()) {
              mainBGMusic.stop();
            }
            //set music
            if (!finalBGMusic.isPlaying()) {
              finalBGMusic.loop();
            }
          }
        }
      }else if (currentLevel!=this.whichLevel){
        print("NO NOT THERE BITCH");
        return
      }
    }isActive(){
    if (currentLevel==this.whichLevel){
      if (moveDirection==-1){
        this.fill=255;
      }else{
        this.fill=220;
      }
    }
  }levelCompleted(){
    if (currentLevel>this.whichLevel){
      this.fill=220;
    }
  }
}
//handles what level is actively blinking
function whichLevel(){ 
  if (currentLevel==1){
    levelBox1.isActive();
  }
  if (currentLevel==2){
    levelBox2.isActive();
  }
  if (currentLevel==3){
    levelBox3.isActive();
  }
  if (currentLevel==4){
    levelBox4.isActive();
  }
}

function nextLevel(){
  currentLevel+=1;
}




//======================JOB LEVEL FUNCTIONS AND CLASSES========================
class jobBrowser{
  constructor(whichBrowser,x,y,width){
    this.whichBrowser=whichBrowser;
    this.x=x;
    this.y=y;
    this.width=width;
  }
  display(){
    if(this.whichBrowser==0){
      push();
      fill(0);
      textSize(20);
      text("You want find job?",120,170);
      text("Click tab to find job.",115,200);
      text("...Good luck",140,230);
      pop();
    }
    else if (this.whichBrowser==1){
      push();
      //boxes
      stroke("green");
      fill("#90EE90");
      rect(54,81,300,220);
      fill(255);
      stroke(0);
      rect(this.x,this.y,this.width,55);
      rect(this.x,this.y+70,this.width,55);
      rect(this.x,this.y+140,this.width,55);
      noStroke();
      fill(0);
      textSize(12);
      text("Good Job 1:",this.x+5,this.y+15);
      text("Good Job 2:",this.x+5,this.y+85);
      text("Good Job 3:",this.x+5,this.y+155);
      text("Are you Qualified?: ",80,128);
      text("Are you Qualified?: ",80,198);
      text("Are you Qualified?: ",80,268);
      check1.checkDisplay();
      check1.checkUpdate();
      check2.checkDisplay();
      check2.checkUpdate();
      check3.checkDisplay();
      check3.checkUpdate();
      check1.buttonUpdate();
      check2.buttonUpdate();
      check3.buttonUpdate();
      textSize(10);
      text("Pays liveable Wage | Hours: Normal",this.x+75,this.y+14.5);
      text("Pays liveable Wage | Hours: Normal",this.x+75,this.y+84.5);
      text("Pays liveable Wage | Hours: Normal",this.x+75,this.y+154.5);
      textSize(8.5);
      text("We offer great jobs here! Make a living as a Stage Manager! Yipee!",74,295);
      pop();
    }
    else if (this.whichBrowser==2){
      push();
      stroke("red");
      fill("#FFCCCB");
      rect(54,81,300,220);
      fill(255);
      stroke(0);
      rect(this.x,this.y,this.width,55);
      rect(this.x,this.y+70,this.width,55);
      rect(this.x,this.y+140,this.width,55);
      noStroke();
      fill(0);
      textSize(12);
      text("Meh Job 1:",this.x+5,this.y+15);
      text("Meh Job 2:",this.x+5,this.y+85);
      text("Meh Job 3:",this.x+5,this.y+155);
      text("Are you Qualified?: ",80,128);
      text("Are you Qualified?: ",80,198);
      text("Are you Qualified?: ",80,268);
      check4.checkDisplay();
      check4.checkUpdate();
      check5.checkDisplay();
      check5.checkUpdate();
      check6.checkDisplay();
      check6.checkUpdate();
      check4.buttonUpdate();
      check5.buttonUpdate();
      check6.specialButtonUpdate();
      textSize(9);
      text("Pays $100 total | Hours: Every Waking Moment.",this.x+70,this.y+14.5);
      text("Pays $100 total | Hours: Every Waking Moment.",this.x+70,this.y+84.5);
      text("Pays $100 total | Hours: Every Waking Moment.",this.x+70,this.y+154.5);
      textSize(8.5);
      text("We offer jobs here. Are they great? no. Are they bad? Perchance...",78,295);
      pop();
    }

  }
}

class jobTab{
  constructor(x,width,text,fill){
    this.x=x;
    this.width=width;
    this.text=text;
    this.fill=fill;
    this.active=false;
  }
  display(){
    push();
    if (this.active){
      fill(200);  
    }else{
      fill(this.fill);
    }
    rect(this.x,50,this.width,30);
    fill(0);
    text(this.text,this.x+5,64);
    pop();
  }
  update(){
    if (!this.active){
      if(mouseX>this.x && mouseX<this.x+this.width && mouseY>50 && mouseY<80){
      this.fill=220;
      }else{
        this.fill=255;
      }
    }
  }
  mousePressed(){
    if (mouseX>this.x && mouseX<this.x+this.width && mouseY>50 && mouseY<80){
      this.fill=200;
      return true;
    }
    return false;
  }

}

class checkQualified{
  constructor(x,y,applyButtonFill,applyText){
    this.x=x;
    this.y=y;
    this.boxSize=10;
    this.applyBoxSize=70;
    this.checkActive=false;
    this.buttonVisible=false;
    this.applyFill=applyButtonFill;
    this.applyText=applyText;
  }checkDisplay(){
    push();
    fill(255);
    stroke(0);
    strokeWeight(1);
    square(this.x,this.y,this.boxSize);
    if (this.checkActive){
      image(check,this.x-2,this.y-2,this.boxSize+6,this.boxSize+6);
      this.buttonDisplay();
    }
    pop();
  }checkUpdate(){
    if(mouseIsPressed){
      if(mouseX>this.x && mouseX<this.x+this.boxSize &&
        mouseY>this.y && mouseY<this.y+this.boxSize){
        this.checkActive=true;
      }
    }
  }
  buttonDisplay(){
    push();
    fill(this.applyFill)
    rect(this.x+40,this.y,70,15);
    fill(0);
    textSize(10);
    noStroke();
    text(this.applyText,this.x+60,this.y+10);
    this.buttonVisible=true;
    pop();

  }buttonUpdate(){
    if(this.buttonVisible==true){
      if (mouseIsPressed){
        if(mouseX>this.x+40 && mouseX<this.x+40+this.applyBoxSize &&
        mouseY>this.y && mouseY<this.y+15){
          this.applyFill="#ff3632ff";
          this.applyText="Rejected :)";
          hurtSound.play();
        }
      }
    }
  }
    specialButtonUpdate() {
    if (this.buttonVisible == true) {
      if (mouseIsPressed && !this.acceptedTriggered) {
        if (
          mouseX > this.x + 40 &&
          mouseX < this.x + 40 + this.applyBoxSize &&
          mouseY > this.y &&
          mouseY < this.y + 15
        ) {
          this.applyFill = "#32dc07ff";
          this.applyText = "Accepted!";
          playWinSound();
          acceptedApp = true;
          this.acceptedTriggered = true;

          setTimeout(() => {
            nextLevel();
            // stop background music
            if (jobBGMusic && jobBGMusic.isPlaying && jobBGMusic.isPlaying()) {
              jobBGMusic.stop();
            }
            onMainScreen = true;
            if (!mainBGMusic.isPlaying()) {
              mainBGMusic.loop();
            }
            onJobLevel = false;
          }, 1000);
        }
      }
    }
  }
}

//===========================REHEARSAL LEVEL CLASSES===============

class chatBox{
  constructor(x,y,noteType){
    this.x=x;
    this.y=y;
    this.noteType=noteType;
    this.gone=false;
    this.canMove=false;
    
  }display(){
    if (this.gone) return;
      push();
      noStroke();
      fill(255);
      ellipse(this.x, this.y, 150, 100);
      triangle(this.x - 54, this.y + 32, this.x - 70, this.y + 52, this.x - 23, this.y + 43);
      fill(0);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(this.noteType + " Note", this.x, this.y);
      pop();
    
  }inBubble(mX,mY){
    
    return mX>this.x-75 && mX <this.x+75 && mY>this.y-50 && mY<this.y+50;
    
  }startDrag(){
    this.canMove=true;
    }dragNote(){
    if (this.canMove){
      this.x=mouseX;
      this.y=mouseY;
    }
  }stopMove(){
    this.canMove=false;
    noteBoxes.forEach(noteBox=>{
      if (this.x>noteBox.x && this.x<noteBox.x+112 && this.y>noteBox.y && this.y<noteBox.y+80){
        this.gone=true;
        activeNotes-=1;
        addPoints(this,noteBox);
        if (activeNotes==0){
          noteLevelUp();
          spawnNewNotes();
        }
        
      }
    })
  }
}

function addPoints(chatBox,noteBox){
  if (chatBox.noteType==noteBox.typeBox){
    correctPoints+=1;
    dingSound.play();
  }else{
    correctPoints-=1;
    hurtSound.play();
  }
  //makes the score not able to go negative
  if(correctPoints<0){
    correctPoints=0;
  }
  
}


function spawnNewNotes(){
  if (activeNotes==0){
    notes=[];
    numNotes=numNotes+=levelNum;
    activeNotes=numNotes;
    for (let i=0;i<numNotes;i++){
      randX=int(random(50,350));
      randY=int(random(100,270));
      noteTypeChoice=int(random(0,4));
      notes[i]=new chatBox(randX,randY,noteTypes[noteTypeChoice]);
    }
  }
}

function noteLevelUp(){
    levelNum+=2;
}


class noteBox{
  constructor(x,y,mainColor,secondColor,typeBox){
    this.x=x;
    this.y=y;
    this.mainColor=mainColor;
    this.secondColor=secondColor;
    this.typeBox=typeBox;
  }display(){
    push();
    strokeWeight(1);
    // noStroke();
    fill(this.secondColor);
    rect(this.x+75,this.y-5,30,20);
    rect(this.x+4,this.y,106,80);
    fill(this.mainColor);
    rect(this.x+10,this.y+8,30,20);
    rect(this.x,this.y+15,112,75);
    fill(0);
    if(this.typeBox=="Director"){
      textSize(20);
      text("Director",this.x+22,this.y+60);
    }
    if(this.typeBox=="Costumes"){
      textSize(20);
      text("Costumes",this.x+13,this.y+60);
    }
    if(this.typeBox=="Props"){
      textSize(20);
      text("Props",this.x+30,this.y+60);
    }
    if(this.typeBox=="Set"){
      textSize(22);
      text("Set",this.x+40,this.y+60);
    }
    pop();
    
  }
}

function resetRehearsalLevel() {
  gameStarted = false;
  gameOverWin = false;
  gameOverLose = false;
  winSoundPlayed=false;
  loseSoundPlayed=false;
  correctPoints = 0;
  levelNum = 1;
  numNotes = 2;
  activeNotes = numNotes;
  notes = [];
  for (let i = 0; i < numNotes; i++) {
    let randX = int(random(50, 350));
    let randY = int(random(100, 270));
    let noteTypeChoice = int(random(0, 4));
    notes[i] = new chatBox(randX, randY, noteTypes[noteTypeChoice]);
  }
  startTimer = int(millis());
  decreaseTimer = totalCountdown;
  if (uiScreen) {
    uiScreen.currentScreen = "start";
  }
}


class gameScreen {
  constructor() {
    this.uiActive = true;
    this.currentScreen = null;
  }display() {
    let screenType = null;
    if (!gameStarted && !gameOverWin && !gameOverLose) screenType = "start";
    else if (gameOverWin) screenType = "win";
    else if (gameOverLose) screenType = "lose";
    else return;

    const screens = {
      start: {
        title1: "Welcome to the",
        title2: "Rehearsal Period!",
        messages: [
          "Organize the Verbal Notes into their corresponding folders.",
          "A correct match adds points, and an incorrect match subtracts points!",
          "Get 25 points to pass this level!"
        ],
        button: "Click to Start!"
      },
      win: {
        title1: "Time is Up!",
        title2: "Congrats! You Won!",
        messages: [
          `You scored a total of ${correctPoints} points!`,
          "You're great at this!",
          "Your job finds you very responsible and congratulates you on your work!",
          "Now let's go into the show!"
        ],
        button: "Back to Main Screen"
      },
      lose: {
        title1: "Time is Up!",
        title2: "Womp Womp, you lost...",
        messages: [
          `You scored a total of ${correctPoints} points...`,
          "That's kind of sad :/",
          "Your job finds you slow and fires you...womp womp no more money for you!"
        ],
        button: "Restart Level"
      }
    };

    this.currentScreen = screenType;
    this.drawUI(screens[screenType]);
  }drawUI(screen) {
    push();
    //the main box
    fill(230, 230, 230, 235);
    stroke(0);
    strokeWeight(2);
    rect(50, 50, 300, 300, 10);

    const rectCenterX = 200;
    const rectTopY = 50;
    const rectBottomY = 350;

    //title of screen
    textAlign(CENTER, TOP);
    fill(255);
    stroke(0);
    strokeWeight(1.5);
    textSize(26);
    text(screen.title1, rectCenterX, rectTopY + 25);
    text(screen.title2, rectCenterX, rectTopY + 55);
    stroke(0);
    line(70, rectTopY + 90, 330, rectTopY + 90);
    // messages
    noStroke();
    fill(0);
    textSize(15);
    textAlign(CENTER, TOP);
    textLeading(18);

    
    let y = rectTopY + 105;
    const gap = 45; 

    for (let i = 0; i < screen.messages.length; i++) {
      text(screen.messages[i], rectCenterX-125, y, 260);
      y += gap;
      if (y > rectBottomY - 90) break; 
    }

    // Button
    const buttonWidth = 180;
    const buttonHeight = 40;
    const buttonX = rectCenterX - buttonWidth / 2;
    const buttonY = rectBottomY - buttonHeight - 15;
    fill(150);
    stroke(0);
    strokeWeight(1);
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 8);
    noStroke();
    fill(0);
    textSize(17);
    text(screen.button, rectCenterX, buttonY + 10);
    pop();
  }uiButtonClick() {
  if (mouseX > 120 && mouseX < 280 && mouseY > 310 && mouseY < 340) {
    if (this.currentScreen === "start") {
      // start game screen
      gameStarted = true;
      gameOverWin = false;
      gameOverLose = false;
      startTimer = int(millis());
    } else if (this.currentScreen === "win") {
      // win --> back to main screen
      print("GOING TO MAIN SCREEN");
      nextLevel(); // go to level 3
      onRehearsalLevel = false;
      onMainScreen = true;
      if (gachaBGMusic && gachaBGMusic.isPlaying && gachaBGMusic.isPlaying()) {
              gachaBGMusic.stop();
            }
      if (!mainBGMusic.isPlaying()) {
          mainBGMusic.loop();
        }
      winSoundPlayed=false;
      loseSoundPlayed=false;
    } else if (this.currentScreen === "lose") {
      // lose -> reset rehearsal level
      resetRehearsalLevel();
      this.currentScreen = "start";
    }
  }
  } 
}

//==============ENDURANCE LEVEL CLASSES===================

class Bullet{
  constructor(type){
    this.x = random(-400,-20);
    this.y = random(10, 380);
    this.size = random(12, 35);
    this.coffeeSize=random(25, 40);
    this.speed = random(4, 6);
    this.type=type;
  }display(){
    if (this.type==0){
      push();
      imageMode(CENTER);
      image(coffee,this.x,this.y,this.coffeeSize,this.coffeeSize);
      pop();
    }else if (this.type==1){
      push();
      imageMode(CENTER);
      image(depression,this.x,this.y,this.size,this.size);
      pop();
    }
  }addSpeed(){
    this.speed +=2;
  }resetBullet() {
    this.x = random(-400, -20);
    this.y = random(10, 380);
    this.size = random(12, 35);
    this.coffeeSize=random(25, 40);
  }update(){
    if(this.x < width + 20){
      this.x += this.speed;
    }
    if (this.x > width){
      this.resetBullet();
    }
  }
}

class Hero{
  constructor(){
    this.x= 300;
    this.y=height/2;
    this.size=25;
    this.speed=5;
    this.alive = true;
  }
  display(){
    if(this.alive){
      push();
      noFill();
      stroke("#00F4FF");
      circle(this.x,this.y,this.size);
      pop();
    }
  }update(){
    if (keyIsDown(65)) this.x -= this.speed;
    if (keyIsDown(68)) this.x += this.speed;
    if (keyIsDown(87)) this.y -= this.speed;
    if (keyIsDown(83)) this.y += this.speed;
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
    }
}

class staminaBar{
  constructor(){
    //221 is the starting value, it's the width of the green rect
    this.currentHealth=221
  }display(){
    push();
    fill(255);
    textAlign(CENTER);
    textSize(18);
    text("Stamina:",55,350);
    rectMode(CORNER);
    stroke(0);
    //base of box
    rect(20,360,225,25);
    //inner fill
    noStroke();
    fill("rgb(31,235,31)");
    rect(22,362,this.currentHealth,21);
    pop();
  }decreaseHealth(amount) {
    this.currentHealth = max(0, this.currentHealth - amount);
    hurtSound.play();
  }addHealth(amount) {
    this.currentHealth = min(221, this.currentHealth + amount);
    coffeeSlurp.play();
  }
}

function resetBulletGame() {
  numCoffee = 1;
  numBullets = 9;
  redBullets = [];
  blueBullets = [];
  winSoundPlayed=false;
  loseSoundPlayed=false;
  
  for (let i = 0; i < numBullets; i++) {
    blueBullets.push(new Bullet(1));
  }
  for (let i = 0; i < numCoffee; i++) {
    redBullets.push(new Bullet(0));
  }

  theStaminaBar = new staminaBar();
  hero1 = new Hero();
  bulletStartTimer = int(millis());
  bulletDecreaseTimer = 0;
  speedIncreased = false;
}

function playLoseSound(){
  loseSound.play();
}

function playWinSound(){
  winSound.play();
}

//==============FINAL LEVEL CLASSES===================

class money{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.gone=false;
    this.canMove=false;
  }display(){
  if (this.gone) return;
    push();
    imageMode(CENTER);
    image(moneyImage, this.x,this.y);
    pop();
  }inMouse(mX,mY){
    return mX>this.x-70 && mX<this.x+70 && mY>this.y-55 && mY<this.y+50;
  }startDrag(){
    if (!moneyPaid){
      this.canMove=true;
    }
  }dragMoney(){
  if (this.canMove){
    this.x=mouseX;
    this.y=mouseY;
    }
  }stopMove(){
    this.canMove=false;
    if (!moneyPaid && this.x>230 && this.x<372 && this.y>155 && this.y<245){
      theWallet=new wallet ("filled");
      this.gone=true;
      walletFilled=true;
      winSound.play();
    }
  }
}

class wallet{
  constructor(type){
    this.type=type;
  }display(){
    if (this.type=="empty"){
      image(emptyWallet,220,130);
    }if (this.type=="filled"){
      image(filledWallet,220,130);
    }
  }
}

function displayFinalText(){
  push();
  textAlign(CENTER);
  textSize(23);  
    if (!walletFilled && !moneyPaid){
      text("$0",346,276);  
    }if (walletFilled){
      text("$100",358,276);
      textSize(18);
      text("Now...Pay your rent! :D",113,185);
      fill("red");
      rect(30,200,160,35);
      fill(0);
      text("Rent Due:",85,255);
      text("$"+ rentDue, 155,255);
      textSize(20)
      text("PAY RENT >:D",110,225);
    }else if (moneyPaid){
      text("$0",346,276);
      theWallet=new wallet("empty");
      textSize(18);
      text("Um...You need more...",113,185);
      fill("red");
      rect(30,200,160,35);
      fill(0)
      text("Rent Due:",85,255);
      text("$"+ rentDue, 155,255);
      textSize(20)
      text("PAY RENT >:D",110,225);
      textSize(35);
      text("Now what?",200,325)
      line(102,331,295,331);
      fill(100);
      textSize(20);
      text("Press Space to find out...",200,360)
    }
  pop();
}

//RESET GAME
function resetGame(){
  //main screen
  onMainScreen=true;
  onJobLevel=false;
  onRehearsalLevel=false;
  onEnduranceLevel=false;
  onFinalLevel=false;
  acceptedTriggered=false;
  currentLevel=1;
  xRect=0;
  moveRect=10;
  moveDirection=1;
  levelBoxes=[];

  if (!mainBGMusic.isPlaying()) {
    mainBGMusic.loop();
  }

  //job level
  goStartingBrowser=true;
  goGoodBrowser=false;
  goBadBrowser=false;
  acceptedApp=false;

  //final level variables
  walletFilled=false;
  moneyPaid=false;
  rentDue=1356;

  // Stop any music
  if (jobBGMusic.isPlaying()) jobBGMusic.stop();
  if (gachaBGMusic.isPlaying()) gachaBGMusic.stop();
  if (nyanBGMusic.isPlaying()) nyanBGMusic.stop();
  if (finalBGMusic.isPlaying()) finalBGMusic.stop();

  resetSetup();

  print("GAME IS RESET");

}

//the setup put into one function for reset======================================================
function resetSetup() {
  //main Screen Setup
  levelBox1 = new levelBox(45, 120, 120, "Level 1: Get a Job", 1);
  levelBox2 = new levelBox(45, 180, 80, "Level 2: Rehearsal Period", 2);
  levelBox3 = new levelBox(45, 240, 100, "Level 3: Show Period", 3);
  levelBox4 = new levelBox(45, 300, 65, "Level 4: Closing...What's Next?", 4);
  levelBoxes = [levelBox1, levelBox2, levelBox3, levelBox4];

  //job level setup
  if (computer) computer.resize(430, 525);
  if (check) check.resize(50, 50);
  goodTab = new jobTab(45, 95, "GoodJobs.com", 255);
  badTab = new jobTab(150, 125, "AtLeastItsAJob.com", 255);
  browser = new jobBrowser(0, 65, 90, 278);
  check1 = new checkQualified(188, 119, "lightGreen", "Apply");
  check2 = new checkQualified(188, 189, "lightGreen", "Apply");
  check3 = new checkQualified(188, 259, "lightGreen", "Apply");
  check4 = new checkQualified(188, 119, "lightGreen", "Apply");
  check5 = new checkQualified(188, 189, "lightGreen", "Apply");
  check6 = new checkQualified(188, 259, "lightGreen", "Apply");

  //rehearsal setup
  startTimer = int(millis());
  uiScreen = new gameScreen();
  directorBox = new noteBox(30, 20, "rgb(123,123,219)", "rgb(59,59,153)", "Director");
  costumesBox = new noteBox(260, 20, "rgb(103,192,103)", "rgb(15,92,15)", "Costumes");
  propsBox = new noteBox(30, 280, "rgb(231,147,225)", "rgb(173,95,196)", "Props");
  setBox = new noteBox(260, 280, "rgb(206,72,72)", "rgb(131,32,32)", "Set");
  noteBoxes = [directorBox, costumesBox, propsBox, setBox];
  resetRehearsalLevel(); // resets notes, timer, etc.

  //endurance setup
  bulletSpeed = int(random(4, 7));
  hero1 = new Hero();
  theStaminaBar = new staminaBar();
  bulletStartTimer = int(millis());
  redBullets = [new Bullet(0)];
  blueBullets = Array.from({ length: 9 }, () => new Bullet(1));
  bulletScene = 0;
  bulletGameStarted = false;
  winSoundPlayed = false;
  loseSoundPlayed = false;
  speedIncreased = false;
  resetBulletGame();

  //final level setup
  moneyImage.resize(180, 130);
  emptyWallet.resize(180, 130);
  filledWallet.resize(180, 130);
  theMoney = new money(85, 210);
  theWallet = new wallet("empty");
  walletFilled = false;
  moneyPaid = false;
  rentDue = 1356;
  if (!mainBGMusic.isPlaying()) {
    mainBGMusic.loop();    
  }

}

