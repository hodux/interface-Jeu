var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var start = 0
var GameTime = 30000
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50
canvas.style.border = "10px white solid";
canvas.style.backgroundImage = "url('img/school.jpg')";
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

// Chromecast
// const context = cast.framework.CastReceiverContext.getInstance();
// const CHANNEL = "";

// context.addCustomMessageListener(CHANNEL, handleSender);

// function handleSender(customEvent) {
//     console.log(joueur[0])
//     console.log(customEvent.data.xJoueur)

// }


var joueur = {
    x: 10,
    y: canvas.height / 2 - 50,
    w: 200,
    h: 200,
    color: "blue",
    speed: 5,
    velocityY: 0
}

var baseHeight = canvas.height - 150;

var cible = {
    x: canvas.width / 2 + 550,
    y: canvas.height / 2 - 200,
    w: 200,
    h: 200,
    color: "blue",
}

var platform = {
    x: 500,
    y: baseHeight - 100,
    w: 200,
    h: 20,
    color: "brown"
}

var platform2 = {
    x: 1000,
    y: baseHeight - 200,
    w: 200,
    h: 20,
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

var mur1 = new Murs(200, 0, 300, 50, "pink", 3)

function drawMur() {
    mur1.draw()
}

function drawJoueur() {
    ctx.fillStyle = joueur.color
    ctx.drawImage(ImgJoueur, joueur.x, joueur.y, joueur.w, joueur.h)
}

function drawCible() {
    ctx.fillStyle = joueur.color
    ctx.fillRect(cible.x, cible.y, cible.w, cible.h)
}

function drawPlatform() {
    ctx.fillStyle = platform.color
    ctx.fillRect(platform.x, platform.y, platform.w, platform.h)
    ctx.fillRect(platform2.x, platform2.y, platform2.w, platform2.h)
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

    // Touches ground
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
        joueur.velocityY = -12;
        jumped = true;
    } else if (32 in keyDown && !jumped) {
        joueur.velocityY = -12;
        jumped = true;
    }
    if ((32 in keyDown) && jumped) {
        if (!doubleJumped) {
            console.log("Player superjumped");
            joueur.velocityY = -15;
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
}

function collision(a, b) {
    if (a.x + a.w > b.x &&
        a.x < b.x + b.w &&
        a.y + a.h > b.y &&
        a.y < b.y + b.h
    ) { return (true) }
}

function checkCollision() {
    if (collision(joueur, cible) ||
        collision(joueur, mur1)) {
        joueur.x = 10
        joueur.y = canvas.height / 2 - 50
    }

    if (collision(joueur, platform)) {
        joueur.y = platform.y - joueur.h;
        joueur.velocityY = 0;
        jumped = false;
        doubleJumped = false;
        console.log("Platform touched")
    }

    if (collision(joueur, platform2)) {
        joueur.y = platform2.y - joueur.h;
        joueur.velocityY = 0;
        jumped = false;
        doubleJumped = false;
        console.log("Platform2 touched")
    }
}

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawJoueur();
    drawCible();
    drawPlatform();
    drawMur();
    clavier();
    applyGravity();
    checkCollision();
    animatePlayer();
    doubleJump();
    dashMove();
    requestAnimationFrame(game);
}

game()