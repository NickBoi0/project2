import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import "@lrnwebcomponents/type-writer/type-writer.js";

export class TaggingQ extends DDD {

  static get tag() {
    return 'tagging-q';
  } 

  constructor() {
    super();
    this.img = "https://t4.ftcdn.net/jpg/06/06/54/49/360_F_606544986_2zeORxAa7x0pnUdfXNlBZof4QOB7qB43.jpg";
    this.teacherText = "Is this a photo of the sky?";
    this.questionHolder = "Is this a photo of the sky?";
    this.questions = [];
    this.answers = [];
    this.draggedIndex = null;
    this.draggedFrom = null;
    this.hintText = "Drag and Drop Answer(s)";
    this.answerSet = "default";
    this.ramble = "RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE RAMBLE"

    this.borderTrue = false;
    this.borderFalse = false;
    this.teacherDance = false;
  }

  static get styles() {

    return css`

      :host {
        display: flex;
        justify-content: left; 
        align-items: left; 
        background-color: var(--ddd-theme-default-beaverBlue);
        border: var(--ddd-theme-default-nittanyNavy) var(--ddd-spacing-5) solid;
        border-bottom: transparent;
        padding: var(--ddd-spacing-3);
      }

      :host([borderTrue]) .answers {
        color: var(--ddd-theme-default-forestGreen);
      }
      :host([borderFalse]) .answers {
        color: var(--ddd-theme-default-error);
      }
      :host([teacherDance]) .teacher {
        animation: jump .5s infinite linear;
      }

      .ramble-text {
        color: var(--ddd-theme-default-slateMaxLight);
        text-align: center;
        font-family: "Press Start 2P", system-ui;
        font-size: 1em;
        padding: var(--ddd-spacing-3);
      }

      .question-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .question-img {
        max-width: 500px;
        max-height: 400px;
        border: var(--ddd-theme-default-coalyGray) var(--ddd-spacing-1) solid;
        border-radius: var(--ddd-spacing-2);
        margin-bottom: var(--ddd-spacing-3);
      }

      .teacher-wrapper {
        padding: var(--ddd-spacing-2);
        display: flex;
        justify-content: right;
        align-items: right;
      }

      .speech-bubble {
        position: relative;
        background-color: var(--ddd-theme-default-slateMaxLight);
        border-radius: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);

        width: 600px;
        max-height: 150px;

        text-overflow: ellipsis;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thick;
        scrollbar-color: var(--ddd-theme-default-coalyGray) var(--ddd-theme-default-limestoneLight);
    }

      .bubble-point {
        margin-top: var(--ddd-spacing-5);
        width: 0; 
        height: 0; 
        border-top: var(--ddd-spacing-15) solid transparent;
        border-bottom: var(--ddd-spacing-15) solid transparent;
        
        border-left: var(--ddd-spacing-15) solid var(--ddd-theme-default-slateMaxLight);
      }

      .character-wrapper {
        padding: var(--ddd-spacing-2);
      }

      .choices,
      .clear-btn,
      .check-btn {
        text-align: left;
        background: transparent;
        border: transparent;
        color: var(--ddd-theme-default-potential0);
        font-size: 2em;
        font-family: "Press Start 2P", system-ui;
      }

      .red,
      .green,
      .teacher-words {
        text-align: left;
        background: transparent;
        border: transparent;
        font-family: "Press Start 2P", system-ui;
        color: var(--ddd-theme-default-coalyGray);
        font-size: 1.2em;
      }

      .answer-section {
        display: flex;
      }

      .question-box,
      .answer-box {
        font-size: 1.5em;
        font-family: "Press Start 2P", system-ui;
        
        overflow-wrap: break-word;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thick;
        scrollbar-color: var(--ddd-theme-default-coalyGray) var(--ddd-theme-default-limestoneLight);

        margin: var(--ddd-spacing-3);
        padding: var(--ddd-spacing-4);

        width: 900px;
        height: 150px;

        display: flex;
        flex-wrap: wrap;

        animation: border-animation 5s infinite linear;
      }

      .answer-box {
        position: left top, right bottom, left bottom, right top;
        padding: var(--ddd-spacing-4);
        color: var(--ddd-theme-default-opportunityGreen);
        border: var(--ddd-theme-default-opportunityGreen) 2px solid;

        background: linear-gradient(90deg, var(--ddd-theme-default-opportunityGreen) 50%, transparent 50%),
                    linear-gradient(90deg, var(--ddd-theme-default-opportunityGreen) 50%, transparent 50%), 
                    linear-gradient(0deg, var(--ddd-theme-default-opportunityGreen) 50%, transparent 50%), 
                    linear-gradient(0deg, var(--ddd-theme-default-opportunityGreen) 50%, transparent 50%);
        background-color: var(--ddd-theme-default-futureLime);
                    
        background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;

        /* Cant use DDD for sizing here, has to be exact numbers */
        background-size: 50px 15px, 50px 15px, 15px 50px, 15px 50px;
        background-position: left top, right bottom, left bottom, right top;
      }

      .btn-wrapper {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }

      .question-box {
        margin-top: var(--ddd-spacing-5);
        color: var(--ddd-theme-default-error);
        border: var(--ddd-theme-default-error) 2px solid;

        background: linear-gradient(90deg, var(--ddd-theme-default-error) 50%, transparent 50%),
                    linear-gradient(90deg, var(--ddd-theme-default-error) 50%, transparent 50%), 
                    linear-gradient(0deg, var(--ddd-theme-default-error) 50%, transparent 50%), 
                    linear-gradient(0deg, var(--ddd-theme-default-error) 50%, transparent 50%);
        background-color: var(--ddd-theme-default-roarGolden);

        background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;

        /* Cant use DDD for sizing here, has to be exact numbers */
        background-size: 50px 15px, 50px 15px, 15px 50px, 15px 50px;
        background-position: left top, right bottom, left bottom, right top;
      }

      .answers-wrapper,
      .choices-wrapper {
        margin: var(--ddd-spacing-1);
      }

      .answers,
      .choices {
        font-family: "Press Start 2P", system-ui;
        font-size: .75em;
        background-color: var(--ddd-theme-default-coalyGray);
        padding: var(--ddd-spacing-1);
        border: white var(--ddd-spacing-1) solid;
        color: white;

        transition: transform .2s linear;
      }

      .answer-box.hovered,
      .question-box.hovered {
        animation: border-animation .5s infinite linear;
      }

      .answers:focus,
      .answers:hover,
      .choices:focus,
      .choices:hover{
        animation: choice-animation 1s 1 ease;
        cursor: pointer;
      }

      .clear-btn,
      .check-btn {
        text-align: center;
        
        margin: var(--ddd-spacing-1);
        font-weight: bold;
        padding: var(--ddd-spacing-5);
        text-shadow: -1px -1px var(--ddd-theme-default-coalyGray), 1px 1px var(--ddd-theme-default-coalyGray);

        border-radius: var(--ddd-spacing-2);
        cursor: pointer;

        transition: background-color .3s linear;
      }

      .clear-btn {
        background-color: #941400;
        color: red;
        box-shadow: 0 6px #4a0a00; 
      }

      .check-btn {
        background-color: green;
        color: lime;
        box-shadow: 0 6px #00520e;
      }

      .green {
        color: var(--ddd-theme-default-forestGreen);
      }
      .red {
        color: var(--ddd-theme-default-error);
      }

      .clear-btn:focus,
      .clear-btn:hover {
        background-color: #690f01;
      }

      .check-btn:focus,
      .check-btn:hover {
        background-color: darkgreen;
      }

      .clear-btn:active, .check-btn:active {
        box-shadow: none;
        position: relative;
        top: .2em;
      }

      /* Makes the dashed border around question and answer box move, will be faster when a chocie is dragged over them */
      @keyframes border-animation {
        0% {
          background-position: left top, right bottom, left bottom, right top;
        }
        100% {
          background-position: left 100px top, right 100px bottom, left bottom 100px, right top 100px;
        }
      }

      /* Makes each choice wiggle when hovered */
      @keyframes choice-animation {
        0%, 100% {
          transform: rotate(0);
        }
        33% {
          transform: rotate(-2deg);
        }
        66% {
          transform: rotate(2deg);
        }
      }

      /* Makes the teacher jump when you answer correctly */
      @keyframes jump {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      /* makes sizing work for smaller window */
      @media screen and (max-width: 1250px) {
        :host {
          display: block;
          flex-direction: column;
        }
        .question-wrapper {
          display: block;
          flex-direction: column;
        }
        .question-img {
          order: 1;
          margin-bottom: var(--ddd-spacing-3);
        }
        .teacher-wrapper {
          order: 2;
        }
        .teacher-words {
          font-size: 1.25em; 
        }
        .question-box,
        .answer-box {
          width: 100%; 
          font-size: 1.25em; 
        }
        .question-box {
          width: auto;
        }
        .question-img {
          max-width: 100%; 
        }
        .ramble-text {
          font-size: .75em;
        }
        
      }

      /* Makes sizing work for mobile */
      @media screen and (max-width: 500px) {
        :host {
          padding: var(--ddd-spacing-1); 
        }
        .question-box,
        .answer-box,
        .teacher-words {
          font-size: 1em; 
        }
        .question-img {
          max-width: 100%;
          max-height: auto;
        }
        .ramble-text {
          font-size: .65em;
        }
      }

    `;
  }

