let score1 = 0;
let score2 = 0;
let result1 = [];
let result2 = [];
let playerCheck1 = false;
let playerCheck2 = false;
let hasValidDice1 = true;
let hasValidDice2 = true;
let dice1IsRolling = 0;
let dice2IsRolling = 0;
let resultOutput1 = document.getElementById("output");
let resultOutput2 = document.getElementById("output-2");
let styleButton1 = document.getElementById("button-1");
let styleButton2 = document.getElementById("button-2");
let name1 = "no name";
let name2 = "no name";
let bgcolor1;
let bgcolor2;
let diceInProgress = false;

function saveNameOne() {
    name1 = document.getElementById('namePlayerOne').value;
    console.log(name1);
    return name1;
}

function saveNameTwo() {
    name2 = document.getElementById('namePlayerTwo').value;
    console.log(name2);
    return name2;
}

function saveColorOne() {
    bgcolor1 = document.getElementById('colorPlayerOne').value;
    console.log(bgcolor1);
    return bgcolor1;
}

function saveColorTwo() {
    bgcolor2 = document.getElementById('colorPlayerTwo').value;
    console.log(bgcolor2);
    return bgcolor2;
}

function newDicePlayer1() {
    playerCheck2 = false;
    result1.push(Math.floor(((Math.random() * 6) + 1)));

    dice1IsRolling += 1;
    currentDice(result1[result1.length-1]);

    if (dice1IsRolling == 1) {
        playerCheck1 = true;
        styleButton1.style.background = "#ff4d4d";
        styleButton1.style.color = "#fff";
    }
    console.log("newDicePlayer1", result1, hasValidDice1, dice1IsRolling);
    console.log("newDicePlayer2", result2, hasValidDice2, dice2IsRolling);
}

function newDicePlayer2() {
    playerCheck1 = false;
    result2.push(Math.floor(((Math.random() * 6) + 1)));

    dice2IsRolling += 1;
    currentDice(result2[result2.length-1]);

    if (dice2IsRolling == 1) {
        playerCheck2 = true;
        styleButton2.style.background = "#ff4d4d";
        styleButton2.style.color = "#fff";
    }
    console.log("newDicePlayer1", result1, hasValidDice1, dice1IsRolling);
    console.log("newDicePlayer2", result2, hasValidDice2, dice2IsRolling);
} 

function cleanBoard() {
    if (dice2IsRolling == 10) {
        dice2IsRolling = 0;
        hasValidDice2 = !hasValidDice2;
        hasValidDice1 = !hasValidDice2;
        styleButton2.style = "";
        diceInProgress = false;
    } else if (dice1IsRolling == 10) {
        dice1IsRolling = 0;
        hasValidDice1 = !hasValidDice1;
        hasValidDice2 = !hasValidDice1;
        styleButton1.style = "";
        diceInProgress = false;
    }

    if (playerCheck1 && playerCheck2) {
        playerCheck1 = false;
        playerCheck2 = false;
    }

    if (result1.length == 10 && result2.length == 10) {
        getWinner();
    }
}

function currentDice(dice) {
    if (playerCheck1) {
        resultOutput1.innerHTML = name1 + ': <img class="imgBackgroundOne" src="./images/PinClipart_cutout-cube_' + dice + '.png"><br>';
        const imgBackgroundOne = document.querySelector(".imgBackgroundOne");
        imgBackgroundOne.style.backgroundColor = bgcolor1;
    } else if (playerCheck2) {
        resultOutput1.innerHTML = name2 + ': <img class="imgBackgroundTwo" src="./images/PinClipart_cutout-cube_' + dice + '.png">';
        const imgBackgroundTwo = document.querySelector(".imgBackgroundTwo");
        imgBackgroundTwo.style.backgroundColor = bgcolor2;    
    }

    cleanBoard();
}

