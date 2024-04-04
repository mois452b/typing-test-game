const INITIAL_TIME = 30;
const TEXT = "Type as fast as you can! Press enter to start. You have 30 seconds. Good luck! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, quas.";

const $time = document.querySelector('time');
const $paragraph = document.querySelector('p');
const $input = document.querySelector('input');
const $game = document.querySelector('#game');
const $results = document.querySelector('#results');
const $button = document.querySelector('#reset');
const $wpm = document.querySelector('#wp3-results');
const $accuracy = document.querySelector('#accuracy-results');

let words = []
let currentTime = INITIAL_TIME;

function initGame( ) {
    $game.style.display = 'flex';
    $results.style.display = 'none';
    $input.value = '';

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
    // $firstWord.classList.add('current-word');
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

function initEvents( ) {
    document.addEventListener('keydown', () => {
        $input.focus( );
    })

    $input.addEventListener('keydown', onKeyDown);
    $input.addEventListener('keyup', onKeyUp);
    $button.addEventListener('click', initGame);
}

function onKeyDown( event ) {
    const $currentWord = $paragraph.querySelector('word.active');
    const $currentLetter = $currentWord.querySelector('letter.active');

    if( event.key === ' ' ) {
        event.preventDefault( );
        $currentWord.classList.remove('active');
        $currentLetter.classList.remove('active');

        if( $currentWord.innerText !== $input.value ) {
            $currentWord.classList.add('incorrect');
        }
        else
            $currentWord.classList.add('correct');

        $nextWord = $currentWord.nextElementSibling;
        if( $nextWord ) {
            $nextLeter = $nextWord.querySelector('letter');
            $nextWord.classList.add('active');
            $nextLeter.classList.add('active');
        }
        $input.value = '';
    }
    if( event.key === 'Backspace' ) {
        $previusWord = $currentWord.previousElementSibling;
        $previusLeter = $currentLetter.previousElementSibling;
        if( !$previusWord && !$previusLeter ) return event.preventDefault( );
        if( $previusWord && !$previusLeter ) {
            event.preventDefault( );
            $previusWord.classList.remove('incorrect');
            $previusWord.classList.add('active');
            $currentWord.classList.remove('active');
            $currentLetter.classList.remove('active');

            $letterToGo = $previusWord.querySelector('letter:last-child');
            $letterToGo.classList.add('active');
            $input.value = [
                ...$previusWord.querySelectorAll('.correct, .incorrect')
            ].map( $letter => $letter.classList.contains('correct') ? $letter.innerText : '*' ).join('');
        }

    }
}

function onKeyUp( event ) {
    const $currentWord = $paragraph.querySelector('word.active');
    const $currentLetter = $currentWord.querySelector('letter.active');
    const $allLetters = $currentWord.querySelectorAll('letter');

    $allLetters.forEach( $letter => $letter.classList.remove('correct', 'incorrect', 'is-last') )
    
    const currentWord = $currentWord.innerText;
    console.log({value: $input.value, currentWord});
    $input.maxLength = currentWord.length;

    $input.value.split('').forEach( (char, index) => {
        const $letter = $allLetters[index];
        const charToCheck = currentWord[index];

        const isCorrect = char === charToCheck;
        const letterClass = isCorrect ? 'correct' : 'incorrect';
        $letter.classList.add(letterClass);
    })

    $currentLetter.classList.remove('active');
    $nextActiveLetter = $allLetters[$input.value.length]
    if( $nextActiveLetter ) {
        $nextActiveLetter.classList.add('active');
    }
    else {
        $currentLetter.classList.add('active', 'is-last');
    }
}

function gameOver( ) {
    $game.style.display = 'none';
    $results.style.display = 'block';

    const wordsCorrects = $paragraph.querySelectorAll('word.correct').length;
    const wordsIncorrects = $paragraph.querySelectorAll('word.incorrect').length;
    const wordsTotal = wordsIncorrects + wordsCorrects;
    const lettersCorrects = $paragraph.querySelectorAll('letter.correct').length;
    const letterIncorrects = $paragraph.querySelectorAll('letter.incorrect').length;
    const totalLetters = letterIncorrects + lettersCorrects;

    const accuracyLetter = totalLetters > 0 ? (lettersCorrects / totalLetters) : 0;
    const accuracyWord = wordsTotal > 0 ? (wordsCorrects / wordsTotal) : 0;
    const accuracy =  (accuracyLetter * accuracyWord)*100;

    const wpm = wordsCorrects * 60 / INITIAL_TIME;

    $wpm.textContent = wpm;
    $accuracy.textContent = accuracy.toFixed(2) + '%';
}

initGame( );
initEvents( );