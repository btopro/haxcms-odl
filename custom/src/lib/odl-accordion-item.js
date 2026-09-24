import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";

class OdlAccordionItem extends DDD {
  static get properties() {
    return {
      ...(super.properties || {}),
      item: { type: Object },
      active: { type: Boolean },
      isLoggedIn: { type: Boolean },
      path: { type: String },
    };
  }

  static get styles() {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
        }

        input {
          margin: auto;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 3px;
          margin-bottom: 10px;
          width: 100%;
          box-sizing: border-box;
          color: #2c3e50;
          font-size: 13px;
        }

        .container {
          margin: 0 auto;
          padding: 4rem;
          width: 48rem;
        }

        h3 {
          font-size: 1.75rem;
          color: var(--odl-haxtheme-accent-color-2);
          padding: 1.3rem;
          margin: 0;
        }

        a {
          position: relative;
          display: flex;
          flex-direction: column;
          width: auto;
          padding: 1rem 3rem 1rem 1rem;
          color: var(--odl-haxtheme-accent-color-1);
          font-size: 1.15rem;
          font-weight: 400;
          border-bottom: 1px solid #ccc;
        }

        a:hover,
        a:hover::after {
          cursor: pointer;
          color: var(--odl-haxtheme-accent-color-2);
        }

        a:hover::after {
          border: 1px solid var(--odl-haxtheme-accent-color-2);
        }

        a.active {
          color: var(--odl-haxtheme-accent-color-2);
          border-bottom: 1px solid var(--odl-haxtheme-accent-color-2);
        }

        .icon {
          position: absolute;
          float: right;
          right: 1rem;
        }

        .icon svg {
          fill: var(--odl-haxtheme-accent-color-1);
          width: 30px;
          height: 30px;
        }

        .active .icon svg {
          fill: var(--odl-haxtheme-accent-color-2);
        }

        .content {
          opacity: 0;
          padding: 0 1rem;
          max-height: 0;
          border-bottom: 1px solid #ccc;
          overflow: hidden;
          clear: both;
          transition: all 0.2s ease 0.15s;
          position: relative;
        }

        .content p {
          font-size: 1rem;
          font-weight: 300;
        }

        .content.active {
          opacity: 1;
          padding: 1rem;
          max-height: 100%;
          transition: all 0.35s ease 0.15s;
        }

        #edit {
          display: inline-block;
          position: absolute;
          top: 0;
          right: 0;
          padding: 1em;
          border: none;
        }

        #edit-icon {
          width: 20px;
          height: 20px;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.active = false;
    this.isLoggedIn = false;
    this.path = null;
    this.item = {};
    this.__toggleAccordion = this.__toggleAccordion.bind(this);
  }

  firstUpdated() {
    var link = this.shadowRoot.querySelector(".accordion-item a");
    if (link) {
      link.addEventListener("click", this.__toggleAccordion);
    }
  }

  disconnectedCallback() {
    var link = this.shadowRoot && this.shadowRoot.querySelector(".accordion-item a");
    if (link) {
      link.removeEventListener("click", this.__toggleAccordion);
    }
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (this.item && changedProperties.has("item")) {
      const contentOutlet = this.shadowRoot.querySelector("#content-outlet");
      if (contentOutlet) {
        contentOutlet.innerHTML = this.item.content;
      }
      // update path
      if (store.routerManifest && store.routerManifest.items) {
        const manifestItem = store.routerManifest.items.find(
          (i) => i.id === this.item.id,
        );
        if (manifestItem) {
          this.path = manifestItem.slug;
        }
      }
    }
  }

  render() {
    return html`
      ${this.item
        ? html`
            <div class="accordion-item">
              <a id="toggle">
                ${this.item.title}
                <span class="icon">${this.__renderIcon()}</span>
              </a>
              <div class="content">
                <div id="content-outlet"></div>
                <div id="edit">
                  ${this.__renderEditIcon()}
                </div>
              </div>
            </div>
          `
        : html``}
    `;
  }

  __renderIcon() {
    if (this.active) {
      return html`
        <svg
          enable-background="new 0 0 551.13 551.13"
          height="512"
          viewBox="0 0 551.13 551.13"
          width="512"
        >
          <path
            d="m275.565 0c-151.944 0-275.565 123.621-275.565 275.565s123.621 275.565 275.565 275.565 275.565-123.621 275.565-275.565-123.621-275.565-275.565-275.565zm0 516.685c-132.955 0-241.119-108.164-241.119-241.119s108.164-241.12 241.119-241.12 241.12 108.164 241.12 241.119-108.165 241.12-241.12 241.12z"
          />
          <path d="m137.783 258.342h275.565v34.446h-275.565z" />
        </svg>
      `;
    } else {
      return html`
        <svg
          enable-background="new 0 0 551.13 551.13"
          height="512"
          viewBox="0 0 551.13 551.13"
          width="512"
        >
          <path
            d="m275.565 0c-151.944 0-275.565 123.621-275.565 275.565s123.621 275.565 275.565 275.565 275.565-123.621 275.565-275.565-123.621-275.565-275.565-275.565zm0 516.685c-132.955 0-241.119-108.164-241.119-241.119s108.164-241.12 241.119-241.12 241.12 108.164 241.12 241.119-108.165 241.12-241.12 241.12z"
          />
          <path
            d="m292.788 137.783h-34.446v120.56h-120.56v34.446h120.56v120.56h34.446v-120.56h120.56v-34.446h-120.56z"
          />
        </svg>
      `;
    }
  }

  __renderEditIcon() {
    if (this.isLoggedIn) {
      return html`
        <a href="${this.path}" id="edit"
          ><svg
            id="edit-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 383.947 383.947"
            style="enable-background:new 0 0 383.947 383.947;"
            xml:space="preserve"
          >
            <g>
              <polygon
                points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 \t\t\t"
              />
              <path
                d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04
         C386.027,77.92,386.027,64.373,377.707,56.053z"
              />
            </g>
          </svg>
        </a>
      `;
    } else {
      return html``;
    }
  }

  __toggleAccordion(e) {
    this.active = !this.active;
    e.target.classList.toggle("active");
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.classList.toggle("active");
    }
  }
}

globalThis.customElements.define("odl-accordion-item", OdlAccordionItem);

export { OdlAccordionItem };
