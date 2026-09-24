import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/query/site-query.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { varGet } from "@haxtheweb/utils/lib/object-path.js";
import { autorun, toJS } from "mobx";
import "./course-tile.js";
import "./odl-simple-picker.js";

class ContentListing extends DDD {
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
          margin: 0;
          line-height: 1;
          font-weight: var(--haxtheme-page-feature-h1-font-weight);
        }

        @media screen and (max-width: 768px) {
          h1 {
            font-size: var(--ddd-font-size-m, 28px);
          }
        }

        h2 {
          font-size: var(--ddd-font-size-l, 32px);
          margin: 0;
          font-weight: var(--haxtheme-page-feature-h2-font-weight);
        }

        @media screen and (max-width: 768px) {
          h2 {
            font-size: var(--ddd-font-size-m, 24px);
          }
        }

        #feature_wrap {
          background-color: var(--haxtheme-page-feature-wrap-background-color);
          padding: 40px 0 55px 0;
        }

        @media screen and (max-width: 1012px) {
          #feature_wrap {
            flex-direction: column;
            height: auto;
            padding: 0 15px;
            background-color: transparent;
          }
        }

        #border {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 0 0 0;
          width: 94%;
          border-top: dashed;
          border-top-width: 4px;
          border-top-color: var(
            --haxtheme-page-feature-border-border-top-color
          );
          margin: 0 auto 0 auto;
        }

        @media screen and (max-width: 1012px) {
          #border {
            flex-direction: column;
            height: auto;
            border: none;
            padding: 5px 0 0 0;
            width: 100%;
          }
        }

        #feature_image {
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          width: 50%;
          height: 400px;
        }

        @media screen and (max-width: 1012px) {
          #feature_image {
            height: 300px;
            margin: 15px 0 0 0;
            width: 100%;
          }
        }

        #feature_description_wrap {
          background-color: var(
            --haxtheme-page-feature-feature-description-wrap-background-color
          );
          height: auto;
          width: 780px;
          z-index: 1;
          margin: 0 25px 0 -30px;
          box-shadow: 1px 2px 7px
            var(
              --haxtheme-page-feature-feature-description-wrap-box-shadow-color
            );
        }

        @media screen and (max-width: 1124px) {
          #feature_description_wrap {
            width: 100%;
            z-index: 0;
            box-shadow: none;
            margin: 0;
          }
        }

        #title_wrap {
          display: flex;
          flex-direction: column;
          border-left: var(--haxtheme-page-feature-title-wrap-border-left);
          border-left-width: var(
            --haxtheme-page-feature-title-wrap-border-left-width
          );
          border-left-color: var(
            --haxtheme-page-feature-title-wrap-border-left-color
          );
          padding: 0 0 0 15px;
          margin: 20px 0 0 20px;
        }

        @media screen and (max-width: 768px) {
          #title_wrap {
            margin: 20px 0 0 0;
          }
        }

        #title {
          margin: 0 0 10px 0;
        }

        #description {
          font-size: var(--haxtheme-page-feature-description-font-size);
          font-weight: var(--haxtheme-page-feature-description-font-weight);
          line-height: var(--haxtheme-page-feature-description-line-height);
          height: auto;
        }

        @media screen and (max-width: 768px) {
          #description {
            padding: 25px 0 0 0;
            margin: 0 0 25px 0;
          }
        }

        #results {
          display: flex;
          flex-wrap: wrap;
          border: solid 2px light-dark(#dcdcdc, #555);
          height: auto;
          margin: 20px;
          display: grid;
          grid-template-columns: repeat(
            var(--content-listing-grid-count, 3),
            1fr [col-start]
          );
        }

        @media screen and (max-width: 768px) {
          #results {
            margin: 0;
          }
        }

        odl-simple-picker {
          width: 55%;
          --simple-picker-row: {
            display: block;
          }
        }

        @media screen and (max-width: 768px) {
          odl-simple-picker {
            width: 100%;
          }
        }

        course-tile {
          margin: 1px;
          flex-grow: 1;
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
              <site-query
                .conditions=${this._parsedCondition}
                @result-changed=${this.__courseitemsChanged}
              ></site-query>
              <odl-simple-picker
                id="courseselect"
                label="Select a Subject"
                .value=${this.__selectedCourse}
                .options=${this.__courselist(this.__courseitems)}
                @value-changed=${this.__selectedCourseChanged}
              >
              </odl-simple-picker>
            </div>

            <div id="description">
              <div id="results">
                ${this.__selectedCourses.map(
                  (item) => html`
                    <course-tile
                      name=${item.title}
                      image=${item.metadata && item.metadata.fields ? item.metadata.fields.image : ""}
                      url=${item.slug}
                    ></course-tile>
                  `,
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  static get tag() {
    return "content-listing";
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
       * Condition
       */
      condition: {
        type: Object,
      },
      /**
       * Location
       */
      location: {
        type: String,
      },
      __courseitems: {
        type: Array,
      },
      __selectedCourse: {
        type: String,
      },
      __selectedCourses: {
        type: Array,
      },
    };
  }

  get _parsedCondition() {
    if (typeof this.condition === "string") {
      try {
        return JSON.parse(this.condition);
      } catch (e) {
        return {};
      }
    }
    return this.condition || {};
  }

  constructor() {
    super();
    this.__courseitems = [];
    this.__selectedCourse = null;
    this.__selectedCourses = [];
    this.__defaultGridCount = 3;
    this.__disposers = [];
    this.__courseitemsChanged = this.__courseitemsChanged.bind(this);
    this.__selectedCourseChanged = this.__selectedCourseChanged.bind(this);
    this.__disposers.push(
      autorun(() => {
        this.activeItem = toJS(store.activeItem);
      }),
    );
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.__defaultGridCount =
      getComputedStyle(this).getPropertyValue(
        "--content-listing-grid-count",
      ) || 3;
  }

  disconnectedCallback() {
    this.__disposers.forEach((disposer) => disposer());
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has("__selectedCourses")) {
      this.__updateResultsGridCount(this.__selectedCourses.length);
    }
  }

  __courseitemsChanged(e) {
    this.__courseitems = e.detail.value;
    this.__updateSelectedCourses();
  }

  __selectedCourseChanged(e) {
    this.__selectedCourse = e.detail.value;
    this.__updateSelectedCourses();
  }

  __updateSelectedCourses() {
    this.__selectedCourses = this.__computeSelectedCourses(
      this.__selectedCourse,
      this.__courseitems,
    );
  }

  __filteredCourselist(items) {
    let filterIndex = [];
    const filtered = items.filter((item) => {
      if (filterIndex.includes(varGet(item, this.slug, false))) {
        return false;
      } else {
        filterIndex.push(varGet(item, this.slug, false));
        return true;
      }
    });
    return filtered;
  }

  __courselist(items) {
    const filtered = this.__filteredCourselist(items);
    const courses = filtered.map((item) => {
      return {
        value: varGet(item, this.slug, false),
        alt: varGet(item, this.slug, false),
      };
    });
    return [courses];
  }

  __courseItemsDuped(items) {
    const filtered = this.__filteredCourselist(items);
    const subjects = filtered.map((item) =>
      varGet(item, this.slug, false),
    );
    return subjects;
  }

  __computeSelectedCourses(selected, courses) {
    const filtered = courses.filter((course) => {
      if (
        course.metadata &&
        course.metadata.fields &&
        course.metadata.fields.subject === selected
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filtered;
  }

  __updateResultsGridCount(gridItems) {
    const hostComputedStyle = getComputedStyle(this);
    const mq =
      hostComputedStyle.getPropertyValue(
        "--content-listing-results-medium-breakpoint",
      ) || 900;
    const currentGridCount = hostComputedStyle.getPropertyValue(
      "--content-listing-grid-count",
    );
    let newGridCount;
    if (this.offsetWidth > mq) {
      if (gridItems === 2) {
        newGridCount = 2;
      } else if (gridItems === 1) {
        newGridCount = 1;
      } else {
        newGridCount = this.__defaultGridCount;
      }
    } else {
      newGridCount = this.__defaultGridCount;
    }

    if (newGridCount !== currentGridCount) {
      this.style.setProperty("--content-listing-grid-count", newGridCount);
    }
  }
}

globalThis.customElements.define(ContentListing.tag, ContentListing);
export { ContentListing };
