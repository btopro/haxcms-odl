import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/query/site-query.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js";

class NewsFeed extends DDD {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        .feed_header {
          display: var(--haxtheme-news-feed-feed-header-display, flex);
          justify-content: var(
            --haxtheme-news-feed-feed-header-justify-content,
            center
          );
          margin: var(--haxtheme-news-feed-feed-header-margin, -50px 0 0 0);
        }

        @media screen and (max-width: 768px) {
          .feed_header {
            margin: var(--haxtheme-news-feed-feed-header-margin-mobile, 0);
          }
        }

        .feed_header h2 {
          margin: var(--haxtheme-news-feed-feed-header-h2-margin, 0 0 20px 0);
          font-size: var(
            --haxtheme-news-feed-feed-header-h2-font-size,
            34px
          );
          font-weight: var(
            --haxtheme-news-feed-feed-header-h2-font-weight,
            400
          );
          background-color: var(
            --haxtheme-news-feed-feed-header-h2-background-color
          );
          color: var(--haxtheme-news-feed-feed-header-h2-color);
          padding: var(--haxtheme-news-feed-feed-header-h2-padding, 15px);
        }

        @media screen and (max-width: 768px) {
          .feed_header h2 {
            display: var(
              --haxtheme-news-feed-feed-header-h2-display-mobile,
              flex
            );
            justify-content: var(
              --haxtheme-news-feed-feed-header-h2-justify-content-mobile,
              center
            );
            width: var(
              --haxtheme-news-feed-feed-header-h2-width-mobile,
              100%
            );
            font-size: var(
              --haxtheme-news-feed-feed-header-h2-font-size-mobile,
              28px
            );
            margin: var(
              --haxtheme-news-feed-feed-header-h2-margin-mobile,
              0 0 15px 0
            );
          }
        }

