import { LitElement, html, css } from "lit";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";

class WorksheetDownload extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      link: { type: String },
    };
  }

  static get haxProperties() {
    return {
      canScale: false,
      canPosition: true,
      canEditSource: false,
      gizmo: {
        title: "Worksheet-Download",
        description: "A button for displaying files available for download.",
        icon: "icons:file-download",
        color: "blue",
        meta: {
          author: "LRNWebComponents",
        },
      },
      settings: {
        quick: [
          {
            property: "title",
            title: "Title",
            description: "The title of the download.",
            inputMethod: "textfield",
            icon: "editor:title",
          },
          {
            property: "link",
            title: "Link",
            description: "The link for the download.",
            inputMethod: "textfield",
            icon: "editor:insert-link",
          },
        ],
        configure: [
          {
            property: "title",
            title: "Title",
            description: "The title of the download.",
            inputMethod: "textfield",
            icon: "editor:title",
          },
          {
            property: "link",
            title: "Link",
            description: "The link for the download.",
            inputMethod: "textfield",
            icon: "editor:insert-link",
          },
        ],
        advanced: [],
      },
    };
  }

  constructor() {
    super();
    this.title = "";
    this.link = "";
  }
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        a {
          text-decoration: none;
          color: #0c7cd5;
        }

        button {
          text-transform: none;
          border: solid 2px #dcdcdc;
          display: flex;
          width: 100%;
          margin: 0 auto 0;
          padding: var(--ddd-spacing-3);
          background: none;
          cursor: pointer;
          font-size: var(--ddd-font-size-sm);
          align-items: center;
        }

        button:hover {
          background-color: #0c7cd5;
          color: #fff;
        }

        simple-icon-lite {
          margin-right: var(--ddd-spacing-1);
          color: currentColor;
        }
      `,
    ];
  }
  render() {
    return html`
      <div id="button_wrap">
        <a href="${this.link}" target="_blank" rel="noopener noreferrer">
          <button>
            <simple-icon-lite icon="icons:file-download"></simple-icon-lite>
            ${this.title}
          </button>
        </a>
      </div>
    `;
  }
}
globalThis.customElements.define("worksheet-download", WorksheetDownload);
export { WorksheetDownload };
