import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";
import "./haxtheme-icons.js";

class PageFooter extends DDD {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        #social_wrap {
          background-color: var(
            --haxtheme-page-footer-social-wrap-background-color
          );
          height: var(--haxtheme-page-footer-social-wrap-height, 80px);
          padding: var(
            --haxtheme-page-footer-social-wrap-padding,
            25px 0 25px 0
          );
          display: var(--haxtheme-page-footer-social-wrap-display, flex);
          justify-content: var(
            --haxtheme-page-footer-social-wrap-justify-content,
            center
          );
          align-items: var(
            --haxtheme-page-footer-social-wrap-align-items,
            center
          );
        }

        @media screen and (max-width: 768px) {
          #social_wrap {
            height: var(--haxtheme-page-footer-social-wrap-height-mobile, 20px);
          }
        }

        #icons {
          display: var(--haxtheme-page-footer-icons-display, flex);
        }

        simple-icon-lite {
          --simple-icon-width: var(
            --haxtheme-page-footer-iron-icon-width,
            40px
          );
          --simple-icon-height: var(
            --haxtheme-page-footer-iron-icon-height,
            40px
          );
          color: var(--haxtheme-page-footer-iron-icon-fill);
        }

        @media screen and (max-width: 768px) {
          simple-icon-lite {
            --simple-icon-width: var(
              --haxtheme-page-footer-iron-icon-width-mobile,
              30px
            );
            --simple-icon-height: var(
              --haxtheme-page-footer-iron-icon-height-mobile,
              30px
            );
          }
        }

        .social-link {
          min-width: var(--haxtheme-page-footer-paper-button-min-width, 4em);
          padding: var(--haxtheme-page-footer-paper-button-padding, 0);
          margin: var(--haxtheme-page-footer-paper-button-margin, 0);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        @media screen and (max-width: 768px) {
          .social-link {
            min-width: var(
              --haxtheme-page-footer-paper-button-min-width-mobile,
              3em
            );
          }
        }

        #info_wrap {
          display: var(--haxtheme-page-footer-info-wrap-display, flex);
          flex-direction: var(
            --haxtheme-page-footer-info-wrap-flex-direction,
            column
          );
          justify-content: var(
            --haxtheme-page-footer-info-wrap-justify-content,
            center
          );
          align-items: var(
            --haxtheme-page-footer-info-wrap-align-items,
            center
          );
          background-color: var(
            --haxtheme-page-footer-info-wrap-background-color
          );
          height: var(--haxtheme-page-footer-info-wrap-height, 200px);
        }

        .address {
          color: var(--haxtheme-page-footer-address-color);
          font-weight: var(--haxtheme-page-footer-address-font-weight);
          font-size: var(--haxtheme-page-footer-address-font-size);
          line-height: var(--haxtheme-page-footer-address-line-height, 1.2);
          text-align: var(--haxtheme-page-footer-address-text-align, center);
          margin: var(--haxtheme-page-footer-address-margin, 25px 0 0 0);
        }

        @media screen and (max-width: 768px) {
          .address {
            font-size: var(
              --haxtheme-page-footer-address-font-size-mobile,
              var(--ddd-font-size-xs, 12px)
            );
            line-height: var(--haxtheme-page-footer-address-line-height, 0);
            margin: var(--haxtheme-page-footer-address-margin, 10px 0 0 0);
          }
        }

        #basement {
          font-size: var(--haxtheme-page-footer-basement-font-size);
          font-weight: var(--haxtheme-page-footer-basement-font-weight);
          line-height: var(--haxtheme-page-footer-basement-line-height, 1.2);
        }

        .legal_statement {
          display: var(--haxtheme-page-footer-legal-statement-display, flex);
          padding: var(
            --haxtheme-page-footer-legal-statement-padding,
            10px 0 0 0
          );
        }

        .legal_item {
          color: var(--haxtheme-page-footer-legal-item-color);
          padding: var(
            --haxtheme-page-footer-legal-item-padding,
            0 5px 25px 5px
          );
          border-right: var(
            --haxtheme-page-footer-legal-item-border-right,
            solid
          );
          border-right-width: var(
            --haxtheme-page-footer-legal-item-border-right-width,
            2px
          );
          border-right-color: var(
            --haxtheme-page-footer-legal-item-border-right-color
          );
          height: var(--haxtheme-page-footer-legal-item-height, 0);
        }

        @media screen and (max-width: 768px) {
          .legal_item {
            border: var(--haxtheme-page-footer-legal-item-border-mobile, none);
            margin: var(
              --haxtheme-page-footer-legal-item-margin-mobile,
              5px 0 25px 0
            );
            padding: var(
              --haxtheme-page-footer-legal-item-padding-mobile,
              2px
            );
            font-size: var(
              --haxtheme-page-footer-legal-item-font-size-mobile,
              var(--ddd-font-size-xs, 12px)
            );
          }
        }

        .legal_item a {
          text-decoration: var(
            --haxtheme-page-footer-legal-item-a-text-decoration
          );
          color: var(--haxtheme-page-footer-legal-item-a-color);
        }

        .legal_item a:hover {
          color: var(
            --haxtheme-page-footer-legal-item-a-hover-color,
            #000000
          );
        }

        .legal_item:last-child {
          border: var(
            --haxtheme-page-footer-legal-item-last-child-border,
            none
          );
        }

        #odl_mark {
          margin: var(--haxtheme-page-footer-odl-mark-margin, 25px 0 15px 0);
        }

        #odl_mark a {
          display: var(--haxtheme-page-footer-odl-mark-a-display, flex);
          background-color: var(
            --haxtheme-page-footer-odl-mark-a-background-color
          );
          border: var(--haxtheme-page-footer-odl-mark-a-border, solid);
          border-width: var(
            --haxtheme-page-footer-odl-mark-a-border-width,
            2px
          );
          border-color: var(
            --haxtheme-page-footer-odl-mark-a-border-color,
            #ffffff
          );
          border-radius: var(
            --haxtheme-page-footer-odl-mark-a-border-radius,
            50%
          );
          padding: var(--haxtheme-page-footer-odl-mark-a-padding, 8px);
          opacity: var(--haxtheme-page-footer-odl-mark-a-opacity, 0.4);
        }

        .odl-mark-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
        }
      `,
    ];
  }
  static get tag() {
    return "page-footer";
  }
  constructor() {
    super();
  }
  render() {
    return html`
      <div id="footer_wrap">
        <div id="social_wrap">
          <div id="icons">
            <div class="icon">
              <a
                class="social-link"
                href="https://twitter.com/Eberly_ODL"
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
              >
                <simple-icon-lite
                  icon="haxthemeicons:twitter"
                  role="img"
                  aria-hidden="true"
                ></simple-icon-lite>
              </a>
            </div>
            <div class="icon">
              <a
                class="social-link"
                href="https://vimeo.com/user38447507"
                target="_blank"
                rel="noopener"
                aria-label="Vimeo"
              >
                <simple-icon-lite
                  icon="haxthemeicons:vimeo"
                  role="img"
                  aria-hidden="true"
                ></simple-icon-lite>
              </a>
            </div>
            <div class="icon">
              <a
                class="social-link"
                href="https://www.pinterest.com/ecosodl/"
                target="_blank"
                rel="noopener"
                aria-label="Pinterest"
              >
                <simple-icon-lite
                  icon="haxthemeicons:pinterest"
                  role="img"
                  aria-hidden="true"
                ></simple-icon-lite>
              </a>
            </div>
            <div class="icon">
              <a
                class="social-link"
                href="https://www.flickr.com/photos/ecosodl"
                target="_blank"
                rel="noopener"
                aria-label="Flickr"
              >
                <simple-icon-lite
                  icon="haxthemeicons:flikr"
                  role="img"
                  aria-hidden="true"
                ></simple-icon-lite>
              </a>
            </div>
            <div class="icon">
              <a
                class="social-link"
                href="https://www.youtube.com/user/EberlySciOnline"
                target="_blank"
                rel="noopener"
                aria-label="YouTube"
              >
                <simple-icon-lite
                  icon="haxthemeicons:youtube"
                  role="img"
                  aria-hidden="true"
                ></simple-icon-lite>
              </a>
            </div>
            <div class="icon">
              <a
                class="social-link"
                href="mailto:odl@science.psu.edu"
                target="_blank"
                rel="noopener"
                aria-label="Email"
              >
                <simple-icon-lite
                  icon="haxthemeicons:email"
                  role="img"
                  aria-hidden="true"
                ></simple-icon-lite>
              </a>
            </div>
          </div>
        </div>
        <div id="info_wrap">
          <div class="address">
            221 Ritenour | University Park, PA 16802 | (814) 867-1391
          </div>
          <div id="basement">
            <div class="legal_statement">
              <div class="legal_item">
                <a
                  href="https://www.psu.edu/web-privacy-statement"
                  target="_blank"
                  rel="noopener"
                  >Privacy</a
                >
              </div>
              <div class="legal_item">
                <a
                  href="https://policy.psu.edu/policies"
                  target="_blank"
                  rel="noopener"
                  >Non Discrimination</a
                >
              </div>
              <div class="legal_item">
                <a
                  href="https://policy.psu.edu/policies"
                  target="_blank"
                  rel="noopener"
                  >Equal Opportunity</a
                >
              </div>
              <div class="legal_item">
                <a
                  href="https://www.psu.edu/accessibilitystatement"
                  target="_blank"
                  rel="noopener"
                  >Accessibility</a
                >
              </div>
              <div class="legal_item">
                <a
                  href="https://www.psu.edu/copyright-information"
                  target="_blank"
                  rel="noopener"
                  >Copyright</a
                >
              </div>
            </div>
          </div>
          <div id="odl_mark">
            <a href="http://odl.science.psu.edu">
              <img
                class="odl-mark-img"
                alt="Office of Digital Learning, Eberly College of Science"
                src="files/theme-images/logos/odl-logo.png"
              />
            </a>
          </div>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(PageFooter.tag, PageFooter);
export { PageFooter };
