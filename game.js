const namespace = 'namespace';
const applicationID = '?';
let message = {msg: positionObj}; message = JSON.stringify(message);


function initializeApi() {
    const sessionRequest = new chrome.cast.SessionRequest(applicationID);

}

document.getElementById('initialize').addEventListener('click', () => {
    initializeApi();
});
document.getElementById('up').addEventListener('click', () => {
    handleUp();
});
document.getElementById('down').addEventListener('click', () => {
    handleDown();
});
document.getElementById('left').addEventListener('click', () => {
    handleLeft();
});
document.getElementById('right').addEventListener('click', () => {
    handleRight();
});


// Créer une fonction pour chaque événement
function handleUp() {

}
function handleDown() {

}
function handleLeft() {

}
function handleRight() {

}