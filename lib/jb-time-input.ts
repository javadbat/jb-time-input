import HTML from "./jb-time-input.html";
import CSS from "./jb-time-input.scss";
import "jb-time-picker";
import "jb-input";
import 'jb-popover';
// eslint-disable-next-line no-duplicate-imports
import { type JBInputWebComponent } from "jb-input";
// eslint-disable-next-line no-duplicate-imports
import { type JBTimePickerWebComponent } from "jb-time-picker";
import { type JBTimeInputElements, type JBTimeInputValidationValue, } from "./types";
import { type JBTimePickerValueObject, type TimeUnitsString, type SecondRange } from "jb-time-picker/types";
import { type WithValidation } from "jb-validation/types";
import { ValidationHelper } from "jb-validation";
import { type JBInputValue } from "jb-input/types";
import { enToFaDigits, faToEnDigits } from "../../../common/scripts/persian-helper";

export class JBTimeInputWebComponent extends HTMLElement implements WithValidation<JBTimeInputValidationValue> {
  static get formAssociated() {
    return true;
  }
  elements: JBTimeInputElements;
  get value() {
    return this.elements.input.value;
  }
  set value(value) {
    const isValid = this.#checkTimeFormatValidation(value);
    if (isValid) {
      this.elements.input.value = value;
      if (this.#internals) {
        this.#internals.setFormValue(value);
      }
    }
  }
  /**
 * @description will determine if component trigger jb-validation mechanism automatically on user event or it just let user-developer handle validation mechanism by himself
 */
  get isAutoValidationDisabled(): boolean {
    //currently we only support disable-validation in attribute and only in initiate time but later we can add support for change of this
    
    return (this.getAttribute('disable-auto-validation') === '' || this.getAttribute('disable-auto-validation') === 'true' ? true : false);
  }
  #checkValidity(showError:boolean){
    if(!this.isAutoValidationDisabled){
      return this.#validation.checkValidity(showError);
    }
  }
  #validation = new ValidationHelper<JBTimeInputValidationValue>(this.showValidationError.bind(this), this.clearValidationError.bind(this), ()=>this.#getValidationValue(), () => this.value, () => []);
  get validation() {
    return this.#validation;
  }
  get #inputRanges() {
    let dividerRange = [2];
    const hourRange = [0, 1];
    const minuteRange = [3, 4];
    let secondRange: SecondRange = [null, null];
    let maxCaretPos = 4;
    if (this.secondEnabled) {
      secondRange = [6, 7];
      dividerRange = [2, 5];
      maxCaretPos = 7;
    }
    return { dividerRange, hourRange, minuteRange, secondRange, maxCaretPos };
  }
  /**
   * @description return hour in string base on input value
   */
  get hourString(): string {
    const val = this.elements.input.value.slice(
      this.#inputRanges.hourRange[0],
      this.#inputRanges.hourRange[1] + 1
    );
    return val;
  }
  /**
   *
   * @return {Number} return hour in number base on input value
   * @memberof JBTimeInputWebComponent
   */
  get hour(): number {
    let val = this.hourString;
    if (isNaN(Number(val))) {
      val = "0";
    }
    return Number(val);
  }

  set hour(value: number) {
    if (this.hour !== value) {
      let hour = value;
      if (hour < 0) {
        hour = 0;
      }
      if (hour > 24) {
        hour = 24;
      }
      const hourString = hour > 9 ? `${hour}` : `0${hour}`;
      this.elements.input.value = `${hourString}${this.elements.input.value.slice(
        this.#inputRanges.hourRange[1] + 1
      )}`;
      this.updateTimePickerValue(hour, this.minute, this.second);
    }
  }
  /**
   * @description return minute in string base on input value
   */
  get minuteString(): string {
    const val = this.elements.input.value.slice(
      this.#inputRanges.minuteRange[0],
      this.#inputRanges.minuteRange[1] + 1
    );
    return val;
  }
  /**
   *
   * @description return minute in number. base on input value
   */
  get minute(): number {
    let val = this.minuteString;
    if (isNaN(Number(val))) {
      val = "0";
    }
    return parseInt(val);
  }
  set minute(value: number) {
    if (this.minute !== value) {
      let minute = value;
      if (minute < 0) {
        minute = 0;
      }
      if (minute > 59) {
        minute = 59;
      }
      const minuteString = minute > 9 ? `${minute}` : `0${minute}`;
      this.elements.input.value = `${this.elements.input.value.slice(
        0,
        this.#inputRanges.minuteRange[0]
      )}${minuteString}${this.elements.input.value.slice(
        this.#inputRanges.minuteRange[1] + 1
      )}`;
      this.updateTimePickerValue(this.hour, minute, this.second);
    }
  }
  /**
   * @description return minute in string base on input value
   */
  get secondString(): string {
    if (
      this.#inputRanges.secondRange[0] !== null &&
      this.#inputRanges.secondRange[1] !== null
    ) {
      const val = this.elements.input.value.slice(
        this.#inputRanges.secondRange[0],
        this.#inputRanges.secondRange[1] + 1
      );
      return val;
    }
    return "";
  }
  /**
   *
   * @description second in number. base on input value
   */
  get second(): number | null {
    if (this.secondEnabled) {
      let val = this.secondString;
      if (isNaN(Number(val))) {
        val = "0";
      }
      return parseInt(val);
    }
    return null;
  }
  set second(value: string | number | null) {
    if (this.secondEnabled && value !== null) {
      if (this.second !== value) {
        let second = Math.floor(Number(value));
        if (second < 0) {
          second = 0;
        }
        if (second > 59) {
          second = 59;
        }
        const secondString = second > 9 ? `${second}` : `0${second}`;
        if (this.#inputRanges.secondRange[0]) {
          this.elements.input.value = `${this.elements.input.value.slice(
            0,
            this.#inputRanges.secondRange[0]
          )}${secondString}`;
          this.updateTimePickerValue(this.hour, this.minute, second);
        }
      }
    }
  }
  #showTimePicker = false;
  get showTimePicker() {
    return this.#showTimePicker;
  }
  set showTimePicker(value) {
    this.#showTimePicker = value;
    if (value == true) {
      this.elements.timePicker.wrapper.open();
    } else {
      this.elements.timePicker.wrapper.close();
    }
  }
  #secondEnabled = true;
  get secondEnabled() {
    return this.#secondEnabled;
  }
  set secondEnabled(value) {
    if (typeof value == "boolean") {
      this.#secondEnabled = value;
      this.elements.timePicker.component.secondEnabled = value;
      if (value == false) {
        this.#disableSecond();
      } else {
        this.#enableSecond();
      }
    }
  }
  //will show persian number even if user type en number but value will be passed as en number
  #showPersianNumber = false;
  get showPersianNumber() {
    return this.#showPersianNumber;
  }
  set showPersianNumber(value: boolean) {
    this.#showPersianNumber = Boolean(value);
    this.elements.timePicker.component.showPersianNumber = value;
    this.value = `${this.value}`;
  }
  #internals: ElementInternals | null = null;
  #valueOnInputFocus: string | null = null;
  set optionalUnits(value: TimeUnitsString[]) {
    this.elements.timePicker.component.optionalUnits = value;
  }
  get optionalUnits() {
    return this.elements.timePicker.component.optionalUnits;
  }
  set frontalZero(value: boolean) {
    this.elements.timePicker.component.frontalZero = value;
  }
  get frontalZero() {
    return this.elements.timePicker.component.frontalZero;
  }
  constructor() {
    super();
    if (typeof this.attachInternals == "function") {
      //some browser dont support attachInternals
      this.#internals = this.attachInternals();
    }
    this.#initWebComponent();
  }
  connectedCallback() {
    // standard web component event that called when all of dom is bounded
    this.#callOnLoadEvent();
    this.#initProp();
    this.#callOnInitEvent();
  }
  #callOnLoadEvent() {
    const event = new CustomEvent("load", { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  #callOnInitEvent() {
    const event = new CustomEvent("init", { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  #initWebComponent() {
    const shadowRoot = this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
    const html = `<style>${CSS}</style>` + "\n" + HTML;
    const element = document.createElement("template");
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.elements = {
      input: shadowRoot.querySelector("jb-input")!,
      timePicker: {
        wrapper: shadowRoot.querySelector("jb-popover")!,
        component: shadowRoot.querySelector("jb-time-picker")!,
        closeButton: shadowRoot.querySelector(".close-time-picker-button")!,
      },
    };
    this.#registerEventListener();
  }
  #registerEventListener() {
    this.elements.input.addEventListener("keydown", this.#onInputKeyDown.bind(this));
    this.elements.input.addEventListener("keyup", this.#onInputKeyup.bind(this));
    this.elements.input.addEventListener("change", this.#onInputChange.bind(this));
    this.elements.input.addEventListener("keypress", this.#onInputKeyPress.bind(this));
    this.elements.input.addEventListener("beforeinput", this.#onInputBeforeInput.bind(this), {});
    this.elements.input.addEventListener("focus", this.#onInputFocus.bind(this));
    this.elements.input.addEventListener("blur", this.#onInputBlur.bind(this));
    this.elements.timePicker.component.addEventListener("change", this.#onTimePickerChange.bind(this));
    this.elements.timePicker.closeButton.addEventListener("click", () => { this.showTimePicker = false; });
    this.elements.timePicker.component.addEventListener("blur", this.#onTimePickerBlur.bind(this));
  }
  #initProp() {
    //set initial value to input
    this.#resetInputValue();
    this.elements.input.addEventListener('init',()=>{
      this.elements.input.addStandardValueCallback(this.#standardTimeValue.bind(this));
    });
  }
  #resetInputValue() {
    const value = "00:00";
    if (this.secondEnabled) {
      value.concat(":00");
    }
    this.value = value;
  }
  static get observedAttributes() {
    return [
      "label",
      "message",
      "value",
      "name",
      "close-button-text",
      "frontal-zero",
    ];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // do something when an attribute has changed
    this.#onAttributeChange(name, newValue);
  }
  #onAttributeChange(name: string, value: string) {
    switch (name) {
      case "label":
        this.elements.input.setAttribute('label', value);
        break;
      case "message":
        this.elements.input.setAttribute("message", value);
        break;
      case "value":
        this.value = value;
        break;
      case "name":
        this.elements.input.setAttribute("name", value);
        break;
      case "close-button-text":
        this.elements.timePicker.closeButton.innerHTML = value;
        break;
      case "frontal-zero":
        this.frontalZero = Boolean(value);
    }
  }
  #standardTimeValue(inputtedString: string, oldValue: JBInputValue, prevResult: JBInputValue): JBInputValue {
    let displayValue = inputtedString;
    if(this.showPersianNumber){
      displayValue = enToFaDigits(displayValue);
    }
    return {
      displayValue,
      value:inputtedString
    };
  }
  /**
   * @public 
   * @description add given number to hour (you can provide negative value for subtract)
   */
  addHour(interval: number) {
    const hour = this.hour + interval;
    this.hour = hour;
  }
  /**
   * @public 
   * @description add given number to minute (you can provide negative value for subtract)
   */
  addMinute(interval: number) {
    const minute = this.minute + interval;
    this.minute = minute;
  }
  /**
   * @public 
   * @description add given number to second (you can provide negative value for subtract)
   */
  addSecond(interval: number) {
    const second = (this.second || 0) + interval;
    this.second = second;
  }
  #inputChar(char: string, pos: number) {
    const { dividerRange, hourRange, minuteRange, secondRange } =
      this.#inputRanges;
    if (dividerRange.includes(pos)) {
      pos++;
      if (char == ":") {
        return;
      }
    }
    if (hourRange[0] == pos) {
      const tailChar = isNaN(Number(this.elements.input.value[hourRange[1]]))
        ? "0"
        : this.elements.input.value[hourRange[1]];
      this.hour = parseInt(char + tailChar);
      return;
    }
    if (hourRange[1] == pos) {
      const headChar = isNaN(Number(this.elements.input.value[hourRange[0]]))
        ? "0"
        : this.elements.input.value[hourRange[0]];
      this.hour = parseInt(headChar + char);
    }
    if (minuteRange[0] == pos) {
      const tailChar = isNaN(Number(this.elements.input.value[minuteRange[1]]))
        ? "0"
        : this.elements.input.value[minuteRange[1]];
      this.minute = parseInt(char + tailChar);
      return;
    }
    if (minuteRange[1] == pos) {
      const headChar = isNaN(Number(this.elements.input.value[minuteRange[0]]))
        ? "0"
        : this.elements.input.value[minuteRange[0]];
      this.minute = parseInt(headChar + char);
    }
    if (this.secondEnabled) {
      if (secondRange[0] == pos && secondRange[1] !== null) {
        const tailChar = isNaN(
          Number(this.elements.input.value[secondRange[1]])
        )
          ? "0"
          : this.elements.input.value[secondRange[1]];
        this.second = parseInt(char + tailChar);
        return;
      }
      if (secondRange[1] == pos && secondRange[0] !== null) {
        const headChar = isNaN(
          Number(this.elements.input.value[secondRange[0]])
        )
          ? "0"
          : this.elements.input.value[secondRange[0]];
        this.second = parseInt(headChar + char);
      }
    }
  }
  #onInputKeyDown(e: KeyboardEvent) {
    
    const {hourRange, minuteRange, secondRange } = this.#inputRanges;
    const caretPos = (e.target! as HTMLInputElement).selectionStart;
    if (e.keyCode == 38 || e.keyCode == 40) {
      //on up key and down key
      let interval = 0;
      if (e.keyCode == 38) {
        interval = 1;
        
      }
      if (e.keyCode == 40) {
        interval = -1;
      }
    
      // we use this [...hourRange,hourRange[1]+1] becuase we want up key work if carret was after the last number too like this=> 12|:39:43
      if (caretPos !== null && caretPos !== undefined && [...hourRange, hourRange[1] + 1].includes(caretPos)) {
        this.elements.timePicker.component.setTimeUnitFocus("hour");
        this.addHour(interval);
        this.elements.input.setSelectionRange(hourRange[0], hourRange[1] + 1);
      }
      if (caretPos && [...minuteRange, minuteRange[1] + 1].includes(caretPos)) {
        this.elements.timePicker.component.setTimeUnitFocus("minute");
        this.addMinute(interval);
        this.elements.input.setSelectionRange(minuteRange[0],minuteRange[1] + 1);
      }
      if (
        this.secondEnabled &&
        secondRange[1] !== null &&
        [...secondRange, secondRange[1] + 1].includes(caretPos)
      ) {
        this.elements.timePicker.component.setTimeUnitFocus("second");
        this.addSecond(interval);
        this.elements.input.setSelectionRange(secondRange[0],secondRange[1] + 1);
      }

      e.preventDefault();
    }
    this.#callOnKeyDownEvent(e);
  }
  #callOnKeyDownEvent(e: KeyboardEvent) {
    const keyDownInitObj: KeyboardEventInit = {
      ...e,
      cancelable: false
    };
    const event = new KeyboardEvent("keydown", keyDownInitObj);
    this.dispatchEvent(event);
  }
  #onInputInput(e:InputEvent){
    this.#checkValidity(false);
    this.#dispatchInputEvent(e);
  }
  #dispatchInputEvent(e:InputEvent){
    //TODO: make it cancellable and fake it more because it raise from before input actually
    const initObj:InputEventInit = {
      ...e,
      cancelable:false
    };
    const event = new InputEvent('input',initObj);
    this.dispatchEvent(event);
  }
  #onInputBeforeInput(e: InputEvent) {
    const target = e.target as JBInputWebComponent;
    let caretPos = target.selectionStart || 0;
    const { dividerRange, hourRange, minuteRange, secondRange, maxCaretPos } = this.#inputRanges;
    const actionPerChar = (inputtedChar: string) => {
      if (!Number.isNaN(Number(inputtedChar))) {
        if (dividerRange.includes(caretPos)) {
          caretPos++;
          target.setSelectionRange(caretPos, caretPos);
        }
        if (caretPos > maxCaretPos) {
          caretPos = maxCaretPos;
        }
        //first we must see what is the inputted char hour or  minute or second
        //handle hour
        if (hourRange.includes(caretPos)) {
          this.elements.timePicker.component.setTimeUnitFocus("hour");
          if (caretPos == hourRange[0]) {
            if (inputtedChar > "2") {
              this.hour = Number(inputtedChar);
              caretPos++;
            } else {
              const tailNum: string = isNaN(
                Number(this.elements.input.value[hourRange[1]])
              )
                ? "0"
                : this.elements.input.value[hourRange[1]];
              this.hour = parseInt(inputtedChar + tailNum);
            }
          } else {
            if (
              inputtedChar > "4" &&
              this.elements.input.value[hourRange[0]] == "2"
            ) {
              inputtedChar = "4";
            }
            const headChar: string = isNaN(
              Number(this.elements.input.value[hourRange[0]])
            )
              ? "0"
              : this.elements.input.value[hourRange[0]];
            this.hour = parseInt(headChar + inputtedChar);
          }
        }
        //handle minute
        if (minuteRange.includes(caretPos)) {
          this.elements.timePicker.component.setTimeUnitFocus("minute");
          if (caretPos == minuteRange[0]) {
            if (inputtedChar > "5") {
              this.#inputChar("0", caretPos);
              caretPos++;
            }
          }
          this.#inputChar(inputtedChar, caretPos);
        }
        //handle second
        if (this.secondEnabled && secondRange.includes(caretPos)) {
          this.elements.timePicker.component.setTimeUnitFocus("second");
          if (caretPos == secondRange[0]) {
            if (inputtedChar > "5") {
              this.#inputChar("0", caretPos);
              caretPos++;
            }
          }
          this.#inputChar(inputtedChar, caretPos);
        }
      }
    };
    const inputtedString = faToEnDigits(e.data);
    if (['deleteContentBackward', 'deleteContentForward', 'delete', 'deleteByCut', 'deleteByDrag'].includes(e.inputType)) {
      //in delete mode
      if (caretPos == null || caretPos == 0) {
        return;
      }
      // we map to x+1 because carrot is after ":" on back space
      if (!dividerRange.map((x) => x + 1).includes(caretPos)) {
        this.#inputChar("0", caretPos - 1);
      }
      (e.target as HTMLInputElement).setSelectionRange(caretPos - 1, caretPos - 1);
      e.preventDefault();
    } else if (typeof inputtedString == "string") {
      //in insert mode
      if (e.inputType == "insertText") {
        for (const char of inputtedString) {
          actionPerChar(char);
        }
        target.setSelectionRange(caretPos + 1, caretPos + 1);
        e.preventDefault();
      }
      if (e.inputType == "insertFromPaste") {
        this.#handlePaste(inputtedString);
        e.preventDefault();
      }
    }
    //because we prevent default in every scenario we have to call input event manually 
    this.#onInputInput(e);
  }
  /**@description handle paste on beforeInput */
  #handlePaste(pastedValue: string) {
    const selectionStart = this.elements.input.selectionStart;
    const { maxCaretPos } = this.#inputRanges;
    const allowedPasteLength = (maxCaretPos + 1) - selectionStart;
    const replaceValue = pastedValue.replace(/[^0-9:]/g, "").slice(0, allowedPasteLength);
    replaceValue.split('').forEach((char, i) => {
      this.#inputChar(char, selectionStart + i);
    });
  }

  #onInputKeyPress(e: KeyboardEvent) {
    this.#dispatchOnKeyPressEvent(e);
  }
  #dispatchOnKeyPressEvent(e: KeyboardEvent) {
    const keyPressInitObj: KeyboardEventInit = {
      ...e,
      cancelable: false
    };
    const event = new KeyboardEvent("keypress", keyPressInitObj);
    this.dispatchEvent(event);
  }
  #onInputKeyup(e: KeyboardEvent) {
    const keyUpInitObj: KeyboardEventInit = {
      ...e,
      cancelable: false
    };
    const event = new KeyboardEvent("keyup", keyUpInitObj);
    this.dispatchEvent(event);
    if (e.keyCode == 13) {
      this.#onInputEnter();
    }
  }
  #onInputEnter() {
    const event = new CustomEvent("enter");
    this.dispatchEvent(event);
  }
  #onInputChange() {
    const inputText = this.value;
    this.#checkValidity(true);
    const isTimeValid = this.#checkTimeFormatValidation(inputText);
    //TODO: add on paste so component handle paste more smartly
    if (!isTimeValid) {
      if (this.#valueOnInputFocus) {
        this.value = this.#valueOnInputFocus;
      } else {
        this.#resetInputValue();
      }
    }
    // to prevent onChange call twice
    this.#valueOnInputFocus = this.value;
    //TODO: check  if this works without call
    // const validationResult = this.triggerInputValidation(true);
    const event = new Event("change");
    this.dispatchEvent(event);
  }
  #onInputFocus(e: FocusEvent) {
    this.#valueOnInputFocus = this.value;
    this.showTimePicker = true;
    const event = new FocusEvent("focus",{...e});
    this.dispatchEvent(event);
  }
  #onInputBlur(e: FocusEvent) {
    const focusedElement = e.relatedTarget;
    if (focusedElement !== this.elements.timePicker.component) {
      this.showTimePicker = false;
    }
    //TODO:check if this works without call
    // this.triggerInputValidation(true);
    if (this.#valueOnInputFocus !== this.value) {
      this.#onInputChange();
    }
    const event = new FocusEvent("blur");
    this.dispatchEvent(event);
  }

  /**
   * @description check if time is in proper format of time
   */
  #checkTimeFormatValidation(text: string) {
    let validationRegex: RegExp | null;
    if (this.secondEnabled) {
      validationRegex =
        /^(?<hour>[01]\d|[2][01234]):(?<minute>[012345]\d):(?<second>[012345]\d)$/g;
    } else {
      validationRegex = /^(?<hour>[01]\d|[2][01234]):(?<minute>[012345]\d)$/g;
    }
    const result = validationRegex.test(text);
    return result;
  }
  showValidationError(error: string) {
    this.elements.input.showValidationError(error);
  }
  clearValidationError() {
    this.elements.input.clearValidationError();
  }
  /**
   * @public
   */
  focus() {
    //public method
    this.elements.input.focus();
  }
  #onTimePickerChange(e: CustomEvent) {
    const { hour, minute, second } = (e.target as JBTimePickerWebComponent).value;
    this.hour = hour;
    this.minute = minute;
    if (this.secondEnabled) {
      this.second = second;
    }
  }
  #onTimePickerBlur(e: FocusEvent) {
    const newFocusedElement = e.relatedTarget;
    if (newFocusedElement !== this.elements.input) {
      this.showTimePicker = false;
      if (this.#valueOnInputFocus !== this.value) {
        this.#onInputChange();
      }
      // call onchnage event
    }
  }
  /**
   * @description assign new value to time picker
   * @public
   */
  updateTimePickerValue(
    hour: number,
    minute: number,
    second: number | null | undefined
  ) {
    const valueObj: JBTimePickerValueObject = {
      hour,
      minute,
    };
    if (this.secondEnabled && second !== undefined && second !== null) {
      valueObj.second = second;
    }
    this.elements.timePicker.component.value = valueObj;
  }
  #disableSecond() {
    //when user dont want second in time
    this.value = `${this.hourString}:${this.minuteString}`;
  }
  #enableSecond() {
    this.value = `${this.hourString}:${this.minuteString}:${this.secondString}`;
  }
  #getValidationValue(): JBTimeInputValidationValue {
    return {
      displayValue: this.elements.input.displayValue,
      value: this.elements.input.value,
      valueObject: {
        hour: this.hour,
        minute: this.minute,
        second: this.second
      }
    };
  }
}
const myElementNotExists = !customElements.get("jb-time-input");
if (myElementNotExists) {
  window.customElements.define("jb-time-input", JBTimeInputWebComponent);
}
