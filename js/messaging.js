let currentConversationId = null;
let conversationsData = []; // Stores conversation data

// store usernames and their profile pictures
const userImages = {
    "Moi": "cecile.jpeg",
    "Audrey Dupont": "audrey.jpeg",
    "Carlos Rossi": "carlos.jpeg"
};

// Function to get profile photo path
function getUserImage(sender) {
    const imagePath = `assets/img/messaging/${userImages[sender] || "utilisateurs.jpeg"}`;
    return imagePath;
}

// Load and view conversations
export function loadConversations() {
    const conversationList = document.getElementById("conversations");
    fetch("data/messages.json") // Get data from Json format
    .then(response => response.json())
    .then(data => {
        conversationsData = data.conversations;
        conversationList.innerHTML = "";
        conversationsData.forEach(conversation => renderConversation(conversation));
    })
    .catch(error => console.error("Erreur de chargement des conversations:", error));
}

// View every conversation
function renderConversation(conversation) {
    const conversationElement = document.createElement("div");
    conversationElement.classList.add("conversation");

    const participantName = conversation.participants.find(participant => participant.name !== "Moi").name;

    conversationElement.innerHTML = `
        <div class="conversation-header">
            <img src="assets/img/messaging/utilisateurs.jpeg" class="profile-pic">
            <div class="conversation-info">
            <h3>${participantName}</h3>
            <p id="preview-${conversation.id}">${truncateText(conversation.messages[conversation.messages.length - 1].text)}</p>
            <button class="toggle-messages" data-id="${conversation.id}">Voir plus</button>
            </div>
        </div>
        <div class="message-list" id="conversation-${conversation.id}"></div>
        <div class="send-message" id="send-message-${conversation.id}">
            <input type="text" id="messageInput-${conversation.id}" placeholder="Tapez votre message...">
            <button id="send-${conversation.id}" class="send-button">Envoyer</button>
        </div>
    `;

    // Add an event to load messages on click
    conversationElement.querySelector(".toggle-messages").addEventListener("click", toggleMessages);

    // Add an event to send a message
    const sendButton = conversationElement.querySelector(`#send-${conversation.id}`);
    sendButton.addEventListener("click", function() {
        sendMessage(conversation.id);
    });

    // Adds the full conversation element
    document.getElementById("conversations").appendChild(conversationElement);
}

// Load message history
function loadConversation(conversationId) {
    currentConversationId = conversationId;
    const conversationContainer = document.getElementById(`conversation-${conversationId}`);
    conversationContainer.innerHTML = "";
    // Finds conversation in local data
    const conversation = conversationsData.find(conv => conv.id === conversationId);
    if (conversation) {
        // Load messages from `localStorage`
        const savedMessages = localStorage.getItem(`conversation-${conversationId}`);
        if (savedMessages) {
            conversation.messages = JSON.parse(savedMessages);
        }
        conversation.messages.forEach(message => renderMessage(message, conversationContainer));
    }
    // Update button text
    const toggleButton = document.querySelector(`.toggle-messages[data-id="${conversationId}"]`);
    toggleButton.textContent = "Voir moins";
}

// Function to switch
function toggleMessages(event) {
    const conversationId = parseInt(event.target.dataset.id);
    const conversationContainer = document.getElementById(`conversation-${conversationId}`);
    const toggleButton = event.target;
    if (toggleButton.textContent === "Voir plus") {
        loadConversation(conversationId);
    } else {
        conversationContainer.innerHTML = "";
        toggleButton.textContent = "Voir plus";
    }
}

function truncateText(text, maxLength = 50) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

// Show each message
function renderMessage(message, container) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `
        <div class="message-header">
            <img src="${getUserImage(message.sender)}" class="profile-pic" alt="${message.sender}">
            <span>${message.sender}</span>
            <span class="timestamp">${new Date(message.timestamp).toLocaleString()}</span>
        </div>
        <p>${message.text}</p>
    `;
    container.appendChild(messageElement);
}

// Function to send a message to a specific conversation
function sendMessage(conversationId) {
    const messageInput = document.getElementById(`messageInput-${conversationId}`);
    const messageText = messageInput.value;
    if (!messageText.trim()) return;
    const newMessage = {
        sender: "Moi",
        text: messageText,
        timestamp: new Date().toISOString()
    };
    // Update
    const conversationContainer = document.getElementById(`conversation-${conversationId}`);
    renderMessage(newMessage, conversationContainer);
    messageInput.value = "";
    // Local data update
    const conversation = conversationsData.find(conv => conv.id === conversationId);
    if (conversation) {
        conversation.messages.push(newMessage);  // Add new message
        conversation.lastMessageTimestamp = newMessage.timestamp;
        // Save messages to `localStorage`
        localStorage.setItem(`conversation-${conversationId}`, JSON.stringify(conversation.messages))
    }
    // update the list
    updateConversationsList();
}

// Updating the list after sending a message
function updateConversationsList() {
    const conversationList = document.getElementById("conversations");
    conversationList.innerHTML = "";
    conversationsData.forEach(conversation => renderConversation(conversation));
}