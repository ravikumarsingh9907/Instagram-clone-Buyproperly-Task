// Importing post data
import { id, imgUrl, caption, likes, likesLocation } from "./data.js";

// Integreting into html
const wrapper = document.querySelector(".wrapper");
for (let i = 0; i < id.length; i++) {
  const container = document.createElement("div");
  container.classList.add("container");
  container.setAttribute("id", `${id[i]}`);

  container.innerHTML = `
      <!-- post image container -->
      <a href="page2.html">
        <div class="overlay hide"></div>
        <div class="like-heart hide">
          <i class="bx bxs-heart"></i>
        </div>
        <div class="like-count">
          <p class="total-like count-likes hide">${likes[i]}</p>
        </div>
        <div class="img-container">
          <img class="image-url" id="${id[i]}" src="${imgUrl[i]}" alt=img">
        </div>
      </a>
      <div class="name-like-comment-container">
        <!-- posted image name -->
        <div class="post-name">
          <p class="name">${caption[i]}</p>
        </div>
        <!-- like and comment container -->
        <div class="like-comment-container">
          <div class="like-btn-container">
            <button class="like-btn total-like" value="${id[i]}">💜${likes[i]}</button>
          </div>
          <div class="comment-btn">
            <a href="page2.html"><button class="comment" id="${id[i]}" value="${imgUrl[i]}">🗨️0</button></a>
          </div>
        </div>
      </div>`;

  // Appending into HTML
  wrapper.append(container);
}

// Selecting all like buttons
const likeBtn = document.querySelectorAll(".like-btn");

// Getting keys of like and id paired array
const keysOfLikes = Object.keys(likesLocation);

// Getting values from likesLocaion
const value = Object.values(likesLocation);
let count = 0;

// Iterating over like buttons
likeBtn.forEach(function (event) {
  event.addEventListener("click", () => {
    for (let i = 0; i < keysOfLikes.length; i++) {
      // Getting specified html elements from Node list
      const overlay = document.getElementsByClassName("overlay")[i];
      const heart = document.getElementsByClassName("like-heart")[i];
      const likeCount = document.getElementsByClassName("count-likes")[i];

      // Removing class "hide" from above selected html elements
      const likeAnimation = function () {
        overlay.classList.remove("hide");
        heart.classList.remove("hide");
        likeCount.classList.remove("hide");
      };

      // Adding class "hide" function
      const HideLikeAnimation = function () {
        overlay.classList.add("hide");
        heart.classList.add("hide");
        likeCount.classList.add("hide");
      };

      // Checking condition wheather the value is true or not
      if (keysOfLikes[i] == event.value) {
        count = value[i] + 1;
        value[i] = count;
        likeCount.textContent = value[i];
        likeBtn[i].textContent = `💜${value[i]}`;
        likeAnimation();
      }

      // calling Adding class "hide" function
      setTimeout(HideLikeAnimation, 1400);
    }
  });
});

// Selecting comment buttons and image urls
const commentBtn = document.querySelectorAll(".comment");
const imageUrl = document.querySelectorAll(".image-url");

// Iterating over comment buttons
commentBtn.forEach(function (event) {
  event.addEventListener("click", () => {
    const getId = event.getAttribute("id");
    const getSrc = event.value;
    localStorage.setItem("postId", getId);
    localStorage.setItem("getSrcUrl", getSrc);
  });
});

// Iterating over images
imageUrl.forEach(function (event) {
  event.addEventListener("click", () => {
    const getId = event.getAttribute("id");
    const getSrc = event.getAttribute("src");
    localStorage.setItem("postId", getId);
    localStorage.setItem("getSrcUrl", getSrc);
  });
});
