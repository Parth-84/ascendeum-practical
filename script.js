let startBtn = document.getElementById('start');
let pauseBtn = document.getElementById('pause');
let resetBtn = document.getElementById('reset');

let targetBox = document.getElementById('box');

let inputSeconds = document.getElementById('input_seconds');

let moveBoxInterval;
let interval;
let timer;
let stopTimer;

let clicksResult = [];
let pausedText = document.getElementById('paushedText');

startBtn.addEventListener('click', () => {
    if((inputSeconds.value == 0 || !inputSeconds.value)) {
        alert('Please enter seconds');
        return;
    }
    
    interval = inputSeconds.value * 1000;
    timer = Date('now');
    stopTimer = "";

    pausedText.style.display = 'none';

    pauseBtn.removeAttribute('disabled');
    resetBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled',true);

    targetBox.style.display = 'block';

    moveBoxInterval = setInterval(positionBox, interval);
});

targetBox.addEventListener('click', () => {
    if(stopTimer === null) {alert("The game is paused!"); return;}

    stopTimer = Date('now');
    clicksResult.push(getTimeDifference(timer,stopTimer));
    timer = Date('now');
    addRow();
    
    positionBox();
    clearInterval(moveBoxInterval);
    moveBoxInterval = setInterval(positionBox, interval);
});

function positionBox() {
    var randomPos = getRandomPosition();

    let posTop = Math.ceil(randomPos.top);
    let posLeft = Math.ceil(randomPos.left);

    if(posTop>90) {posTop = 90;}
    if(posLeft>90) {posLeft = 90;}

    console.log(posTop,posLeft);
    targetBox.style.top = Math.ceil(posTop) + "%";
    targetBox.style.left = Math.ceil(posLeft) + "%";
}

function getRandomPosition() {
    return {
        top: Math.random(2)*99,
        left: Math.random(2)*99
    }
}


function getTimeDifference(startTime, endTime) {
    let sTime = startTime.toLocaleString().split(" ")[4].split(':');
    let eTime = endTime.toLocaleString().split(" ")[4].split(':');

    var hourDiff = eTime[0] - sTime[0];
    var minDiff = eTime[1] - sTime[1];
    var secDiff = eTime[2] - sTime[2];

    var diffTime = 0;

    if(hourDiff) {
        diffTime = (hourDiff*60*60);
    }

    if(minDiff) {
        diffTime += (minDiff*60);
    }

    if(secDiff) {
        diffTime += secDiff;
    }

    return diffTime;
}

function addRow() {
    var tr = document.createElement('tr');
    var tableBody = document.getElementById('targetBody');

    tr.innerHTML = "<td>"+clicksResult.length+"</td><td>"+clicksResult[clicksResult.length-1]+"s</td>";

    tableBody.appendChild(tr);
}

function reset() {
    timer = null;
    clicksResult = [];
    document.getElementById('targetBody').innerHTML = "";
    targetBox.style.display = 'none';
    inputSeconds.value = "";
    clearInterval(moveBoxInterval);
    startBtn.removeAttribute('disabled');
    pausedText.style.display = "none";
    pauseBtn.setAttribute('disabled',true);
    resetBtn.setAttribute('disabled',true);
}

function pause() {
    stopTimer = null;
    timer=null;
    targetBox.style.display = 'none';
    pausedText.style.display = 'block';
    clearInterval(moveBoxInterval);
    startBtn.removeAttribute('disabled');
    pauseBtn.setAttribute('disabled',true);
}

