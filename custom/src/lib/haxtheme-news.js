import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "@haxtheweb/haxcms-elements/lib/ui-components/query/site-query.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/blocks/site-recent-content-block.js";
import "./page-banner.js";
import "./news-card.js";

class HaxThemeNews extends DDD {
  static get tag() {
    return "haxtheme-news";
  }

  static get properties() {
    return {
      ...(super.properties || {}),
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
      manifest: { type: Object },
      __newsitems: { type: Array },
    };
  }

  constructor() {
    super();
    this.editMode = false;
    this.__newsitems = [];
    this.__newsitemsChanged = this.__newsitemsChanged.bind(this);
    // Stable conditions objects to avoid site-query re-query loop on re-render.
    this.__newsFeedConditions = {
      "metadata.type": { value: ["spotlight", "news"], operator: "==" },
    };
    this.__newsArchiveConditions = {
      "metadata.type": { value: ["spotlight", "news"], operator: "=" },
    };
    this.__disposer = autorun(() => {
      this.editMode = toJS(store.editMode);
      this.manifest = toJS(store.routerManifest);
    });
  }

  disconnectedCallback() {
    this.__disposer();
    super.disconnectedCallback();
  }

  __newsitemsChanged(e) {
    this.__newsitems = e.detail.value;
  }

  _formatDate(unixTimecode) {
    const date = new Date(unixTimecode * 1000);
    const dateFormatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateFormatted;
  }

  _trimDescription(description) {
    const trim = description.substring(0, 250) + "...";
    return trim;
  }

  static get styles() {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
        }
        :host([edit-mode]) #slot {
          display: none;
        }
        .news_container {
          display: var(--haxtheme-news-news-container-display, flex);
          width: var(--haxtheme-news-news-container-width, 80%);
          margin: var(--haxtheme-news-news-container-margin, 0 auto 0 auto);
        }
        @media screen and (max-width: 768px) {
          .news_container {
            flex-direction: var(
              --haxtheme-news-news-container-flex-direction-mobile,
              column
            );
            width: var(--haxtheme-news-news-container-width-mobile, 98%);
          }
        }
        .news_page_feed {
          width: var(--haxtheme-news-news-page-feed-width, 75%);
          margin: var(--haxtheme-news-news-page-feed-margin, 20px 0 0 0);
        }
        @media screen and (max-width: 768px) {
          .news_page_feed {
            width: var(--haxtheme-news-news-page-feed-width-mobile, 100%);
            margin: var(
              --haxtheme-news-news-page-feed-margin-mobile,
              10px 0 0 0
            );
          }
        }
        .sidebar_wrap {
          width: var(--haxtheme-news-sidebar-wrap-width);
          height: var(--haxtheme-news-sidebar-wrap-height);
          margin: var(--haxtheme-news-sidebar-wrap-margin);
          border-left: var(--haxtheme-news-sidebar-wrap-border-left);
          border-left-width: var(
            --haxtheme-news-sidebar-wrap-border-left-width
          );
          border-left-color: var(
            --haxtheme-news-sidebar-wrap-border-left-color
          );
          padding: var(--haxtheme-news-sidebar-wrap-padding);
        }
        @media screen and (max-width: 768px) {
          .sidebar_wrap {
            width: var(--haxtheme-news-sidebar-wrap-width-mobile);
            height: var(--haxtheme-news-sidebar-wrap-height-mobile);
            border: var(--haxtheme-news-sidebar-wrap-border-left-mobile);
            padding: var(--haxtheme-news-sidebar-wrap-padding-mobile);
            margin: var(--haxtheme-news-sidebar-wrap-margin-mobile);
          }
        }
        @media screen and (max-width: 768px) {
          #twitter_feed {
            width: var(--haxtheme-news-twitter-feed-width-mobile, 90%);
            margin: var(--haxtheme-news-twitter-margin-mobile, 0 auto 0 auto);
          }
        }
        #news_archive {
          margin: var(--haxtheme-news-news-archive-margin, 0 0 25px 0);
        }
        @media screen and (max-width: 768px) {
          #news_archive {
            width: var(--haxtheme-news-news-archive-width-mobile, 90%);
            margin: var(
              --haxtheme-news-news-archive-margin-mobile,
              0 auto 0 auto
            );
          }
        }
        site-recent-content-block {
          --site-recent-content-block-header-color: #e2801e;
        }
        #share_actions {
          display: var(--haxtheme-news-share-actions-display, flex);
          justify-content: var(
            --haxtheme-news-share-actions-justify-content,
            space-around
          );
          padding: var(--haxtheme-news-share-actions-padding, 10px);
          margin: var(--haxtheme-news-share-actions-margin, 10px 0 0 0);
        }
        @media screen and (max-width: 768px) {
          #share_actions {
            width: var(--haxtheme-news-share-actions-width-mobile, 85%);
            margin: var(
              --haxtheme-news-share-actions-margin-mobile,
              15px auto 15px auto
            );
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <page-banner
        image="files/theme-images/page-banners/news-banner.jpg"
        text="News"
        alt="Gateway to the Sciences"
      ></page-banner>
      <div id="news_wrap">
        <div class="news_container">
          <div class="news_page_feed">
            <site-query
              .conditions=${this.__newsFeedConditions}
              limit="5"
              @result-changed=${this.__newsitemsChanged}
            ></site-query>
            ${this.__newsitems.map(
              (item) => html`
                <news-card
                  image=${item.metadata.fields.image}
                  alt=${item.metadata.fields.imageAlt}
                  title=${item.title}
                  date=${this._formatDate(item.metadata.created)}
                  authorimage=${item.metadata.authorImage}
                  author=${item.metadata.author}
                  description=${this._trimDescription(item.description)}
                  url=${item.slug}
                ></news-card>
              `,
            )}
          </div>
          <div class="sidebar_wrap">
            <div id="news_archive">
              <site-recent-content-block
                title="News Archive"
                .conditions=${this.__newsArchiveConditions}
                start-index="5"
              ></site-recent-content-block>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(HaxThemeNews.tag, HaxThemeNews);
export { HaxThemeNews };
