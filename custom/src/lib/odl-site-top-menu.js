/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { css } from "lit";
import { SiteTopMenu } from "@haxtheweb/haxcms-elements/lib/ui-components/navigation/site-top-menu.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
/**
 * `odl-site-top-menu`
 * `ODL custom site top menu — filters out service pages from the nav`
 *
 * @customElement
 * @demo demo/index.html
 */
class OdlSiteTopMenu extends SiteTopMenu {
  static get tag() {
    return "odl-site-top-menu";
  }

  constructor() {
    super();
    // Default slugs to exclude from the top menu. Can be overridden via
    // site.json metadata.theme.variables.excludedMenuSlugs.
    this.__defaultExcludedSlugs = [
      "syllabi",
      "spotlight",
      "coursemanagement",
      "lab",
      "pedagogy",
      "multimedia",
      "contingency",
      "search",
      "faqs",
      "demos"
    ];
    this.__excludedSlugs = [...this.__defaultExcludedSlugs];
    // Watch the manifest for excludedMenuSlugs override
    this.__menuDisposer = autorun(() => {
      const manifest = toJS(store.manifest);
      if (
        manifest &&
        manifest.metadata &&
        manifest.metadata.theme &&
        manifest.metadata.theme.variables &&
        Array.isArray(manifest.metadata.theme.variables.excludedMenuSlugs)
      ) {
        this.__excludedSlugs =
          manifest.metadata.theme.variables.excludedMenuSlugs;
      }
    });
  }

  disconnectedCallback() {
    if (this.__menuDisposer) {
      this.__menuDisposer();
    }
    super.disconnectedCallback();
  }

  /**
   * Override __resultChanged to filter out excluded slugs AFTER the
   * site-query returns items. This is more reliable than trying to
   * pass complex conditions through the inherited SiteTopMenu's
   * internal site-query.
   */
  __resultChanged(e) {
    if (e.detail && e.detail.value) {
      this.__items = e.detail.value.filter((item) => {
        return !this.__excludedSlugs.includes(item.slug);
      });
    } else {
      this.__items = [];
    }
  }

  static get styles() {
    return [
      super.styles,
      css`
        #indicator {
          z-index: 99;
        }
      `,
    ];
  }
}

globalThis.customElements.define(OdlSiteTopMenu.tag, OdlSiteTopMenu);
export { OdlSiteTopMenu };
