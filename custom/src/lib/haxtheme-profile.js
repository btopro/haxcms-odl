import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "./haxtheme-icons.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/navigation/site-breadcrumb.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/blocks/site-recent-content-block.js";
import "@haxtheweb/simple-icon/lib/simple-icon-button-lite.js";

class HaxThemeProfile extends DDD {
  static get tag() {
    return "haxtheme-profile";
  }

  static get properties() {
    return {
      ...(super.properties || {}),
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
      activeItem: { type: Object },
      manifest: { type: Object },
    };
  }

  constructor() {
    super();
    this.editMode = false;
    this.activeItem = null;
    this.__disposer = [];
    autorun((reaction) => {
      this.editMode = toJS(store.editMode);
      this.__disposer.push(reaction);
    });
    autorun((reaction) => {
      this.manifest = toJS(store.routerManifest);
      this.__disposer.push(reaction);
    });
    autorun((reaction) => {
      this.activeItem = toJS(store.activeItem);
      this.__disposer.push(reaction);
    });
  }

  disconnectedCallback() {
    for (var i in this.__disposer) {
      this.__disposer[i].dispose();
    }
    super.disconnectedCallback();
  }

  __recentPostsConditions(activeItem) {
    const id = activeItem && activeItem.id ? activeItem.id : null;
    // Cache by activeItem.id so we return a stable object reference
    // across renders (avoids site-recent-content-block re-query loop).
    if (this.__cachedPostsId !== id) {
      this.__cachedPostsId = id;
      this.__cachedPostsConditions = id
        ? { "metadata.type": "news", "metadata.fields.authorId": id }
        : {};
    }
    return this.__cachedPostsConditions;
  }

  static get styles() {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
          --theme-color-1: #363533;
          --theme-color-2: #e2801e;
        }
        :host([edit-mode]) #slot {
          display: none;
        }
        h1 {
          margin: 15px 0 0;
          font-weight: 400;
        }
        h2 {
          margin: 0;
          font-weight: 100;
          font-size: 24px;
        }
        site-breadcrumb {
          margin-top: 10px;
        }
        #contentcontainer {
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.6;
          margin-bottom: 25px;
        }
        .profile_container {
          display: flex;
          width: 75%;
          margin-left: auto;
          margin-right: auto;
        }
        @media screen and (max-width: 768px) {
          #profile_wrap {
            padding: 15px;
          }
        }
        #profile_inner_wrap {
          width: 90%;
          margin-right: 20px;
        }
        @media screen and (max-width: 768px) {
          .profile_container {
            flex-direction: column;
            width: 98%;
          }
        }
        .sidebar_wrap {
          width: 25%;
          margin-top: 45px;
          border-left: solid 2px #dcdcdc;
          padding-left: 20px;
          height: 600px;
        }
        @media screen and (max-width: 768px) {
          .sidebar_wrap {
            width: 100%;
            height: auto;
            border: none;
            padding-left: 0;
            margin-top: 10px;
          }
        }
        #news_archive {
          margin-bottom: 25px;
          width: 121%;
        }
        @media screen and (max-width: 768px) {
          #news_archive {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
          }
        }
        #profile_head {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 45px 0 10px;
        }
        @media screen and (max-width: 768px) {
          #profile_head {
            padding-top: 0;
          }
        }
        #profile_image img {
          height: 300px;
          width: 300px;
          border-radius: 50%;
          border: solid 8px #e2801e;
          object-fit: cover;
        }
        @media screen and (max-width: 768px) {
          #profile_image img {
            height: 250px;
            width: 250px;
          }
        }
        #connect {
          display: flex;
          justify-content: center;
          margin: 20px 0 20px;
          border-bottom: solid 2px #dcdcdc;
          padding-bottom: 10px;
          width: 40%;
        }
        simple-icon-button-lite {
          color: #a9a9a9;
          --simple-icon-button-lite-width: 30px;
          --simple-icon-button-lite-height: 30px;
        }
        simple-icon-button-lite:hover {
          color: var(--theme-color-2);
        }
        @media screen and (max-width: 768px) {
          site-breadcrumb {
            margin: 0 0 30px;
          }
        }
        site-recent-content-block {
          --site-recent-content-block-header-color: #e2801e;
          --site-recent-content-block-active-color: var(--theme-color-2);
        }
        body.dark-mode .sidebar_wrap {
          border-left-color: #555;
        }
        body.dark-mode #connect {
          border-bottom-color: #555;
        }
        @media (prefers-color-scheme: dark) {
          .sidebar_wrap {
            border-left-color: #555;
          }
          #connect {
            border-bottom-color: #555;
          }
        }
      `,
    ];
  }

  render() {
    const activeItem = this.activeItem;
    const metadata =
      activeItem && activeItem.metadata ? activeItem.metadata : {};
    const fields = metadata && metadata.fields ? metadata.fields : {};
    return html`
      <div id="profile_wrap">
        <div class="profile_container">
          <div id="profile_inner_wrap">
            <site-breadcrumb></site-breadcrumb>
            <div id="profile_head">
              <div id="profile_image">
                <img
                  src="${fields.image || ""}"
                  alt="${fields.name || "Profile photo"}"
                />
              </div>
              <div id="profile_name">
                <h1>${fields.name || ""}</h1>
              </div>
              <div id="profile_position">
                <h2>${fields.jobTitle || ""}</h2>
              </div>
              <div id="connect">
                <div class="icon">
                  <a
                    href="${fields.twitter || "#"}"
                    target="_blank"
                    aria-label="Twitter profile"
                  >
                    <simple-icon-button-lite
                      icon="haxthemeicons:twitter2"
                    ></simple-icon-button-lite>
                  </a>
                </div>
                <div class="icon">
                  <a
                    href="mailto:${fields.email || ""}"
                    aria-label="Send email"
                  >
                    <simple-icon-button-lite
                      icon="haxthemeicons:email"
                    ></simple-icon-button-lite>
                  </a>
                </div>
                <div class="icon">
                  <a
                    href="tel:${fields.phone || ""}"
                    target="_blank"
                    aria-label="Phone number"
                  >
                    <simple-icon-button-lite
                      icon="haxthemeicons:phone"
                    ></simple-icon-button-lite>
                  </a>
                </div>
              </div>
            </div>
            <div id="contentcontainer">
              <div id="slot">
                <slot></slot>
              </div>
            </div>
          </div>
          <div class="sidebar_wrap">
            <div id="news_archive">
              <site-recent-content-block
                title="My Blog Posts"
                .conditions=${this.__recentPostsConditions(activeItem)}
                limit="5"
              ></site-recent-content-block>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(HaxThemeProfile.tag, HaxThemeProfile);
export { HaxThemeProfile };
