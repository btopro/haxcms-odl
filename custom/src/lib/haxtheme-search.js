import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

class HaxthemeSearch extends DDD {
  static get tag() {
    return "haxtheme-search";
  }

  static get properties() {
    return {
      ...(super.properties || {}),
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
      results: { type: Array },
    };
  }

  constructor() {
    super();
    this.editMode = false;
    this.results = [];
    this.__inputChanged = this.__inputChanged.bind(this);
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
        <div id="search">
          <h1>Search</h1>
          <input
            @input=${this.__inputChanged}
            type="search"
            placeholder="Search..."
            aria-label="Search this site"
          />
        </div>
        <div id="results"></div>
      </div>
    `;
  }

  __inputChanged(e) {
    const value = e.target.value;
    fetch("lunrSearchIndex.json")
      .then((res) => res.json())
      .then((res) => {
        this.results = res;
      });
  }
}
globalThis.customElements.define(HaxthemeSearch.tag, HaxthemeSearch);
export { HaxthemeSearch };