        #news_feed {
          display: var(--haxtheme-news-feed-news-feed-display, flex);
          flex-wrap: var(--haxtheme-news-feed-news-feed-flex-wrap, wrap);
        }

        @media screen and (min-width: 1124px) {
          #news_feed {
            flex-wrap: var(
              --haxtheme-news-feed-news-feed-flex-wrap-mobile,
              nowrap
            );
          }
        }

        #news_feed > *:not(site-query) {
          width: var(--haxtheme-news-feed-news-feed-width, 100%);
        }

        #news_feed_wrap {
          margin: var(--haxtheme-news-feed-news-feed-wrap-margin, 20px);
        }

        #card_wrap {
          display: var(--haxtheme-news-feed-card-wrap-display, flex);
          flex-direction: var(
            --haxtheme-news-feed-card-wrap-flex-direction,
            column
          );
          justify-content: var(
            --haxtheme-news-feed-card-wrap-justify-content,
            space-evenly
          );
          border-right: var(--haxtheme-news-feed-card-wrap-border, solid);
          border-right-width: var(
            --haxtheme-news-feed-card-wrap-border-width,
            2px
          );
          border-right-color: var(
            --haxtheme-news-feed-card-wrap-border-color
          );
          padding: var(--haxtheme-news-feed-card-wrap-padding, 0 40px);
        }

        #card_wrap:last-of-type {
          border-right: var(
            --haxtheme-news-feed-card-wrap-last-of-border,
            none
          );
        }

        @media screen and (max-width: 768px) {
          #card_wrap {
            border-right: var(
              --haxtheme-news-feed-card-wrap-border-right-mobile,
              none
            );
            border-bottom: var(
              --haxtheme-news-feed-card-wrap-border-bottom-mobile,
              solid
            );
            border-bottom-width: var(
              --haxtheme-news-feed-card-wrap-border-bottom-width-mobile,
              2px
            );
            border-bottom-color: var(
              --haxtheme-news-feed-card-wrap-border-bottom-color-mobile
            );
            margin: var(
              --haxtheme-news-feed-card-wrap-margin-mobile,
              0 0 25px 0
            );
            padding: var(--haxtheme-news-feed-card-wrap-padding-mobile, 0);
          }
        }

        #card_image .card-img {
          height: var(--haxtheme-news-feed-card-image-height, 200px);
          width: var(--haxtheme-news-feed-card-image-width, 100%);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        @media screen and (max-width: 1123px) {
          #card_image .card-img {
            height: 300px;
          }
        }

        #card_heading_wrap {
          border-left: var(
            --haxtheme-news-feed-card-heading-wrap-border-left
          );
          border-left-width: var(
            --haxtheme-news-feed-card-heading-wrap-border-left-width
          );
          border-left-color: var(
            --haxtheme-news-feed-card-heading-wrap-border-left-color
          );
          padding: var(
            --haxtheme-news-feed-card-heading-wrap-padding,
            0 0 0 15px
          );
          margin: var(
            --haxtheme-news-feed-card-heading-wrap-margin,
            15px 0 0 0
          );
        }

        #card_heading h1 {
          color: var(--haxtheme-news-feed-card-heading-h1-color);
          margin: var(--haxtheme-news-feed-card-heading-h1-margin, 0);
          font-weight: var(--haxtheme-news-feed-card-heading-h1-font-weight);
          font-size: var(
            --haxtheme-news-feed-card-heading-h1-font-size,
            28px
          );
          line-height: var(
            --haxtheme-news-feed-card-heading-h1-line-height,
            1.2
          );
        }
        #card_heading h1:hover {
          color: var(--haxtheme-news-feed-card-heading-h1-hover-color);
        }

        #card_heading a {
          text-decoration: var(
            --haxtheme-news-feed-card-heading-a-text-decoration
          );
        }

        #card_footer {
          display: var(--haxtheme-news-feed-card-footer-display, flex);
          align-items: var(
            --haxtheme-news-feed-card-footer-align-items,
            center
          );
          margin: var(--haxtheme-news-feed-card-footer-margin, -5px 0 0 0);
        }

        #author_name {
          margin: var(--haxtheme-news-feed-author-name-margin, 15px 0 0 0);
          font-size: var(--ddd-font-size-s, 18px);
          font-weight: var(--ddd-font-weight-regular, 400);
        }

        #card_description {
          font-size: var(--haxtheme-news-feed-card-description-font-size);
          font-weight: var(--haxtheme-news-feed-card-description-font-weight);
          line-height: var(--haxtheme-news-feed-card-description-line-height);
          padding: var(
            --haxtheme-news-feed-card-description-padding,
            15px 0 0 0
          );
        }

        #author_image {
          border-radius: var(
            --haxtheme-news-feed-author-image-border-radius,
            50%
          );
          margin: var(
            --haxtheme-news-feed-author-image-margin,
            15px 10px 0 0
          );
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        #action_button {
          display: var(--haxtheme-news-feed-action-button-display, flex);
          justify-content: var(
            --haxtheme-news-feed-action-justify-content,
            center
          );
          margin: var(
            --haxtheme-news-feed-action-button-margin,
            5px 0 0 0
          );
        }

        #action_button a {
          text-decoration: var(
            --haxtheme-news-feed-action-button-a-text-decoration
          );
        }

        a#news {
          display: inline-flex;
          align-items: center;
          color: var(--haxtheme-news-feed-paper-button-color);
          font-size: var(--ddd-font-size-s, 16px);
          text-decoration: none;
        }

        a#news:hover,
        a#news:focus {
          color: var(--haxtheme-news-feed-paper-button-color-active);
        }

        a#news .title {
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
      <div id="news_feed_wrap">
        <div class="feed_header">
          <h2>Recent News</h2>
        </div>
        <div id="news_feed">
          <site-query
            .conditions=${this.__newsConditions}
            .limit=${3}
            .startIndex=${1}
            @result-changed=${this.__itemsChanged}
          ></site-query>
          ${this.__items.map(
            (item) => html`
              <div id="card_wrap">
                <div id="card_image">
                  <div
                    class="card-img"
                    role="img"
                    aria-label=${item.title}
                    style=${`background-image:url(${item.metadata ? item.metadata.fields ? item.metadata.fields.image : "" : ""})`}
                  ></div>
                </div>
                <div id="card_heading_wrap">
                  <div id="card_heading">
                    <a href="${item.slug}">
                      <h1>${item.title}</h1>
                    </a>
                  </div>
                  <div id="card_footer">
                    <div
                      id="author_image"
                      role="img"
                      aria-label=${item.metadata ? item.metadata.author : ""}
                      style=${`width:50px; height:50px; background-image:url(${item.metadata ? item.metadata.authorImage : ""})`}
                    ></div>
                    <div id="author_name">
                      ${item.metadata ? item.metadata.author : ""}
                    </div>
                  </div>
                </div>
                <div id="card_description">
                  ${this._trimDescription(item.description)}
                </div>
                <div id="action_button">
                  <a href="${item.slug}" id="news">
                    <span class="title">Read More</span>
                    <simple-icon-lite icon="chevron-right"></simple-icon-lite>
                  </a>
                </div>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }
  constructor() {
    super();
    this.__items = [];
    this.__itemsChanged = this.__itemsChanged.bind(this);
    // Stable conditions object to avoid site-query re-query loop on re-render.
    this.__newsConditions = { "metadata.type": "news" };
  }
  __itemsChanged(e) {
    this.__items = e.detail.value;
  }
  static get tag() {
    return "news-feed";
  }
  static get properties() {
    return {
      __items: {
        type: Array,
      },
    };
  }
  _trimDescription(description) {
    if (!description) {
      return "";
    }
    const trim = description.substring(0, 175) + "...";
    return trim;
  }
}
globalThis.customElements.define(NewsFeed.tag, NewsFeed);
export { NewsFeed };
