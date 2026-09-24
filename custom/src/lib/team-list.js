import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "./team-card.js";

class TeamList extends DDD {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `,
    ];
  }
  render() {
    return html`
      ${this._items.map(
        (item) => html`
          <team-card
            name=${item.title}
            image=${item.metadata ? item.metadata.image : ""}
            .item=${item}
            position=${item.metadata ? item.metadata.jobTitle : ""}
          ></team-card>
        `,
      )}
    `;
  }
  static get tag() {
    return "team-list";
  }
  static get properties() {
    return {
      /**
       * Items from sites.json
       */
      _items: {
        type: Array,
      },
    };
  }
  constructor() {
    super();
    this._items = [];
    this.__disposer = autorun(() => {
      this.manifest = toJS(store.routerManifest);
      if (this.manifest && this.manifest.items) {
        this._items = this.manifest.items.filter((item) => {
          if (
            typeof item.metadata !== "undefined" &&
            typeof item.metadata.type !== "undefined" &&
            item.metadata.type === "team"
          ) {
            return true;
          }
          return false;
        });
      }
    });
  }
  disconnectedCallback() {
    if (this.__disposer) {
      this.__disposer();
    }
    super.disconnectedCallback();
  }
}
globalThis.customElements.define(TeamList.tag, TeamList);
export { TeamList };
