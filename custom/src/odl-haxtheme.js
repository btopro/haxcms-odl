/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { html, css } from "lit";
import { HAXCMSLitElementTheme } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "@haxtheweb/scroll-button/scroll-button.js";
import "@haxtheweb/media-image/media-image.js";
import "@haxtheweb/citation-element/citation-element.js";
import "@haxtheweb/stop-note/stop-note.js";
import "./lib/haxtheme-home.js";
import "./lib/haxtheme-about.js";
import "./lib/haxtheme-service-course.js";
import "./lib/haxtheme-service-lab.js";
import "./lib/haxtheme-service-pedagogy.js";
import "./lib/haxtheme-service-multimedia.js";
import "./lib/haxtheme-news.js";
import "./lib/haxtheme-team.js";
import "./lib/haxtheme-courses.js";
import "./lib/haxtheme-course.js";
import "./lib/haxtheme-blog.js";
import "./lib/haxtheme-profile.js";
import "./lib/haxtheme-spotlight.js";
import "./lib/haxtheme-resources.js";
import "./lib/haxtheme-syllabus.js";
import "./lib/haxtheme-contact.js";
import "./lib/link-preview.js";
import "./lib/page-topbar.js";
import "./lib/page-footer.js";
import "./lib/haxtheme-demos.js";
import "./lib/odl-site-top-menu.js";
import "./lib/haxtheme-search.js";
import "./lib/haxtheme-faqs.js";
import "./lib/haxtheme-faq.js";
import "./lib/odl-accordion.js";

/**
 * `odl-haxtheme`
 * `ODL custom site theme`
 * @demo demo/index.html
 */
