// Importing
import { likesLocation, captionLocation, codeLocation } from "./data.js";
import { comments } from "./comments.js";

// getting values from browsers local storage
const getId = localStorage.getItem("postId");
const getImgSrc = localStorage.getItem("getSrcUrl");

// initializing like, caption and code
var likes = 0;
var caption = 0;
var code = 0;
Object.keys(likesLocation).forEach((key) => {
  if (getId == key) {
    likes = likesLocation[key];
  }
});
Object.keys(captionLocation).forEach((key) => {
  if (getId == key) {
    caption = captionLocation[key];
  }
});
Object.keys(codeLocation).forEach((key) => {
  if (getId == key) {
    code = codeLocation[key];
  }
});

// selecting elements for HTML
const commentForm = document.querySelector(".submit-btn");
const username = document.getElementById("username");
const feedback = document.getElementById("feedback");
const AppendBefore = document.querySelector(".leave-comment");

// Getting key of code data
const getCodeKey = Object.keys(codeLocation);

// Getting feedback data
const Objdata = comments[code];

// Checking Condition
if (!comments[code]) {
  const userFeedback = document.createElement("div");
  userFeedback.classList.add("comments");
  userFeedback.innerHTML = `<span class="username"></span>
  <p class="feedback"></p>`;

  AppendBefore.before(userFeedback);
} else {
  for (let i = 0; i < getCodeKey.length; i++) {
    if (getCodeKey[i] == getId) {
      for (const feedbackData of Objdata) {
        const userFeedback = document.createElement("div");
        userFeedback.classList.add("comments");
        userFeedback.innerHTML = `<span class="username">${feedbackData.user}</span>
      <p class="feedback">${feedbackData.text}</p>`;

        AppendBefore.before(userFeedback);
      }
    }
  }
}

// For Append purpose
const AppendIn = document.querySelector(".post-container");

// Creating and Appending elements into HTML
const postContainer = document.createElement("div");
postContainer.classList.add("image-section");
postContainer.innerHTML = `
<!-- post image container -->
<div class="img-container">
    <div class="overlay hide"></div>
    <div class="like-heart hide">
        <i class="bx bxs-heart"></i>
    </div>
    <div class="like-count">
      <p class="total-like count-likes hide">${likes}</p>
    </div>
  <img src="${getImgSrc}" alt=img">
</div>
<div class="name-like-comment-container">
  <!-- posted image name -->
  <div class="post-name">
    <p class="name">${caption}</p>
  </div>
  <!-- like and comment container -->
  <div class="like-comment-container">
    <div class="like-btn">
      <button class="btn-like">💜${likes}</button>
    </div>
    <div class="comment-btn">
      <a href="#"><button>🗨️</button></a>
    </div>
  </div>
</div>`;

AppendIn.prepend(postContainer);

const displayAlert = document.querySelector(".alert");

// Lesting to the feedback form
commentForm.addEventListener("click", (e) => {
  e.preventDefault();
  const getUsername = username.value;
  const getFeedback = feedback.value;

  const hideAlert = function () {
    displayAlert.classList.add("hide");
  };

  if (getUsername.length == 0 || getFeedback.length == 0) {
    displayAlert.classList.remove("hide");

    setTimeout(hideAlert, 2000);
  } else {
    const userFeedback = document.createElement("div");
    userFeedback.classList.add("comments");
    userFeedback.innerHTML = `<span class="username">${getUsername}</span>
  <p class="feedback">${getFeedback}</p>`;

    AppendBefore.before(userFeedback);
  }

  username.value = "";
  feedback.value = "";
});

// Likes animation functionality
const likeBtn = document.querySelector(".like-btn");

const overlay = document.querySelector(".overlay");
const heart = document.querySelector(".like-heart");
const likeCount = document.querySelector(".count-likes");
const likesOnBtn = document.querySelector(".btn-like");

let count = likeCount.textContent;
likeBtn.addEventListener("click", () => {
  const likeAnimation = function () {
    overlay.classList.remove("hide");
    heart.classList.remove("hide");
    likeCount.classList.remove("hide");
  };

  const HideLikeAnimation = function () {
    overlay.classList.add("hide");
    heart.classList.add("hide");
    likeCount.classList.add("hide");
  };

  count++;
  likeCount.textContent = count;
  likesOnBtn.textContent = `💜${count}`;

  likeAnimation();

  setTimeout(HideLikeAnimation, 1400);
});
