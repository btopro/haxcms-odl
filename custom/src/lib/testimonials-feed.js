import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

class TestimonialsFeed extends DDD {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          --theme-color-1: #363533;
          --theme-color-2: #e2801e;
          --theme-color-3: #f5f5f5;
          --theme-color-4: #fff;
        }
        h2 {
          margin: 0;
          color: var(--theme-color-4);
          font-size: var(--ddd-font-size-l, 40px);
          font-weight: var(--ddd-font-weight-normal, normal);
        }
        #highlights_feed_wrap {
          margin: var(--ddd-spacing-5, 20px);
        }
        .feed_header {
          background-color: var(--theme-color-2);
          display: flex;
          justify-content: center;
          margin-bottom: var(--ddd-spacing-5, 20px);
          padding: var(--ddd-spacing-2, 5px);
        }
      `,
    ];
  }
  render() {
    return html`
      <div id="highlights_feed_wrap">
        <div class="feed_header">
          <h2>Testimonials</h2>
        </div>
        <slot></slot>
      </div>
    `;
  }
  static get tag() {
    return "testimonials-feed";
  }
}
globalThis.customElements.define(TestimonialsFeed.tag, TestimonialsFeed);
export { TestimonialsFeed };
