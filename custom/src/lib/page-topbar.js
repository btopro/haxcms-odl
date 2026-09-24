import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";
import "./company-mark.js";
import "./page-search.js";
import "./alert-message.js";
class PageTopBar extends DDD {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          padding: var(--ddd-spacing-1);
        }

        a {
          text-decoration: none;
        }

        #topbar-wrap {
          display: flex;
          justify-content: stretch;
          align-items: center;
        }

        .spacer {
          flex: 1 1 auto;
        }

        .action_button {
          display: flex;
          justify-content: center;
        }

        a#schedule {
          text-transform: none;
          background-color: var(--theme-color-2, #e2801e);
          color: var(--theme-color-4, #fff);
          display: inline-flex;
          align-items: center;
          border: none;
          cursor: pointer;
          font-family: inherit;
          text-decoration: none;
        }

        a#schedule .title {
          padding: var(--ddd-spacing-2);
        }

        simple-icon-lite {
          margin-left: var(--ddd-spacing-3);
          --simple-icon-width: var(--ddd-icon-size, 24px);
          --simple-icon-height: var(--ddd-icon-size, 24px);
        }

        @media screen and (max-width: 768px) {
          .action_button {
            font-size: var(--ddd-font-size-xs);
            width: 30%;
          }
        }

        page-search {
          margin-left: var(--ddd-spacing-2);
        }
      `,
    ];
  }
  render() {
    return html`
      ${this.renderAlert(this.alert)}
      <div id="topbar-wrap">
        <company-mark></company-mark>
        <div class="spacer"></div>
        <div class="action_button">
          <a
            id="schedule"
            href="https://outlook.office365.com/owa/calendar/ECOSODL@PennStateOffice365.onmicrosoft.com/bookings/"
            target="_blank"
            rel="noopener"
          >
            <span class="title">Book a Consultation</span>
            <simple-icon-lite icon="date-range"></simple-icon-lite>
          </a>
        </div>
        <page-search></page-search>
      </div>
    `;
  }

  renderAlert(alert) {
    if (alert === true) {
      return html`
        <div id="alert">
          <alert-message url="resources/contingency">
            Information about Coronavirus, Contingency Planning and Remote
            Teaching
          </alert-message>
        </div>
      `;
    }
    return "";
  }

  static get tag() {
    return "page-topbar";
  }
  static get properties() {
    return {
      ...super.properties,
      /**
       * Alert
       */
      alert: {
        type: Boolean,
      },
      /**
       * Editing state for the page (forwarded from theme)
       */
      editMode: {
        type: Boolean,
        reflect: true,
        attribute: "edit-mode",
      },
    };
  }
  constructor() {
    super();
    this.alert = false;
    this.editMode = false;
  }
}
globalThis.customElements.define(PageTopBar.tag, PageTopBar);
export { PageTopBar };
