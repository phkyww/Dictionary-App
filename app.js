let userInput = document.querySelector(".search input");
let infoText = document.querySelector(".info-text");

//hide list until search
let list = document.querySelector("ul");
list.style.display = "none";

//show to Users
function showToUsers(data) {
  console.log(data);
  list.style.display = "block";

  //word and type
  document.querySelector(".word p").innerHTML = data[0].word;
  let type = data[0].phonetic;
  if (type) {
    document.querySelector(
      ".word span"
    ).innerText = `${data[0].meanings[0].partOfSpeech} ${type}`;
  } else {
    document.querySelector(
      ".word span"
    ).innerText = `${data[0].meanings[0].partOfSpeech}`;
  }

  //meaning
  document.querySelector(".meaning span").innerText =
    data[0].meanings[0].definitions[0].definition;

  //example
  let eg = data[0].meanings[1].definitions[0].example;
  if (eg) {
    document.querySelector(".example span").innerText = eg;
  } else {
    document.querySelector(".example").style.display = "none";
  }
}

//show words
function showWords(result, word) {
  //checking that searched word is exist or not
  if (result.title) {
    infoText.style.color = "red";
    infoText.innerHTML = `<b>${word}</b> doesn't exist!!`;
    list.style.display = "none";
  } else {
    userInput.value = "";
    infoText.innerText = "";
    showToUsers(result);
  }
}

//search words
function searchWords(word) {
  infoText.style.color = "#000";
  infoText.innerText = `searching ${word}`;
  list.style.display = "none";

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
