// Nav javascript
// JS for opening and shutting the drop down menu
const dropdownButton = document.getElementById("dropdown-button");
const rightNav = document.getElementById("right-nav");
dropdownButton.addEventListener("click", () => {
  rightNav.classList.toggle("dropdown");
});

// JS for closing drop down menu when a link is clicked
const linkWrite = document.getElementById("link-write");
const linkPrompts = document.getElementById("link-prompts");
const linkAbout = document.getElementById("link-about");

linkWrite.addEventListener("click", () => {
  closeMenu();
});
linkPrompts.addEventListener("click", () => {
  closeMenu();
});
linkAbout.addEventListener("click", () => {
  closeMenu();
});
function closeMenu() {
  if (document.getElementById("right-nav").classList.contains("dropdown")) {
    document.getElementById("right-nav").classList.remove("dropdown");
  }
}

// Button to jump to focus inside textArea
const moveFocusButton = document.querySelector("#focus-button");
const textArea = document.querySelector("textArea");
moveFocusButton.addEventListener("click", () => {
  focusJournal();
});
linkWrite.addEventListener("click", () => {
  focusJournal();
});

function focusJournal() {
  textArea.focus();
  textArea.select();
}

// JS for showing and hiding the app info
const introContainer = document.getElementById("intro-container");
const moreInfoButton = document.getElementById("more-info-button");

// moreInfoButton.addEventListener("click", () => {
moreInfoButton.addEventListener("click", () => {
  introContainer.classList.toggle("show");
});

// --------------------------------------------
// JAVASCRIPT FOR THE Bear Prompt

let bearPrompts = [
  `"Need any help coming up with what to write about in the journal letter? Strum the bear's guitar with a click and he'll ask you a question here for you to answer. "`,
  ` "If you were to dream about something tonight, what would you like it to be?"`,
  ` "What were you able to start or complete today? Little things add up!"`,
  `"Did you drink water and take any medications that you’re supposed to?"`,
  `"Who is someone you admire?"`,
  `"If you could jump into any film, what would it be and why?"`,
];
const guitarStrum = document.getElementById("guitar-strum");
const bearButton = document.querySelector("#bear-button");
const bear = document.querySelector("#bear");
const suggestionBox = document.querySelector("#suggestion-box");
const soundImage = document.getElementById("music-note");
promptNumber = 0;
bearButton.addEventListener("click", () => {
  changePrompt();
  console.log("OOooooh you poked the bear!");
});

suggestionBox.addEventListener("click", () => {
  changePrompt();
  console.log("OOooooh you poked the bear!");
});

function changePrompt() {
  if (promptNumber < 5) {
    promptNumber += 1;
    // console.log(promptNumber);
    changePromptInnerText();
  } else {
    promptNumber = 1;
    // console.log(promptNumber);
    // console.log("Nah, no more times!");
    changePromptInnerText();
  }
}
function changePromptInnerText() {
  suggestionBox.innerText = bearPrompts[promptNumber];
  guitarStrum.currentTime = 0;
  guitarStrum.play();
  animateMusic();
}

function animateMusic() {
  // get the position of the bear
  const rect = bear.getBoundingClientRect();
  const width = (bear.offsetWidth / 3) * 2;
  const halfHeight = bear.offsetHeight / 3;
  let left = rect.left + width + window.scrollX;
  let top = rect.top + halfHeight + window.scrollY;
  console.log(rect);
  console.log(`left is ${left}`);
  console.log(`top is ${top}`);
  // put that position into a function to place the music image
  positionMusic(left, top);
}

function positionMusic(left, top) {
  // move the image to that location
  soundImage.style.left = `${left}px`;
  soundImage.style.top = `${top}px`;
  // use css to make it visible
  soundImage.classList.remove("hidden");
  //animate the image using js
  floatImage(left, top);
}

var idAnimate = null;
function floatImage(left, top) {
  clearInterval(idAnimate);
  let tick = 0;
  console.log("cleared idAnimate");
  idAnimate = setInterval(move, 1);
  function move() {
    if (tick === 45) {
      clearInterval(idAnimate);
      soundImage.classList.add("hidden");
    } else {
      tick++;
      soundImage.style.left = `${left + tick}px`;
      soundImage.style.top = `${top - tick}px`;
    }
  }
}

// --------------------------------------------
// JAVASCRIPT FOR THE MESSAGE COMPONENT
// This was inspired by the secret message decoder app tutorial from Colt Steel and Stephen Grider's Modern Javascript Bootcamp Course.

const messageInput = document.querySelector("#journal-input");
const form = document.querySelector("form");
const createButton = document.querySelector("#submit-button");
const linkToShare = document.querySelector("#link-to-share");
const messageHyperlink = document.querySelector("#message-hyperlink");
const linkContainer = document.querySelector("#link-container");
// Event listener to make the link if you hit ENTER
//We're doing this because the hex can't handle <br> at this level
messageInput.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    // console.log("wooooooooo");
    createMessage();
  }
});

// Event Listener for the Create Journal Page Button submitting the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createMessage(e);
});

function createMessage() {
  let message = messageInput.value;
  // Get rid of any line breaks.
  messageNoBreak = message.replace(/(\r\n|\n|\r)/gm, " ");
  console.log(messageNoBreak);
  // Encode the message
  let encoded = btoa(messageNoBreak);
  console.log(`${message} becomes ${encoded}`);
  let myURL = "https://anngineer.github.io/ffj-entry/";
  console.log(myURL);

  // Set the link url for the hyperlink to the url you created
  let newURL = `${myURL}#${encoded}`;
  linkToShare.value = newURL;

  messageHyperlink.setAttribute("href", newURL);
  // Change the link to visible with a class
  linkContainer.classList = "";
  linkToShare.focus();
  form.reset();
  messageInput.value = message;
}

linkToShare.addEventListener("click", () => {
  linkToShare.select();
});
linkToShare.addEventListener("focus", () => {
  linkToShare.select();
});
