import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "./odl-faqs.js";
import "./odl-faqs-item.js";

class HaxthemeFaqs extends DDD {
  static get tag() {
    return "haxtheme-faqs";
  }

  static get properties() {
    return {
      ...(super.properties || {}),
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
      faqs: { type: Array },
    };
  }

  constructor() {
    super();
    this.editMode = false;
    this.faqs = [];
  }

  static get styles() {
    return [
      super.styles || [],
      css`
        :host {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
        }
        :host([edit-mode]) #slot {
          display: none;
        }
        #container {
          display: block;
          padding: 1em;
          max-width: 900px;
          margin: 0 auto;
        }
        #search {
          max-width: 900px;
          margin: auto;
        }
        input {
          margin: auto;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 3px;
          margin-bottom: 10px;
          width: 100%;
          box-sizing: border-box;
          font-family: montserrat;
          color: #2c3e50;
          font-size: 13px;
        }
      `,
    ];
  }

  render() {
    return html`
      <div id="container">
        <h1>Frequently Asked Questions</h1>
        <div id="results">
          <div id="contentcontainer">
            <div id="slot">
              <slot></slot>
            </div>
          </div>
          <odl-faqs tags="zoom"></odl-faqs>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(HaxthemeFaqs.tag, HaxthemeFaqs);
export { HaxthemeFaqs };
