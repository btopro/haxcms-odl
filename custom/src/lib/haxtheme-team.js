import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "@haxtheweb/haxcms-elements/lib/ui-components/query/site-query.js";
import "./page-banner.js";
import "./team-card.js";

class HaxThemeTeam extends DDD {
  static get tag() {
    return "haxtheme-team";
  }

  static get properties() {
    return {
      ...(super.properties || {}),
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
      __items: { type: Array },
    };
  }

  constructor() {
    super();
    this.editMode = false;
    this.__items = [];
    this.__itemsChanged = this.__itemsChanged.bind(this);
    // Stable conditions object to avoid site-query re-query loop on re-render.
    this.__teamConditions = { "metadata.type": "team" };
    this.__disposer = autorun(() => {
      this.editMode = toJS(store.editMode);
    });
  }

  disconnectedCallback() {
    this.__disposer();
    super.disconnectedCallback();
  }

  __itemsChanged(e) {
    this.__items = e.detail.value;
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
        a {
          text-decoration: var(--haxtheme-team-a-text-decoration);
        }
        #team_card {
          display: var(--haxtheme-team-team-card-display, grid);
          grid-template-columns: var(
            --haxtheme-team-team-card-grid-template-columns,
            repeat(3, auto [col-start])
          );
          justify-content: var(
            --haxtheme-team-team-card-justify-content,
            center
          );
          margin: var(--haxtheme-team-team-card-margin, 25px 0 0 0);
          padding: var(--haxtheme-team-team-card-padding, 0 0 25px 0);
        }
        @media screen and (max-width: 1000px) {
          #team_card {
            grid-template-columns: var(
              --haxtheme-team-team-card-grid-template-columns-mobile,
              repeat(2, auto [col-start])
            );
          }
        }
        @media screen and (max-width: 768px) {
          #team_card {
            grid-template-columns: var(
              --haxtheme-team-team-card-grid-template-columns-mobile,
              repeat(1, auto [col-start])
            );
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <site-query
        .conditions=${this.__teamConditions}
        @result-changed=${this.__itemsChanged}
      ></site-query>
      <page-banner
        image="files/theme-images/page-banners/team-banner.jpg"
        text="Team"
        alt="Office of Digital Learning Team"
      ></page-banner>
      <div id="team_card">
        ${this.__items.map(
          (item) => html`
            <team-card
              name=${item.metadata.fields.name}
              image=${item.metadata.fields.image}
              position=${item.metadata.fields.jobTitle}
              info=${item.metadata.fields.info}
              url=${item.slug}
            ></team-card>
          `,
        )}
      </div>
      <div id="contentcontainer">
        <div id="slot">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(HaxThemeTeam.tag, HaxThemeTeam);
export { HaxThemeTeam };
