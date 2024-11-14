// Loading Feed Data
async function loadFeedData() {
    try {
        const response = await fetch('data/posts.json'); // request to retrieve the JSON file of feed posts
        if (!response.ok) {
            throw new Error('Erreur de chargement des données du feed');
        }
        const data = await response.json(); // Converts JSON response to a JS object and stores in data
        const storedData = localStorage.getItem('feedData'); // Checks if feed data is already in localStorage
        if (storedData) {
            return JSON.parse(storedData);
        } else {
            // no data in localStorage
            localStorage.setItem('feedData', JSON.stringify(data));
            return data;
        }
    } catch (error) {
        console.error(error);
    }
}

// Post display 
function displayPosts(posts) {
    const feedContainer = document.querySelector('.posts-container');
    feedContainer.innerHTML = '';
  
    // the posts table
    posts.forEach(post => {
        const postElement = createPostElement(post);
        feedContainer.appendChild(postElement);
    });
}

// Create HTML element post
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
  
    // Create item with user information
    const userInfoElement = document.createElement('div');
    userInfoElement.classList.add('user-info');
  
    // Create element profile photo
    const profilePicElement = document.createElement('img');
    profilePicElement.src = `assets/img/feed/${post.user.profilePicture}`;
    profilePicElement.alt = post.user.name;
    profilePicElement.classList.add('profile-pic');
  
    const userNameElement = document.createElement('span');
    userNameElement.textContent = post.user.name;
  
    userInfoElement.appendChild(profilePicElement);
    userInfoElement.appendChild(userNameElement);
  
    // Create post content element
    const postContentElement = document.createElement('div');
    postContentElement.classList.add('post-content');
  
    const postTextElement = document.createElement('p');
    postTextElement.textContent = post.content.text;
    postContentElement.appendChild(postTextElement);
  
    // Created and added, if image 
    if (post.content.image) {
        const postImageElement = document.createElement('img');
        postImageElement.src = `assets/img/feed/${post.content.image}`;
        postImageElement.alt = "Image du post"; // Image attribute
        postImageElement.classList.add('post-image');
        postContentElement.appendChild(postImageElement); // Add image post
        //action post image full screen
        postImageElement.addEventListener('click', () => showFullScreen(postImageElement.src));
    }

    // Will contain actions
    const postActionsElement = document.createElement('div');
    postActionsElement.classList.add('post-actions');

    // Add info, content, action
    postElement.appendChild(userInfoElement); 
    postElement.appendChild(postContentElement);
    postElement.appendChild(postActionsElement);
  
    return postElement;
}
// full screen image
function showFullScreen(imageUrl) {
    const fullScreenElement = document.createElement('div');
    fullScreenElement.classList.add('full-screen');
  
    const fullScreenImageElement = document.createElement('img');
    fullScreenImageElement.src = imageUrl;
    fullScreenImageElement.classList.add('full-screen-image');
  
    const closeButtonElement = document.createElement('span');
    closeButtonElement.classList.add('close-button');
    closeButtonElement.innerHTML = '&times;';
    closeButtonElement.addEventListener('click', () => fullScreenElement.remove());
  
    fullScreenElement.appendChild(fullScreenImageElement);
    fullScreenElement.appendChild(closeButtonElement);
    document.body.appendChild(fullScreenElement);
}
// Initialization and display
export function displayFeed() {
    loadFeedData().then(posts => {
        if (posts) {
        displayPosts(posts);
       }
    });
}  