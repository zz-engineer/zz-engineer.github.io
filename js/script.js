// QUERY SELECTORS ------------------------------------
// ---------------------------------------------------
const dispGerNoun = document.querySelector("#ger");
const dispEngNoun = document.querySelector("#eng");
const nounText = document.querySelector("#noun");
const genSelM = document.querySelector("#gen1");
const genSelF = document.querySelector("#gen2");
const genSelN = document.querySelector("#gen3");
const genSelPl= document.querySelector("#gen4");
const dontKnow = document.querySelector("#dontKnow");
const count = document.querySelector(".counter");
const reset = document.querySelector(".button-reset");
// const end = document.querySelector(".button-end");

let wordsArr = [];
let total;
let ranWordsArray = [];
let testWord = [];
var caseSel = 1;
const cases = [["der","die","das","die"],["den","die","das","die"],["dem","der","dem","den"],["des","der","des","der"]];

const conv2Arr = function(w) {
    wordsArr = Object.entries(w);
    total = wordsArr.length;
    return wordsArr;
}
const  randomise = function(ar) {
    for (var i = ar.length ; i > 0; i--) {
        let random = Math.floor(Math.random()*i);
        ranWordsArray.push(wordsArr[random]);
        wordsArr.splice(random, 1);
    }
    return ranWordsArray;
}
const getWords = function(ar) {

    if (ranWordsArray.length > 0 ) {
        testWord = ar[0];
        console.log(testWord[1].gen);
        let imageAdd = "https://github.com/zz-engineer/zz-engineer.github.io/blob/master/img/" + testWord[0] + ".JPG";
        document.querySelector(".test-image").src=imageAdd;
        let counter = (total - ranWordsArray.length) + "/" + total
        count.innerText = counter;
                return(testWord);
    } else {
        document.querySelector(".test-image").src="https://github.com/zz-engineer/zz-engineer.github.io/blob/master/img/finished.JPG";
        let counter = (total - ranWordsArray.length) + "/" + total
        count.innerText = counter;
        console.log("test finished")
    }
    console.log(ranWordsArray.length);
    console.log(ranWordsArray);
}
const fetchData = function() {
    fetch("./data/testList.json")
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            conv2Arr(data);
            randomise(wordsArr);
            getWords(ranWordsArray);
        })
}

const appCase = function(cs) {
    let caseOpt = cases[caseSel - 1]
    switch(cs) {
        case 1: 
            document.querySelector("img").className = "test-image caseNom";
            genSelM.innerText = caseOpt[0];
            genSelF.innerText = caseOpt[1];
            genSelN.innerText = caseOpt[2];
            genSelPl.innerText = caseOpt[3];
        break;
        case 2:
            document.querySelector("img").className = "test-image caseAkk";
            genSelM.innerText = caseOpt[0];
            genSelF.innerText = caseOpt[1];
            genSelN.innerText = caseOpt[2];
            genSelPl.innerText = caseOpt[3];
        break;
        case 3:
            document.querySelector("img").className = "test-image caseDat";
            genSelM.innerText = caseOpt[0];
            genSelF.innerText = caseOpt[1];
            genSelN.innerText = caseOpt[2];
            genSelPl.innerText = caseOpt[3];
        break;
        case 4:
            document.querySelector("img").className = "test-image caseGen";
            genSelM.innerText = caseOpt[0];
            genSelF.innerText = caseOpt[1];
            genSelN.innerText = caseOpt[2];
            genSelPl.innerText = caseOpt[3];
        break;
    }   
}

const dispGerm = function() {
    // let gerNoun = []
    nounText.innerText = testWord[1].Deut;
}
const dispEng = function() {
    // let engNoun = []
    nounText.innerText = testWord[1].Eng;
}

const restoreCSS = function() {
    document.getElementById("gen1").className = "button-1 flex"
    document.getElementById("gen2").className = "button-2 flex"
    document.getElementById("gen3").className = "button-3 flex"
    document.getElementById("gen4").className = "button-4 flex"
}
const wrongChoice = function(a){
    if (a === 1) {
        document.getElementById("gen1").className = "wrongChoice flex"
    } else if (a === 2) {
        document.getElementById("gen2").className = "wrongChoice flex"
    } else if (a === 3) {
        document.getElementById("gen3").className = "wrongChoice flex"
    } else {
        document.getElementById("gen4").className = "wrongChoice flex"
    }
}
const rightChoice = function(a){
    if (a === 1) {
        document.getElementById("gen1").className = "rightChoice flex"
    } else if (a === 2) {
        document.getElementById("gen2").className = "rightChoice flex"
    } else if (a === 3) {
        document.getElementById("gen3").className = "rightChoice flex"
    } else {
        document.getElementById("gen4").className = "rightChoice flex"
    }
}
const correct = function() {
    console.log("correct!");
    ranWordsArray.shift();
    getWords(ranWordsArray);
    nounText.innerText = " ";
    restoreCSS();
}

const checkGenM = function(arg) {
    const testFor = 1;
    if(arg === testFor) {
        rightChoice(testFor);
        setTimeout(function(){
            correct();
        }, 250);
    } else {
        wrongChoice(testFor);
}
}
const checkGenF = function(arg) {
    const testFor = 2;
    if(arg === testFor) {
        rightChoice(testFor);
        setTimeout(function(){
            correct();
        }, 250);
    } else {;
        wrongChoice(testFor);
}
}
const checkGenN = function(arg) {
    const testFor = 3;
    if(arg === testFor) {
        rightChoice(testFor);
        setTimeout(function(){
            correct();
        }, 250);
    } else {
        wrongChoice(testFor);
    }
}
const checkGenPl = function(arg) {
    const testFor = 4;
if(arg === testFor) {
    rightChoice(testFor);
    setTimeout(function(){
        correct();
    }, 250);
} else {
    wrongChoice(testFor);
}
}
const giveAnswer = function() {
    alert("?");
}
const resetTest = function() {
    wordsArr = [];
    ranWordsArray = [];
    testWord = [];
    fetchData();
}

// fetch data in and select first word
fetchData();
appCase(caseSel);

// EVENT LISTENERS------------------------------------
// ---------------------------------------------------

// prompt noun when click on flag
dispGerNoun.addEventListener("click", dispGerm, false);
dispEngNoun.addEventListener("click", dispEng, false);
// click on gender buttons and ?
genSelM.addEventListener("click",
    function() {
        checkGenM(testWord[1].gen);
    }
);
genSelF.addEventListener("click",
    function() {
        checkGenF(testWord[1].gen);
    }
);
genSelN.addEventListener("click",
    function() {
        checkGenN(testWord[1].gen);
    }
);
genSelPl.addEventListener("click",
    function() {
        checkGenPl(testWord[1].gen);
    }
);
dontKnow.addEventListener("click", giveAnswer, false);

// event listeners for test control - reset and end test
reset.addEventListener("click", resetTest, false);
// end.addEventListener("click", endTest, false);
