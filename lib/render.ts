import { i18n } from "jb-core/i18n";
import { dictionary } from "./i18n";

export function renderHTML(): string {
  return /* html */ `
  <div class="jb-time-input-web-component" part="wrapper">
    <jb-input disable-auto-validation part="input"></jb-input>
    <jb-popover part="popover">
        <jb-time-picker tabindex="0" part="time-picker"></jb-time-picker>
        <button class="close-time-picker-button" part="close-button">${dictionary.get(i18n,"close")}</button>
    </jb-popover>
  </div>
  `;
}
