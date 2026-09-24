import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js";

class InfoBox extends DDD {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        a {
          text-decoration: var(--haxtheme-info-box-a-text-decoration);
        }
        h1 {
          font-size: var(--haxtheme-info-box-h1-font-size);
          font-weight: var(--haxtheme-info-box-h1-font-weight);
          margin: var(--haxtheme-info-box-h1-margin, -11px 0 0 0);
        }
        #box_wrap {
          display: var(--haxtheme-info-box-box-wrap-display, flex);
          flex-direction: var(
            --haxtheme-info-box-box-wrap-flex-direction,
            column
          );
          align-items: var(--haxtheme-info-box-box-wrap-align-items, center);
        }

        @media screen and (min-width: 1550px) {
          #box_wrap {
            margin-top: 150px;
          }
        }

        #inner_wrap {
          border-left: var(--haxtheme-info-box-inner-wrap-border-left);
          border-left-width: var(
            --haxtheme-info-box-inner-wrap-border-left-width
          );
          border-left-color: var(
            --haxtheme-info-box-inner-wrap-border-left-color
          );
          padding: var(--haxtheme-info-box-inner-wrap-padding, 0 0 0 15px);
          width: var(--haxtheme-info-box-inner-wrap-width, 85%);
        }

        .action_text {
          font-size: var(--haxtheme-info-box-action-text-font-size, 22px);
          font-weight: var(--haxtheme-info-box-action-text-font-weight);
          line-height: var(--haxtheme-info-box-action-text-line-height);
        }

        @media screen and (max-width: 700px) {
          .action_text {
            font-size: var(
              --haxtheme-info-box-action-text-font-size-mobile,
              18px
            );
            width: var(--haxtheme-info-box-action-text-width-mobile, 90%);
          }
        }

        .action_button {
          margin: var(--haxtheme-info-box-action-button-margin, 12px 0 0 0);
        }

        a#learn {
          display: inline-flex;
          align-items: center;
          color: var(--haxtheme-info-box-paper-button-color);
          font-size: var(--ddd-font-size-xs, 16px);
          text-decoration: none;
        }

        a#learn:hover,
        a#learn:focus {
          color: var(--haxtheme-info-box-paper-button-color-active);
        }

        a#learn .title {
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
      <div id="box_wrap">
        <div id="inner_wrap">
          <div class="action_title">
            <h1>${this.title}</h1>
          </div>
          <div class="action_text">
            <slot name="action_text"></slot>
          </div>
        </div>
        <div class="action_button">
          <a href="${this.url}" id="learn">
            <span class="title">Learn More</span>
            <simple-icon-lite icon="chevron-right"></simple-icon-lite>
          </a>
        </div>
      </div>
    `;
  }
  static get tag() {
    return "info-box";
  }
  static get properties() {
    return {
      /**
       * Title
       */
      title: {
        type: String,
      },
      /**
       * Url
       */
      url: {
        type: String,
      },
    };
  }
}
globalThis.customElements.define(InfoBox.tag, InfoBox);
export { InfoBox };
