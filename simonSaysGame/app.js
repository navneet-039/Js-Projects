let gamesequence = [];
let usersequence = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = ["red", "yellow", "purple", "green"];

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);  // Flash duration
};

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);  // Flash duration for user
};

function levelup() {
    usersequence=[];
    level++;
    h2.innerText = `Level: ${level}`;
    let randomindex = Math.floor(Math.random() * 4);  // Corrected to *4
    let randomcolor = btns[randomindex];
    gamesequence.push(randomcolor);
    console.log(gamesequence);
    let randombtn = document.querySelector(`#${randomcolor}`);

    // console.log(randomindex);
    // console.log(randomcolor);
    // console.log(randombtn);

    // Random button chosen and flashed
    gameflash(randombtn);
}
function checkans(idx){
    // console.log("current level",level);
  
    if(gamesequence[idx]==usersequence[idx]){
        if(usersequence.length==gamesequence.length){
            setTimeout(levelup,1000);
            
        }
       
    }
    else{
        h2.innerHTML = `Game over! your score was<b> ${level}</b> <br> press any key to start`;
        let bdy=document.querySelector("body");
        bdy.style.backgroundColor="red";
        setTimeout(function(){
            bdy.style.backgroundColor="white";
        },150);
        reset();

    }
}

function buttonpress() {
    let btn = this;
    userflash(btn);  // Flash the button when clicked
   let usercolor=btn.getAttribute("id");
    usersequence.push(usercolor);
    checkans(usersequence.length-1);


}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", buttonpress);
}

function reset(){
    started=false;
    gamesequence=[];usersequence=[];
    level=0;
}