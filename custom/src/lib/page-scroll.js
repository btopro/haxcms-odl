import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";
import "@haxtheweb/simple-tooltip/simple-tooltip.js";
import "./haxtheme-icons.js";

class PageScroll extends DDD {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          --icon-fill: #adb5bd;
          --icon-fill-hover: #6c757d;
        }

        simple-icon-lite {
          width: var(--ddd-icon-size-xl);
          height: var(--ddd-icon-size-xl);
        }

        simple-icon-lite:hover {
          color: var(--icon-fill-hover);
        }

        button#scroll {
          transition: opacity 0.25s ease-in-out;
          position: fixed;
          bottom: 70px;
          right: 10px;
          z-index: 99;
          padding: var(--ddd-spacing-3);
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0;
        }

        @media screen and (max-width: 700px) {
          button#scroll {
            bottom: 70px;
            right: 0;
          }
        }
      `
    ];
  }

  static get tag() {
    return "page-scroll";
  }

  constructor() {
    super();
    this.__scrollTop = this.__scrollTop.bind(this);
    this.__topFunction = this.__topFunction.bind(this);
  }

  // When the user scrolls down 500px from the top of the document, show the button
  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener("scroll", this.__scrollTop);
  }
  disconnectedCallback() {
    globalThis.removeEventListener("scroll", this.__scrollTop);
    super.disconnectedCallback();
  }

  __scrollTop() {
    var scrollBtn = this.shadowRoot && this.shadowRoot.querySelector("#scroll");
    if (!scrollBtn) {
      return;
    }
    if (
      globalThis.document.body.scrollTop > 600 ||
      globalThis.document.documentElement.scrollTop > 600
    ) {
      scrollBtn.style.opacity = "0.9";
    } else {
      scrollBtn.style.opacity = "0";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  __topFunction(e) {
    globalThis.document.body.scrollTop = 0; // For Safari
    globalThis.document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  render() {
    return html`
      <button id="scroll" @click=${this.__topFunction} aria-label="scroll to top">
        <simple-icon-lite icon="haxthemeicons:scroll"></simple-icon-lite>
        <simple-tooltip for="scroll" position="left" offset="0">Scroll to top</simple-tooltip>
      </button>
    `;
  }
}
globalThis.customElements.define(PageScroll.tag, PageScroll);
export { PageScroll };