  //Creates all the drag and drop events
  firstUpdated() {
    super.firstUpdated();
    const answerBoxes = this.shadowRoot.querySelectorAll('.answer-box');
    const questionBoxes = this.shadowRoot.querySelectorAll('.question-box');

    answerBoxes.forEach(answerBox => {
      answerBox.addEventListener('dragstart', (e) => this.dragStart(e));
      answerBox.addEventListener('dragover', (e) => this.dragOver(e));
      answerBox.addEventListener('dragenter', (e) => this.dragEnter(e));
      answerBox.addEventListener('dragleave', (e) => this.dragLeave(e));
      answerBox.addEventListener('drop', (e) => this.drop(e, 'answer-box'));
    });

    questionBoxes.forEach(questionBox => {
      questionBox.addEventListener('dragstart', (e) => this.dragStart(e));
      questionBox.addEventListener('dragover', (e) => this.dragOver(e));
      questionBox.addEventListener('dragenter', (e) => this.dragEnter(e));
      questionBox.addEventListener('dragleave', (e) => this.dragLeave(e));
      questionBox.addEventListener('drop', (e) => this.drop(e, 'question-box'));
    });
    this.questionHolder = this.teacherText;
    this.getData();
  }

  //Fetches the data from questions.json and puts them in this.questions (the list in question box)
  getData() {

    fetch('src/questions.json')
      .then((response) => response.json())
      .then((json) => {
        const possibleQuestions = json[this.answerSet];

        this.questions = [];
        const tags = [];
        for (const key in possibleQuestions) {
          const option = possibleQuestions[key];
          const choice = document.createElement('choices');
          choice.textContent = key;
          choice.dataset.correct = option.correct;
          choice.dataset.feedback = option.feedback;
          tags.push(choice);
        }

        tags.forEach(choice => {
          this.questions.push(choice);
        });

        this.shuffle();
    });
  }

