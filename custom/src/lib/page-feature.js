import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js";

class PageFeature extends DDD {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        a {
          text-decoration: var(--haxtheme-page-feature-a-text-decoration);
        }

        h1 {
          font-size: var(--haxtheme-page-feature-h1-font-size);
          margin: var(--haxtheme-page-feature-h1-margin, 0);
          line-height: var(--haxtheme-page-feature-h1-line-height, 1);
          font-weight: var(--haxtheme-page-feature-h1-font-weight);
        }

        @media screen and (max-width: 768px) {
          h1 {
            font-size: var(--haxtheme-page-feature-h1-font-size-mobile, 28px);
          }
        }

        h2 {
          font-size: var(--haxtheme-page-feature-h2-font-size, 32px);
          margin: var(--haxtheme-page-feature-h2-margin, 0);
          font-weight: var(--haxtheme-page-feature-h2-font-weight);
        }

        @media screen and (max-width: 768px) {
          h2 {
            font-size: var(--haxtheme-page-feature-h2-font-size-mobile, 24px);
          }
        }

        #feature_wrap {
          background-color: var(
            --haxtheme-page-feature-wrap-background-color
          );
          padding: var(--haxtheme-page-feature-wrap-padding, 40px 0 55px 0);
        }

        @media screen and (max-width: 1012px) {
          #feature_wrap {
            flex-direction: var(
              --haxtheme-page-feature-feature-wrap-flex-direction-mobile,
              column
            );
            height: var(
              --haxtheme-page-feature-feature-wrap-height-mobile,
              auto
            );
            padding: var(
              --haxtheme-page-feature-feature-wrap-padding-mobile,
              0
            );
            background-color: var(
              --haxtheme-page-feature-feature-wrap-background-color-mobile,
              transparent
            );
          }
        }

        #border {
          display: var(--haxtheme-page-feature-border-display, flex);
          justify-content: var(
            --haxtheme-page-feature-border-justify-content,
            center
          );
          align-items: var(--haxtheme-page-feature-border-align-items, center);
          padding: var(--haxtheme-page-feature-border-padding, 40px 0 0 0);
          width: var(--haxtheme-page-feature-border-width, 94%);
          border-top: var(--haxtheme-page-feature-border-border-top, dashed);
          border-top-width: var(
            --haxtheme-page-feature-border-border-top-width,
            4px
          );
          border-top-color: var(
            --haxtheme-page-feature-border-border-top-color
          );
          margin: var(--haxtheme-page-feature-border-margin, 0 auto 0 auto);
        }

        @media screen and (max-width: 1012px) {
          #border {
            flex-direction: var(
              --haxtheme-page-feature-border-flex-direction-mobile,
              column
            );
            height: var(--haxtheme-page-feature-border-height-mobile, auto);
            border: var(--haxtheme-page-feature-border-border-mobile, none);
            padding: var(
              --haxtheme-page-feature-border-padding-mobile,
              5px 0 0 0
            );
            width: var(--haxtheme-page-feature-border-width, 100%);
          }
        }

        #feature_image {
          background-repeat: var(
            --haxtheme-page-feature-feature-image-background-repeat,
            no-repeat
          );
          background-size: var(
            --haxtheme-page-feature-feature-image-background-size,
            cover
          );
          background-position: var(
            --haxtheme-page-feature-feature-image-background-position,
            center
          );
          width: var(--haxtheme-page-feature-feature-image-width, 50%);
          height: var(--haxtheme-page-feature-feature-image-height, 400px);
        }

        @media screen and (max-width: 1012px) {
          #feature_image {
            height: var(
              --haxtheme-page-feature-feature-image-height-mobile,
              300px
            );
            margin: var(
              --haxtheme-page-feature-feature-image-margin-mobile,
              15px 0 0 0
            );
            width: var(
              --haxtheme-page-feature-feature-image-width-mobile,
              100%
            );
          }
        }

        #feature_description_wrap {
          background-color: var(
            --haxtheme-page-feature-feature-description-wrap-background-color
          );
          color: var(--odl-feature-text-color, var(--odl-haxtheme-font-color, #000));
          height: var(
            --haxtheme-page-feature-feature-description-wrap-height,
            auto
          );
          width: var(
            --haxtheme-page-feature-feature-description-wrap-width,
            780px
          );
          z-index: var(
            --haxtheme-page-feature-feature-description-wrap-z-index,
            1
          );
          margin: var(
            --haxtheme-page-feature-feature-description-wrap-margin,
            0 25px 0 -30px
          );
          box-shadow: var(
            --haxtheme-page-feature-feature-description-wrap-box-shadow,
            1px 2px 7px
              var(
                --haxtheme-page-feature-feature-description-wrap-box-shadow-color
              )
          );
        }

        @media screen and (max-width: 1124px) {
          #feature_description_wrap {
            width: var(
              --haxtheme-page-feature-feature-description-wrap-width-mobile,
              100%
            );
            z-index: var(
              --haxtheme-page-feature-feature-description-wrap-z-index-mobile,
              0
            );
            box-shadow: var(
              --haxtheme-page-feature-feature-description-wrap-box-shadow,
              none
            );
            margin: var(
              --haxtheme-page-feature-feature-description-wrap-margin,
              0
            );
          }
        }

        /* Dark mode text color is set via --odl-feature-text-color which
           cascades through shadow DOM from body.dark-mode in theme.css.
           This is more reliable than :host-context() which lacks
           Firefox/Safari support. */
        #description {
          color: var(--odl-feature-text-color, var(--odl-haxtheme-font-color, #000));
        }

        #title_wrap {
          display: var(--haxtheme-page-feature-title-wrap-display, flex);
          flex-direction: var(
            --haxtheme-page-feature-title-wrap-flex-direction,
            column
          );
          border-left: var(--haxtheme-page-feature-title-wrap-border-left);
          border-left-width: var(
            --haxtheme-page-feature-title-wrap-border-left-width
          );
          border-left-color: var(
            --haxtheme-page-feature-title-wrap-border-left-color
          );
          padding: var(--haxtheme-page-feature-title-wrap-padding, 0 0 0 15px);
          margin: var(--haxtheme-page-feature-title-wrap-margin, 20px 0 0 20px);
        }

        @media screen and (max-width: 768px) {
          #title_wrap {
            margin: var(
              --haxtheme-page-feature-title-wrap-margin-mobile,
              20px 0 0 0
            );
          }
        }

        #description {
          font-size: var(--haxtheme-page-feature-description-font-size);
          font-weight: var(--haxtheme-page-feature-description-font-weight);
          line-height: var(--haxtheme-page-feature-description-line-height);
          padding: var(
            --haxtheme-page-feature-description-padding,
            25px 25px 15px
          );
        }

        @media screen and (max-width: 768px) {
          #description {
            padding: var(
              --haxtheme-page-feature-description-padding-mobile,
              25px 0 0 0
            );
            margin: var(
              --haxtheme-page-feature-description-margin-mobile,
              0 0 25px 0
            );
          }
        }

        #sub_info {
          font-size: var(--haxtheme-page-feature-sub-info-font-size, 20px);
          font-weight: var(--haxtheme-page-feature-sub-info-font-weight);
        }

        #action_button {
          display: var(--haxtheme-page-feature-action-button-display, flex);
          justify-content: var(
            --haxtheme-page-feature-action-button-justify-content,
            flex-end
          );
          margin: var(
            --haxtheme-page-feature-action-button-margin,
            0 25px 25px 0
          );
        }

        @media screen and (max-width: 768px) {
          #action_button {
            justify-content: var(
              --haxtheme-page-feature-action-button-justify-content-mobile,
              center
            );
            margin: var(
              --haxtheme-page-feature-action-button-margin-mobile,
              0
            );
          }
        }

        a#feature {
          display: inline-flex;
          align-items: center;
          color: var(--haxtheme-page-feature-paper-button-feature-color);
          text-decoration: none;
          font-size: var(--ddd-font-size-xs, 16px);
        }

        a#feature:hover,
        a#feature:focus {
          color: var(
            --haxtheme-page-feature-paper-button-feature-color-active
          );
        }

        a#feature .title {
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
    return html`
      <div id="feature_wrap">
        <div id="border">
          <div
            id="feature_image"
            role="img"
            aria-label=${this.alt}
            style=${`background-image:url(${this.image})`}
          ></div>
          <div id="feature_description_wrap">
            <div id="title_wrap">
              <div id="title">
                <h1>${this.title}</h1>
              </div>
              <div id="sub_title">
                <h2>${this.subtitle}</h2>
              </div>
              <div id="sub_info">${this.info}</div>
            </div>
            <div id="description">
              <slot></slot>
            </div>
            <div id="action_button">
              <a href="${this.url}" id="feature">
                <span class="title">Read More</span>
                <simple-icon-lite icon="chevron-right"></simple-icon-lite>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  static get tag() {
    return "page-feature";
  }
  static get properties() {
    return {
      /**
       * Image source
       */
      image: {
        type: String,
      },
      /**
       * Alt text for image
       */
      alt: {
        type: String,
      },
      /**
       * Title for feature
       */
      title: {
        type: String,
      },
      /**
       * Subtitle for feature
       */
      subtitle: {
        type: String,
      },
      /**
       * Sub info for feature
       */
      info: {
        type: String,
      },
      /**
       * Url for feature
       */
      url: {
        type: String,
      },
    };
  }
}
globalThis.customElements.define(PageFeature.tag, PageFeature);
export { PageFeature };
