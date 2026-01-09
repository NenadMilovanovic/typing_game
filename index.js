const difficultyInput = document.getElementById('difficulty');
  // Also allow clearing by double-click
  difficultyInput.addEventListener('dblclick', () => {
    difficultyInput.value = '';
    difficultyInput.focus();
  });
document.getElementById('game-container').style.display = 'none';

  difficultyInput.addEventListener('change', () => {
    const difficulty = difficultyInput.value;
    if (['Easy', 'Medium', 'Hard', 'Expert'].includes(difficulty)) {
      document.getElementById('game-container').style.display = 'block';
      document.getElementById('difficulty').style.display = 'none';
    }
});

const arr_of_qoutes_easy_level = [
   'The small cat runs quickly across the yard.' ,
   'I enjoy learning how to type faster every day.' , 
    'She reads books and practices typing after school.' ,
    'We play typing games together on the computer.' , 
    'The bright sun shines warmly over the quiet town.' , 
];
const arr_of_qoutes_medium_level = [
    'I enjoy playing online games that challenge my typing speed.' ,
    'She types more accurately when she stays calm and focused.' ,
    'We practice typing every evening to improve our performance.' ,
    'The dog sleeps quietly near the door while we work.' ,
    'He bought a mechanical keyboard because it feels more responsive.', 
];
const arr_of_qoutes_hard_level = [
    'While learning to type efficiently, accuracy should always come before speed.' ,
    'The player finished the level quickly, but several errors reduced the final score.' ,
    'If you practice consistently, your typing skills will improve much faster.' ,
    'The keyboard felt comfortable, even after several hours of continuous use.' ,
    'She focused intensely, carefully watching each word appear on the screen.' ,
];
const arr_of_qoutes_expert_level = [ 
    'Despite typing at over 100 words per minute, he still struggled to remain accurate under pressure.' ,
    'The message on the screen warned, "Stay focused, type carefully, and never rush the timer." ',
    'After 4 hours of nonstop typing practice, his hands felt stiff, sore, and exhausted.' ,
    'When the timer hit 00:00 exactly, she realized she had mistyped only two characters.' ,
    'Debugging complex code demands precision, patience, and unwavering attention to detail.' ,
];

let words = [];
let wordindex = 0;
let startTime = Date.now();
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start-button').addEventListener('click', function () {
    const difficulty = difficultyInput.value;
    let quoteArray;
    
    if (difficulty === 'Easy') quoteArray = arr_of_qoutes_easy_level;
    else if (difficulty === 'Medium') quoteArray = arr_of_qoutes_medium_level;
    else if (difficulty === 'Hard') quoteArray = arr_of_qoutes_hard_level;
    else if (difficulty === 'Expert') quoteArray = arr_of_qoutes_expert_level;
    
    const quoteIndex = Math.floor(Math.random() * quoteArray.length);
    const qoute = quoteArray[quoteIndex];
    words = qoute.split(' ');
    wordindex = 0;

  const spanWords = words.map(function(word) { return `<span>${word} </span>`});
  quoteElement.innerHTML = spanWords.join('');
  quoteElement.childNodes[0].className = 'highlight';
  messageElement.innerText = '';

  typedValueElement.value = ''; 
  typedValueElement.focus();

  startTime = new Date().getTime();
});
typedValueElement.addEventListener('input', function () {
    const currentWord = words[wordindex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordindex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        const message = `Congratulations! You finished in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message;
    }else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordindex++;
          for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    quoteElement.childNodes[wordindex].className = 'highlight';
} else if ( currentWord.startsWith(typedValue)){
    typedValueElement.className = '';
} else {
    typedValueElement.className = 'error';
}
});




