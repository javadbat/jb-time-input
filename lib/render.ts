import { i18n } from "jb-core/i18n";
import { dictionary } from "./i18n";

export function renderHTML(): string {
  return /* html */ `
  <div class="jb-time-input-web-component">
    <jb-input disable-auto-validation></jb-input>
    <jb-popover >
        <jb-time-picker tabindex="0"></jb-time-picker>
        <button class="close-time-picker-button">${dictionary.get(i18n,"close")}</button>
    </jb-popover>
  </div>
  `;
}