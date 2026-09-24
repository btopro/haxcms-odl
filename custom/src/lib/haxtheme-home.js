import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "@haxtheweb/haxcms-elements/lib/ui-components/query/site-query.js";
import "./homepage-banner.js";
import "./info-box.js";
import "./news-feed.js";
import "./videos-feed.js";
import "./testimonials-feed.js";
import "./page-feature.js";
import "./content-listing.js";
import "./odl-promo-tile.js";

class HaxThemeHome extends DDD {
  static get tag() {
    return "haxtheme-home";
  }

  static get properties() {
    return {
      ...(super.properties || {}),
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
      __newsitems: { type: Array },
      __spotlightitems: { type: Array },
    };
  }

  constructor() {
    super();
    this.editMode = false;
    this.__newsitems = [];
    this.__spotlightitems = [];
    this.__newsitemsChanged = this.__newsitemsChanged.bind(this);
    this.__spotlightitemsChanged = this.__spotlightitemsChanged.bind(this);
    // Stable condition/sort objects so site-query doesn't see a new
    // reference each render (which would cause an infinite re-query loop).
    this.__newsConditions = { "metadata.type": "news" };
    this.__newsSort = { order: "ASC" };
    this.__spotlightConditions = { "metadata.type": "spotlight" };
    this.__spotlightSort = { order: "DES" };
    this.__disposer = autorun(() => {
      this.editMode = toJS(store.editMode);
    });
  }

  disconnectedCallback() {
    this.__disposer();
    super.disconnectedCallback();
  }

  __newsitemsChanged(e) {
    this.__newsitems = e.detail.value;
  }

  __spotlightitemsChanged(e) {
    this.__spotlightitems = e.detail.value;
  }

  static get styles() {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
          --theme-color-1: #363533;
          --theme-color-2: #e2801e;
          --theme-color-3: #f5f5f5;
          --theme-color-4: #fff;
        }
        :host([edit-mode]) #slot {
          display: none;
        }
        info-box#about {
          margin: 80px 0 15px 0;
        }
        @media screen and (max-width: 768px) {
          info-box#about {
            margin: 40px 0 0 0;
          }
        }
        odl-promo-tile {
          --button-hover-color: none;
        }
        #promo_tile_wrap {
          display: grid;
          grid-template-columns: repeat(5, auto);
          border-top: solid;
          border-top-width: 20px;
          border-top-color: var(--theme-color-1);
        }
        @media screen and (max-width: 768px) {
          #promo_tile_wrap {
            border-top: none;
          }
        }
        @media screen and (max-width: 1330px) {
          #promo_tile_wrap {
            grid-template-columns: repeat(2, auto);
          }
        }
        @media screen and (max-width: 768px) {
          #promo_tile_wrap {
            grid-template-columns: repeat(1, auto);
          }
        }
        @media screen and (max-width: 1124px) {
          #promo_tile_wrap {
            padding: 0;
          }
        }
        @media screen and (max-width: 1124px) {
          page-feature {
            width: 100%;
            border-bottom: solid 2px #dcdcdc;
            margin-left: auto;
            margin-right: auto;
          }
        }
        @media screen and (max-width: 768px) {
          page-feature {
            width: 94%;
          }
        }
        body.dark-mode #promo_tile_wrap {
          border-top-color: light-dark(#363533, #f5f5f5);
        }
        @media (prefers-color-scheme: dark) {
          #promo_tile_wrap {
            border-top-color: #f5f5f5;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <homepage-banner
        image="files/theme-images/page-banners/odl_homepage_banner.jpg"
        alt="students receiving instruction in classroom"
        text="A Creative Studio for your Classroom"
      ></homepage-banner>
      <info-box id="about" title="What We Do" url="about">
        <span slot="action_text">
          The Office of Digital Learning (ODL) helps faculty and students make
          the most of digital learning technology. We collaboratively design and
          build tools for any pedagogy; dream it and we will build it.
        </span>
      </info-box>
      <div id="promo_tile_wrap">
        <div class="promo_tile">
          <odl-promo-tile
            title="Course Management"
            label="Create"
            image="files/theme-images/promo-tiles/icontest5.jpg"
            alt="NGDLE stands for: Next Generation Learning Environment."
            url="coursemanagement"
          >
            Create and deliver course content using systems designed to empower
            instructors.
          </odl-promo-tile>
        </div>
        <div class="promo_tile">
          <odl-promo-tile
            title="Innovation Lab"
            label="Explore"
            image="files/theme-images/promo-tiles/icontest4.jpg"
            alt=""
            url="lab"
          >
            We're always exploring, testing, and sharing new technologies; step
            into our innovation lab and see what we've been up to.
          </odl-promo-tile>
        </div>
        <div class="promo_tile">
          <odl-promo-tile
            title="Pedagogy"
            label="Learn"
            image="files/theme-images/promo-tiles/icontest8.jpg"
            alt=""
            url="pedagogy"
          >
            Instructional methods used to convey learning objectives. Work with
            us to discover creative ways to implement pedagogy into your
            instruction.
          </odl-promo-tile>
        </div>
        <div class="promo_tile">
          <odl-promo-tile
            title="Multimedia"
            label="Create"
            image="files/theme-images/promo-tiles/icontest10.jpg"
            alt=""
            url="multimedia"
          >
            Work with experts to create instructional videos, high-fidelity
            graphics, virtual reality assets, and more.
          </odl-promo-tile>
        </div>
      </div>
      <div class="page_feature">
        <site-query
          .conditions=${this.__newsConditions}
          limit="1"
          .sort=${this.__newsSort}
          @result-changed=${this.__newsitemsChanged}
        ></site-query>
        ${this.__newsitems.map(
          (item) => html`
            <page-feature
              title="Top News"
              subtitle=${item.title}
              info=${item.metadata.author}
              url=${item.slug}
              image=${item.metadata.fields.image}
              alt=${item.metadata.fields.imageAlt}
            >
              ${item.description}
            </page-feature>
          `,
        )}
      </div>
      <div id="news_feed">
        <news-feed></news-feed>
      </div>
      <div class="page_feature">
        <site-query
          .conditions=${this.__spotlightConditions}
          limit="1"
          .sort=${this.__spotlightSort}
          @result-changed=${this.__spotlightitemsChanged}
        ></site-query>
        ${this.__spotlightitems.map(
          (item) => html`
            <page-feature
              title="Faculty Spotlight"
              subtitle=${item.metadata.fields.name}
              info=${item.metadata.fields.jobTitle}
              url=${item.slug}
              image=${item.metadata.fields.image}
              alt=${item.metadata.fields.imageAlt}
            >
              ${item.description}
            </page-feature>
          `,
        )}
      </div>
      <div id="videos_feed">
        <videos-feed></videos-feed>
      </div>
      <div id="courses">
        <content-listing
          title="Courses"
          image="files/feature-images/course-select.jpg"
          alt="Student with a question raising hand in class surrounded by other students."
          condition='{"metadata.type": "course"}'
          location="metadata.fields.subject"
        ></content-listing>
      </div>
    `;
  }
}
globalThis.customElements.define(HaxThemeHome.tag, HaxThemeHome);
export { HaxThemeHome };
