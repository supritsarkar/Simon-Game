let gameSeq = [];
let userSeq = [];

//random color flash koranor jonno game er suru te ,ek ta array create krbo
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

//it's gonna check if any key got pressed from the web page
//keypress gonna help to check if any  key from the web page got pressed
document.addEventListener("keypress", function (event) {
  if (started == false) {
    console.log("game is started ");
    started = true; // eta game is started ek bar e print krte help krbe,ek bar etwa true hoe gele abar alada kre true hobe na
  }
  levelUp();
});

//! game flash random j button ta select hobe setar background color ,kichukhoner jonno sada krbe
function gameFlash(btn) {
  btn.classList.add("flash"); //j button ta choose krbe ,tar sathe flash class ta add hoe jabe

  //ebar ei flash class ta just kichu khon somoy er jonno add hobe button er sathe,then oi flash class ra remove hoe jabe
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

//! this is the user flash function:-
// ei function ta user j button click krbe tar color change kre green krbe using pre defined class userflash in css
function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 300);
}

function levelUp() {
  userSeq = []; //chick krar por ,abar user seq clear hoe jabe ,r notun kre value put krte hobe
  level++;
  h2.innerText = `Level ${level}`;

  //btns array tar data access er jonno random 1 to 3 er moddhe kar index number generate krbe
  let randIdx = Math.floor(Math.random() * 3);

  let randColor = btns[randIdx]; //randcolor e btn indx er color save kra holo,btns array er theke

  let randbtn = document.querySelector(`.${randColor}`); // eta j randcolor ta generate krbe ,setar color er class name dia oi button take select krbe (karon button gulo te color name dia class decleare kra ache)

  //random button select krar por btnflash e randbtn variable take pass kre dewa hobe

  //this will print all the details about the first random button
  // console.log(
  //   ` this will show ,which random button it generated ${randbtn},rand color ${randColor},random index ${randIdx}`
  //  );
  //! random color jei generate hoe jabe tokhon gameseq er vetore array er modhdhe color gulo push kre dewa hobe
  gameSeq.push(randColor);
  console.log(gameSeq); //! eta dia gameseq array take track e rakha hobe , j kon kon color generate krche

  gameFlash(randbtn); //after clicking the button the button's background color will be white
}

//! user er press kra button r sathe ,gamw seq match krche ki na ,seta check krte hobe

function checkAns() {
  //niche ami check ans e user er last key take pass kre chi,but ekhane argument hisebe kichu die ni ,tao problem hobe na karon javascript oi pass kra parameter take by default argument dia receive kre check krbe ei loop ta dia
  for (let i = 0; i < userSeq.length; i++) {
    if (userSeq[i] !== gameSeq[i]) {
      h2.innerHTML = `Game Over ! Your score was :<b>${level}</b> <br>press any key to start again`;

      document.querySelector("body").style.backgroundColor = "red"; //vul key press krle screen ta
      setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
      }, 150);

      reset(); //game over hoe gele ,ei function call hoe reset hoe jabe game ta

      return;
    }
  }

  if (userSeq.length === gameSeq.length) {
    setTimeout(levelUp, 1000);
  }
}

//! ebar next part ,ei part e button press krar upor kaj hobe

function btnPress() {
  let btn = this; //this ekhane btnpress function ta niche allbtns er modhdhe j random button er jonno call hoe che ,sei button k refer krbe
  userflash(btn); //j button ta click krbe user sei button ta flash krbe

  userColor = btn.getAttribute("id"); //user j button e click krbe ,sei button er id ei usercolor e save hoe jabe
  console.log(userColor);

  //! ebar user j button er upor click krbe ,seta k userseq array te store krbo
  userSeq.push(userColor);

  checkAns(userSeq.length - 1); //user j button press krbe setaq check krbe
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

//! gameover hoe gele ,j function ta call hobe ,sei reset function tar description
//eta tokhon e call hobe jokhon game over hoe jabe ,r sob value 1st theke add kranor jonno reset kre debe
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
