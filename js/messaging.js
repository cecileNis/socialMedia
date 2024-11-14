let conversationsData = []; // Stores conversation data

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
    conversationElement.innerHTML = `
        <div class="conversation-header">
            <img src="assets/img/messaging/${conversation.participants[0].profilePicture}" class="profile-pic">
            <div class="conversation-info">
                <h3>${conversation.participants[0].name}</h3>
                <p id="preview-${conversation.id}">${conversation.messages[conversation.messages.length - 1].text}</p>
            </div>
        </div>
        <div class="message-list" id="conversation-${conversation.id}"></div>
    `;

    // Add each message to `message-list`
    const messageListElement = conversationElement.querySelector(`#conversation-${conversation.id}`);
    conversation.messages.forEach(message => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `
            <div class="message-header">
                <span>${message.sender}</span>
                <span class="timestamp">${new Date(message.timestamp).toLocaleString()}</span>
            </div>
            <p>${message.text}</p>
        `;
        messageListElement.appendChild(messageElement);
    });

    // Adds the full conversation element
    document.getElementById("conversations").appendChild(conversationElement);
}
