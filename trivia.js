const question = document.getElementById("question");
const choices = Array.from(document.getElementsByTagName("button"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const TimerText = document.getElementById('timer');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Question 1",
        choice1: "A",
        choice2: "B",
        choice3: "C",
        choice4: "D",
        answer: 4
    },
    {
        question: "Question 2",
        choice1: "A",
        choice2: "B",
        choice3: "C",
        choice4: "D",
        answer: 3
    },
    {
        question: "Question 3",
        choice1: "A",
        choice2: "B",
        choice3: "C",
        choice4: "D",
        answer: 2
    },
]

const CORRECT_BONUS = 100;
const MAX_QUESTIONS = 3;
const REMAINING_TIME= 15;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    var mostRecentScore;

    speechSynthesis.getVoices().forEach(function(voice) {
        console.log(voice.name, voice.default ? voice.default :'');
      });

        if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
            localStorage.setItem('mostRecentScore', score);
            console.log(mostRecentScore);
            return window.location.assign('/end.html');
        }
    questionCounter++;
        questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    var time = REMAINING_TIME;

    decrementTimer(time);

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice =>{
    choice.addEventListener("click", e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        choice.classList.add(classToApply);
        setTimeout( () => {
            choice.classList.remove(classToApply);
               
        }, 1500);

         setTimeout( () => {
            getNewQuestion();
        }, 1700);

        if(classToApply == "correct"){
            incrementScore(CORRECT_BONUS);
        } 
    });
});

function incrementScore(num){
    score += num;
    scoreText.innerText = score;
}; 

function decrementTimer(time){
       var interval = setInterval(function(){
         choices.forEach(choice =>{
            choice.addEventListener("click", function(){                
                clearInterval(interval);    
            }); 
        }); 
        time--;
        if(time == 0){
            clearInterval(interval);
            getNewQuestion();
            return ;
        }
        TimerText.innerText = time;
    }, 1000)

    return ;
};


startGame();