var hours = minutes = seconds = miliseconds = 0;
var prev_hours = prev_minutes = prev_seconds = prev_miliseconds = undefined;
var timeUpdate;
function updateTime(prev_hours,prev_minutes,prev_seconds,prev_miliseconds){
    var startTime = new Date();  //fetch current Time

    timeUpdate = setInterval(function(){
        //calculate the elapsed time in miliseconds
        var timeElapsed = new Date().getTime() - startTime.getTime();


        //calculate Hours  - current(ms)/ms/s/m = hours
        hours = parseInt(timeElapsed/1000/60/60) + prev_hours;

        //calculate Minutes
        minutes = parseInt(timeElapsed / 1000 / 60) + prev_minutes;
        if(minutes > 60) minutes %= 60;

        //calculate Seconds 
        seconds = parseInt(timeElapsed/1000) + prev_seconds;
        if(seconds > 60) seconds %= 60;

        //calculate Mili Seconds
        miliseconds = timeElapsed + prev_miliseconds;
        if(miliseconds > 1000) miliseconds %= 1000;

        //set the Stopwatch
        setStopwatch(hours,minutes,seconds,miliseconds);
    },25)
}

function setStopwatch(hours,minutes,seconds,miliseconds){
document.getElementById('showHours').innerHTML = hours;
document.getElementById('showMinutes').innerHTML = prependZero(minutes);
document.getElementById('showSeconds').innerHTML = prependZero(seconds);
document.getElementById('showMiliseconds').innerHTML = miliseconds;

}

function prependZero(time) {
    if(time <= 9){
        time = "0" + time;
    }
    else{
        console.log(time)
    }
    return time;
}

function playClick(){
    let button = document.getElementById("start_pause_resume");
    if(button.innerText === "Start"){
        document.getElementById('resetButton').style.display = "inline-block";
        button.innerText = "Pause";
        button.className = "btn btn-primary"
        updateTime(0,0,0,0);
    } 
    else if(button.innerText === "Pause"){
        clearInterval(timeUpdate);
        button.innerText = "Resume";
        button.className = "btn btn-success"

    }
    else if(button.innerText === "Resume")
    {

        prev_hours = parseInt(document.getElementById('showHours').innerText)
        prev_minutes = parseInt(document.getElementById('showMinutes').innerText)
        prev_seconds = parseInt(document.getElementById('showSeconds').innerText)
        prev_miliseconds = parseInt(document.getElementById('showMiliseconds').innerText)
        
        updateTime(prev_hours, prev_minutes, prev_seconds, prev_miliseconds);

        button.innerText = "Pause"
        button.className = "btn btn-primary"
    }
}

function resetClick(){
    document.getElementById('resetButton').style.display = "none";
    if(timeUpdate) clearInterval(timeUpdate);
    setStopwatch(0,0,0,0);
    document.getElementById("start_pause_resume").innerText = "Start";
    document.getElementById("start_pause_resume").className = "btn btn-warning"
    document.getElementById('showMiliseconds').innerHTML = "000";
}

