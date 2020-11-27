function ageInDays(){
    var bday=prompt("What is your Birth year?");
    var year=prompt("What is the Current year?");
    var bresult = (year - bday) * 365;
    var h1 = document.createElement('h1');
    var tex = document.createTextNode("You are "+bresult+" Days old");
    h1.setAttribute('id','ageInDays');
    h1.appendChild(tex);
    document.getElementById('l').appendChild(h1);

}
function removedata(){
    document.getElementById('ageInDays').remove();
}

function gencat()
{
    var image = document.createElement('img');
    var div = document.getElementById('b');
    image.src = "https://media.istockphoto.com/photos/aerial-view-of-dubai-palm-jumeirah-island-united-arab-emirates-picture-id1097789900?k=6&m=1097789900&s=612x612&w=0&h=rvIrMda7iyZgPa_Zg2tXx1Z8dcyKikhL41ZdJN3ySBU=";
    div.appendChild(image);
}

function rpsGame(yourChoice){
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice=numberToChoice(randToRpsInt());
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    rpsFrontEnd(yourChoice.id,botChoice,message);
}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock':{'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper':{'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors':{'paper': 1, 'scissors': 0.5, 'rock': 0}
    };
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return [yourScore,computerScore];
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0){
        return {'message': 'You Lost', 'color': 'red'};
    }
    else if (yourScore === 0.5){
        return {'message': 'You Tied', 'color': 'yellow'};
    }
    else{
        return {'message': 'You Won', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src ='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba (37, 50, 233, 1);'>"
    messageDiv.innerHTML = "<h1 style='color :" + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src ='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba (243, 38, 24, 1);'>"
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}


var allButtons = document.getElementsByTagName('button');
console.log(allButtons);
var copyAllButtons = [];
for (let i=0; i<allButtons.length;i++){
    copyAllButtons.push(allButtons[i].classList[1]);
    
}
console.log(copyAllButtons);
function buttonColorChange(buttonThingy){
    if(buttonThingy.value === 'red')
    {
        buttonRed();
    }
    else if(buttonThingy.value === 'green')
    {
        buttonGreen();
    }
    else if(buttonThingy.value==='reset')
    {
        buttonReset();
    }
    else if(buttonThingy.value === 'random')
    {
        buttonRandom();
    }
}

function buttonRed(){
    for (let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}
function buttonGreen(){
    for (let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}
function buttonReset(){
    for (let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonRandom(){
    let  choice = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success']
    for (let i=0;i<allButtons.length;i++){
        let randomNumber = Math.floor(Math.random()*4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choice[randomNumber]);
    }
}

//blackjackgame
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '.your-box', 'score': 0},
    'dealer': {'scoreSpan': '#deal-blackjack-result', 'div': '.dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K','J', 'Q', 'A'], 
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('blackjack_assets/blackjack_assets/sounds/swish.m4a');
const winSound = new Audio('blackjack_assets/blackjack_assets/sounds/cash.mp3');
const lossSound = new Audio('blackjack_assets/blackjack_assets/sounds/aww.mp3');

document.querySelector('#black-jack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#black-jack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#black-jack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
    if (blackjackGame['isStand'] === false){
        let card = randomCard();
        console.log(card);
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer['score']<=21){
        let cardImage = document.createElement('img');
        cardImage.src = `blackjack_assets/blackjack_assets/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
    
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true){
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('.your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('.dealer-box').querySelectorAll('img');

        for (let i=0; i<yourImages.length;i++){
            yourImages[i].remove();
        }

        for (i=0; i<dealerImages.length; i++){
            dealerImages[i].remove();
        }
        YOU['score'] =0;
        DEALER['score'] =0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#deal-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#deal-blackjack-result').style.color = 'white';

        document.querySelector('#blackjack-result').textContent = 'Lets Play!';
        document.querySelector('#blackjack-result').style.color = 'white';
        blackjackGame['turnsOver'] = false;
    }

}

function updateScore (card, activePlayer){
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else{
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore (activePlayer){
    if (activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    blackjackGame['isStand'] = true;
    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

        blackjackGame['turnsOver'] = true;
        let  winner = computeWinner();
        showResult(winner);
    
}

function computeWinner(){
    let winner;

    if (YOU['score']<=21){
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
           blackjackGame['wins']++;
            winner = YOU;
        }
        else if (YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
    }
    else if (YOU['score']>21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER;
    }
    else if (YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner){
    let message, messageColor;
if (blackjackGame['turnsOver'] === true){
        if (winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winSound.play();
        }
        else if (winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play();
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You Drew!';
            messageColor = 'yellow';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}

