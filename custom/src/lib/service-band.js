import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";

class ServiceBand extends DDD {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
        }

        :host([align="right"]) #video {
          display: flex;
          order: 2;
          margin: 0 0 0 25px;
        }

        @media screen and (max-width: 768px) {
          :host([align="right"]) #video {
            margin: 0 0 25px 0;
            order: 0;
          }
        }

        :host([align="right"]) video-player {
          width: 100%;
        }

        :host([align="right"]) #image {
          display: flex;
          order: 2;
          margin: 0 0 0 25px;
        }

        :host([align="right"]) #card_info {
          text-align: left;
        }

        @media screen and (max-width: 768px) {
          :host([align="right"]) #image {
            margin: 0 0 25px 0;
            order: 0;
          }
        }

        #container {
          display: flex;
          align-items: center;
          margin: 0 0 25px 0;
        }

        @media screen and (min-width: 768px) {
          :host([align="right"]) #container {
            margin: 0 0 25px 0;
          }
        }

        @media screen and (max-width: 768px) {
          #container {
            flex-direction: column;
            margin: 0;
          }
        }

        #image {
          background-repeat: no-repeat;
          background-size: cover;
          background-position: right center;
          width: 40%;
          min-height: 300px;
          margin: 0 20px 0 0;
        }

        @media screen and (max-width: 768px) {
          #image {
            width: 100%;
          }
        }

        #video {
          background-repeat: no-repeat;
          background-size: cover;
          background-position: right center;
          width: 40%;
          min-height: 300px;
          margin: 0 20px 0 0;
        }

        @media screen and (max-width: 768px) {
          #video {
            width: 100%;
          }
        }

        #title h2 {
          font-size: 28px;
          font-weight: 400;
          border-left: solid;
          border-left-width: 4px;
          border-left-color: #e2801e;
          padding-left: 15px;
          margin: 0 0 25px 0;
        }

        #info {
          font-weight: 300;
          line-height: 1.4;
          margin: 15px 0 0;
        }

        #card_info {
          flex: 1 1 auto;
          margin: 25px 0 0 15px;
          width: 50%;
        }

        @media screen and (max-width: 768px) {
          #card_info {
            width: 100%;
            margin: 20px 0 20px;
          }
        }

        button#learn {
          padding: 0;
          margin: 0;
          border: none;
          background: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          font: inherit;
        }

        .action_button {
          margin: 20px 0 0 0;
        }

        .action_button a {
          text-decoration: none;
        }

        button#learn {
          color: #e2801e;
        }

        button#learn:hover,
        button#learn:focus {
          color: var(--haxtheme-info-box-paper-button-color-active);
        }

        button#learn simple-icon-lite {
          --simple-icon-height: 24px;
          --simple-icon-width: 24px;
        }
      `,
    ];
  }
  render() {
    return html`
      <div id="container">
        ${this.renderSource(this.type)}
        <div id="card_info">
          <div id="title">
            <h2>${this.title}</h2>
          </div>
          <div id="info">
            <slot>${this.info}</slot>
            <div id="url">
              ${this.url ? this.renderUrl() : html`` }
            </div>
          </div>
        </div>
      </div>
    `;
  }
  renderSource(type) {
    switch (type) {
      case "video":
        return this.renderVideo();
      case "icon":
        return this.renderIcon();
    }
    return this.renderImage();
  }
  renderIcon() {
    return html`
      <simple-icon-lite icon="${this.source}"></simple-icon-lite>
    `;
  }
  renderImage() {
    return html`
      <div id="image" style=${`background-image:url(${this.source})`}></div>
    `;
  }
  renderVideo() {
    import("@haxtheweb/video-player/video-player.js");
    return html`
      <div id="video">
        <video-player source="${this.source}"></video-player>
      </div>
    `;
  }
  renderUrl() {
    return html`
    <div class="action_button">
      <a href="${this.url}">
        <button id="learn">
          <span class="title">Read More</span>
          <simple-icon-lite icon="icons:chevron-right"></simple-icon-lite>
        </button>
      </a>
    </div>
    `;
  }
  static get tag() {
    return "service-band";
  }
  static get properties() {
    return {
      ...super.properties,
      /**
       * Media Source
       */
      source: {
        type: String
      },
      /**
       * Media Type
       */
      type: {
        type: String
      },
      /**
       * Image Alt
       */
      alt: {
        type: String
      },
      /**
       * Title Over Icon
       */
      title: {
        type: String
      },
      /**
       * Info Text for Icon
       */
      info: {
        type: String
      },
      /**
       * Align Media
       */
      align: {
        type: String,
        reflect: true
      },
      /**
       * Optional Url
       */
      url: {
        type: String
      },
    };
  }
  constructor() {
    super();
    this.type = "image";
    this.align = "left";
    this.url = null;
  }
}
globalThis.customElements.define(ServiceBand.tag, ServiceBand);
export { ServiceBand };
