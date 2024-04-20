import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class TaggingQ extends DDD {

  static get tag() {
    return 'tagging-q';
  } 

  constructor() {
    super();
    this.title = "What color is the sky?"
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
        justify-content: center; 
        align-items: center; 
        height: 100vh;
      }

      .background {
        background-color: var(--ddd-theme-default-beaverBlue);
        padding: var(--ddd-spacing-4);
        height: 625px;
        width: 1075px;
        display: flex;
        border: var(--ddd-theme-default-nittanyNavy) 20px outset;
        flex-direction: column;
        overflow: hidden;
      }

      .question-heading,
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
        margin-top: var(--ddd-spacing-20);
        color: var(--ddd-theme-default-error);

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
        text-shadow: 1px 1px black, -1px -1px black;

        line-height: 1.5em;
        text-align: center;
        display: inline-block;
        width: 1.5em;
        -webkit-border-radius: .75em;
        -moz-border-radius: .75em;
        -o-border-radius: .75em;
          border-radius: .75em;
        background-color: red;
        -webkit-box-shadow:  0 .2em maroon;
        -moz-box-shadow:  0 .2em maroon;
        -o-box-shadow:  0 .2em maroon;
        box-shadow:  0 .2em maroon;
        color: white;
        margin: var(--ddd-spacing-2);
        background-color: red;
        background-image: -o-linear-gradient(left top, pink 3%, red 22%, maroon 99%);
        background-image: -moz-linear-gradient(left top, pink 3%, red 22%, maroon 99%);
        background-image: -webkit-linear-gradient(left top, pink 3%, red 22%, maroon 99%);
        background-image: linear-gradient(left top, pink 3%, red 22%, maroon 99%);
        cursor: pointer;
        padding: var(--ddd-spacing-2);

        transition: .3s linear;
      }

      .clear-btn:focus,
      .clear-btn:hover,
      .check-btn:focus,
      .check-btn:hover {
        background-image: -o-linear-gradient(left top, red 3%, darkred 22%, black 99%);
        background-image: -moz-linear-gradient(left top, red 3%, darkred 22%, black 99%);
        background-image: -webkit-linear-gradient(left top, red 3%, darkred 22%, black 99%);
        background-image: linear-gradient(left top, red 3%, darkred 22%, black 99%);

        -webkit-box-shadow:  0 .2em black;
        -moz-box-shadow:  0 .2em black;
        -o-box-shadow:  0 .2em black;
        box-shadow:  0 .2em black;
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

  dragOver(e) {
    e.preventDefault();
  }

  dragStart(e) {
    this.draggedIndex = parseInt(e.target.dataset.index);
    this.draggedFrom = e.target.dataset.origin;
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

    e.target.classList.remove('hovered');

    if (target === 'answer-box') {
      if (this.draggedFrom != 'answer-box') {
        this.answers.push(this.questions[this.draggedIndex]);
        this.questions.splice(this.draggedIndex, 1);
      }
    } else if (target === 'question-box') {
      if (this.draggedFrom != 'question-box') {
        this.questions.push(this.answers[this.draggedIndex]);
        this.answers.splice(this.draggedIndex, 1);
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
    if (this.answers != '') {

      this.answers.forEach(answer => {
        this.questions.push(answer);
      });

      this.answers = [];
      
    }
    this.requestUpdate();
  }

  check() {
    if (this.answers != '') {
      
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="project2">
        <div class="background">
          <div class="question-heading">Question: ${this.title}</div>
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
        </div>
      </div>
    `;
  }


  static get properties() {
    return {
        title: { type: String, reflect: true},
        questions: { type: Array, reflect: true },
        answers: { type: Array, reflect: true },
        draggedIndex: { type: Number, reflect: true },
        draggedFrom: { type: String, reflect: true},
        hintText: { type: String, reflect: true},
        rotation: { type: Number, reflect: true },
    };
  }
}


globalThis.customElements.define(TaggingQ.tag, TaggingQ);
