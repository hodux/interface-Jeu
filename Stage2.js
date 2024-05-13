var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var start = 0
var GameTime = 30000
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50
canvas.style.border = "10px white solid";
canvas.style.backgroundImage = htmlImage;
canvas.style.backgroundSize = "100% 100%"
canvas.style.display = "block";
canvas.style.margin = "auto"
document.body.appendChild(canvas);
var gravity = 0.5;
var player = "img/pixel-art-asian-songkran-character-png.png";
var playerwalk = "img/pixel-art-asian-songkran-character-walk.png";
var playerdeath1 = "img/pixel-art-asian-songkran-character-death1.png";
var playerdeath2 = "img/pixel-art-asian-songkran-character-death2.png";
var playerdeath3 = "img/pixel-art-asian-songkran-character-death3.png";
var playerdeath4 = "img/pixel-art-asian-songkran-character-death4.png";

import { platform, platform2, platform3 } from './obstacle.js';



var joueur = {
    x: 10,
    y: canvas.height / 2 - 50,
    w: 50,
    h: 100,
    color: "blue",
    speed: 5,
    velocityY: 0
}

var baseHeight = canvas.height - floorHeight;

var cible = {
    x: canvas.width / 2 + 550,
    y: canvas.height / 2 - 200,
    w: 200,
    h: 200,
    color: "blue",
}

var mur = {
    x: 500,
    y: baseHeight - 500,
    w: 50,
    h: 500,
    color: "brown"
}


var keyDown = {}
var ImgJoueur = new Image()
ImgJoueur.src = player

function Murs(x, y, width, height, color, speed) {
    this.x = x
    this.y = y
    this.w = width
    this.h = height
    this.color = color
    this.speed = speed
    this.draw = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
        if (this.y < 0 || this.y + this.h > canvas.height) {
            this.speed = -this.speed
        }

        this.y += this.speed

    }
}

var dashCooldown = new Murs(1600, 750, 100, 100, "yellow", 0)

var deathwalls = [];

function drawMur() {
    if (canDash) {
        dashCooldown.draw();
    }

    if (deathwalls && deathwalls.length > 0) {
        deathwalls.forEach(function(deathwall) {
            deathwall.draw();
        });
    }
}

function drawJoueur() {
    ctx.fillStyle = joueur.color
    ctx.drawImage(ImgJoueur, joueur.x, joueur.y, joueur.w, joueur.h)
}

function drawMur2() {
    ctx.fillStyle = mur.color
    ctx.fillRect(mur.x, mur.y, mur.w, mur.h)
}

function drawCible() {
    ctx.fillStyle = joueur.color
    ctx.fillRect(cible.x, cible.y, cible.w, cible.h)
}

function drawPlatform() {
    ctx.fillStyle = platform.color
    ctx.fillRect(platform.x, baseHeight-platform.y, platform.w, platform.h)
    ctx.fillRect(platform2.x, baseHeight-platform2.y, platform2.w, platform2.h)
    ctx.fillRect(platform3.x, baseHeight-platform3.y, platform3.w, platform3.h)
}

function wall(j,c){
	if(collision(j, c)){
		if(65 in keyDown || 68 in keyDown){
			if(j.x < c.x+c.w/2){
			j.x-= j.speed
			}else{
				j.x+= j.speed
			}
		}
		if(83 in keyDown||87 in keyDown){
			if(j.y<c.y+c.h/2){
			j.y-= j.speed;
			}else{
			j.y+= j.speed;
			}
		}
	}
}


document.addEventListener("keydown", function (e) {
    keyDown[e.keyCode] = true
    // console.log(keyDown)
    if (keyDown[e.keyCode] == true) {
        start = 1
    }

})

document.addEventListener("keyup", function (e) {
    delete keyDown[e.keyCode]
    // console.log(keyDown)
})

var animationSpeed = 200;
var lastAnimationTime = 0;

function animatePlayer() {
    if (65 in keyDown || 68 in keyDown) {
        var currentTime = Date.now();
        if (currentTime - lastAnimationTime > animationSpeed) {
            if (ImgJoueur.src.endsWith(player)) {
                ImgJoueur.src = playerwalk;
            } else {
                ImgJoueur.src = player;
            }
            lastAnimationTime = currentTime;
        }
    } else {
        ImgJoueur.src = player;
    }
}