  //Shuffles all the questions randomly
  shuffle() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }
  
  //Spawns confetti when you answer correctly
  makeItRain() {

    const success = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/success.mp3');
    success.play();

    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  //Tests if a spot on the screen is droppable
  dragOver(e) {
    e.preventDefault();
  }

  //Gets the index of the dragged choice and which box it came from on the start of a drag
  dragStart(e) {
    this.draggedIndex = e.target.dataset.index;
    this.draggedFrom = e.target.dataset.origin;

    const click = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/coin.mp3');
    click.play();
  }

  //When entering question or answer box, make the borders move faster
  dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('hovered');
  }

  //When leaving question or answer box, remove the fast animation
  dragLeave(e) {
    e.target.classList.remove('hovered');
  }

  //Drops a choice into a box
  drop(e, target, index, from) {
    e.preventDefault();

    //if this vals are null, set them to index and from (this is for pressing the buttons instead of drag and drop)
    if (this.draggedFrom == null || this.draggedIndex == null) {
      this.draggedFrom = from;
      this.draggedIndex = index;
    }
    
    const bading = new Audio('https://cdn.pixabay.com/audio/2022/03/24/audio_2d39932aa9.mp3');

    //Removes fast border animation
    e.target.classList.remove('hovered');

    //If you are dropping in answer box, and the choice is not already in answer box then
    //drop the choice, remove it from question list and push it to answer list
    if (target === 'answer-box') {
      if (this.draggedFrom != 'answer-box') {
        this.answers.push(this.questions[this.draggedIndex]);
        this.questions.splice(this.draggedIndex, 1);
        bading.play();
      }

    //If you are dropping in question box, and the choice is not already in question box then
    //drop the choice, remove it from answer list and push it to question list
    } else if (target === 'question-box') {
      if (this.draggedFrom != 'question-box') {
        this.questions.push(this.answers[this.draggedIndex]);
        this.answers.splice(this.draggedIndex, 1);
        bading.play();
      }
    }
    this.hintTextCheck();

    this.checkRemove();
    this.draggedIndex = null;
    this.draggedFrom = null;

    this.requestUpdate();
  }

  //If there is a choice in answer list, remove the hint text
  //and add it back if there are no choices in answer list
  hintTextCheck() {
    if (this.answers == '') {
      this.hintText = "Drag and Drop Answer(s)";
    } else {
      this.hintText = "";
    }

    this.requestUpdate();
  }

  //Removes the feedback and colored borders if there is an update after you check your answers
  checkRemove() {

    if (this.teacherText != this.questionHolder) {
      this.teacherText = this.questionHolder;
    }

    this.shadowRoot.querySelector('.speech-bubble').innerHTML = `<type-writer class="teacher-words" delay="100" text="${this.teacherText}" erase-speed="15" speed="50"></type-writer>`;
    this.answers.forEach((ans, index) => {
      this.answers[index].style.border = 'transparent 5px solid';
      this.answers[index].style.padding = '0px';
     });
     this.questions.forEach((ques, index) => {
      this.questions[index].style.border = 'transparent 5px solid';
      this.questions[index].style.padding = '0px';
     });

     this.teacherDance = false;
  }

  //Removes all chocies in answer box and puts them in question box
  clear() {
    const explode = new Audio('https://www.myinstants.com/media/sounds/minecraft-explode1.mp3');

    if (this.answers != '') {

      this.answers.forEach(answer => {
        this.questions.push(answer);
      });

      this.answers = [];

      explode.play();
      this.checkRemove();
      
    } else {
      const error = new Audio('https://www.myinstants.com/media/sounds/error_CDOxCYm.mp3');
      error.play();
    }
    this.shuffle();
    this.hintTextCheck();
    this.requestUpdate();
  }

  //Checks if the answers you have in answer box are correct
  check() {
    if (this.answers != '') {
      this.shadowRoot.querySelector('.speech-bubble').innerHTML = ``;
      this.teacherText = '';
      let allCorrect = 0;
      
      //Gets the feedback and correct data from each answer
      this.answers.forEach((ans, index) => {
        const feedback = this.answers[index].dataset.feedback;
        const isCorrect = this.answers[index].dataset.correct;
        this.answers[index].style.border = 'none';
        
        //if the answer is correct, give it a green circle and show the feedback as green
        if (isCorrect == "true") {

          allCorrect += 1;

          this.answers[index].style.border = 'green 5px solid';
          this.answers[index].style.borderRadius = '20px';
          this.answers[index].style.padding = '10px';

          this.shadowRoot.querySelector('.speech-bubble').innerHTML += `<type-writer class="green" delay="100" text="-${feedback}" erase-speed="15" speed="50"></type-writer>`
        
        //if the answer is wrong, give it a red circle and show the feedback as red
        } else {
          this.answers[index].style.border = 'red 5px solid';
          this.answers[index].style.borderRadius = '20px';
          this.answers[index].style.padding = '10px';

          this.shadowRoot.querySelector('.speech-bubble').innerHTML += `<type-writer class="red" delay="100" text="-${feedback}" erase-speed="15" speed="50"></type-writer>`
        }
      });
      
      //If every answer in answer box is correct, make the teacher dance and spawn confetti
      if (allCorrect == this.answers.length) {
        this.makeItRain();
        this.teacherDance = true;
        
      } else {
        const error = new Audio('https://www.myinstants.com/media/sounds/error_CDOxCYm.mp3');
        error.play();
      }
    }
    this.requestUpdate();
  }
  
  //Super fun HTML
  render() {
    return html`
    <confetti-container id="confetti">
        <div class="project2">
          <div class="ramble-text">${this.ramble}</div>
          <div class="question-wrapper">
            <img class="question-img" src="${this.img}" alt="Image that relates to the question">
            <div class="teacher-wrapper">
              <div class="speech-bubble">
                <type-writer class="teacher-words" delay="100" text="${this.teacherText}" erase-speed="15" speed="50"></type-writer>
              </div>
              <div class="bubble-point"></div>
              <div class="character-wrapper">
                <rpg-character class="teacher" seed="zpg"></rpg-character>
              </div>
            </div>
          </div>
          <div class="answer-section">
            <div class="answer-box">
              ${this.hintText}
              ${this.answers.map((answer, index) => html`
                <div class="answers-wrapper">
                  <button @click="${(e) => this.drop(e,"question-box", index, "answer-box")}" class="answers" draggable="true" data-index="${index}" data-origin="answer-box">${answer}</button>
                </div>
              `)}
            </div>
            <div class="btn-wrapper">
              <button @click="${this.clear}" class="clear-btn">X</button>
              <button @click="${this.check}" class="check-btn">✔</button>
            </div>
          </div>
          <div class="question-box">
            ${this.questions.map((question, index) => html`
              <div class="choices-wrapper">
                <button @click="${(e) => this.drop(e,"answer-box", index, "question-box")}" class="choices" draggable="true" data-index="${index}" data-origin="question-box">${question}</button>
              </div>
            `)}
          </div>
        </div>
      </confetti-container>
    `;
  }


  static get properties() {
    return {
        teacherText: { type: String, reflect: true},
        questions: { type: Array, reflect: true },
        answers: { type: Array, reflect: true },
        draggedIndex: { type: Number, reflect: true },
        draggedFrom: { type: String, reflect: true},
        hintText: { type: String, reflect: true},
        rotation: { type: Number, reflect: true },
        img: { type: String, reflect: true},
        answerSet: { type: String, reflect: true},
        questionHolder: { type: String, reflect: true},
        ramble: { type: String, reflect: true},
        
        borderFalse: { type: Boolean, reflect: true},
        borderTrue: { type: Boolean, reflect: true},
        teacherDance: { type: Boolean, reflect: true},
    };
  }
}


globalThis.customElements.define(TaggingQ.tag, TaggingQ);
