
/*
Quiz App with different questions, 4 possible answers per question

TODO:  
-Wrong/Right answer screen
-Store selected when we click submit
*/
const question_text = document.getElementById('question_text');
const quiz_container = document.getElementById('quiz-container');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submit_btn = document.getElementById('submit_btn');
const answerElems = document.querySelectorAll(".answer");

let currQuiz = 0;
let score = 0;

const quizData = [
    {
        question: 'Who am I?',
        a: 'Fanghetti',
        b: 'Xavi Florit',
        c: 'Mad Fax',
        d: 'All of \'em',
        answer: 'd'
    },
    {
        question: 'Where does the name Python come from?',
        a: 'The snake',
        b: 'The Monty Python',
        c: 'The revolver gun',
        d: 'None of the above is correct',
        answer: 'b'
    },
    {
        question: 'What is most important to demonstrate at a programming job interview',
        a: 'Fast programming skills',
        b: 'Style/Designing skills',
        c: 'Problem solving',
        d: 'Communication',
        answer: 'a'
    },
    {
        question: 'Who am I?',
        a: '10',
        b: '10',
        c: '10',
        d: '10',
        answer: 'a'
    },
    {
        question: 'Who am I?',
        a: '10',
        b: '10',
        c: '10',
        d: '10',
        answer: 'a'
    },
    {
        question: 'Who am I?',
        a: '10',
        b: '10',
        c: '10',
        d: '10',
        answer: 'a'
    },
]

loadQuiz();

function loadQuiz() {
    deselectAnswers()
    const currQuizData = quizData[currQuiz];

    question_text.innerText = currQuizData.question;

    a_text.innerText = currQuizData.a;
    b_text.innerText = currQuizData.b;
    c_text.innerText = currQuizData.c;
    d_text.innerText = currQuizData.d;
} 

function deselectAnswers() {
    answerElems.forEach((answerElem) => {
        answerElem.checked = false;

    });
}

submit_btn.addEventListener("click", () => {
    const selectedAnswer = getSelected();

    console.log(selectedAnswer);

    if (selectedAnswer){
        
        if (selectedAnswer === quizData[currQuiz].answer) {
            score++;
        }
        
        currQuiz++;

        if (currQuiz < quizData.length){
            loadQuiz();
        } else {
            quiz_container.innerHTML = `<h2 id="finish-screen">All Done!</h2>
            <button onclick="location.reload()">Play Again</button>`;
        }
    }

});

function getSelected() {
    let answer = undefined;

    answerElems.forEach((answerElem) => {
        if (answerElem.checked) {
            answer = answerElem.id;
        }
    });

    return answer;
}



