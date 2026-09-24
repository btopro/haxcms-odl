/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";

/**
 * `site-menu`
 * `Menu hierarchy`
 */
class ResourcesSidemenu extends LitElement {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      css`
        :host {
          display: block;
          height: auto;
        }

        ul {
          list-style-type: none;
          margin-left: 0em;
          padding-left: 0em;
        }

        li {
          list-style-type: none;
          margin-left: 0em;
          padding-left: .5em;
        }

        a {
          color: var(--odl-haxtheme-accent-color-2);
          padding: .8em;
          padding-bottom: .5em;
          padding-right: .2em;
          border-bottom: solid 1px #dcdcdc;
          display: block;
          text-decoration: none;
          font-size: .9em;
        }

        a:hover {
          color: calc(var(--odl-haxtheme-accent-color-2) * 0.1);
        }
      `
    ];
  }
  /**
   * Store the tag name to make it easier to obtain directly.
   */
  static get tag() {
    return "resources-sidemenu";
  }
  /**
   * HTMLElement life cycle
   */
  constructor() {
    super();
    this.__disposer = [];
    this.__disposer.push(
      autorun(() => {
        const _mobx_val_0 = toJS(store.routerManifest);
        Promise.resolve().then(() => {
          this.__updateMenu(_mobx_val_0);
        });
      }),
    );
  }
  /**
   * LitElement life cycle - properties definition
   */
  static get properties() {
    return {
      /**
       * Manifest with router / location enhancements
       */
      manifest: {
        type: Object,
      },
      activeItem: {
        type: Object,
      },
    };
  }
  /**
   * LitElement life cycle - render callback
   */
  render() {
    return html`
      ${this.__renderSideMenu(this.manifest)}
    `;
  }
  disconnectedCallback() {
    this.__disposer.forEach((d) => d());
    super.disconnectedCallback();
  }
  __updateMenu(routerManifest) {
    // figure out where to start
    if (routerManifest && routerManifest.items) {
      const topLevelObject = routerManifest.items.find(
        (i) => i.id === "resources",
      );
      this.manifest = topLevelObject;
    }
  }
  __renderSideMenu(item) {
    if (item) {
      return html`
        <ul>
          <li>
            <a href="${item.slug}">${item.title}</a>
            ${item.children && item.children.length > 0
              ? html`
                  ${item.children.map((i) => this.__renderSideMenu(i))}
                `
              : ""}
          </li>
        </ul>
      `;
    } else {
      return "";
    }
  }
}
globalThis.customElements.define(ResourcesSidemenu.tag, ResourcesSidemenu);
export { ResourcesSidemenu };
