// Friends list
const defaultFriendsData = [
    { id: 1, firstName: "Audrey", lastName: "Dupont", profilePicture: "audrey.jpeg" },
    { id: 2, firstName: "Carlos", lastName: "Rossi", profilePicture: "carlos.jpeg" },
    { id: 3, firstName: "Martin", lastName: "Dupont", profilePicture: "martin.jpeg" },
    { id: 4, firstName: "Lyse", lastName: "Lefèvre", profilePicture: "lyse.jpeg" }
];

// Load friends 
const savedFriends = localStorage.getItem("friendsData");
let friendsData = savedFriends ? JSON.parse(savedFriends) : [...defaultFriendsData];

// The friends list
function renderFriendsList(friends) {
    const friendsList = document.getElementById("friends-list");
    friendsList.innerHTML = "";

    // Search without result
    if (friends.length === 0) {
        friendsList.innerHTML = `<p class="no-results">Aucun ami trouvé.</p>`;
        return;
    }

    friends.forEach(friend => {
        const friendElement = document.createElement("div");
        friendElement.classList.add("friend-item");
        friendElement.draggable = true;
        friendElement.dataset.id = friend.id;

        friendElement.innerHTML = `
            <div class="friend-info">
                <img src="assets/img/friends/${friend.profilePicture}" alt="${friend.firstName}" class="profile-pic">
                <span class="name">${friend.firstName} ${friend.lastName}</span>
            </div>
            <a href="#messaging" class="message-link" data-id="${friend.id}">Message</a>
        `;

        // Add to the friends list
        friendsList.appendChild(friendElement);

        // Add drag-and-drop events
        friendElement.addEventListener("dragstart", onDragStart);
        friendElement.addEventListener("dragend", onDragEnd);
        friendElement.addEventListener("dragover", onDragOver);
        friendElement.addEventListener("drop", onDrop);
    });
}

// Filter friends on search
document.getElementById("search-friends").addEventListener("input", function (e) {
    const searchText = e.target.value.toLowerCase();
    const filteredFriends = friendsData.filter(friend => {
        return (
            friend.firstName.toLowerCase().includes(searchText) ||
            friend.lastName.toLowerCase().includes(searchText)
        );
    });

    renderFriendsList(filteredFriends);
});

// Drag-and-drop functionality
let draggedElement = null;

function onDragStart(event) {
    draggedElement = event.target;
    setTimeout(() => {
        draggedElement.classList.add("dragging");
    }, 0);
}

function onDragEnd() {
    draggedElement.classList.remove("dragging");
    draggedElement = null;
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    event.preventDefault();
    if (draggedElement && draggedElement !== event.target.closest(".friend-item")) {
        const draggedId = parseInt(draggedElement.dataset.id);
        const targetId = parseInt(event.target.closest(".friend-item").dataset.id);

        const draggedIndex = friendsData.findIndex(friend => friend.id === draggedId);
        const targetIndex = friendsData.findIndex(friend => friend.id === targetId);

        // Change position
        [friendsData[draggedIndex], friendsData[targetIndex]] = [friendsData[targetIndex], friendsData[draggedIndex]];

        renderFriendsList(friendsData);
    }
}

// Initialize
renderFriendsList(friendsData);