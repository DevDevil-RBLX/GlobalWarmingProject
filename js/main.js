const questionEl = document.querySelector(".survey-question");
const surveyNumEl = document.querySelector(".survey-num");
const choicesEl = document.querySelector(".choices");
const buttonEl = document.querySelector(".nav-buttons");
const containerEl = document.querySelector(".container");

const survey = [
  {
    id: 1,
    question: "What is the main greenhouse gas responsible for global warming?",
    choices: [
      "Carbon Dioxide (CO2)",
      "Methane (CH4)",
      "Nitrous Oxide (N2O)",
      "Ozone (O3)",
    ],
    correctAnswer: "Carbon Dioxide (CO2)",
    answer: null,
  },
  {
    id: 2,
    question: "Most places on Earth are warmer than they were 100 years ago.",
    choices: ["True", "False"],
    correctAnswer: "True",
    answer: null,
  },
  {
    id: 3,
    question:
      "Where have some of the strongest and earliest impacts of global warming occurred?",
    choices: [
      "In the tropics",
      "In northern latitudes",
      "Impacts of global warming are distributed equally all over the planet.",
    ],
    correctAnswer: "In northern latitudes",
    answer: null,
  },
  {
    id: 4,
    question: "How do scientists collect evidence about climate?",
    choices: [
      "Using remote sensing from space with satellites",
      "By ground-based measurements of surface temperature, carbon dioxide concentration and sea level",
      'By collecting "proxy data" from tree rings, ice cores and historical records',
      "All of the above",
    ],
    correctAnswer: "All of the above",
    answer: null,
  },
  {
    id: 5,
    question:
      "Some kinds of pollution in the atmosphere can act to cool the planet by reducing the amount of solar radiation that reaches Earths surface.",
    choices: ["True", "False"],
    correctAnswer: "True",
    answer: null,
  },
];

const surveyState = {
  currentQuestion: 1,
};

const navigateButtonClick = (e) => {
  if (e.target.id == "next") {
    surveyState.currentQuestion++;
    initialSurvey();
  }

  if (e.target.id == "prev") {
    surveyState.currentQuestion--;
    initialSurvey();
  }
};

const checkBoxHandler = (e, question) => {
  //Check if the chekbox has selected before if it is remove selected
  if (!e.target.checked) {
    e.target.checked = false;
    question.answer = null;
    return;
  }

  const allCheckBoxes = choicesEl.querySelectorAll("input");
  allCheckBoxes.forEach((checkBox) => (checkBox.checked = false));
  e.target.checked = true;
  question.answer = e.target.value;
};

const getResults = () => {
  const correctAnswerCount = survey.filter(
    (question) => question.answer == question.correctAnswer
  ).length;
  const emptyQuestionCount = survey.filter(
    (question) => question.answer === null
  ).length;
  const wrongQuestionCount = survey.filter(
    (question) =>
      question.answer !== null && question.answer != question.correctAnswer
  ).length;

  return {
    correct: correctAnswerCount,
    empty: emptyQuestionCount,
    wrong: wrongQuestionCount,
  };
};

const renderQuestion = (question) => {
  //Last question of survey
  const lastQuestion = survey[survey.length - 1];

  //Check if the all questions are answered if then insert some message
  if (surveyState.currentQuestion > lastQuestion.id) {
    const results = getResults();
    containerEl.innerHTML = `<h1 class="test-completed">Good Job! You have completed the mini quiz</h1>
        <p class="results-info"> You have <strong>${results.correct}</strong> correct, <strong>${results.wrong}</strong> wrong, <strong>${results.empty}</strong> empty answers</p>                        
        <span class="tick"></span>`;
    return;
  }

  // Clean innerHTML before append
  surveyNumEl.innerHTML = "";
  choicesEl.innerHTML = "";
  buttonEl.innerHTML = "";
  // Render question and question id
  surveyNumEl.textContent = question.id + "-";
  questionEl.textContent = question.question;
  // Render choices
  question.choices.forEach((choice) => {
    const questionRowEl = document.createElement("p");
    questionRowEl.setAttribute("class", "question-row");
    questionRowEl.innerHTML = `<label class="label">                                        
                                        <span class="choise">${choice}</span>
                                    </label>`;
    //Create checkbox input
    const checkBoxEl = document.createElement("input");
    checkBoxEl.setAttribute("type", "checkbox");
    // Bind checkboxHandler with event and current question
    checkBoxEl.addEventListener("change", (e) => checkBoxHandler(e, question));
    //Add answer to the input as a value
    checkBoxEl.value = choice;
    //If question has answer already make it checked again
    if (question.answer === choice) {
      checkBoxEl.checked = true;
    }
    //Insert into question row
    questionRowEl.firstChild.prepend(checkBoxEl);
    //Insert row to the wrapper
    choicesEl.appendChild(questionRowEl);
  });

  //Next & Previous Buttons
  const prevButton = document.createElement("button");
  prevButton.classList.add("nav-button");
  prevButton.classList.add("prev");
  prevButton.id = "prev";
  prevButton.textContent = "Previous";
  prevButton.addEventListener("click", navigateButtonClick);

  const nextButton = document.createElement("button");
  nextButton.classList.add("nav-button");
  nextButton.classList.add("next");
  nextButton.id = "next";
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", navigateButtonClick);

  //Display buttons according to survey current question
  if (question.id == 1) {
    buttonEl.appendChild(nextButton);
  } else if (surveyState.currentQuestion == lastQuestion) {
    buttonEl.appendChild(prevButton);
  } else {
    buttonEl.appendChild(prevButton);
    buttonEl.appendChild(nextButton);
  }
};

const initialSurvey = () => {
  //Get the current question
  const currentQuestion = survey.find(
    (question) => question.id === surveyState.currentQuestion
  );
  // Render the currentQuestion
  renderQuestion(currentQuestion);
};

initialSurvey();
