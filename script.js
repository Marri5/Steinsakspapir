let round = 0;
let playerWins = 0;
let computerWins = 0;
let countdownInterval;
let imageCycleInterval;
let choices = ['stein', 'papir', 'saks'];
let playerMadeChoice = false;

function startGame() {
    round = 0;
    playerWins = 0;
    computerWins = 0;
    playerMadeChoice = false;
    clearInterval(countdownInterval);
    document.getElementById("landingView").classList.add("hidden");
    document.getElementById("gameView").classList.remove("hidden");
    document.getElementById("rounds").innerHTML = "";
    newRound();
}

function newRound() {
    playerMadeChoice = false;
    document.getElementById("nextRoundButton").classList.add("hidden");
    let countdown = 3;
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("countdown").textContent = countdown;
    clearInterval(countdownInterval);
    clearInterval(imageCycleInterval); 

    let imageIndex = 0; 

    imageCycleInterval = setInterval(function() {
        document.getElementById("playerChoiceImage").src = `./IMG/${choices[imageIndex]}.png`;
        document.getElementById("computerChoiceImage").src = `./IMG/${choices[imageIndex]}.png`;
        imageIndex = (imageIndex + 1) % 3; 
    }, 50);

    countdownInterval = setInterval(function() {
        countdown--;
        document.getElementById("countdown").textContent = countdown;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            clearInterval(imageCycleInterval); 
            if (!playerMadeChoice) {
                game();
            }
        }
    }, 1000);
}

function playerChoice(choice) {
    if (!playerMadeChoice) {
        playerMadeChoice = true;
        clearInterval(imageCycleInterval); 
        document.getElementById("playerChoiceImage").src = `./IMG/${choice}.png`;
        game(choice);
    }
}

function game(playerChoice) {
    clearInterval(countdownInterval);
    clearInterval(imageCycleInterval); 
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    document.getElementById("computerChoiceImage").src = `./IMG/${computerChoice}.png`;
    let result = '';
    
    if (playerChoice === computerChoice) {
        result = "Det ble uavgjort!";
    } else if (
        (playerChoice === 'stein' && computerChoice === 'saks') ||
        (playerChoice === 'saks' && computerChoice === 'papir') ||
        (playerChoice === 'papir' && computerChoice === 'stein')
    ) {
        result = "Du vinner denne runden!";
        playerWins++;
    } else {
        result = "Computer vinner denne runden!";
        computerWins++;
    }

    result += `<br>Du valgte ${playerChoice}, Computer valgte ${computerChoice}.`;

    document.getElementById("feedback").innerHTML = result;
    document.getElementById("rounds").innerHTML += `Runde ${round + 1}: ${result}<br>`;
    
    round++;

    if (playerWins === 2 || computerWins === 2) {
        let overallResult = playerWins === 2 ? "Gratulerer! Du vant matchen!" : "Computer vinner matchen! Lykke til neste gang!";
        document.getElementById("feedback").innerHTML += `<br>${overallResult}`;
        setTimeout(() => {
            document.getElementById("nextRoundButton").classList.add("hidden");
            startGame();
        }, 3000);
        return;
    }

    document.getElementById("nextRoundButton").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("nextRoundButton").addEventListener("click", newRound);
});
