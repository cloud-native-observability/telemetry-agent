var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else
        for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "https://unpkg.com/lit@2.0.2?module";
import { customElement, property } from "https://unpkg.com/lit@2.0.2/decorators.js?module";
import { classMap } from "https://unpkg.com/lit@2.0.2/directives/class-map.js?module";
import { unsafeHTML } from "https://unpkg.com/lit@2.0.2/directives/unsafe-html.js?module";
import "https://unpkg.com/@material/mwc-icon@0.25.3?module";
let NinjaAction = class NinjaAction extends LitElement {
    constructor() {
        super();
        this.selected = false;
        /**
         * Display hotkey as separate buttons on UI or as is
         */
        this.hotKeysJoinedView = false;
        this.addEventListener('click', this.click);
    }
    /**
     * Scroll to show element
     */
    ensureInView() {
        requestAnimationFrame(() => this.scrollIntoView({ block: 'nearest' }));
    }
    click() {
        this.dispatchEvent(new CustomEvent('actionsSelected', {
            detail: this.action,
            bubbles: true,
            composed: true }));

    }
    updated(changedProperties) {
        if (changedProperties.has('selected')) {
            if (this.selected) {
                this.ensureInView();
            }
        }
    }
    render() {
        let icon;
        if (this.action.mdIcon) {
            icon = html`<mwc-icon part="ninja-icon" class="ninja-icon">${this.action.mdIcon}</mwc-icon>`;
        } else
        if (this.action.icon) {
            icon = unsafeHTML(this.action.icon || '');
        }
        // const hotkey = this.action.hotkey
        //   ? html`<div class="ninja-hotkey">${this.action.hotkey}</div>`
        //   : '';
        let hotkey;
        if (this.action.hotkey) {
            if (this.hotKeysJoinedView) {
                hotkey = html`<div class="ninja-hotkey">${this.action.hotkey}</div>`;
            } else
            {
                hotkey = this.action.hotkey.
                split('+').
                map(key => html`<div class="ninja-hotkey">${key}</div>`);
            }
        }
        const classes = {
            selected: this.selected,
            'ninja-action': true };

        return html`
      <div class="ninja-action" part="ninja-action ${this.selected ? 'ninja-selected' : ''}" class=${classMap(classes)}>
        ${icon}
        <div class="ninja-title">${this.action.title}</div>
        ${hotkey}
      </div>
    `;
    }};

NinjaAction.styles = css`
    :host {
      display: flex;
      width: 100%;
    }
    .ninja-action {
      padding: 0.75em 1em;
      display: flex;
      border-left: 2px solid transparent;
      align-items: center;
      justify-content: start;
      outline: none;
      transition: color 0s ease 0s;
      width: 100%;
    }
    .ninja-action.selected {
      cursor: pointer;
      color: var(--ninja-selected-text-color);
      background-color: var(--ninja-selected-background);
      border-left: 2px solid var(--ninja-accent-color);
      outline: none;
    }
    .ninja-action.selected .ninja-icon {
      color: var(--ninja-selected-text-color);
    }
    .ninja-icon {
      font-size: var(--ninja-icon-size);
      max-width: var(--ninja-icon-size);
      max-height: var(--ninja-icon-size);
      margin-right: 1em;
      color: var(--ninja-icon-color);
      margin-right: 1em;
      position: relative;
    }

    .ninja-title {
      flex-shrink: 0.01;
      margin-right: 0.5em;
      flex-grow: 1;
      font-size: 0.8125em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ninja-hotkeys {
      margin-left: 0.5em;
      flex-shrink: 0;
      width: min-content;
    }

    .ninja-hotkey {
      background: var(--ninja-secondary-background-color);
      padding: 0.06em 0.25em;
      border-radius: var(--ninja-key-border-radius);
      text-transform: capitalize;
      color: var(--ninja-secondary-text-color);
      font-size: 0.75em;
      margin-left: 0.5em;
    }
  `;
__decorate([
        property({ type: Object })],
    NinjaAction.prototype, "action", void 0);
__decorate([
        property({ type: Boolean })],
    NinjaAction.prototype, "selected", void 0);
__decorate([
        property({ type: Boolean })],
    NinjaAction.prototype, "hotKeysJoinedView", void 0);
NinjaAction = __decorate([
        customElement('ninja-action')],
    NinjaAction);
export { NinjaAction };