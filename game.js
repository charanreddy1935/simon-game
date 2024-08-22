
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var index = 0;
var started=false;

function nextSequence() {
    index = 0
    level++;
    $("h1").text("Level  " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoseColor = buttonColors[randomNumber];
    gamePattern.push(randomChoseColor);

    $("#" + randomChoseColor).fadeOut(100).fadeIn(100);

    var song = new Audio("sounds/" + randomChoseColor + ".mp3");
    song.play();
}

$(document).keypress(function(){
    if(started==false){
        started=true;
        nextSequence();
    }
});


$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    palysound(userChosenColour);
    animatePress(userChosenColour);
    cheak(userChosenColour, index);
    index++;
})

function palysound(userChosenColour) {
    var song = new Audio("sounds/" + userChosenColour + ".mp3");
    song.play();
}

function animatePress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");

    setTimeout(function () { $("#" + currentcolor).removeClass("pressed") }, 100);
}




function cheak(userChosenColour, index) {
    if (userChosenColour != gamePattern[index]) {
        level = 0;
        gamePattern = [];
        started=false;
        palysound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
    }

    if (index == gamePattern.length - 1) {
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
}
