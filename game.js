
// Timer
const timeH = document.querySelector('h1');
let timeSecond = 80
timeH.innerHTML = `00:${timeSecond}`;

const countDown = setInterval (()=>{
timeSecond--;
timeH.innerHTML = `00:${timeSecond}`;
if(timeSecond <=0 || timeSecond<1){
    clearInterval(countDown)
}
},1000)

//Variables

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const choiceA = document.querySelector('.choice-a');
const choiceB = document.querySelector('.choice-b');
const choiceC = document.querySelector('.choice-c');
const choiceD = document.querySelector('.choice-d');

const progressText = document.querySelector('#progressText');
const scoreText = document.getElementById('scoreText');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// Questions
let questions = [
    {
        question: 'Commonly used data types do not include?',
        choice1: 'alerts',
        choice2: 'booleans',
        choice3: 'strings',
        choice4: 'numbers',
        answer: 1,


    },
    {
        question: 'Arrays in Javascript can be used to store?',
        choice1: 'Numbers and Strings',
        choice2: 'More arrays',
        choice3: 'Booleans',
        choice4: 'All',
        answer: 4,


    },
    {
        question: 'String values must be enclosed within _____ when being assigned to variable?',
        choice1: 'Brackets',
        choice2: 'Curly',
        choice3: 'Quotes',
        choice4: 'Commas',
        answer: 3,


    },
    {
        question: 'A useful tool used during development & debugging for printing content to the debugger is?',
        choice1: 'Console.log',
        choice2: 'Javascript',
        choice3: 'Terminal',
        choice4: 'Bash',
        answer: 1,


    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)* 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

const incrementScore = num => {
    console.log(num);
    console.log(score);
    score += num
    console.log(scoreText);
    scoreText.innerHTML = score

}

const handleChoiceClick = (e) => {
    console.log(e);
    if (!acceptingAnswers) { 
        
        return acceptingAnswers = false

        }

       
        const selectedChoice = e.target 
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            console.log(SCORE_POINTS);
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)

        }
//Event Listners
choiceA.addEventListener('click', handleChoiceClick);
choiceB.addEventListener('click', handleChoiceClick);
choiceC.addEventListener('click', handleChoiceClick);
choiceD.addEventListener('click', handleChoiceClick);

startGame()
