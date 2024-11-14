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

    // Reaction post
    const reactions = post.reactions || { like: 0, dislike: 0, love: 0 };
    const reactionTypes = ['like', 'dislike', 'love'];

    // Create reaction buttons
    reactionTypes.forEach(reaction => {
        const button = document.createElement('button');
        button.classList.add('reaction-btn');
        button.dataset.postId = post.id;
        button.dataset.reaction = reaction;
        button.innerHTML = `${getReactionEmoji(reaction)} ${reactions[reaction]}`;
        button.addEventListener('click', handleReaction);
        // Check user already reacted
        if (post.userReactions && post.userReactions.includes(reaction)) {
        button.classList.add('reacted');
        }
        postActionsElement.appendChild(button);
    });

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

// reaction emoji
function getReactionEmoji(reaction) {
    switch (reaction) {
        case 'like':
        return '<img src="assets/img/feed/like.png" alt="Like" class="icon-like" />';
        case 'dislike':
        return '<img src="assets/img/feed/dislike.png" alt="Dislike" class="icon-dislike" />';
        case 'love':
        return '<img src="assets/img/feed/love.png" alt="Love" class="icon-love" />';
        default:
        return '';
    }
}
// Handle reaction interaction
function handleReaction(event) {
    const button = event.target.closest('.reaction-btn');
    if (!button) return; 

    const postId = button.dataset.postId;
    const reaction = button.dataset.reaction;

    if (button.classList.contains('reacted')) {
        button.classList.remove('reacted');
        updateReactionCount(postId, reaction, -1);
    } else {
        button.classList.add('reacted');
        updateReactionCount(postId, reaction, 1);
    }
}

// Update reaction count
function updateReactionCount(postId, reaction, count) {
    loadFeedData().then(posts => {
        const post = posts.find(post => post.id === postId);
        if (post.reactions) {
            post.reactions[reaction] += count;
            // Update user reaction
            if (!post.userReactions) {
                post.userReactions = [];
            }
            if (count > 0) {
                post.userReactions.push(reaction);
            } else {
                const index = post.userReactions.indexOf(reaction);
                if (index > -1) {
                    post.userReactions.splice(index, 1);
                }
            }
            displayPosts(posts);
            // data in localStorage
            localStorage.setItem('feedData', JSON.stringify(posts));
        }
    });
}

// Initialization and display
export function displayFeed() {
    loadFeedData().then(posts => {
        if (posts) {
        displayPosts(posts);
       }
    });
}  