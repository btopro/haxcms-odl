import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "@haxtheweb/haxcms-elements/lib/ui-components/navigation/site-breadcrumb.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/blocks/site-recent-content-block.js";
import "@haxtheweb/video-player/video-player.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";
import "./page-banner.js";

class HaxThemeCourse extends DDD {
  static get tag() {
    return "haxtheme-course";
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

  __subjectSiteQueryCondition(activeItem) {
    const subject =
      activeItem &&
      activeItem.metadata &&
      activeItem.metadata.fields &&
      activeItem.metadata.fields.subject
        ? activeItem.metadata.fields.subject
        : null;
    // Cache by subject so we return a stable object reference
    // across renders (avoids site-recent-content-block re-query loop).
    if (this.__cachedSubject !== subject) {
      this.__cachedSubject = subject;
      this.__cachedSubjectConditions = subject
        ? { "metadata.fields.subject": subject }
        : {};
    }
    return this.__cachedSubjectConditions;
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
        h1 {
          font-size: var(--haxtheme-course-h1-font-size);
          font-weight: var(--haxtheme-course-h1-font-weight);
          margin: var(--haxtheme-course-h1-margin, 25px 0 0 0);
          text-transform: var(--haxtheme-course-h1-text-transform);
        }
        h2 {
          font-size: var(--haxtheme-course-h2-font-size);
          font-weight: var(--haxtheme-course-h2-font-weight);
          margin: var(--haxtheme-course-h2-margin, -10px 0 0 0);
        }
        h3 {
          font-size: 20px;
          font-weight: 100;
          margin: -5px 0 0 0;
        }
        page-banner {
          --page-banner-text-transform: uppercase;
        }
        site-breadcrumb {
          margin: var(--haxtheme-course-site-breadcrumb-margin);
        }
        @media screen and (max-width: 768px) {
          site-breadcrumb {
            margin: var(
              --haxtheme-course-site-breadcrumb-margin-mobile,
              -15px 0 15px
            );
          }
        }
        @media screen and (max-width: 768px) {
          #course_wrap {
            padding: var(--haxtheme-course-course-wrap-padding, 20px);
          }
        }
        .course_container {
          display: var(--haxtheme-course-course-container-display, flex);
          width: var(--haxtheme-course-course-container-width, 75%);
          margin: var(
            --haxtheme-course-course-container-margin,
            0 auto 0 auto
          );
        }
        @media screen and (max-width: 768px) {
          .course_container {
            flex-direction: var(
              --haxtheme-course-course-container-flex-direction-mobile,
              column
            );
            width: var(
              --haxtheme-course-course-container-width-mobile,
              98%
            );
          }
        }
        .course_inner_wrap {
          width: var(--haxtheme-course-course-inner-wrap-width, 90%);
          margin: var(--haxtheme-course-course-inner-wrap-margin, 0 20px 0 0);
        }
        @media screen and (max-width: 768px) {
          .course_inner_wrap {
            width: var(
              --haxtheme-course-course-inner-wrap-width-mobile,
              100%
            );
            margin: var(
              --haxtheme-course-course-inner-wrap-margin-mobile,
              10px 0 0 0
            );
          }
        }
        #course_header {
          border-left: var(--haxtheme-course-course-header-border-left);
          border-left-width: var(
            --haxtheme-course-course-header-border-left-width
          );
          border-left-color: var(--haxtheme-course-course-header-border-color);
          padding: var(--haxtheme-course-course-header-padding, 0 0 0 15px);
        }
        #course_archive {
          width: var(--haxtheme-course-course-archive-width, 121%);
          margin: var(--haxtheme-course-course-arhive-margin, 0 0 25px 0);
        }
        @media screen and (max-width: 768px) {
          #course_archive {
            width: var(--haxtheme-course-course-archive-width-mobile, 100%);
            margin: var(
              --haxtheme-course-course-arhive-margin,
              0 auto 0 auto
            );
          }
        }
        #credit {
          margin: 5px 0 0 0;
        }
        #description {
          font-size: var(--haxtheme-course-description-font-size);
          font-weight: var(--haxtheme-course-description-font-weight);
          line-height: var(--haxtheme-course-description-line-height);
          margin: var(--haxtheme-course-description-margin, 15px 0 25px 0);
        }
        .sidebar_wrap {
          width: var(--haxtheme-course-sidebar-wrap-width);
          margin: var(--haxtheme-course-sidebar-wrap-margin);
          border-left: var(--haxtheme-course-sidebar-wrap-border-left);
          border-left-width: var(
            --haxtheme-course-sidebar-wrap-border-left-width
          );
          border-left-color: var(
            --haxtheme-course-sidebar-wrap-border-left-color
          );
          height: var(--haxtheme-course-sidebar-wrap-height);
          padding: var(--haxtheme-course-sidebar-wrap-padding);
        }
        @media screen and (max-width: 768px) {
          .sidebar_wrap {
            width: var(--haxtheme-course-sidebar-wrap-width-mobile);
            height: var(--haxtheme-course-sidebar-wrap-height-mobile);
            border: var(--haxtheme-course-sidebar-wrap-border-mobile);
            padding: var(--haxtheme-course-sidebar-wrap-padding-mobile);
            margin: var(--haxtheme-course-sidebar-wrap-margin-mobile);
          }
        }
        #video_wrap {
          margin: var(--haxtheme-course-video-wrap-margin, 15px 15px 15px 0);
        }
        #video_placehold {
          display: var(--haxtheme-course-video-placehold-display, flex);
          justify-content: var(
            --haxtheme-course-video-placehold-justify-content,
            center
          );
        }
        simple-icon-lite {
          width: var(--haxtheme-course-iron-icon-width, 400px);
          height: var(--haxtheme-course-iron-icon-height, 400px);
          color: var(--haxtheme-course-iron-icon-fill);
          margin: var(--haxtheme-course-iron-icon-margin, 0 0 -20px 0);
        }
        @media screen and (max-width: 768px) {
          simple-icon-lite {
            width: var(--haxtheme-course-iron-icon-width-mobile, 250px);
            height: var(--haxtheme-course-iron-icon-height-mobile, 250px);
          }
        }
        site-recent-content-block {
          --site-recent-content-block-header-color: #e2801e;
        }
        #prereqs {
          display: flex;
        }
        #syllabi a {
          text-decoration: none;
        }
        .syllabus-btn {
          text-transform: none;
          background-color: #e2801e;
          color: #fff;
          margin: 10px 0;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
          font-size: 14px;
          border-radius: var(--ddd-radius-1, 2px);
        }
        .syllabus-btn:hover {
          background-color: #c96f1a;
        }
        body.dark-mode .syllabus-btn {
          background-color: light-dark(#e2801e, #f5a13d);
        }
        @media (prefers-color-scheme: dark) {
          .syllabus-btn {
            background-color: #f5a13d;
            color: #363533;
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
      <page-banner
        image="${fields.image || ""}"
        text="${activeItem ? activeItem.title : ""}"
        alt="${fields.imageAlt || ""}"
      ></page-banner>
      <div id="course_wrap">
        <div class="course_container">
          <div class="course_inner_wrap">
            <site-breadcrumb></site-breadcrumb>
            ${fields.video
              ? html`
                  <div id="video_wrap">
                    <video-player
                      width="100%"
                      source="${fields.video}"
                    ></video-player>
                  </div>
                `
              : html`
                  <div id="video_placehold">
                    <simple-icon-lite
                      icon="${metadata.icon || ""}"
                    ></simple-icon-lite>
                  </div>
                `}
            <div id="course_header">
              <div id="title">
                <h1>${activeItem ? activeItem.title : ""}</h1>
              </div>
              <div id="name">
                <h2>${fields.name || ""}</h2>
              </div>
              <div id="credit">
                <h3>Credits: ${fields.credits || ""}</h3>
              </div>
              <div id="syllabi">
                <a href="${metadata.syllabus || "#"}">
                  <button class="syllabus-btn">Sample Syllabus</button>
                </a>
              </div>
            </div>
            <div id="description">${fields.description || ""}</div>
            <div id="contentcontainer">
              <div id="slot">
                <slot></slot>
              </div>
            </div>
          </div>
          <div class="sidebar_wrap">
            <div id="course_archive">
              <site-recent-content-block
                title="Related Courses"
                .conditions=${this.__subjectSiteQueryCondition(activeItem)}
                limit="5"
              ></site-recent-content-block>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(HaxThemeCourse.tag, HaxThemeCourse);
export { HaxThemeCourse };
