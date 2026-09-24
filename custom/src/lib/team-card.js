import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js";

class TeamCard extends DDD {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        a {
          text-decoration: none;
        }

        #card_wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: solid;
          border-width: 2px;
          border-color: light-dark(#dcdcdc, #555);
          border-bottom: none;
          max-width: 300px;
          height: 480px;
          margin: var(--ddd-spacing-12, 50px) var(--ddd-spacing-2, 10px);
        }

        .image {
          background-position: top center;
          background-repeat: no-repeat;
          background-size: cover;
          width: 100%;
          height: 100%;
        }

        #card_image {
          width: 275px;
          height: 275px;
          margin-top: -30px;
          box-shadow: 4px 5px 6px light-dark(#a9a9a9, #000);
        }

        #name {
          position: relative;
          bottom: 44px;
          padding: var(--ddd-spacing-2, 8px);
          color: #fff;
          font-size: var(--ddd-font-size-s, 20px);
          background: rgba(0, 0, 0, 0.5);
          text-shadow: 1px 2px #000;
          text-align: center;
        }

        #info_wrap {
          padding: var(--ddd-spacing-5, 20px);
        }

        #position {
          color: #e2801e;
          font-size: var(--ddd-font-size-s, 18px);
          margin: -45px 0 var(--ddd-spacing-1, 5px) 0;
          text-align: center;
        }

        #info {
          font-size: var(--ddd-font-size-s, 16px);
          text-align: center;
          color: light-dark(#000, #fff);
          line-height: 1.3;
          font-weight: var(--ddd-font-weight-light, 300);
        }

        .action_button {
          display: flex;
          justify-content: center;
          border: solid;
          border-width: 2px;
          border-color: light-dark(#dcdcdc, #555);
          border-top: none;
          max-width: 300px;
          margin: -113px auto 0 auto;
        }

        a#connect {
          display: inline-flex;
          align-items: center;
          text-transform: none;
          background-color: #e2801e;
          color: #fff;
          margin: 0 0 var(--ddd-spacing-4, 15px) 0;
          padding: var(--ddd-spacing-2, 8px) var(--ddd-spacing-4, 16px);
          text-decoration: none;
          font-size: var(--ddd-font-size-s, 16px);
          border: none;
          cursor: pointer;
        }

        a#connect .title {
          margin-right: var(--ddd-spacing-1, 4px);
        }

        simple-icon-lite {
          --simple-icon-height: var(--ddd-icon-size-sm, 16px);
          --simple-icon-width: var(--ddd-icon-size-sm, 16px);
          color: #fff;
        }
      `,
    ];
  }
  render() {
    return html`
      <div id="card_wrap">
        <div id="image_wrap">
          <div
            id="card_image"
            class="image"
            role="img"
            aria-label=${this.name}
            style=${`background-image:url(${this.image})`}
          ></div>
          <div id="name">${this.name}</div>
        </div>
        <div id="info_wrap">
          <div id="position">${this.position}</div>
          <div id="info">${this.info}</div>
        </div>
      </div>
      <div class="action_button">
        <a href="${this.url}" id="connect">
          <span class="title">Connect</span>
          <simple-icon-lite icon="chevron-right"></simple-icon-lite>
        </a>
      </div>
    `;
  }
  static get tag() {
    return "team-card";
  }
  static get properties() {
    return {
      /**
       * image
       */
      image: {
        type: String,
      },
      /**
       * name
       */
      name: {
        type: String,
      },
      /**
       * position
       */
      position: {
        type: String,
      },
      /**
       * info
       */
      info: {
        type: String,
      },
      /**
       * url
       */
      url: {
        type: String,
      },
    };
  }
}
globalThis.customElements.define(TeamCard.tag, TeamCard);
export { TeamCard };
