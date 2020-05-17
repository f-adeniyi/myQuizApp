let randomNumber = Math.floor(Math.random() * 3);
console.log(randomNumber);
let questions = [
  {
    id: 1,
    question: "Which of these is the capital of Afghanistan?",
    options: ['Pashto', 'Kabul', 'Mariehamn', 'Alandish'],
    answer: 'Pashto'
  },
  {
    id: 2,
    question: "Åland Islands is in which region?",
    options: ['Asia', 'Americas', 'Europe', 'Oceania'],
    answer: 'Europe'
  },
  {
    id: 3,
    question: "Saint Martin is in which region?",
    options: ['Americas', 'Asia', 'Europe', 'Oceania'],
    answer: 'Americas'
  },
  {
    id: 4,
    question: "Which of these countries is not part of Argentina's border?",
    options: ['Brazil', 'Chile', 'Australia', 'Paraguay'],
    answer: 'Australia'
  },
  {
    id: 5,
    question: "Harare is the capital of which country?",
    options: ['Yemen', 'Zambia', 'Zimbabwe', 'Viet Nam'],
    answer: 'Zimbabwe'
  },
  {
    id: 6,
    question: "Victoria is the capital of ________?",
    options: ['Venezuela', 'Uzbekistan', 'Mariehamn', 'Seychelles'],
    answer: 'Seychelles'
  },
  {
    id: 7,
    question: "+380 is the calling code for which of these countries?",
    options: ['Uganda', 'Ukraine', 'Tunisia', 'Uzbekistan'],
    answer: 'Ukraine'
  },
  {
    id: 8,
    question: "Rs is a symbol of which currency?",
    options: ['Japanese yen', 'South African rand', 'Indian rupee', 'Botswana pula'],
    answer: 'South African rand'
  },
  {
    id: 9,
    question: "Funafuti is the capital of _____?",
    options: ['Tonga', 'Uzbekistan', 'Trinidad and Tobago', 'Tuvalu'],
    answer: 'Tuvalu'
  },
  {
    id: 10,
    question: "_______ is the capital of Tokelau?",
    options: ['Khartoum', 'Suriname', 'Zimbabwe', 'Fakaofo'],
    answer: 'Fakaofo'
  }
]

//Varibles//
let quizContainer = document.querySelector('.quiz-container');
quizContainer.style.display = 'block';
let questionCard = document.querySelector('.questions');
let nextButton = document.querySelector("#next-button");
let submitButton = document.querySelector("#submit-button");
let result = document.querySelector('.result');
let scoreBoard = document.querySelector(".score-board");
let score = document.querySelector('#score');
let count = 0;
let myQuestions = [];
let answers = [];
let currentContainer = 0;


//HTML to be displayed
myQuestions.push(`
    <div class="container home-page" > 
    <div class="home">
      <div class="home-text">
       <h1>How well do you know countries in the world?</h1>
        <p>Find out by taking this quiz</p>
        <button class='start-game' onclick='showContainer(currentContainer+1)' type='button'>Start Quiz</button>
      </div>
    </div>
  </div> 
  `)

questions.map((quiz, i) => {
  let option=[]
  answers.push(quiz.answer)
  for (i = 0; i < quiz.options.length; i++) {
    option.push( `
        <div>
          <h3>
          <input type='radio' name='option' onclick='validateAnswer(this)' id=option${i}   value=${quiz.options[i]}>
          <label for='option${i}'>${quiz.options[i]}</label>
        </h3> 
       </div>
      `)
  }
myQuestions.push(
  `<div class="container" id=${i}>
      <div class="card">
        <h2 class='question'>${quiz.question}</h2>
        <div class='options'>
        ${option.join("")}
         </div>
      </div>
    </div>`
)
})
questionCard.innerHTML = myQuestions.join('');
let containers = document.querySelectorAll('.container');

const showContainer = (n) => {
  containers[currentContainer].classList.remove('active-container');
  containers[n].classList.add('active-container');
  currentContainer = n;
  if (currentContainer === 0) {
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
    scoreBoard.style.display = 'none';
  }
  else if (currentContainer === containers.length - 1) {
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
    scoreBoard.style.display = 'inline-block';

  }
  else {
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
    scoreBoard.style.display = 'inline-block';

  }
}

function validateAnswer(radio) {
  console.log(containers[currentContainer]);
  var selectedLabel = containers[currentContainer].getElementsByTagName('label');
  var availableOptions = containers[currentContainer].getElementsByTagName('input');
  for (i = 0; i < availableOptions.length; i++) {
    availableOptions[i].setAttribute('disabled', '');
  }
  let userOption;
  console.log(questions[currentContainer])
  if (radio.value === questions[currentContainer - 1].answer) {
    for (var i = 0; i < selectedLabel.length; i++) {
      if (selectedLabel[i].textContent.includes(radio.value)) {
        selectedLabel[i].style.backgroundColor = 'green';
        selectedLabel[i].style.color = 'white';
        selectedLabel[i].style.padding = '0.5em';

      }
      else {
      }
    }
    count++;
    score.textContent = `${count}/${questions.length}`;
  }

  else {
    for (var i = 0; i < selectedLabel.length; i++) {

      if (selectedLabel[i].textContent.includes(radio.value)) {
        selectedLabel[i].style.backgroundColor = 'red';
        selectedLabel[i].style.color = 'white';
        selectedLabel[i].style.padding = '0.5em'
        userOption = 'wrong';
      } else {
      }
    }

  }
  if (userOption === 'wrong') {
    for (j = 0; j < selectedLabel.length; j++) {
      if (selectedLabel[j].textContent.includes(questions[currentContainer - 1].answer)) {
        selectedLabel[j].style.backgroundColor = 'green';
        selectedLabel[j].style.color = 'white';
        selectedLabel[j].style.padding = '0.5em';
      }
    }
  }
}

const showResult = () => {
  result.innerHTML =
    `<h1>Your score is: ${count}</h1>
    <h5>Visit<a href='https://f-adeniyi.github.io/world'> f-adeniyi.github.io/world</a> to know more about countries in the world</h5>
  `
  result.style.display = "block";
  submitButton.style.display = 'none';
  scoreBoard.style.display = 'none';
  containers[currentContainer].style.display = 'none';

}
submitButton.addEventListener('click', () => {

  showResult();
}
);


nextButton.addEventListener('click', () => {
  showContainer(currentContainer + 1);
}
)
showContainer(currentContainer);

