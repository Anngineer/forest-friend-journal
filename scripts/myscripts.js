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
  // Encode the message
  let encoded = btoa(message);
  console.log(`${message} becomes ${encoded}`);
  // linkToShare.value = encoded;
  // Our location for this website
  // NOTE: so, this is using our current url but in the future
  // it will be using the url for the decoder page instead
  let myURL = "https://anngineer.github.io/ffj-entry/";
  console.log(myURL);
  let newURL = `${myURL}#${encoded}`;
  linkToShare.value = newURL;
  // Change the link to visible with a class
  // Set the link url for the hyperlink to the url you created
  messageHyperlink.setAttribute("href", newURL);
}
