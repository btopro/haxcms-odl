import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "./page-banner.js";

class HaxThemeAbout extends DDD {
  static get tag() {
    return "haxtheme-about";
  }

  static get properties() {
    return {
      ...(super.properties || {}),
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
      manifest: { type: Object },
      activeItem: { type: Object },
    };
  }

  constructor() {
    super();
    this.editMode = false;
    this.activeItem = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.__disposer = [];
    autorun((reaction) => {
      this.manifest = toJS(store.routerManifest);
      this.__disposer.push(reaction);
    });
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
          display: block;
        }
        :host([edit-mode]) #slot {
          display: none;
        }
        h1 {
          font-size: 36px;
          font-weight: 400;
        }
        #content-wrap {
          width: 80%;
          margin: 0 auto 0 auto;
        }
        #contentcontainer {
          font-size: 18px;
          font-weight: 300;
          line-height: 1.4;
        }
        #about_header {
          border-left: solid;
          border-left-width: 4px;
          border-left-color: #e2801e;
          padding-left: 15px;
        }
        body.dark-mode #about_header {
          border-left-color: light-dark(#e2801e, #f5a13d);
        }
        @media (prefers-color-scheme: dark) {
          #about_header {
            border-left-color: #f5a13d;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <page-banner
        image="files/theme-images/page-banners/about-banner.jpg"
        text="About"
        alt="Gateway to the Sciences"
      ></page-banner>
      <div id="content-wrap">
        <div id="about_header">
          <div id="title">
            <h1>What We Do</h1>
          </div>
        </div>
        <div id="contentcontainer">
          <div id="slot">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(HaxThemeAbout.tag, HaxThemeAbout);
export { HaxThemeAbout };
