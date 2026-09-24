import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

class CourseTile extends DDD {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        a {
          text-decoration: none;
          text-transform: uppercase;
          color: light-dark(#000, #fff);
          font-size: var(--ddd-font-size-3xs, 12px);
        }

        a:hover {
          color: var(--theme-color-4, #fff);
        }

        #card_wrap {
          display: flex;
          align-items: center;
          background-color: light-dark(#dcdcdc, #363533);
        }

        #card_wrap:hover {
          background-color: #e2801e;
        }

        #course_image {
          background-repeat: no-repeat;
          background-size: cover;
          background-position: right center;
          width: 75px;
          height: 50px;
        }
        #course_name {
          padding: 0 0 0 var(--ddd-spacing-1, 5px);
        }
      `,
    ];
  }
  render() {
    return html`
      <a href="${this.url}">
        <div id="card_wrap">
          <div
            id="course_image"
            role="img"
            aria-label="${this.alt || this.name}"
            style=${`background-image:url(${this.image})`}
          ></div>
          <div id="course_name">${this.name}</div>
        </div>
      </a>
    `;
  }
  static get tag() {
    return "course-tile";
  }
  static get properties() {
    return {
      /**
       * Course Image
       */
      image: {
        type: String,
      },
      /**
       * Image Alt Text
       */
      alt: {
        type: String,
      },
      /**
       * Course Name
       */
      name: {
        type: String,
      },
      /**
       * Course URL
       */
      url: {
        type: String,
      },
    };
  }
}
globalThis.customElements.define(CourseTile.tag, CourseTile);
export { CourseTile };
