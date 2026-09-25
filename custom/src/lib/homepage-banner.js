import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

class HomePageBanner extends DDD {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        .image_wrap {
          background-repeat: var(
            --haxtheme-homepage-banner-image-wrap-background-repeat,
            no-repeat
          );
          background-size: var(
            --haxtheme-homepage-banner-image-wrap-background-size,
            cover
          );
          background-position: var(
            --haxtheme-homepage-banner-image-wrap-background-position,
            right center
          );
          width: var(--haxtheme-homepage-banner-image-wrap-width, 100%);
          min-height: var(
            --haxtheme-homepage-banner-image-wrap-min-height,
            32vw
          );
          display: var(--haxtheme-homepage-banner-image-wrap-display, flex);
          justify-content: var(
            --haxtheme-homepage-banner-image-wrap-justify-content,
            flex-end
          );
          align-items: var(
            --haxtheme-homepage-banner-image-wrap-align-items,
            center
          );
          flex: var(--haxtheme-homepage-banner-image-wrap-flex, 1 1 auto);
          margin: var(--haxtheme-homepage-banner-image-wrap-margin, 0);
          padding: var(--haxtheme-homepage-banner-image-wrap-padding, 0);
        }

        @media screen and (max-width: 700px) {
          .image_wrap {
            height: var(
              --haxtheme-homepage-banner-image-wrap-height-mobile,
              55vw
            );
          }
        }

        .image_text {
          background: var(
            --haxtheme-homepage-banner-image-text-background,
            rgba(0, 0, 0, 0.5)
          );
          width: var(
            --haxtheme-homepage-banner-image-text-width,
            calc(150px + (355 - 28) * ((100vw - 300px) / (1600 - 300)))
          );
          margin: var(--haxtheme-homepage-banner-image-text-margin, 0 5vw);
          padding: var(--haxtheme-homepage-banner-image-text-padding, 2vw);
        }

        .image_text h1 {
          font-size: var(
            --haxtheme-homepage-banner-image-text-h1-font-size,
            calc(23px + (72 - 28) * ((100vw - 300px) / (1600 - 300)))
          );
          color: var(--haxtheme-homepage-banner-image-text-h1-color);
          font-weight: var(
            --haxtheme-homepage-banner-image-text-h1-font-weight
          );
          line-height: var(
            --haxtheme-homepage-banner-image-text-h1-line-height,
            1.1
          );
          margin: var(--haxtheme-homepage-banner-image-text-h1-margin, 0);
          padding: var(--haxtheme-homepage-banner-image-text-h1-padding, 0);
          width: var(--haxtheme-homepage-banner-image-text-h1-width, 100%);
        }

        .branding_wrap {
          display: var(
            --haxtheme-homepage-banner-branding-wrap-display,
            flex
          );
          align-items: var(
            --haxtheme-homepage-banner-branding-wrap-align-items,
            center
          );
          background-color: var(
            --haxtheme-homepage-banner-branding-wrap-background-color
          );
          border-top: var(
            --haxtheme-homepage-banner-branding-wrap-border-top,
            solid
          );
          border-top-width: var(
            --haxtheme-homepage-banner-branding-wrap-border-top-width,
            4px
          );
          border-top-color: var(
            --haxtheme-homepage-banner-branding-wrap-border-top-color
          );
        }

        .logo {
          position: var(--haxtheme-homepage-banner-logo-position, absolute);
          width: var(--haxtheme-homepage-banner-logo-width, 40%);
        }

        .logo img {
          width: var(--haxtheme-homepage-banner-logo-image-width, 48%);
          border: var(--haxtheme-homepage-banner-logo-image-border, solid);
          border-width: var(
            --haxtheme-homepage-banner-logo-image-border-width,
            4px
          );
          border-color: var(
            --haxtheme-homepage-banner-logo-image-border-color
          );
          border-radius: var(
            --haxtheme-homepage-banner-logo-image-border-radius,
            50%
          );
          background-color: var(
            --haxtheme-homepage-banner-logo-image-background-color
          );
          margin: var(
            --haxtheme-homepage-banner-logo-image-margin,
            -52px 0 0 25px
          );
        }

        @media screen and (max-width: 700px) {
          .logo img {
            margin: 0 0 0 5px;
          }
        }

        .company_name {
          width: var(--haxtheme-homepage-banner-company-name-width, 76%);
          margin: var(
            --haxtheme-homepage-banner-company-name-margin,
            0 0 0 auto
          );
        }

        .company_name h2 {
          font-size: var(
            --haxtheme-homepage-banner-company-name-h2-font-size,
            calc(18px + (72 - 28) * ((100vw - 300px) / (1600 - 300)))
          );
          font-weight: var(
            --haxtheme-homepage-banner-company-name-h2-font-weight,
            400
          );
          color: var(--haxtheme-homepage-banner-company-name-h2-color);
          margin: var(
            --haxtheme-homepage-banner-company-name-h2-margin,
            5px 0 5px 0
          );
        }
      `,
    ];
  }
  render() {
    return html`
      <div id="banner_wrap">
        <div
          class="image_wrap"
          role="img"
          aria-label=${this.alt}
          style=${`background-image:url(${this.image})`}
        >
          <div class="image"></div>
          <div class="image_text">
            <h1>${this.text}</h1>
          </div>
        </div>
        <div class="branding_wrap">
          <div class="logo">
            <img
              src="files/theme-images/logos/odl-logo.png"
              alt="Eberly College of Science"
            />
          </div>
          <div class="company_name">
            <h2>Eberly College of Science</h2>
          </div>
        </div>
      </div>
    `;
  }
  static get tag() {
    return "homepage-banner";
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
       * Text over image
       */
      text: {
        type: String,
      },
    };
  }
}
globalThis.customElements.define(HomePageBanner.tag, HomePageBanner);
export { HomePageBanner };
