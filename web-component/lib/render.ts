import { i18n } from "jb-core/i18n";
import { dictionary } from "./i18n";

export function renderHTML(): string {
  return /* html */ `
  <div class="jb-time-input-web-component" part="wrapper">
    <jb-input disable-auto-validation part="input" exportparts="label, input-box, input, message"></jb-input>
    <jb-popover part="popover" exportparts="content: popover-content">
        <jb-time-picker tabindex="0" part="time-picker" exportparts="wrapper: picker-wrapper, clock, outer-circle, inner-circle, time-indicators: picker-time-indicators, time-text: picker-time-text, hour-text: picker-hour-text, minute-text: picker-minute-text, second-text: picker-second-text"></jb-time-picker>
        <button class="close-time-picker-button" part="close-button">${dictionary.get(i18n,"close")}</button>
    </jb-popover>
  </div>
  `;
}
