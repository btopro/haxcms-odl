/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { css } from "lit";
import { SiteTopMenu } from "@haxtheweb/haxcms-elements/lib/ui-components/navigation/site-top-menu.js";
/**
 * `odl-site-top-menu`
 * `ODL custom site top menu — thin wrapper over SiteTopMenu adding indicator z-index`
 *
 * @customElement
 * @demo demo/index.html
 */
class OdlSiteTopMenu extends SiteTopMenu {
  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "odl-site-top-menu";
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
