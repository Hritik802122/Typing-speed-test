document.addEventListener('DOMContentLoaded', () => {
    const QUOTES = [
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        "The way to get started is to quit talking and begin doing.",
        "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma.",
        "If life were predictable it would cease to be life, and be without flavor.",
        "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
        "Life is what happens when you're busy making other plans.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "It is during our darkest moments that we must focus to see the light.",
        "Whoever is happy will make others happy too.",
        "The only thing we have to fear is fear itself.",
        "You will face many defeats in life, but never let yourself be defeated.",
        "The purpose of our lives is to be happy.",
        "In the end, it's not the years in your life that count. It's the life in your years.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
       "Typing fast is not about speed, it's about accuracy under pressure.",
       "Great developers write code for humans first, machines second.",
       "Consistency beats motivation. Build the habit, and success will follow.",
       "Don't watch the clock; do what it does. Keep going."
    ];

 
    const quoteDisplayElement = document.getElementById('quote-display');
    const inputFieldElement = document.getElementById('input-field');
    const wpmElement = document.getElementById('wpm');
    const accuracyElement = document.getElementById('accuracy');
    const timerElement = document.getElementById('timer');
    const restartBtn = document.getElementById('restart-btn');
    const typingArea = document.getElementById('typing-area');

   
    let timer;
    let timeRemaining = 60;
    let charactersTyped = 0;
    let correctCharacters = 0;
    let quoteCharacters = [];
    let currentIndex = 0;
    let testActive = false;

   
    inputFieldElement.addEventListener('input', handleInput);
    restartBtn.addEventListener('click', resetTest);
    typingArea.addEventListener('click', () => inputFieldElement.focus());

 
    
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        return QUOTES[randomIndex];
    }

    function renderNewQuote() {
        const quote = getRandomQuote();
        quoteDisplayElement.innerHTML = '';
        quoteCharacters = quote.split('').map(char => {
            const span = document.createElement('span');
            span.innerText = char;
            span.classList.add('char');
            quoteDisplayElement.appendChild(span);
            return span;
        });
        if (quoteCharacters.length > 0) {
            quoteCharacters[0].classList.add('active');
        }
    }

    function handleInput() {
        if (!testActive) {
            startTest();
        }

        const typedValue = inputFieldElement.value;
        const typedChar = typedValue[typedValue.length - 1];
        
        
        if (typedValue.length < currentIndex) {
            currentIndex--;
            quoteCharacters[currentIndex].classList.remove('correct', 'incorrect');
            if(currentIndex > 0) {
                 quoteCharacters[currentIndex-1].classList.add('active');
            } else {
                 quoteCharacters[0].classList.add('active');
            }
             quoteCharacters[currentIndex].classList.remove('active');
            return;
        }

        const currentCharacterSpan = quoteCharacters[currentIndex];
        
        if (typedChar === currentCharacterSpan.innerText) {
            currentCharacterSpan.classList.add('correct');
            currentCharacterSpan.classList.remove('incorrect');
            correctCharacters++;
        } else {
            currentCharacterSpan.classList.add('incorrect');
            currentCharacterSpan.classList.remove('correct');
        }
        
        charactersTyped++;
        
       
        currentCharacterSpan.classList.remove('active');
        currentIndex++;
        
        if (currentIndex < quoteCharacters.length) {
            quoteCharacters[currentIndex].classList.add('active');
        } else {
           
            endTest();
        }
        
        updateStats();
    }

    function startTest() {
        testActive = true;
        timeRemaining = 60;
        timerElement.innerText = timeRemaining;
        timer = setInterval(updateTimer, 1000);
    }
    
    function updateTimer() {
        timeRemaining--;
        timerElement.innerText = timeRemaining;
        if (timeRemaining <= 0) {
            endTest();
        }
    }

    function endTest() {
        clearInterval(timer);
        inputFieldElement.disabled = true;
        testActive = false;
        
    }

    function updateStats() {
        
        const timeElapsedInMinutes = (60 - timeRemaining) / 60;
        if (timeElapsedInMinutes > 0) {
            const grossWPM = (charactersTyped / 5) / timeElapsedInMinutes;
            wpmElement.innerText = Math.round(grossWPM);
        }

        
        const accuracy = charactersTyped > 0 ? (correctCharacters / charactersTyped) * 100 : 100;
        accuracyElement.innerText = Math.round(accuracy);
    }

    function resetTest() {
        clearInterval(timer);
        testActive = false;
        inputFieldElement.value = '';
        inputFieldElement.disabled = false;
        
        timeRemaining = 60;
        charactersTyped = 0;
        correctCharacters = 0;
        currentIndex = 0;
        
        timerElement.innerText = 60;
        wpmElement.innerText = 0;
        accuracyElement.innerText = 100;
        
        renderNewQuote();
        inputFieldElement.focus();
    }

   
    renderNewQuote();
});