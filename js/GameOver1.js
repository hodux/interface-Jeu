var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var start = 0;
var GameTime = 30000;
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;
canvas.style.border = "10px white solid";
canvas.style.backgroundImage = "url('../img/heaven.jpg')";
canvas.style.display = "block";
canvas.style.margin = "auto";
canvas.style.backgroundSize = "100% 100%"
document.body.appendChild(canvas);
var ImgJoueur = new Image();
var gravity = 0.5;
var player = new Image();

var playerdeath1 = "../img/death1.png";
var playerdeath2 = "../img/death2.png";
var playerdeath3 = "../img/death3.png";
var playerdeath4 = "../img/death4.png";
var music = new Audio()
music.src = "../music/gameOver.mp3"
music.volume = 0.05

var isMusicPlaying = false;



var joueur = {
    x: canvas.width / 2.1,
    y: canvas.height / 1.6,
    w: 100,
    h: 200,
    color: "blue",
    speed: 5,
    velocityY: 0
};

var floorHeight = 50;
var baseHeight = canvas.height - floorHeight;



var deathImages = [playerdeath1, playerdeath2, playerdeath3, playerdeath4];
var currentDeathIndex = 0;

function drawDeathAnimation() {

    ImgJoueur.src = deathImages[currentDeathIndex];
    ctx.drawImage(ImgJoueur, joueur.x, joueur.y, joueur.w, joueur.h);
    currentDeathIndex++;
    if (currentDeathIndex >= deathImages.length) {
        currentDeathIndex = 0;
    }
}

var animationSpeed = 300;

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDeathAnimation();
    if (!isMusicPlaying) { 
        music.play();
        isMusicPlaying = true; 
    }
    setTimeout(game, animationSpeed);
}

game();