function getWinner() {
    let eyes1 = 0;
    let eyes2 = 0;

    result1.forEach(item => {
        eyes1 += item;
    });

    result2.forEach(item => {
        eyes2 += item;
    });

    let dices = "";

    dices += name1 + "(" + eyes1 + ")" + ": ";
    for (let i = 0; i < result1.length; i++) {
        dices += '<img class="imgBackgroundOne small-image" src="./images/PinClipart_cutout-cube_' + result1[i] + '.png">';
    }

    dices += "<br>";

    dices += name2 + "(" + eyes2 + ")" + ": ";
    for (let i = 0; i < result2.length; i++) {
        dices += '<img class="imgBackgroundTwo small-image" src="./images/PinClipart_cutout-cube_' + result2[i] + '.png">';
    }

    resultOutput1.innerHTML = dices;

    result1 = [];
    result2 = [];

    if (eyes1 > eyes2) {
        score1 += 1;

        resultOutput2
        .innerHTML = '<span class="winner"> Gesamte Punkte [P1] - ' + name1 + ': </span> ' + score1 + '<br></br>' +
            '<span class="looser"> Gesamte Punkte [P2] - ' + name2 + ': </span> ' + score2 + '<br></br>' + name1 + ' gewinnt!';
    } else if (eyes1 == eyes2) {
        score1 += 1;
        score2 += 1;

        resultOutput2
        .innerHTML = '<span class="winner"> Gesamte Punkte [P1] - ' + name1 + ': </span> ' + score1 + '<br></br>' +
        '<span class="winner"> Gesamte Punkte [P2] - ' + name2 + ': </span> ' + score2 + '<br></br>' + 'Unentschieden!';
    } else {
        score2 += 1;

        resultOutput2
        .innerHTML = '<span class="looser"> Gesamte Punkte [P1] - ' + name1 + ': </span> ' + score1 + '<br></br>' +
        '<span class="winner"> Gesamte Punkte [P2] - ' + name2 + ': </span> ' + score2 + '<br></br>' + name2 + ' gewinnt!';
    }

    setTimeout(() => {
        resultOutput2.getElementsByTagName("span")[0].classList.remove("winner", "looser");
        resultOutput2.getElementsByTagName("span")[1].classList.remove("looser", "winner");

        let playerResult1 = resultOutput2.getElementsByTagName("span")[0].textContent + ' ' + score1;
        let playerResult2 = resultOutput2.getElementsByTagName("span")[1].textContent + ' ' + score2; 

        resultOutput2
        .innerHTML = playerResult1 + '<br><br>' + playerResult2;
    }, 1000);
}

function delayedPlayerOne() {
    if (!diceInProgress && hasValidDice1) {
        diceInProgress = true;
        setTimeout(newDicePlayer1, 500);
        setTimeout(newDicePlayer1, 1000);
        setTimeout(newDicePlayer1, 1500);
        setTimeout(newDicePlayer1, 2000);
        setTimeout(newDicePlayer1, 2500);
        setTimeout(newDicePlayer1, 3000);
        setTimeout(newDicePlayer1, 3500);
        setTimeout(newDicePlayer1, 4000);
        setTimeout(newDicePlayer1, 4500);
        setTimeout(newDicePlayer1, 5000);
    }

    cleanBoard();
}

function delayedPlayerTwo() {
    if (!diceInProgress && hasValidDice2) {
        diceInProgress = true;
        setTimeout(newDicePlayer2, 500);
        setTimeout(newDicePlayer2, 1000);
        setTimeout(newDicePlayer2, 1500);
        setTimeout(newDicePlayer2, 2000);
        setTimeout(newDicePlayer2, 2500);
        setTimeout(newDicePlayer2, 3000);
        setTimeout(newDicePlayer2, 3500);
        setTimeout(newDicePlayer2, 4000);
        setTimeout(newDicePlayer2, 4500);
        setTimeout(newDicePlayer2, 5000);
    }

    cleanBoard();
}

function reset() {
    score1 = 0;
    score2 = 0;
    resultOutput1.innerHTML = "Want to play?";
    resultOutput2.innerHTML = "No games played yet";
}

function defaultStyle() {
    resultOutput1.innerHTML = 'Spieler 1: 0 <br></br>' +
        'Spieler 2: 0 <br></br>';
    resultOutput2.innerHTML = 'Punkte - Spieler 1: 0 <br></br>' +
        'Punkte - Spieler 2: 0';
}

saveNameOne();
saveNameTwo();
saveColorOne();
saveColorTwo();
defaultStyle();