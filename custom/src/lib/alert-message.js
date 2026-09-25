import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";

class AlertMessage extends DDD {
  static get styles() {
    return [
      super.styles,
      css`
        a {
          color: #fff;
          text-decoration: none;
        }

        @media screen and (max-width: 768px) {
          a {
            font-size: var(--ddd-font-size-xs);
          }
        }

        a:hover {
          color: #00d2ff;
        }

        #container {
          background-color: red;
          padding: var(--ddd-spacing-2);
        }

        simple-icon-lite {
          width: var(--ddd-icon-size-sm);
          height: var(--ddd-icon-size-sm);
          margin-right: var(--ddd-spacing-1);
          vertical-align: middle;
        }
      `
    ];
  }
  render() {
    return html`
      <div id="container" role="alert">
        <simple-icon-lite icon="icons:report-problem"></simple-icon-lite>
        <a href="${this.url}">
          <slot></slot>
        </a>
      </div>
    `;
  }

  static get tag() {
    return "alert-message";
  }
  static get properties() {
    return {
      ...super.properties,
      /**
       * URL for alert
       */
      url: {
        type: String,
      },
    };
  }
  constructor() {
    super();
    this.url = "";
  }
}
globalThis.customElements.define(AlertMessage.tag, AlertMessage);
export { AlertMessage };
