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
    this.questions = ["blue", "red", "green", "purple"];
    this.answers = [];
    this.draggedIndex;
    this.draggedFrom;
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
        height: 525px;
        width: 975px;
        display: flex;
        border: var(--ddd-theme-default-nittanyNavy) 20px outset;
        flex-direction: column;
        overflow: hidden;
      }

      .question-heading,
      .choices {
        text-align: left;
        background: transparent;
        border: transparent;
        color: white;
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
      }

      .question-box,
      .answer-box {
        text-align: left;
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
        overflow-wrap: break-word;
        margin: var(--ddd-spacing-3);
        width: 900px;
        height: 200px;

        display: flex;
        flex-wrap: wrap;
      }

      .answer-box {
        padding: var(--ddd-spacing-4);
        color: var(--ddd-theme-default-opportunityGreen);
        background-color: var(--ddd-theme-default-futureLime);
        border: var(--ddd-theme-default-opportunityGreen) 5px dashed;
      }

      .question-box {
        margin-top: var(--ddd-spacing-20);
        padding: var(--ddd-spacing-4);
        color: var(--ddd-theme-default-error);
        background-color: var(--ddd-theme-default-roarGolden);
        border: var(--ddd-theme-default-error) 5px dashed;
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
      }

      .answers:hover,
      .choices:hover {
        border-color: pink;
        color: pink;
      }

      .answer-box.hovered,
      .question-box.hovered {
        border: pink 5px dashed;
        color: pink;
      }

      .answers:focus,
      .answers:hover,
      .choices:focus,
      .choices:hover{
        border: pink 5px solid;
        color: pink;
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

    this.requestUpdate();
  }

  render() {
    return html`
      <div class="project2">
        <div class="background">
          <div class="question-heading">Question: ${this.title}</div>
          <div class="answer-box">
            Drag and Drop Answer
            ${this.answers.map((answer, index) => html`
              <div class="answers-wrapper">
                <div class="answers" draggable="true" data-index="${index}" data-origin="answer-box">${answer}</div>
              </div>
            `)}
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
    };
  }
}


globalThis.customElements.define(TaggingQ.tag, TaggingQ);
