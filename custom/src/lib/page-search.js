import { LitElement, html, css } from "lit";
import { autorun, toJS } from "mobx";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/site/site-search.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/layout/site-modal.js";

class PageSearch extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        #search_wrap {
          margin-right: var(--ddd-spacing-4);
        }
      `
    ];
  }
  render() {
    return html`
      <div id="search_wrap">
        <site-modal
          .disabled=${this.editMode}
          icon="icons:search"
          title="Search site"
          button-label="Search"
        >
          <site-search></site-search>
        </site-modal>
      </div>
    `;
  }
  static get tag() {
    return "page-search";
  }
  static get properties() {
    return {
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
    };
  }
  constructor() {
    super();
    this.editMode = false;
    this.__disposer = [];
    autorun((reaction) => {
      const _mobx_val_0 = toJS(store.editMode);
      Promise.resolve().then(() => {
        this.editMode = _mobx_val_0;
      });
      this.__disposer.push(reaction);
    });
  }
  disconnectedCallback() {
    for (var i in this.__disposer) {
      this.__disposer[i].dispose();
    }
    super.disconnectedCallback();
  }
}
globalThis.customElements.define(PageSearch.tag, PageSearch);
export { PageSearch };
