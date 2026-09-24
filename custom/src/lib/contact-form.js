import { html, LitElement, css } from "lit";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "./hax-form.js";
class ContactForm extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      submitted: { type: Boolean, reflect: true },
    };
  }
  constructor() {
    super();
    this.loading = false;
    this.submitted = false;
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }

      #contact-form input[type="text"],
      #contact-form input[type="email"],
      #contact-form textarea {
        width: 100%;
        box-shadow: inset 0 1px 2px #ddd, 0 1px 0 #fff;
        border: 1px solid #ccc;
        background: #fff;
        margin: 0 0 5px;
        padding: 10px;
      }
      #contact-form button[type="submit"] {
        cursor: pointer;
        width: 100%;
        border: none;
        background: #e2801e;
        color: #fff;
        margin: 0 0 5px;
        padding: 10px;
        height: 50px;
        font-size: var(--ddd-font-size-lg);
        text-transform: uppercase;
      }
      #contact-form button[disabled] {
        opacity: 0.3;
      }
      :host([submitted]) #contact-form button[disabled] {
        opacity: 1;
        background: transparent;
        color: black;
      }
    `;
  }
  submissionButton() {
    if (this.submitted) {
      return html`
        <button type="submit" id="contact-submit" disabled>
          Submitted!
        </button>`;
    } else if (this.loading) {
      return html`
        <button type="submit" id="contact-submit" disabled>
          Submitting...
        </button>
      `;
    } else {
      return html`
        <button type="submit" id="contact-submit">
          Submit
        </button>
      `;
    }
  }
  firstUpdated() {
    // Setup recaptcha
    const script = globalThis.document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=6LcgleAUAAAAAG21mesiKq8YAo8tgYn4zEHPhTWG";
    globalThis.document.head.appendChild(script);
    this.shadowRoot.querySelector("form").addEventListener("click", (e) => {
      if (globalThis.grecaptcha) {
        globalThis.grecaptcha.ready(() => {
          globalThis.grecaptcha
            .execute("6LcgleAUAAAAAG21mesiKq8YAo8tgYn4zEHPhTWG", {
              action: "contact_form",
            })
            .then((token) => {
              const captcha = this.shadowRoot.querySelector("#recaptcha");
              captcha.value = token;
            });
        });
      }
    });
  }
  render() {
    return html`
      <hax-form
        endpoint="https://odl.science.psu.edu/service/forms"
        @loading-changed=${(e) => (this.loading = e.detail.value)}
        @subission-successful=${() => (this.submitted = true)}
      >
        <form id="contact-form">
          <div>
            <label>
              <span>Name:</span>
              <input
                placeholder="Full name"
                type="text"
                tabindex="1"
                required
                autofocus
                name="name"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Email:</span>
              <input
                placeholder="name@example.com"
                type="email"
                tabindex="2"
                required
                name="email"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Message:</span>
              <textarea
                placeholder="Comments"
                tabindex="3"
                required
                rows="5"
                cols="40"
                name="comments"
              ></textarea>
            </label>
            <div>
              <input id="recaptcha" type="hidden" name="recaptcha" />
            </div>
            ${this.submissionButton()}
          </div>
        </form>
      </hax-form>
    `;
  }
  static get tag() {
    return "contact-form";
  }
  connectedCallback() {
    super.connectedCallback();
    this.__disposer = [];
    this.__disposer.push(
      autorun(() => {
        const _mobx_val_0 = toJS(store.routerManifest);
        Promise.resolve().then(() => {
          this.manifest = _mobx_val_0;
        });
      }),
    );
    this.__disposer.push(
      autorun(() => {
        const _mobx_val_1 = toJS(store.activeItem);
        Promise.resolve().then(() => {
          this.activeItem = _mobx_val_1;
        });
      }),
    );
  }
  disconnectedCallback() {
    this.__disposer.forEach((d) => d());
    super.disconnectedCallback();
  }
}

globalThis.customElements.define(ContactForm.tag, ContactForm);
export { ContactForm };
