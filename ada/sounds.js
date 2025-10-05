const click = new Audio('button_click.wav');
const goodChoice = new Audio('good_choice.wav');
const badChoice = new Audio('bad_choice.wav');
const chaching = new Audio('chaching.mp3');
const loading = new Audio('shopping_list_loading.wav')

function playClick() {
  click.currentTime = 0;
  click.play();
}

function playGoodChoice() {
  goodChoice.currentTime = 0;
  goodChoice.play();
}

function playBadChoice() {
  badChoice.currentTime = 0;
  badChoice.play();
}

function playChaching() {
  chaching.currentTime = 0;
  chaching.play();
}

function playLoading() {
  loading.currentTime = 0;
  loading.play();
}