class OdlHaxtheme extends HAXCMSLitElementTheme {
  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "odl-haxtheme";
  }

  static get properties() {
    return {
      ...super.properties,
      /**
       * Active template key computed from store.slug / store.activeItem
       */
      _activeTemplate: {
        type: String,
      },
      /**
       * Active item (JSON Outline Schema) used for metadata.type fallback
       */
      activeItem: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this._activeTemplate = "home";
    this.activeItem = null;
    // Stable conditions object so we don't pass a new reference to
    // odl-site-top-menu on every render (which would loop site-query).
    // Uses "slug" (not "location") because location is the full path
    // (pages/syllabi/index.html) while the exclusion values are slugs.
    this.__topMenuConditions = {
      parent: null,
      slug: {
        value: [
          "syllabi",
          "spotlight",
          "coursemanagement",
          "lab",
          "pedagogy",
          "multimedia",
          "contingency",
          "search",
          "faqs",
          "demos",
        ],
        operator: "!=",
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.__disposer.push(
      autorun((reaction) => {
        const loc = toJS(store.location);
        const item = toJS(store.activeItem);
        console.log("[ODL-THEME] autorun fired, loc:", loc && loc.route ? loc.route.name : "null", "item:", item ? item.id : "null");
        Promise.resolve().then(() => {
          this._location = loc;
          this.activeItem = item;
          this._activeTemplate = this._computeTemplate(loc, item);
          console.log("[ODL-THEME] _activeTemplate set to:", this._activeTemplate);
          if (loc) {
            globalThis.scrollTo(0, 0);
          }
        });
      }),
    );
  }

  disconnectedCallback() {
    for (var i in this.__disposer) {
      const disposer = this.__disposer[i];
      if (typeof disposer === "function") {
        disposer();
      } else if (disposer && typeof disposer.dispose === "function") {
        disposer.dispose();
      }
    }
    super.disconnectedCallback();
  }

  /**
   * Compute the active page template key from the current route and active item.
   * Preserves the legacy route mapping.
   */
  _computeTemplate(location, activeItem) {
    if (!location) {
      return "home";
    }
    var target;
    switch (location.route.name) {
      case "home":
        target = "home";
        break;
      case "news":
        target = "news";
        break;
      case "team":
        target = "team";
        break;
      case "courses":
        target = "courses";
        break;
      case "about":
        target = "about";
        break;
      case "contact":
        target = "contact";
        break;
      case "search":
        target = "search";
        break;
      case "spotlight":
        target = "spotlight";
        break;
      case "faqs":
        target = "faqs";
        break;
      case "demos":
        target = "demos";
        break;
      case "coursemanagement":
        target = "service-course";
        break;
      case "lab":
        target = "service-lab";
        break;
      case "pedagogy":
        target = "service-pedagogy";
        break;
      case "multimedia":
        target = "service-multimedia";
        break;
      case "resources":
        target = "resources";
        break;
      default:
        // normalize the route path so that this logic works on sub directory / multi-site setup
        const routePath = location.route.path.startsWith("/")
          ? location.route.path
          : `/${location.route.path}`;
        if (routePath.startsWith("/blog-posts/")) {
          target = "blog";
        } else if (routePath.startsWith("/team-directory/")) {
          target = "profile";
        } else if (routePath.startsWith("/courses/")) {
          target = "course";
        } else if (routePath.startsWith("/syllabi/")) {
          target = "syllabus";
        } else if (routePath.startsWith("/spotlight/")) {
          target = "spotlight";
        } else if (routePath.startsWith("/faqs/")) {
          target = "faq";
        } else if (routePath.startsWith("/coursemanagement")) {
          target = "service-course";
        } else if (routePath.startsWith("/lab")) {
          target = "service-lab";
        } else if (routePath.startsWith("/pedagogy")) {
          target = "service-pedagogy";
        } else if (routePath.startsWith("/multimedia")) {
          target = "service-multimedia";
        } else if (routePath.startsWith("/resources")) {
          target = "resources";
        } else if (routePath.startsWith("/search")) {
          target = "search";
        } else if (routePath.startsWith("/about/")) {
          target = "about";
        } else if (routePath.startsWith("/faqs")) {
          target = "faqs";
        } else if (routePath.startsWith("/demos")) {
          target = "demos";
        } else if (activeItem && activeItem.metadata) {
          switch (activeItem.metadata.type) {
            case "news":
              target = "blog";
              break;
            case "team":
              target = "profile";
              break;
            case "course":
              target = "course";
              break;
            case "spotlight":
              target = "spotlight";
              break;
            default:
              target = "home";
              break;
          }
        } else {
          target = "home";
        }
        break;
    }
    return target;
  }

  /**
   * Global styles applied to the entire document via store.themeStyleElement.
   * Includes :root custom properties (moved from the Polymer :root block) and
   * table/link styles that apply to page body content in the light DOM.
   */
  HAXCMSGlobalStyleSheetContent() {
    return [
      ...super.HAXCMSGlobalStyleSheetContent(),
      css`
        :root {
          color-scheme: light dark;
          --theme-color-1: #363533;
          --theme-color-2: #e2801e;
          --theme-color-4: #fff;
          --haxtheme-page-banner-image-text-h1-color: #ffffff;
          --haxtheme-homepage-banner-image-text-h1-color: #ffffff;
          --site-recent-content-block-active-color: #e2801e;
          --site-rss-bg-color: var(--theme-color-2);
          --site-breadcrumb-color: #a9a9a9;
          --site-breadcrumb-text-decoration: none;
          --site-menu-button-tooltip-bg: var(--theme-color-1);
          --site-rss-border-radius: 0;
          --site-rss-bg-active: var(--theme-color-2);
        }

        body {
          background-color: #fff;
          color: #000;
        }

        /* Table Styles — apply to page body content */
        table {
          border-collapse: collapse;
          width: 100%;
          font-size: 18px;
          font-weight: 300;
        }

        th,
        td {
          border-bottom: solid 1px #dddddd;
          border: 1px solid #ddd;
          padding: 8px;
        }

        th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #ddd;
        }

        tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        tr:hover {
          background-color: #ddd;
        }

        a {
          text-decoration: none;
          color: #e2801e;
        }

        /* Dark mode — body.dark-mode is set by HAXcms based on
           prefers-color-scheme or user toggle. Flip surfaces and text. */
        body.dark-mode {
          background-color: #1a1a1a;
          color: #e0e0e0;
        }
        body.dark-mode table {
          color: #e0e0e0;
        }
        body.dark-mode th {
          background-color: #2a2a2a;
          color: #fff;
        }
        body.dark-mode tr:nth-child(even) {
          background-color: #242424;
        }
        body.dark-mode tr:hover {
          background-color: #333;
        }
      `,
    ];
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: "Roboto", sans-serif;
          --theme-color-1: #363533;
          --theme-color-2: #e2801e;
          --theme-color-4: #fff;
          background-color: #fff;
          color: #000;
        }

        /* Dark mode — match the body flip so the theme element itself
           doesn't show a white background in dark mode. */
        :host-context(body.dark-mode) {
          background-color: #1a1a1a;
          color: #e0e0e0;
          --theme-color-4: #1a1a1a;
        }
        /* Fallback for browsers without :host-context support —
           the body.dark-mode background handles most of the surface. */
        @media (prefers-color-scheme: dark) {
          :host {
            background-color: #1a1a1a;
            color: #e0e0e0;
            --theme-color-4: #1a1a1a;
          }
        }

        :host([hidden]) {
          display: none;
        }

        /* Scroll Button Styles */
        scroll-button {
          position: fixed;
          right: 0;
          bottom: 65px;
          margin-right: 25px;
          border: 1px solid #f5f5f5;
        }

        /* Active page component — replaces iron-pages flex behavior */
        #content-page {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }

        a11y-tabs {
          --a11y-tabs-content-background: orange;
        }

        /* Menu Styles */
        odl-site-top-menu {
          width: 100%;
          --site-top-menu-bg: var(--theme-color-2);
          --site-top-menu-link-color: var(--theme-color-4);
          --site-top-menu-link-bg-color: var(--theme-color-2);
          --site-top-menu-link-color-hover: white;
          --site-top-menu-link-bg-color-hover: var(--theme-color-1);
          --site-top-menu-link-active-color: white;
          color: white;
        }
      `,
    ];
  }

  render() {
    return html`
      <page-topbar .editMode=${this.editMode} alert></page-topbar>
      <odl-site-top-menu
        .conditions=${this.__topMenuConditions}
      ></odl-site-top-menu>
      ${this._renderActiveTemplate()}
      <scroll-button></scroll-button>
      <page-footer></page-footer>
    `;
  }

  /**
   * Conditionally render the active page sub-component.
   * Each wraps <slot></slot> to forward site-builder-injected content.
   */
  _renderActiveTemplate() {
    const editMode = this.editMode;
    switch (this._activeTemplate) {
      case "home":
        return html`<haxtheme-home
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-home>`;
      case "news":
        return html`<haxtheme-news
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-news>`;
      case "team":
        return html`<haxtheme-team
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-team>`;
      case "courses":
        return html`<haxtheme-courses
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-courses>`;
      case "about":
        return html`<haxtheme-about
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-about>`;
      case "contact":
        return html`<haxtheme-contact
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-contact>`;
      case "blog":
        return html`<haxtheme-blog
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-blog>`;
      case "profile":
        return html`<haxtheme-profile
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-profile>`;
      case "course":
        return html`<haxtheme-course
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-course>`;
      case "syllabus":
        return html`<haxtheme-syllabus
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-syllabus>`;
      case "service-course":
        return html`<haxtheme-service-course
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-service-course>`;
      case "service-lab":
        return html`<haxtheme-service-lab
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-service-lab>`;
      case "service-pedagogy":
        return html`<haxtheme-service-pedagogy
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-service-pedagogy>`;
      case "service-multimedia":
        return html`<haxtheme-service-multimedia
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-service-multimedia>`;
      case "spotlight":
        return html`<haxtheme-spotlight
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-spotlight>`;
      case "resources":
        return html`<haxtheme-resources
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-resources>`;
      case "search":
        return html`<haxtheme-search
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-search>`;
      case "faqs":
        return html`<haxtheme-faqs
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-faqs>`;
      case "faq":
        return html`<haxtheme-faq
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-faq>`;
      case "demos":
        return html`<haxtheme-demos
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-demos>`;
      default:
        return html`<haxtheme-home
          id="content-page"
          .editMode=${editMode}
        >
          <slot></slot>
        </haxtheme-home>`;
    }
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    // The base class sets contentContainer from its own shadow DOM, but our
    // render delegates to a sub-component. Point contentContainer at the
    // active sub-component's #contentcontainer once the first render settles.
    // We use a flag so this only runs once and never re-enters updated().
    requestAnimationFrame(() => {
      this._updateContentContainer();
    });
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    // When the active template switches, the sub-component changes so we
    // need to re-point contentContainer. Guard against re-entry: only act
    // when _activeTemplate actually changed, and don't set contentContainer
    // to the same node twice (setting a reactive property triggers updated).
    if (changedProperties.has("_activeTemplate") && !this.__updatingContainer) {
      this.__updatingContainer = true;
      requestAnimationFrame(() => {
        this._updateContentContainer();
        this.__updatingContainer = false;
      });
    }
  }

  /**
   * Set contentContainer to the active sub-component's #contentcontainer
   * so the site-builder knows where content lives for this route.
   * Idempotent: only updates when the target node actually changes.
   */
  _updateContentContainer() {
    const activeEl = this.shadowRoot && this.shadowRoot.querySelector("#content-page");
    if (activeEl && activeEl.shadowRoot) {
      const container = activeEl.shadowRoot.querySelector("#contentcontainer");
      if (container && this.contentContainer !== container) {
        this.contentContainer = container;
      }
    }
  }
}

globalThis.customElements.define(OdlHaxtheme.tag, OdlHaxtheme);
export { OdlHaxtheme };
