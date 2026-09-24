import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "./page-banner.js";

class HaxThemeDemos extends DDD {
  static get tag() {
    return "haxtheme-demos";
  }

  static get properties() {
    return {
      ...(super.properties || {}),
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
      manifest: { type: Object },
    };
  }

  constructor() {
    super();
    this.editMode = false;
    this.__disposer = autorun(() => {
      this.manifest = toJS(store.routerManifest);
    });
  }

  disconnectedCallback() {
    this.__disposer();
    super.disconnectedCallback();
  }

  static get styles() {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
        }
        #content-wrap {
          display: flex;
          justify-content: center;
        }
        :host([edit-mode]) #slot {
          display: none;
        }
      `,
    ];
  }

  render() {
    return html`
      <page-banner
        image="files/theme-images/page-banners/course_banner.jpg"
        text="Demos Template"
        alt=""
      ></page-banner>
      <div id="wrap">
        <div id="content-wrap">
          <div id="contentcontainer">
            <div id="slot">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(HaxThemeDemos.tag, HaxThemeDemos);
export { HaxThemeDemos };
