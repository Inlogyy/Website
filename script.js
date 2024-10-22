const socket = io(window.location.origin);

const chatContainer = document.getElementById('chat-container');
const messageForm = document.getElementById('message-form');
const usernameInput = document.getElementById('username-input');
const messageInput = document.getElementById('message-input');

function displayMessage(username, message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${username}: ${message}`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

socket.on('chat history', (messages) => {
    messages.forEach(msg => displayMessage(msg.username, msg.message));
});

socket.on('chat message', (msg) => {
    displayMessage(msg.username, msg.message);
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (username && message) {
        socket.emit('chat message', { username, message });
        messageInput.value = '';
    }
});
