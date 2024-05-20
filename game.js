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
var music = new Audio()
music.src = "./music/gameMusic.mp3"
music.volume = 0.03
var jumpSound = new Audio()
jumpSound.src = "./music/jumpSound.mp3"
jumpSound.volume = 0.01

var joueur = {
    x: 10,
    y: canvas.height / 2 - 50,
    w: 100,
    h: 200,
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

// Alerte pour la fenetre, le jeu n'est pas RWD
function checkWindowDimensions() {
    if (window.innerWidth < 1912 && window.innerHeight < 932) {
        var language = sessionStorage.getItem("currentTranslation")

        if (language === 'en') {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your page isn't in fullscreen!",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Try again?",
                backdrop: `rgba(255, 42, 0, 1)`,
                footer: '<a href="Rules.html">Why do I have this issue?</a>'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
                setTimeout(() => {
                }, timeout);

        } else if (language === 'es') {

            Swal.fire({
                icon: "error",
                title: "¡Ups...",
                text: "¡Tu página no está en pantalla completa!",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "¿Intentar de nuevo?",
                backdrop: `rgba(255, 42, 0, 1)`,
                footer: '<a href="Rules.html">¿Por qué tengo este problema?</a>'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
                setTimeout(() => {
                }, timeout);    

        } else if (language === 'fr') {
            
            Swal.fire({
                icon: "error",
                title: "Oups...",
                text: "Votre page n'est pas en plein écran !",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Réessayer ?",
                backdrop: `rgba(255, 42, 0, 1)`,
                footer: '<a href="Rules.html">Pourquoi ai-je ce problème ?</a>'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
                setTimeout(() => {
                }, timeout);
      
        }
    } 
}

// Dash Cooldown
var dashCooldown = new Murs(1600, 750, 100, 100, "yellow", 0)
function drawMur() {
    // affiche dash cooldown 
    if (canDash) {
        dashCooldown.draw();
    }

    if (deathwalls && deathwalls.length > 0) {
        deathwalls.forEach(function(deathwall) {
            deathwall.draw();
        });
    }
    
    if (walls && walls.length > 0) {
        walls.forEach(function(walls) {
            walls.draw();
        });
    }

}

function drawJoueur() {
    ctx.fillStyle = joueur.color
    ctx.drawImage(ImgJoueur, joueur.x, joueur.y, joueur.w, joueur.h)
}

function drawCible() {
    ctx.fillStyle = joueur.color
    ctx.fillRect(cible.x, cible.y, cible.w, cible.h)
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

var grounded;
var jumped = false;
var doubleJumped = false;

function applyGravity() {
    joueur.velocityY += gravity;
    joueur.y += joueur.velocityY;

    // Si le joueur touche le sol
    if (joueur.y + joueur.h > baseHeight) {
        joueur.y = baseHeight - joueur.h;
        joueur.velocityY = 0;
        jumped = false;
        doubleJumped = false;
        grounded = true;
    }
}

// Fonction pour le saut et le double saut
function doubleJump() {
    // Si touche espace est activé et le joueur n'a pas jump
    if (32 in keyDown && !jumped) {
        joueur.velocityY = -15;
        jumpSound.play();
        jumped = true;
        grounded = false;
    } 
    // Si touche espace est activé et le joueur a jump, mais pas double jump
    else if (32 in keyDown && !doubleJumped && joueur.velocityY >= 0 && !grounded) {
        joueur.velocityY = -15;
        jumpSound.play();
        doubleJumped = true;
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
                joueur.x -= 50;
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
                joueur.x += 50;
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
        window.location.href="GameOver1.html";
    }
}

function checkCollision() {
    if (deathwalls && deathwalls.length > 0) {
        deathwalls.forEach(function(murs) {
            deathCollision(murs);
        });
    }

    if (walls && walls.length > 0) {
        walls.forEach(function(murs) {
            if (collision(joueur, murs)) {
                var xOverlap = Math.min(joueur.x + joueur.w, murs.x + murs.w) - Math.max(joueur.x, murs.x);
                var yOverlap = Math.min(joueur.y + joueur.h, murs.y + murs.h) - Math.max(joueur.y, murs.y);

                if (xOverlap < yOverlap) { // Collision par les côtés
                    if (joueur.x < murs.x) { // Collision par la gauche
                        joueur.x = murs.x - joueur.w;
                    } else { // Collision par la droite
                        joueur.x = murs.x + murs.w;
                    }
                } else { // Collision au top
                    joueur.y = murs.y - joueur.h;
                    joueur.velocityY = 0;
                    jumped = false;
                    doubleJumped = false;
                }
            }
        });
    }

    if (collision(joueur, cible)) {
        window.location.href = nextLevel;
    }
}


function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkWindowDimensions();
    drawJoueur();
    drawCible();
    drawMur();
    clavier();
    applyGravity();
    checkCollision();
    animatePlayer();
    doubleJump();
    dashMove();
    music.play();
    requestAnimationFrame(game);
}

game()