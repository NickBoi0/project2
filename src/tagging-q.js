import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class TaggingQ extends DDD {

  static get tag() {
    return 'tagging-q';
  } 

  constructor() {
    super();
    this.title = "What color is the background?"
    this.questions = ["red", "blue", "green"];
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

      .input-area {
        text-align: left;
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
        overflow-wrap: break-word;
        margin: var(--ddd-spacing-3);

        padding: var(--ddd-spacing-2);
        color: var(--ddd-theme-default-opportunityGreen);
        background-color: var(--ddd-theme-default-futureLime);
        border: var(--ddd-theme-default-opportunityGreen) 5px dashed;
      }

      .question-box {
        margin-top: var(--ddd-spacing-20);
        border: black 2px solid;
        padding: var(--ddd-spacing-4);
      }

      .choices-wrapper {
        display: flex;
        margin: 8px;
        justify-content: top;
        align-items: top; 
      }

      .choices {
        display: flex;
        font-size: 15px;
        background-color: black;
        padding: var(--ddd-spacing-2);
        border: white 2px solid;
      }
    `;
  }

  firstUpdated() {

  }

  allowDrop(e) {
      e.preventDefault();
  }

  drag(index, origin) {
      this.draggedIndex = index;
      this.draggedFrom = origin;
  }

  drop(e, target) {
      e.preventDefault();

      if (target === 'input-area') {
          if (this.draggedFrom != 'input-area') {
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

                <div class="input-area" @drop="${(e) => this.drop(e, 'input-area')}" @dragover="${this.allowDrop}">Drag and Drop Answer
                    ${this.answers.map((answer, index) => html`

                    <div class="answers-wrapper">
                        <div class="answers" draggable="true" @dragstart="${() => this.drag(index, 'input-area')}">${answer}</div>
                    </div>
                    `)}
                </div>

                <div class="question-box" @drop="${(e) => this.drop(e, 'question-box')}" @dragover="${this.allowDrop}">

                ${this.questions.map((question, index) => html`

                    <div class="choices-wrapper">
                        <div class="choices" draggable="true" @dragstart="${() => this.drag(index, 'question-box')}">${question}</div>
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
