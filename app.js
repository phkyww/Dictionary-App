let userInput = document.querySelector(".search input");
let infoText = document.querySelector(".info-text");

//hide list until search
let list = document.querySelector("ul");
list.style.display = "none";

//show to Users
function showToUsers(data) {
  console.log(data);
  list.style.display = "block";

  //word
  document.querySelector(".word p").innerHTML = data[0].word;
  //to catch the last index value of each
  let lastPhonetic = data[0].phonetics.length - 1;
  let lastMeaning = data[0].meanings.length - 1;
  let lastDefinition = data[0].meanings[lastMeaning].definitions.length - 1;

  //type
  document.querySelector(
    ".word span"
  ).innerText = `${data[0].meanings[lastMeaning].partOfSpeech} | ${data[0].phonetics[lastPhonetic].text}`;

  //meaning
  document.querySelector(".meaning span").innerText =
    data[0].meanings[0].definitions[0].definition;

  //example
  let eg = data[0].meanings[lastMeaning].definitions[0].example;
  if (eg) {
    document.querySelector(".example").style.display = "block";
    document.querySelector(".example span").innerText = eg;
  } else {
    document.querySelector(".example").style.display = "none";
  }

  //synonyms
  let synonyms = data[0].meanings[lastMeaning].synonyms[0];
  if (synonyms) {
    for (let i = 0; i < 3; i++) {
      let items = `<span>${data[0].meanings[lastMeaning].synonyms[i]}</span>`;
      document
        .querySelector(".synonyms .list")
        .insertAdjacentHTML("beforebegin", items);
    }
  } else {
    document.querySelector(".synonyms").style.display = "none";
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
    userInput.blur();
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

//hide list when tap input
userInput.addEventListener("focus", (_) => {
  list.style.display = "none";
});
