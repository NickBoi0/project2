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

    this.borderTrue = false;
    this.borderFalse
  }

  static get styles() {

    return css`

      :host {
        display: flex;
        justify-content: left; 
        align-items: left; 
        background-color: var(--ddd-theme-default-beaverBlue);
        border: var(--ddd-theme-default-nittanyNavy) 20px solid;
        border-bottom: transparent;
        padding: var(--ddd-spacing-3);
      }

      :host([borderTrue]) .answers {
        color: green;
      }
      :host([borderFalse]) .answers {
        color: red;
      }

      .question-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .question-img {
        max-width: 500px;
        max-height: 400px;
        border: black 5px solid;
        border-radius: 8px;
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
        background-color: white;
        border-radius: 10px;
        padding: var(--ddd-spacing-2);

        width: 600px;
        max-height: 150px;

        text-overflow: ellipsis;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thick;
        scrollbar-color: black lightgrey;
    }

      .bubble-point {
        margin-top: 20px;
        width: 0; 
        height: 0; 
        border-top: 60px solid transparent;
        border-bottom: 60px solid transparent;
        
        border-left: 60px solid white;
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
        color: white;
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
      }

      .red,
      .green,
      .teacher-words {
        text-align: left;
        background: transparent;
        border: transparent;
        font-family: "Press Start 2P", system-ui;
        color: black;
        font-size: 25px;
      }

      .answer-section {
        display: flex;
      }

      .question-box,
      .answer-box {
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
        overflow-wrap: break-word;
        overflow: hidden;

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
        font-size: 20px;
        background-color: black;
        padding: var(--ddd-spacing-1);
        border: white 5px solid;
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
        transform: rotate(5deg);
        cursor: pointer;
      }

      .clear-btn,
      .check-btn {
        text-align: center;
        
        margin: var(--ddd-spacing-1);
        font-weight: bold;
        padding: var(--ddd-spacing-5);
        text-shadow: -1px -1px black, 1px 1px black;

        border-radius: var(--ddd-spacing-2);
        cursor: pointer;

        transition: background-color .2s linear;
      }

      .clear-btn {
        background-color: #941400;
        color: red;
        box-shadow: 0 .2em #4a0a00; 
      }

      .check-btn {
        background-color: green;
        color: lime;
        box-shadow: 0 .2em #00520e;
      }

      .green {
        color: green;
      }
      .red {
        color: red;
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

      @keyframes border-animation {
        0% {
          background-position: left top, right bottom, left bottom, right top;
        }
        100% {
          background-position: left 100px top, right 100px bottom, left bottom 100px, right top 100px;
        }
      }

    `;
  }

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

  shuffle() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }
  
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

  dragOver(e) {
    e.preventDefault();
  }

  dragStart(e) {
    this.draggedIndex = parseInt(e.target.dataset.index);
    this.draggedFrom = e.target.dataset.origin;

    const click = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/coin.mp3');
    click.play();
  }

  dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('hovered');
  }

  dragLeave(e) {
    e.target.classList.remove('hovered');
  }

  drop(e, target, index, from) {
    e.preventDefault();

    if (this.draggedIndex == null && this.draggedFrom == null) {
      this.draggedIndex = index;
      this.draggedFrom = from;
    }
    
    const bading = new Audio('https://cdn.pixabay.com/audio/2022/03/24/audio_2d39932aa9.mp3');

    e.target.classList.remove('hovered');

    if (target === 'answer-box') {
      if (this.draggedFrom != 'answer-box') {
        this.answers.push(this.questions[this.draggedIndex]);
        this.questions.splice(this.draggedIndex, 1);
        bading.play();
      }
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

  hintTextCheck() {
    if (this.answers == '') {
      this.hintText = "Drag and Drop Answer(s)";
    } else {
      this.hintText = "";
    }

    this.requestUpdate();
  }

  checkRemove() {
    this.shadowRoot.querySelector('.speech-bubble').innerHTML = `<type-writer class="teacher-words" delay="100" text="${this.teacherText}" erase-speed="15" speed="50"></type-writer>`;
    this.answers.forEach((ans, index) => {
      this.answers[index].style.border = 'transparent 5px solid';
      this.answers[index].style.padding = '0px';
     });
     this.questions.forEach((ques, index) => {
      this.questions[index].style.border = 'transparent 5px solid';
      this.questions[index].style.padding = '0px';
     });
  }

  clear() {

    const explode = new Audio('https://www.myinstants.com/media/sounds/minecraft-explode1.mp3');

    if (this.answers != '') {

      this.answers.forEach(answer => {
        this.questions.push(answer);
      });

      this.checkRemove();

      this.answers = [];
      this.teacherText = this.questionHolder;
      explode.play();
      
    }
    this.shuffle();
    this.requestUpdate();
  }

  check() {
    this.shadowRoot.querySelector('.speech-bubble').innerHTML = ``;
    let allCorrect = 0;
  
    this.answers.forEach((ans, index) => {
      const feedback = this.answers[index].dataset.feedback;
      const isCorrect = this.answers[index].dataset.correct;
      this.answers[index].style.border = 'none';
      
      if (isCorrect == "true") {

        allCorrect += 1;

        this.answers[index].style.border = 'green 5px solid';
        this.answers[index].style.borderRadius = '20px';
        this.answers[index].style.padding = '10px';

        this.shadowRoot.querySelector('.speech-bubble').innerHTML += `<type-writer class="green" delay="100" text="${feedback}" erase-speed="15" speed="50"></type-writer>`
      } else {
        this.answers[index].style.border = 'red 5px solid';
        this.answers[index].style.borderRadius = '20px';
        this.answers[index].style.padding = '10px';

        this.shadowRoot.querySelector('.speech-bubble').innerHTML += `<type-writer class="red" delay="100" text="${feedback}" erase-speed="15" speed="50"></type-writer>`
      }

      this.shadowRoot.querySelector('.speech-bubble').innerHTML += `<type-writer class="green" delay="100" text="" erase-speed="0" speed="0"></type-writer>`
    });
    
    if (allCorrect == this.answers.length) {
      this.makeItRain();
    }
    this.requestUpdate();
  }
  
  render() {
    return html`
    <confetti-container id="confetti">
        <div class="project2">
          <div class="question-wrapper">
            <img class="question-img" src="${this.img}" alt="Image that relates to the question">
            <div class="teacher-wrapper">
              <div class="speech-bubble">
                <type-writer class="teacher-words" delay="100" text="${this.teacherText}" erase-speed="15" speed="50"></type-writer>
              </div>
              <div class="bubble-point"></div>
              <div class="character-wrapper">
                <rpg-character seed="zpg"></rpg-character>
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

        borderFalse: { type: Boolean, reflect: true},
        borderTrue: { type: Boolean, reflect: true},
    };
  }
}


globalThis.customElements.define(TaggingQ.tag, TaggingQ);
