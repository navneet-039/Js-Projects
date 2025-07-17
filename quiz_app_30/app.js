const questions = [
    {
        question: "Which of the following is not an operating system?",
        answers: [
            { text: "Windows", correct: false },
            { text: "Linux", correct: false },
            { text: "Oracle", correct: true },
            { text: "macOS", correct: false }
        ]
    },
    {
        question: "What is the main function of an operating system?",
        answers: [
            { text: "Text editing", correct: false },
            { text: "Resource management", correct: true },
            { text: "Web browsing", correct: false },
            { text: "Database management", correct: false }
        ]
    },
    {
        question: "Which scheduling algorithm gives the minimum average waiting time?",
        answers: [
            { text: "First-Come, First-Served (FCFS)", correct: false },
            { text: "Shortest Job Next (SJN)", correct: true },
            { text: "Round Robin", correct: false },
            { text: "Priority Scheduling", correct: false }
        ]
    },
    {
        question: "Which of the following is not a valid process state?",
        answers: [
            { text: "New", correct: false },
            { text: "Running", correct: false },
            { text: "Waiting", correct: false },
            { text: "Completed", correct: true }
        ]
    },
    {
        question: "Which system call is used to create a new process in Unix?",
        answers: [
            { text: "create()", correct: false },
            { text: "init()", correct: false },
            { text: "fork()", correct: true },
            { text: "spawn()", correct: false }
        ]
    },
    {
        question: "Deadlock can occur when which four conditions hold?",
        answers: [
            { text: "Mutual exclusion, Hold and wait, No preemption, Circular wait", correct: true },
            { text: "Paging, Fragmentation, Thrashing, Scheduling", correct: false },
            { text: "Caching, Swapping, Polling, Buffering", correct: false },
            { text: "Sharing, Multiprogramming, Concurrency, Virtualization", correct: false }
        ]
    },
    {
        question: "Which of the following is a type of real-time OS?",
        answers: [
            { text: "Windows 11", correct: false },
            { text: "Linux Mint", correct: false },
            { text: "VxWorks", correct: true },
            { text: "Ubuntu", correct: false }
        ]
    },
    {
        question: "What is thrashing in OS?",
        answers: [
            { text: "Overheating of CPU", correct: false },
            { text: "High CPU utilization", correct: false },
            { text: "Excessive page swapping", correct: true },
            { text: "Interrupt handling", correct: false }
        ]
    },
    {
        question: "Which memory management technique suffers from external fragmentation?",
        answers: [
            { text: "Paging", correct: false },
            { text: "Segmentation", correct: true },
            { text: "Virtual Memory", correct: false },
            { text: "Cache memory", correct: false }
        ]
    },
    {
        question: "What does the 'init' process do in Linux?",
        answers: [
            { text: "Starts the GUI", correct: false },
            { text: "Initializes hardware", correct: false },
            { text: "Is the first process and ancestor of all", correct: true },
            { text: "Manages network drivers", correct: false }
        ]
    }
];


const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next_btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectanswer);
        answerButtons.appendChild(button);
    });
}
function resetstate(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectanswer(e){
    const selectbtn=e.target;
    const iscorrect=selectbtn.dataset.correct==="true";
    if(iscorrect){
        selectbtn.classList.add("correct");
        score++;
    }else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");

        }
        button.disabled=true;
    });
    nextButton.style.display="block";

}
function showscore(){
    resetstate();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play again";
    nextButton.style.display="block";
}
function handlenextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showscore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handlenextbutton();
    }else{
        startQuiz();
    }
})

startQuiz()

