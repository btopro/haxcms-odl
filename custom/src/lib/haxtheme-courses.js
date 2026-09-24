import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "@haxtheweb/haxcms-elements/lib/ui-components/query/site-query.js";
import "./page-banner.js";
import "./course-card.js";
import "./course-icons.js";

class HaxThemeCourses extends DDD {
  static get tag() {
    return "haxtheme-courses";
  }

  static get properties() {
    return {
      ...(super.properties || {}),
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
      manifest: { type: Object },
      __items: { type: Array },
    };
  }

  constructor() {
    super();
    this.editMode = false;
    this.__items = [];
    this.__itemsChanged = this.__itemsChanged.bind(this);
    // Stable conditions object to avoid site-query re-query loop on re-render.
    this.__courseConditions = { "metadata.type": "course" };
    this.__disposer = autorun(() => {
      this.manifest = toJS(store.routerManifest);
    });
  }

  disconnectedCallback() {
    this.__disposer();
    super.disconnectedCallback();
  }

  __itemsChanged(e) {
    this.__items = e.detail.value;
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
        #course_wrap {
          width: var(--haxtheme-courses-course-wrap-width, 80%);
          margin: var(
            --haxtheme-courses-course-wrap-margin,
            25px auto 15px auto
          );
        }
        #course {
          display: var(--haxtheme-courses-course-display, grid);
          grid-template-columns: var(
            --haxtheme-courses-course-grid-template-columns,
            repeat(auto-fit, minmax(250px, 1fr))
          );
          grid-column-gap: var(--haxtheme-courses-course-grid-column-gap, 2vw);
          grid-row-gap: var(--haxtheme-courses-course-grid-row-gap, 2vw);
        }
      `,
    ];
  }

  render() {
    return html`
      <site-query
        .conditions=${this.__courseConditions}
        @result-changed=${this.__itemsChanged}
      ></site-query>
      <page-banner
        image="files/theme-images/page-banners/course_banner.jpg"
        text="Courses"
        alt="Gateway to the Sciences"
      ></page-banner>
      <div id="course_wrap">
        <div id="course_list">
          <div id="course">
            ${this.__items.map(
              (item) => html`
                <course-card
                  image=${item.metadata.fields.image}
                  alt=${item.metadata.fields.imageAlt}
                  number=${item.title}
                  icon=${item.metadata.icon}
                  name=${item.metadata.fields.name}
                  url=${item.slug}
                ></course-card>
              `,
            )}
          </div>
        </div>
      </div>
      <div id="contentcontainer">
        <div id="slot">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(HaxThemeCourses.tag, HaxThemeCourses);
export { HaxThemeCourses };
