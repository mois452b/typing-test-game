const INITIAL_TIME = 30;
const TEXT = "Type as fast as you can! Press enter to start. You have 30 seconds. Good luck! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, quas.";

const time = document.querySelector('time');
const paragraph = document.querySelector('p');
const input = document.querySelector('input');

let words = []
let currentTime = INITIAL_TIME;