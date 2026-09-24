import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";

class HaxthemeFaq extends DDD {
  static get tag() {
    return "haxtheme-faq";
  }

  static get properties() {
    return {
      ...(super.properties || {}),
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
      activeItem: { type: Object },
    };
  }

  constructor() {
    super();
    this.editMode = false;
    this.activeItem = null;
    this.__disposer = [];
    autorun((reaction) => {
      this.activeItem = toJS(store.activeItem);
      this.__disposer.push(reaction);
    });
  }

  disconnectedCallback() {
    for (var i in this.__disposer) {
      this.__disposer[i].dispose();
    }
    super.disconnectedCallback();
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
          width: 100%;
          margin: 0 auto;
        }
      `,
    ];
  }

  render() {
    return html`
      <div id="container">
        ${this.activeItem ? html`<h1>${this.activeItem.title}</h1>` : html``}
        <div id="contentcontainer">
          <div id="slot">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(HaxthemeFaq.tag, HaxthemeFaq);
export { HaxthemeFaq };
