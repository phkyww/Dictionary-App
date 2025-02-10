let userInput = document.querySelector(".search input");
let infoText = document.querySelector(".info-text");

//hide list until search
let list = document.querySelector("ul");
list.style.display = "none";

//show words
function showWords(result, word) {
  //checking that searched word is exist or not
  if (result.title) {
    infoText.style.color = "red";
    infoText.innerHTML = `<b>${word}</b> doesn't exist!!`;
  } else {
    userInput.value = "";
    infoText.style.color = "green";
    infoText.innerHTML = `searched <b>${word}</b>`;
    console.log(result);
  }
}

//search words
function searchWords(word) {
  infoText.style.color = "#000";
  infoText.innerText = `searching ${word}`;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((result) => showWords(result, word));
}

//user input
userInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && e.target.value) {
    searchWords(e.target.value);
  }
});
