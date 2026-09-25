import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js";

class CourseCard extends DDD {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        a {
          text-decoration: var(--haxtheme-course-card-a-text-decoration);
          color: var(--haxtheme-course-card-a-color);
          display: var(--haxtheme-course-card-a-display, block);
          width: var(--haxtheme-course-card-a-width, 100%);
          min-height: 300px;
          border: solid 1px light-dark(#dcdcdc, #555);
        }

        a:hover {
          box-shadow: 1px 1px 5px light-dark(#dcdcdc, #000);
        }

        #card_wrap {
          display: var(--haxtheme-course-card-card-wrap-display, flex);
          flex-direction: var(
            --haxtheme-course-card-card-wrap-flex-direction,
            column
          );
          align-items: var(
            --haxtheme-course-card-card-wrap-align-items,
            center
          );
        }
        #course_number {
          font-size: var(
            --haxtheme-course-card-course-number-font-size,
            28px
          );
          text-transform: var(
            --haxtheme-course-card-course-number-text-transform
          );
          text-align: var(
            --haxtheme-course-card-course-name-text-align,
            center
          );
          line-height: 1.4;
        }
        #course_name {
          font-size: var(--haxtheme-course-card-course-name-font-size);
          text-align: var(
            --haxtheme-course-card-course-name-text-align,
            center
          );
          width: var(--haxtheme-course-card-course-name-width, 90%);
          margin: var(--haxtheme-course-card-course-name-margin, 0 0 15px 0);
          line-height: 1.2;
        }
        #course_icon {
          background-color: var(
            --haxtheme-course-card-course-icon-background-color
          );
          border-radius: var(
            --haxtheme-course-card-course-icon-border-radius,
            50%
          );
          position: var(
            --haxtheme-course-card-course-icon-position,
            relative
          );
          bottom: var(
            --haxtheme-course-card-course-icon-position-bottom,
            50px
          );
          border: var(--haxtheme-course-card-course-icon-border, solid);
          border-width: var(
            --haxtheme-course-card-course-icon-border-width,
            5px
          );
          margin: var(--haxtheme-course-card-course-icon-margin, 0 0 -40px 0);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        simple-icon-lite {
          --simple-icon-height: var(
            --haxtheme-course-card-iron-icon-width,
            70px
          );
          --simple-icon-width: var(
            --haxtheme-course-card-iron-icon-height,
            70px
          );
        }

        #course_image {
          background-repeat: var(
            --haxtheme-course-card-course-image-background-repeat,
            no-repeat
          );
          background-size: var(
            --haxtheme-course-card-course-image-background-size,
            cover
          );
          background-position: var(
            --haxtheme-course-card-course-image-background-position,
            right center
          );
          width: var(--haxtheme-course-card-course-image-width, 100%);
          height: var(--haxtheme-course-card-course-image-height, 150px);
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
            aria-label=${this.alt}
            style=${`background-image:url(${this.image})`}
          ></div>
          <div id="course_icon">
            <simple-icon-lite icon="${this.icon}"></simple-icon-lite>
          </div>
          <div id="course_number">${this.number}</div>
          <div id="course_name">${this.name}</div>
        </div>
      </a>
    `;
  }
  static get tag() {
    return "course-card";
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
       * Course Number
       */
      number: {
        type: String,
      },
      /**
       * Course Icon
       */
      icon: {
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
globalThis.customElements.define(CourseCard.tag, CourseCard);
export { CourseCard };
