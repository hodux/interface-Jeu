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


function drawGameOver() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game over message on the canvas
    ctx.font = "40px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Tu es mort", canvas.width / 2, canvas.height / 2 - 380);

    // Create the restart link on the canvas
    ctx.font = "20px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Recommencer", canvas.width / 2, canvas.height / 2 - 350);

    // Create the menu link on the canvas
    ctx.fillText("Retour au menu", canvas.width / 2, canvas.height / 2 - 320);

    // Add event listener for canvas click
    canvas.addEventListener('click', canvasClickHandler);
}

function canvasClickHandler(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const restartLinkX = canvas.width / 2 - 60;
    const restartLinkY = canvas.height / 2 - 350;
    const restartLinkWidth = 120;
    const restartLinkHeight = 20;

    const menuLinkX = canvas.width / 2 - 60;
    const menuLinkY = canvas.height / 2 - 320;
    const menuLinkWidth = 120;
    const menuLinkHeight = 20;

    if (clickX >= restartLinkX && clickX <= restartLinkX + restartLinkWidth && clickY >= restartLinkY && clickY <= restartLinkY + restartLinkHeight) {
        window.location.href = "Stage1.html"; 
    }
    if (clickX >= menuLinkX && clickX <= menuLinkX + menuLinkWidth && clickY >= menuLinkY && clickY <= menuLinkY + menuLinkHeight) {
        window.location.href = "Menu.html"; 
    }
}




drawGameOver();



function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGameOver();
    requestAnimationFrame(game);
}

game()