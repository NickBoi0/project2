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
    this.teacherText = "What color is the sky?"
    this.questions = ["blue", "red", "green", "purple", "yellow", "black", "white", "pink"];
    this.answers = [];
    this.draggedIndex;
    this.draggedFrom;
    this.hintText = "Drag and Drop Answer(s)";
    this.rotation = -5;
  }

  static get styles() {

    return css`

      :host {
        display: flex;
        justify-content: left; 
        align-items: left; 
        background-color: var(--ddd-theme-default-beaverBlue);
        border: var(--ddd-theme-default-nittanyNavy) 20px outset;
        padding: var(--ddd-spacing-3);
      }

      .question-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .question-img {
        border: black 5px solid;
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
      }

      .speech-bubble:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 100%;
          margin-top: -10px;
          border-width: 10px;
          border-style: solid;
          border-color: transparent;
          border-left-color: white; 
      }

      .character-wrapper {
        padding: var(--ddd-spacing-2);
      }

      .teacher-words,
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

      .teacher-words {
        color: black;
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
        font-size: 25px;
        background-color: black;
        padding: var(--ddd-spacing-2);
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
      }

      .clear-btn,
      .check-btn {
        text-align: center;
        
        margin: var(--ddd-spacing-1);
        font-weight: bold;
        padding: var(--ddd-spacing-5);
        background-color: lightgray;
        text-shadow: -1px -1px black, 1px 1px white;
        color: gray;

        border-radius: var(--ddd-spacing-2);
        box-shadow: 0 .2em gray; 
        cursor: pointer;

        transition: background-color .2s linear;
      }

      .clear-btn:focus,
      .clear-btn:hover,
      .check-btn:focus,
      .check-btn:hover {
        background-color: #ababab;
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
  }

  createQuestion() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            this.title = data.title;
            this.questions = data.questions.map(question => question.answer);
            this.answers = data.questions.map(question => question.answer);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
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

  drop(e, target) {
    e.preventDefault();

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

  clear() {

    const explode = new Audio('https://www.myinstants.com/media/sounds/minecraft-explode1.mp3');

    if (this.answers != '') {

      this.answers.forEach(answer => {
        this.questions.push(answer);
      });

      this.answers = [];
      explode.play();
      
    }
    this.requestUpdate();
  }

  check() {
    if (this.answers != '') {
      this.makeItRain();
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="project2">
        <confetti-container id="confetti">
          <div class="question-wrapper">
            <img class="question-img" src="${this.img}" alt="Image that relates to the question">
            <div class="teacher-wrapper">
              <div class="speech-bubble">
                <type-writer class="teacher-words" delay="100" text="Question: ${this.teacherText}" erase-speed="15" speed="50"></type-writer>
              </div>
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
                    <div class="answers" draggable="true" data-index="${index}" data-origin="answer-box">${answer}</div>
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
                <div class="choices" draggable="true" data-index="${index}" data-origin="question-box">${question}</div>
              </div>
            `)}
          </div>
        </confetti-container>
      </div>
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
    };
  }
}


globalThis.customElements.define(TaggingQ.tag, TaggingQ);
