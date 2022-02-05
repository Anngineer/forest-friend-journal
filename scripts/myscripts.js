// Button to jump to focus inside textArea
const moveFocusButton = document.querySelector("#focus-button");
const textArea = document.querySelector("textArea");
moveFocusButton.addEventListener("click", () => {
  focusJournal();
});

function focusJournal() {
  textArea.focus();
  textArea.select();
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
