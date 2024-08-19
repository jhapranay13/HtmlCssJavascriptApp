'use strict';



let timer = undefined;
const numberOfQues = quizData.length;
let counter = 0;

quizStartBtn.addEventListener('click', (event) => {
    startQuizCard.classList.add('hidden');
    endQuiz.classList.add('hidden');
    quizQuesCard.classList.remove('hidden');
    randQuizData = [...quizData];
    randQuizData.sort((a, b) => Math.random() - 0.5);
    counter = 0

    drawTimer();
    drawQuestion();
    drawAnswer();

});
let randQuizData = undefined;

quizAnswer.addEventListener('click', (event) => {
    
    if(event.target.classList.contains("quiz-answer-btn") && counter - 1 < randQuizData.length) {
        drawTimer();
        drawQuestion();
        drawAnswer();
    } else {
        quizQuesCard.classList.toggle('hidden');
        endQuiz.classList.toggle('hidden');
    }
});

const drawAnswer = () => {
    if (counter > numberOfQues) {
        return;
    }
    let htmlText = "";
    let answers = randQuizData[counter - 1].ans;
    answers.sort((a, b) => Math.random() - 0.5);

    for (const ans of answers) {
        htmlText += ` <div class="quiz-answer-btn" id="ques-1-ans-2">
                        ${ans}
                    </div>`;
    }
    quizAnswer.innerHTML = htmlText;
};

const drawQuestion = () => {
    if (counter > numberOfQues) {
        return;
    }
    quizQuesContainer.innerText = randQuizData[counter - 1].ques;
};

const drawTimer = () => {
    let elapsedTime = 0;

    if (timer) {
        clearInterval(timer);
    }
    counter++;

    if (counter > numberOfQues) {
        quizQuesCard.classList.toggle('hidden');
        endQuiz.classList.toggle('hidden');
        return;
    }
    quiztimerLine.style.width = '100%';

     timer = setInterval(() => {
        elapsedTime += 100;
        let percent = (elapsedTime / 20000 * 100);
        quiztimerLine.style.width = 100 - percent + '%';

        if (elapsedTime == 20000) {
            clearInterval(timer);
            quiztimerLine.style.width = 100 + '%';
            
            if (counter <= numberOfQues) {
                drawTimer();
                drawQuestion();
                drawAnswer();
            }
        }
    }, 100)
};