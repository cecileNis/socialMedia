// Friends list
const friendsData = [
    { id: 1, firstName: "Audrey", lastName: "Dupont", profilePicture: "audrey.jpeg" },
    { id: 2, firstName: "Carlos", lastName: "Rossi", profilePicture: "carlos.jpeg" },
    { id: 3, firstName: "Martin", lastName: "Dupont", profilePicture: "martin.jpeg" },
    { id: 4, firstName: "Lyse", lastName: "Lefèvre", profilePicture: "lyse.jpeg" }
  ];
  
  // The friends list
  function renderFriendsList(friends) {
    const friendsList = document.getElementById("friends-list");
    friendsList.innerHTML = "";
  
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
        friendElement.addEventListener("dragover", onDragOver);
        friendElement.addEventListener("drop", onDrop);
    });
  }
  
  // Drag-and-drop functionality
  let draggedElement = null;
  
  function onDragStart(event) {
    draggedElement = event.target;
    setTimeout(() => {
        draggedElement.style.display = "none";
    }, 0);
  }
  
  function onDragOver(event) {
    event.preventDefault();
  }
  
  function onDrop(event) {
    event.preventDefault();
    if (draggedElement !== event.target) {
        const target = event.target;
        const parent = target.parentElement;
        const draggedId = draggedElement.dataset.id;
        const targetId = target.dataset.id;

        const draggedIndex = friendsData.findIndex(friend => friend.id == draggedId);
        const targetIndex = friendsData.findIndex(friend => friend.id == targetId);
  
        // Change position
        [friendsData[draggedIndex], friendsData[targetIndex]] = [friendsData[targetIndex], friendsData[draggedIndex]];
        renderFriendsList(friendsData);
    }
  
    draggedElement.style.display = "block";
    draggedElement = null;
  }
  
  // Initialize
  renderFriendsList(friendsData);