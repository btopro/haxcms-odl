import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";

class ServiceIcon extends DDD {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
        }
        /**
       * Hide the slotted content during edit mode. This must be here to work.
       */
        :host([edit-mode]) #slot {
          display: none;
        }

        #container {
          margin: 15px;
          padding: 5px;
        }

        #icon-wrap {
          border: solid 4px #e2801e;
          border-radius: 50%;
          padding: 25px;
          margin: 25px auto 0 auto;
          width: 100px;
        }

        simple-icon-lite {
          --simple-icon-height: 100px;
          --simple-icon-width: 100px;
          color: #e2801e;
        }

        #info-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
        }

        #title {
          text-transform: uppercase;
          text-align: center;
          font-size: 24px;
          margin: 0 0 5px 0;
          font-weight: 400;
        }

        #info {
          font-size: 16px;
          text-align: center;
          font-weight: 300;
          line-height: 1.4;
        }
      `,
    ];
  }
  render() {
    return html`
      <div id="container">
        <div id="icon-wrap">
          <div id="icon">
            <simple-icon-lite icon="${this.icon}"></simple-icon-lite>
          </div>
        </div>
        <div id="info-wrap">
          <div id="title">${this.title}</div>
          <div id="info">${this.info}</div>
        </div>
      </div>
    `;
  }
  static get tag() {
    return "service-icon";
  }
  static get properties() {
    return {
      ...super.properties,
      /**
       * Icon source
       */
      icon: {
        type: String,
      },
      /**
       * Title over icon
       */
      title: {
        type: String,
      },
      /**
       * info text for icon
       */
      info: {
        type: String,
      },
    };
  }
}
globalThis.customElements.define(ServiceIcon.tag, ServiceIcon);
export { ServiceIcon };
