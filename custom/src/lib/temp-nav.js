import { LitElement, html, css } from "lit";
import "@haxtheweb/simple-icon/lib/simple-icon-button-lite.js";

class TempNav extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          --theme-color-1: #363533;
          --theme-color-2: #e2801e;
          --theme-color-4: #fff;
        }

        #nav-wrap {
          background-color: var(--theme-color-2);
        }

        .nav-items {
          display: flex;
          justify-content: stretch;
        }

        .nav-item {
          flex: 1 1 auto;
        }

        .nav-item a {
          color: var(--theme-color-4);
          text-decoration: none;
          display: flex;
          justify-content: center;
          padding: var(--ddd-spacing-4) var(--ddd-spacing-3);
          text-transform: uppercase;
        }

        .nav-item a:focus {
          background-color: var(--theme-color-1);
        }

        @media screen and (max-width: 700px) {
          .nav-items {
            display: none;
          }
        }

        #mobile_wrap {
          display: none;
        }

        .button_nav {
          display: none;
        }

        @media screen and (max-width: 700px) {
          .button_nav {
            display: block;
          }
        }

        .logo_nav img {
          border: 2px solid var(--theme-color-4);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          margin: var(--ddd-spacing-2);
        }

        @media screen and (max-width: 700px) {
          .logo_nav img {
            width: 40px;
            height: 40px;
          }
        }

        @media screen and (max-width: 700px) {
          #mobile_wrap {
            display: flex;
            align-items: center;
          }

          #mobile_wrap .name_nav {
            flex: 1 1 auto;
          }
        }

        .name_nav {
          display: flex;
          align-items: center;
          margin-left: var(--ddd-spacing-1);
        }

        .name_nav h1 {
          font-size: var(--ddd-font-size-xs);
          margin: 0;
          font-weight: normal;
          color: var(--theme-color-4);
        }

        @media screen and (max-width: 700px) {
          .name_nav {
            font-size: var(--ddd-font-size-xs);
          }
        }

        .button_nav simple-icon-button-lite {
          position: relative;
          color: var(--theme-color-4);
          width: 45px;
          height: 45px;
        }
      `
    ];
  }
  render() {
    return html`
      <div id="nav-wrap">
        <div class="nav-items">
          <div class="nav-item"><a href="home">Home</a></div>
          <div class="nav-item"><a href="about">About</a></div>
          <div class="nav-item"><a href="team">Team</a></div>
          <div class="nav-item"><a href="news">News</a></div>
          <div class="nav-item"><a href="#">Projects</a></div>
          <div class="nav-item"><a href="courses">Courses</a></div>
          <div class="nav-item"><a href="#">Resources</a></div>
          <div class="nav-item"><a href="contact">Contact</a></div>
        </div>

        <div id="mobile_wrap">
          <div class="logo_nav">
            <a href="#">
              <img
                src="files/theme-images/logos/odl-logo.png"
                alt="Office of Digital Learning"
              />
            </a>
          </div>
          <div class="name_nav">
            <h1>Office of Digital Learning</h1>
          </div>
          <div class="button_nav">
            <simple-icon-button-lite icon="icons:menu"></simple-icon-button-lite>
          </div>
        </div>
      </div>
    `;
  }
  static get tag() {
    return "temp-nav";
  }
}
globalThis.customElements.define(TempNav.tag, TempNav);
export { TempNav };
