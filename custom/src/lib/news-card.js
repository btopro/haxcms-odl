import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js";
import { ImaginaryMixin } from "./ImaginaryMixin.js";

class NewsCard extends ImaginaryMixin(DDD) {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          --theme-color-1: #363533;
          --theme-color-2: #e2801e;
          --theme-color-4: #fff;
        }

        a {
          color: var(--theme-color-1);
          text-decoration: none;
        }

        h1 {
          font-size: var(--ddd-font-size-l, 28px);
          font-weight: var(--ddd-font-weight-regular, 400);
          line-height: 1.2;
          margin: 0;
        }

        @media screen and (max-width: 1124px) {
          h1 {
            font-size: var(--ddd-font-size-m, 24px);
          }
        }

        h1:hover {
          color: var(--theme-color-2);
        }

        h2 {
          color: var(--theme-color-1);
          font-size: var(--ddd-font-size-s, 18px);
          font-weight: var(--ddd-font-weight-regular, 400);
          margin: 0;
        }

        #news_wrap {
          display: flex;
          background-color: var(--theme-color-4);
          margin: var(--ddd-spacing-4, 15px);
          padding: 0 0 var(--ddd-spacing-3, 10px) 0;
          border-bottom: solid 2px light-dark(#dcdcdc, #555);
        }

        @media screen and (max-width: 1124px) {
          #news_wrap {
            flex-direction: column;
          }
        }

        #content_wrap {
          width: 75%;
        }

        @media screen and (max-width: 1124px) {
          #content_wrap {
            width: 100%;
          }
        }

        #news_image {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          width: 175px;
          height: 250px;
          margin: 0 var(--ddd-spacing-4, 15px) 0 0;
        }

        @media screen and (max-width: 1124px) {
          #news_image {
            width: 100%;
            height: 235px;
          }
        }

        #header_info {
          border-left: solid 4px var(--theme-color-2);
          padding: 0 0 0 var(--ddd-spacing-4, 15px);
        }

        @media screen and (max-width: 1124px) {
          #header_info {
            margin: var(--ddd-spacing-4, 15px) 0 0 0;
          }
        }

        #author_info {
          display: flex;
          align-items: center;
          margin: var(--ddd-spacing-1, 5px) 0 var(--ddd-spacing-1, 5px);
        }

        #author_image {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: right center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin: 0 var(--ddd-spacing-1, 5px) 0 0;
        }

        #author a {
          color: var(--theme-color-1);
          text-decoration: none;
        }

        #author a:hover {
          color: var(--theme-color-2);
        }

        #description {
          margin-top: var(--ddd-spacing-3, 10px);
          font-size: var(--ddd-font-size-s, 18px);
          font-weight: var(--ddd-font-weight-light, 300);
          line-height: 1.2;
        }

        @media screen and (max-width: 1124px) {
          #description {
            margin-top: var(--ddd-spacing-3, 10px);
          }
        }

        #action_button {
          display: flex;
          justify-content: flex-end;
          margin: var(--ddd-spacing-5, 20px) 0 0 0;
        }

        @media screen and (max-width: 768px) {
          #action_button {
            justify-content: center;
            margin: var(--ddd-spacing-4, 15px) 0 0 0;
          }
        }

        a#action {
          display: inline-flex;
          align-items: center;
          color: var(--theme-color-2);
          text-decoration: none;
          font-size: var(--ddd-font-size-s, 16px);
        }

        a#action:hover,
        a#action:focus {
          color: var(--theme-color-1);
        }

        a#action .title {
          margin-right: var(--ddd-spacing-1, 4px);
        }

        simple-icon-lite {
          --simple-icon-height: var(--ddd-icon-size-sm, 16px);
          --simple-icon-width: var(--ddd-icon-size-sm, 16px);
        }
      `,
    ];
  }
  render() {
    let imageResized = this.imaginaryGenerateUrl(this.image, "smartcrop", [
      "width=450",
      "height=600",
      "quality=75",
      "type=jpeg",
    ]);
    return html`
      <div id="news_wrap">
        <div
          id="news_image"
          role="img"
          aria-label=${this.alt}
          style=${`background-image:url(${imageResized})`}
        ></div>
        <div id="content_wrap">
          <div id="header_info">
            <div id="title">
              <a href="${this.url}">
                <h1>${this.title}</h1>
              </a>
            </div>
            <div id="date">
              <h2>${this.date}</h2>
            </div>
            <div id="author_info">
              <div
                id="author_image"
                role="img"
                aria-label=${this.author}
                style=${`background-image:url(${this.authorimage})`}
              ></div>
              <div id="author">By: ${this.author}</div>
            </div>
          </div>
          <div id="description">
            <span>${this.description}</span>
          </div>
          <div id="action_button">
            <a href="${this.url}" id="action">
              <span class="title">Read More</span>
              <simple-icon-lite icon="chevron-right"></simple-icon-lite>
            </a>
          </div>
        </div>
      </div>
    `;
  }
  static get tag() {
    return "news-card";
  }
  static get properties() {
    return {
      /**
       * Image
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
       * Title
       */
      title: {
        type: String,
      },
      /**
       * Date
       */
      date: {
        type: String,
      },
      /**
       * Author Image
       */
      authorimage: {
        type: String,
      },
      /**
       * Author
       */
      author: {
        type: String,
      },
      /**
       * Author Page
       */
      authorpage: {
        type: String,
      },
      /**
       * Article Description
       */
      description: {
        type: String,
      },
      /**
       * Destination Url
       */
      url: {
        type: String,
      },
    };
  }
}
globalThis.customElements.define(NewsCard.tag, NewsCard);
export { NewsCard };
