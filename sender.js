const applicationID = 

// Event listeners for button clicks
document.getElementById('initialize').addEventListener('click', handleConnexion);
document.getElementById('up').addEventListener('click', handleUp);
document.getElementById('down').addEventListener('click', handleDown);
document.getElementById('left').addEventListener('click', handleLeft);
document.getElementById('right').addEventListener('click', handleRight);

let session = null;
let castApiInitialized = false;

// Initialize the Cast API
function initializeApi() {
    const sessionRequest = new chrome.cast.SessionRequest(applicationID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

// Callback for successful initialization of Cast API
function onInitSuccess() {
    castApiInitialized = true;
}

// Callback for session listener
function sessionListener(e) {
    session = e;
}

// Callback for receiver listener
function receiverListener(e) {
    if (e === 'available') {
        console.log('Receiver available');
    } else {
        console.log('Receiver unavailable');
    }
}

// Function to handle sending messages
function sendMessage(message) {
    if (session && castApiInitialized) {
        session.sendMessage(namespace, message, onSuccess, onError);
    }
}

function handleConnexion() {
    initializeApi();
}

// Event handling functions for button clicks
function handleUp() {
    const message = { action: 'up' }; // Define your message format
    sendMessage(JSON.stringify(message));
}

function handleDown() {
    const message = { action: 'down' }; // Define your message format
    sendMessage(JSON.stringify(message));
}

function handleLeft() {
    const message = { action: 'left' }; // Define your message format
    sendMessage(JSON.stringify(message));
}

function handleRight() {
    const message = { action: 'right' }; // Define your message format
    sendMessage(JSON.stringify(message));
}

// Callback for successful message send
function onSuccess() {
    console.log('Message sent successfully');
}

// Callback for message send error
function onError(error) {
    console.error('Error sending message:', error);
}