function applyGravity() {
    joueur.velocityY += gravity;
    joueur.y += joueur.velocityY;

    if (joueur.y + joueur.h > baseHeight) {
        joueur.y = baseHeight - joueur.h;
        joueur.velocityY = 0;
        jumped = false;
        doubleJumped = false;

        console.log("Ground touched")
    }
}

var jumped = false;
var doubleJumped = false;
function doubleJump() {
    if (87 in keyDown && !jumped) {
        console.log("Player jumped");
        joueur.velocityY = -10;
        jumped = true;
    } else if (32 in keyDown && !jumped) {
        joueur.velocityY = -10;
        jumped = true;
    }
    if ((32 in keyDown) && jumped) {
        if (!doubleJumped) {
            console.log("Player superjumped");
            joueur.velocityY = -13;
            doubleJumped = true;
        }
        jumped = true;
    }
}

var canDash = true;

function resetDash() {
    canDash = true;
}

function dashMove() {
    // dash to the left
    if (keyDown[16] && canDash && keyDown[65]) {
        console.log("Dash attemp")
        function movePlayer() {
            if (joueur.x > 0) {
                joueur.x -= 30;
            }
        }

        for (let i = 0; i < 6; i++) {
            setTimeout(movePlayer, i * 25);
        }

        canDash = false;
        setTimeout(resetDash, 3000);
    // dash to the right
    } else if (keyDown[16] && canDash && keyDown[68]) {
        console.log("Dash attemp")
        function movePlayer() {
            if (joueur.x < canvas.width - joueur.w) {
                joueur.x += 30;
            }
        }

        for (let i = 0; i < 6; i++) {
            setTimeout(movePlayer, i * 25);
        }

        canDash = false;
        setTimeout(resetDash, 3000);
    }
}


function clavier() {
    if (65 in keyDown && joueur.x > 0) {
        joueur.x -= joueur.speed;
    }
    if (68 in keyDown && joueur.x < canvas.width - joueur.w) {
        joueur.x += joueur.speed;
    }
    // Espace ou W pour sauter
    if (32 in keyDown && joueur.y + joueur.h >= baseHeight) {
        joueur.velocityY = -12;
    }
    // if (87 in keyDown  && joueur.y + joueur.h >= baseHeight) {
    //     joueur.velocityY = -12;
    // }
    wall(joueur, platform)
    wall(joueur, platform2)
    wall(joueur, platform3)
    wall(joueur, mur)
}

function collision(a, b) {
    if (a.x + a.w > b.x &&
        a.x < b.x + b.w &&
        a.y + a.h > b.y &&
        a.y < b.y + b.h
    ) { return (true) }
}

function deathCollision (deathMur) {
    if (collision(joueur, deathMur)) {
        joueur.x = 10
        joueur.y = canvas.height / 2 - 50
    }
}

function checkCollision() {
    if (deathwalls && deathwalls.length > 0) {
        deathwalls.forEach(function(murs) {
            deathCollision(murs);
        });
    }

    if (collision(joueur, cible)) {
        window.location.href = nextLevel;
    }


    var platforms = [platform, platform2, platform3];

    for (var i = 0; i < platforms.length; i++) {
        var currentPlatform = platforms[i];
        if (collision(joueur, currentPlatform)) {
            joueur.y = currentPlatform.y - joueur.h;
            joueur.velocityY = 0;
            jumped = false;
            doubleJumped = false;
            console.log("Platform touched");
            break;
        }
    }

    if (collision(joueur, mur)) {
        joueur.y = mur.y - joueur.h;
        joueur.velocityY = 0;
        jumped = false;
        doubleJumped = false;
        console.log("Mur touched");
    }
}


function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawJoueur();
    drawCible();
    drawPlatform();
    drawMur();
    drawMur2();
    clavier();
    applyGravity();
    checkCollision();
    animatePlayer();
    doubleJump();
    dashMove();
    requestAnimationFrame(game);
}
game()