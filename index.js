const INITIAL_TIME = 30;
const TEXT = "Type as fast as you can! Press enter to start. You have 30 seconds. Good luck! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, quas.";

const $time = document.querySelector('time');
const $paragraph = document.querySelector('p');
const $input = document.querySelector('input');

let words = []
let currentTime = INITIAL_TIME;

function initGame( ) {
    words = TEXT.split(' ');
    currentTime = INITIAL_TIME;
    
    $time.textContent = currentTime;
    $paragraph.innerHTML = words.map( word => {
        let letters = word.split('');
        return `
            <word>
                ${letters.map( letter => `<letter>${letter}</letter>`).join('')}
            </word>`
    }).join('');

    let $firstWord = $paragraph.querySelector('word');
    $firstWord.classList.add('current-word');
    $firstWord.classList.add('active');
    $firstWord.querySelector('letter').classList.add('active');

    const intervalId = setInterval( () => {
        currentTime--;
        $time.textContent = currentTime;
        if(currentTime <= 0) {
            clearInterval(intervalId);
            gameOver( );
        }
    }, 1000);
    
}

function initEvents( ) {}
function gameOver( ) {
    console.log("Game Over");
}

initGame( );
initEvents( );