var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var start = 0;
var GameTime = 30000;
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;
canvas.style.border = "10px white solid";
canvas.style.backgroundImage = "url('img/school.jpg')";
canvas.style.display = "block";
canvas.style.margin = "auto";
document.body.appendChild(canvas);
var ImgJoueur = new Image();
var gravity = 0.5;
var player = new Image();
player.src = "img/pixel-art-asian-songkran-character-png.png";
var playerdeath1 = "img/pixel-art-asian-songkran-character-death1.png.png";
var playerdeath2 = "img/pixel-art-asian-songkran-character-death2.png.png";
var playerdeath3 = "img/pixel-art-asian-songkran-character-death3.png.png";
var playerdeath4 = "img/pixel-art-asian-songkran-character-death4.png.png";



var joueur = {
    x: 580,
    y: canvas.height / 2,
    w: 100,
    h: 200,
    color: "blue",
    speed: 5,
    velocityY: 0
};

var floorHeight = 50;
var baseHeight = canvas.height - floorHeight;

function drawJoueur() {
    ctx.drawImage(player, joueur.x, joueur.y, joueur.w, joueur.h);
}

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
    setTimeout(game, animationSpeed);
}

game();