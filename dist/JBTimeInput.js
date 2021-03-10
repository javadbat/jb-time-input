var HTML = "<div class=\"jb-time-input-web-component\">\r\n    <label class=\"--hide\"><span class=\"label-value\"></span><span>:</span></label>\r\n    <div class=\"input-box\">\r\n        <input class=\"time-input\">\r\n    </div>\r\n    <div class=\"message-box\"></div>\r\n</div>";

var css_248z = ".jb-time-input-web-component {\n  width: 100%;\n  margin: var(--jb-time-input-margin, 12px 0); }\n  .jb-time-input-web-component label {\n    width: 100%;\n    margin: 4px 0px;\n    display: block;\n    font-size: var(--jb-time-input-label-font-size, 0.8em);\n    color: #1f1735; }\n    .jb-time-input-web-component label.--hide {\n      display: none; }\n  .jb-time-input-web-component .input-box {\n    width: 100%;\n    box-sizing: border-box;\n    height: var(--jb-time-input-height, 40px);\n    border: solid 1px var(--jb-time-input-border-color, #f7f6f6);\n    background-color: var(--jb-time-input-bgcolor, #f7f6f6);\n    border-bottom: solid var(--jb-time-input-border-botton-width, 3px) var(--jb-time-input-border-color, #f7f6f6);\n    border-radius: var(--jb-time-input-border-radius, 16px);\n    margin: 4px 0px;\n    display: block;\n    transition: ease 0.3s all;\n    overflow: hidden;\n    display: flex;\n    justify-content: space-between; }\n    .jb-time-input-web-component .input-box:focus-within {\n      border-color: var(--jb-time-input-border-color-focus, #1e2832); }\n    .jb-time-input-web-component .input-box .time-input {\n      border: none;\n      width: 100%;\n      box-sizing: border-box;\n      height: 100%;\n      background-color: transparent;\n      padding: var(--jb-time-input-input-padding, 2px 12px 0 12px);\n      display: block;\n      font-family: inherit;\n      font-size: var(--jb-time-input-value-font-size, 1.1em);\n      color: var(--jb-time-input-value-color, #1f1735);\n      margin: 0;\n      border-radius: 0;\n      direction: ltr;\n      text-align: right;\n      text-align: -webkit-match-parent;\n      text-align: -moz-match-parent;\n      text-align: match-parent; }\n      .jb-time-input-web-component .input-box .time-input:focus {\n        outline: none; }\n      .jb-time-input-web-component .input-box .time-input::placeholder {\n        color: var(--jb-time-input-placeholder-color, initial);\n        font-size: var(--jb-time-input-placeholder-font-size, 1.1em); }\n    .jb-time-input-web-component .input-box .message-box {\n      font-size: var(--jb-time-input-message-font-size, 0.7em);\n      padding: 2px 8px;\n      color: #929292;\n      display: var(--jb-time-input-message-box-display, block); }\n      .jb-time-input-web-component .input-box .message-box:empty {\n        padding: 0; }\n      .jb-time-input-web-component .input-box .message-box.error {\n        color: var(--jb-time-input-message-error-color, red); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpCVGltZUlucHV0LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsMkNBQTJDLEVBQUU7RUFDN0M7SUFDRSxXQUFXO0lBQ1gsZUFBZTtJQUNmLGNBQWM7SUFDZCxzREFBc0Q7SUFDdEQsY0FBYyxFQUFFO0lBQ2hCO01BQ0UsYUFBYSxFQUFFO0VBQ25CO0lBQ0UsV0FBVztJQUNYLHNCQUFzQjtJQUN0Qix5Q0FBeUM7SUFDekMsNERBQTREO0lBQzVELHVEQUF1RDtJQUN2RCw2R0FBNkc7SUFDN0csdURBQXVEO0lBQ3ZELGVBQWU7SUFDZixjQUFjO0lBQ2QseUJBQXlCO0lBQ3pCLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsOEJBQThCLEVBQUU7SUFDaEM7TUFDRSw4REFBOEQsRUFBRTtJQUNsRTtNQUNFLFlBQVk7TUFDWixXQUFXO01BQ1gsc0JBQXNCO01BQ3RCLFlBQVk7TUFDWiw2QkFBNkI7TUFDN0IsNERBQTREO01BQzVELGNBQWM7TUFDZCxvQkFBb0I7TUFDcEIsc0RBQXNEO01BQ3RELGdEQUFnRDtNQUNoRCxTQUFTO01BQ1QsZ0JBQWdCO01BQ2hCLGNBQWM7TUFDZCxpQkFBaUI7TUFDakIsZ0NBQWdDO01BQ2hDLDZCQUE2QjtNQUM3Qix3QkFBd0IsRUFBRTtNQUMxQjtRQUNFLGFBQWEsRUFBRTtNQUNqQjtRQUNFLHNEQUFzRDtRQUN0RCw0REFBNEQsRUFBRTtJQUNsRTtNQUNFLHdEQUF3RDtNQUN4RCxnQkFBZ0I7TUFDaEIsY0FBYztNQUNkLHdEQUF3RCxFQUFFO01BQzFEO1FBQ0UsVUFBVSxFQUFFO01BQ2Q7UUFDRSxvREFBb0QsRUFBRSIsImZpbGUiOiJKQlRpbWVJbnB1dC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmpiLXRpbWUtaW5wdXQtd2ViLWNvbXBvbmVudCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IHZhcigtLWpiLXRpbWUtaW5wdXQtbWFyZ2luLCAxMnB4IDApOyB9XG4gIC5qYi10aW1lLWlucHV0LXdlYi1jb21wb25lbnQgbGFiZWwge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogNHB4IDBweDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmb250LXNpemU6IHZhcigtLWpiLXRpbWUtaW5wdXQtbGFiZWwtZm9udC1zaXplLCAwLjhlbSk7XG4gICAgY29sb3I6ICMxZjE3MzU7IH1cbiAgICAuamItdGltZS1pbnB1dC13ZWItY29tcG9uZW50IGxhYmVsLi0taGlkZSB7XG4gICAgICBkaXNwbGF5OiBub25lOyB9XG4gIC5qYi10aW1lLWlucHV0LXdlYi1jb21wb25lbnQgLmlucHV0LWJveCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBoZWlnaHQ6IHZhcigtLWpiLXRpbWUtaW5wdXQtaGVpZ2h0LCA0MHB4KTtcbiAgICBib3JkZXI6IHNvbGlkIDFweCB2YXIoLS1qYi10aW1lLWlucHV0LWJvcmRlci1jb2xvciwgI2Y3ZjZmNik7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tamItdGltZS1pbnB1dC1iZ2NvbG9yLCAjZjdmNmY2KTtcbiAgICBib3JkZXItYm90dG9tOiBzb2xpZCB2YXIoLS1qYi10aW1lLWlucHV0LWJvcmRlci1ib3R0b24td2lkdGgsIDNweCkgdmFyKC0tamItdGltZS1pbnB1dC1ib3JkZXItY29sb3IsICNmN2Y2ZjYpO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWpiLXRpbWUtaW5wdXQtYm9yZGVyLXJhZGl1cywgMTZweCk7XG4gICAgbWFyZ2luOiA0cHggMHB4O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRyYW5zaXRpb246IGVhc2UgMC4zcyBhbGw7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxuICAgIC5qYi10aW1lLWlucHV0LXdlYi1jb21wb25lbnQgLmlucHV0LWJveDpmb2N1cy13aXRoaW4ge1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1qYi10aW1lLWlucHV0LWJvcmRlci1jb2xvci1mb2N1cywgIzFlMjgzMik7IH1cbiAgICAuamItdGltZS1pbnB1dC13ZWItY29tcG9uZW50IC5pbnB1dC1ib3ggLnRpbWUtaW5wdXQge1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBwYWRkaW5nOiB2YXIoLS1qYi10aW1lLWlucHV0LWlucHV0LXBhZGRpbmcsIDJweCAxMnB4IDAgMTJweCk7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICAgICAgZm9udC1zaXplOiB2YXIoLS1qYi10aW1lLWlucHV0LXZhbHVlLWZvbnQtc2l6ZSwgMS4xZW0pO1xuICAgICAgY29sb3I6IHZhcigtLWpiLXRpbWUtaW5wdXQtdmFsdWUtY29sb3IsICMxZjE3MzUpO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgIGRpcmVjdGlvbjogbHRyO1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICB0ZXh0LWFsaWduOiAtd2Via2l0LW1hdGNoLXBhcmVudDtcbiAgICAgIHRleHQtYWxpZ246IC1tb3otbWF0Y2gtcGFyZW50O1xuICAgICAgdGV4dC1hbGlnbjogbWF0Y2gtcGFyZW50OyB9XG4gICAgICAuamItdGltZS1pbnB1dC13ZWItY29tcG9uZW50IC5pbnB1dC1ib3ggLnRpbWUtaW5wdXQ6Zm9jdXMge1xuICAgICAgICBvdXRsaW5lOiBub25lOyB9XG4gICAgICAuamItdGltZS1pbnB1dC13ZWItY29tcG9uZW50IC5pbnB1dC1ib3ggLnRpbWUtaW5wdXQ6OnBsYWNlaG9sZGVyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWpiLXRpbWUtaW5wdXQtcGxhY2Vob2xkZXItY29sb3IsIGluaXRpYWwpO1xuICAgICAgICBmb250LXNpemU6IHZhcigtLWpiLXRpbWUtaW5wdXQtcGxhY2Vob2xkZXItZm9udC1zaXplLCAxLjFlbSk7IH1cbiAgICAuamItdGltZS1pbnB1dC13ZWItY29tcG9uZW50IC5pbnB1dC1ib3ggLm1lc3NhZ2UtYm94IHtcbiAgICAgIGZvbnQtc2l6ZTogdmFyKC0tamItdGltZS1pbnB1dC1tZXNzYWdlLWZvbnQtc2l6ZSwgMC43ZW0pO1xuICAgICAgcGFkZGluZzogMnB4IDhweDtcbiAgICAgIGNvbG9yOiAjOTI5MjkyO1xuICAgICAgZGlzcGxheTogdmFyKC0tamItdGltZS1pbnB1dC1tZXNzYWdlLWJveC1kaXNwbGF5LCBibG9jayk7IH1cbiAgICAgIC5qYi10aW1lLWlucHV0LXdlYi1jb21wb25lbnQgLmlucHV0LWJveCAubWVzc2FnZS1ib3g6ZW1wdHkge1xuICAgICAgICBwYWRkaW5nOiAwOyB9XG4gICAgICAuamItdGltZS1pbnB1dC13ZWItY29tcG9uZW50IC5pbnB1dC1ib3ggLm1lc3NhZ2UtYm94LmVycm9yIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWpiLXRpbWUtaW5wdXQtbWVzc2FnZS1lcnJvci1jb2xvciwgcmVkKTsgfVxuIl19 */";

class JBTimeInputWebComponent extends HTMLElement {
    static get formAssociated() { return true; }
    get value() {
        return this.elements.input.value;
    }
    set value(value) {
        this.elements.input.value = value;
        if (this.internals_) {
            this.internals_.setFormValue(value);
        }
    }
    get inputValue() {
        return this._inputValue;
    }
    get _inputValue() {
        return this.elements.input.value;
    }
    /**
     * @private
     * @memberof JBTimeInputWebComponent
     * @param {string} value
     */
    set _inputValue(value) {
        this.elements.input.value = value;
    }
    /**
     * @private
     * @readonly
     * @memberof JBTimeInputWebComponent
     */
    get _inputRanges() {
        const dividerRange = [2, 5];
        const hourRange = [0, 1];
        const minuteRange = [3, 4];
        const secondRange = [6, 7];
        const maxCarretPos = 7;
        return { dividerRange, hourRange, minuteRange, secondRange, maxCarretPos };
    }
    /**
     *
     * @return {Number} return hour in number base on input value
     * @memberof JBTimeInputWebComponent
     */
    get hour() {
        let val = this.elements.input.value.slice(this._inputRanges.hourRange[0], this._inputRanges.hourRange[1] + 1);
        if (isNaN(val)) {
            val = 0;
        }
        return parseInt(val);
    }
    /**
     * @param {number} value
     * @public
     * @memberof JBTimeInputWebComponent
     */
    set hour(value) {
        let hour = value;
        if (hour < 0) {
            hour = 0;
        }
        if (hour > 24) {
            hour = 24;
        }
        const hourString = hour > 9 ? `${hour}` : `0${hour}`;
        this.elements.input.value = `${hourString}${this.elements.input.value.slice(this._inputRanges.hourRange[1] + 1)}`;
    }
    /**
     *
     * @return {Number} return minute in number. base on input value
     * @memberof JBTimeInputWebComponent
     */
    get minute() {
        let val = this.elements.input.value.slice(this._inputRanges.minuteRange[0], this._inputRanges.minuteRange[1] + 1);
        if (isNaN(val)) {
            val = 0;
        }
        return parseInt(val);
    }
    /**
     * @param {number} value
     * @public
     * @memberof JBTimeInputWebComponent
     */
    set minute(value) {
        let minute = value;
        if (minute < 0) {
            minute = 0;
        }
        if (minute > 59) {
            minute = 59;
        }
        const minuteString = minute > 9 ? `${minute}` : `0${minute}`;
        this.elements.input.value = `${this.elements.input.value.slice(0, this._inputRanges.minuteRange[0])}${minuteString}${this.elements.input.value.slice(this._inputRanges.minuteRange[1] + 1)}`;
    }
    /**
    *
    * @return {Number} return seconf in number. base on input value
    * @memberof JBTimeInputWebComponent
    */
    get second() {
        let val = this.elements.input.value.slice(this._inputRanges.secondRange[0], this._inputRanges.secondRange[1] + 1);
        if (isNaN(val)) {
            val = 0;
        }
        return parseInt(val);
    }
    /**
     * @param {number} value
     * @public
     * @memberof JBTimeInputWebComponent
     */
    set second(value) {
        let second = value;
        if (second < 0) {
            second = 0;
        }
        if (second > 59) {
            second = 59;
        }
        const secondString = second > 9 ? `${second}` : `0${second}`;
        this.elements.input.value = `${this.elements.input.value.slice(0, this._inputRanges.secondRange[0])}${secondString}`;
    }
    // get validationList(){
    //     return this._validationList;
    // }
    // set validationList(value){
    //     this._validationList = value;
    //     this.triggerInputValidation(false);
    // }
    constructor() {
        super();
        if (typeof this.attachInternals == "function") {
            //some browser dont support attachInternals
            this.internals_ = this.attachInternals();
        }
        this.initWebComponent();
    }
    connectedCallback() {
        // standard web component event that called when all of dom is binded
        this.callOnLoadEvent();
        this.initProp();
        this.callOnInitEvent();

    }
    callOnLoadEvent() {
        var event = new CustomEvent('load', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    callOnInitEvent() {
        var event = new CustomEvent('init', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    initWebComponent() {
        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        const html = `<style>${css_248z}</style>` + '\n' + HTML;
        const element = document.createElement('template');
        element.innerHTML = html;
        this.shadowRoot.appendChild(element.content.cloneNode(true));
        this.elements = {
            input: this.shadowRoot.querySelector('.time-input'),
            label: {
                wrapper: this.shadowRoot.querySelector('label'),
                value: this.shadowRoot.querySelector('label .label-value')
            }
        };
        this.registerEventListener();
    }
    registerEventListener() {
        this.elements.input.addEventListener('keydown', this.onInputKeyDown.bind(this));
        this.elements.input.addEventListener('keypress', this.onInputKeyPress.bind(this));
        this.elements.input.addEventListener('keyup', this.onInputKeyup.bind(this));
        this.elements.input.addEventListener('change', this.onInputChange.bind(this));
        this.elements.input.addEventListener('focus', this.onInputFocus.bind(this));
        this.elements.input.addEventListener('blur', this.onInputBlur.bind(this));
    }
    initProp() {
        //set initial value to input
        this.resetInputValue();
    }
    resetInputValue() {
        this._inputValue = '00:00:00';
    }
    static get observedAttributes() {
        return ['label', 'message', 'value', 'name',];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name, value) {
        switch (name) {
            case 'label':
                this.elements.label.value.innerHTML = value;
                if (value == null || value == undefined || value == "") {
                    this.elements.label.wrapper.classList.add('--hide');
                } else {
                    this.elements.label.wrapper.classList.remove('--hide');
                }
                break;
            case 'message':
                this._shadowRoot.querySelector('.message-box').innerHTML = value;
                break;
            case 'value':
                this.value = value;
                break;
            case 'name':
                this.elements.input.setAttribute('name', value);
                break;
        }

    }
    addHour(inteval) {
        const hour = this.hour + inteval;
        this.hour = hour;
    }
    addMinute(interval) {
        const minute = this.minute + interval;
        this.minute = minute;
    }
    addSecond(interval) {
        const second = this.second + interval;
        this.second = second;
    }
    inputChar(char, pos) {
        const { dividerRange, hourRange, minuteRange, secondRange } = this._inputRanges;
        if (dividerRange.includes(pos)) {
            pos++;
        }
        if (hourRange[0] == pos) {
            const tailChar = isNaN(this.elements.input.value[hourRange[1]]) ? '0' : this.elements.input.value[hourRange[1]];
            this.hour = parseInt(char + tailChar);
            return;
        }
        if (hourRange[1] == pos) {
            const headChar = isNaN(this.elements.input.value[hourRange[0]]) ? '0' : this.elements.input.value[hourRange[0]];
            this.hour = parseInt(headChar + char);
        }
        if (minuteRange[0] == pos) {
            const tailChar = isNaN(this.elements.input.value[minuteRange[1]]) ? '0' : this.elements.input.value[minuteRange[1]];
            this.minute = parseInt(char + tailChar);
            return;
        }
        if (minuteRange[1] == pos) {
            const headChar = isNaN(this.elements.input.value[minuteRange[0]]) ? '0' : this.elements.input.value[minuteRange[0]];
            this.minute = parseInt(headChar + char);
        }
        if (secondRange[0] == pos) {
            const tailChar = isNaN(this.elements.input.value[secondRange[1]]) ? '0' : this.elements.input.value[secondRange[1]];
            this.second = parseInt(char + tailChar);
            return;
        }
        if (secondRange[1] == pos) {
            const headChar = isNaN(this.elements.input.value[secondRange[0]]) ? '0' : this.elements.input.value[secondRange[0]];
            this.second = parseInt(headChar + char);
        }
    }
    onInputKeyDown(e) {
        const { dividerRange, hourRange, minuteRange, secondRange } = this._inputRanges;
        const carretPos = e.target.selectionStart;
        if (e.keyCode == 8) {
            //on back space
            if (carretPos == 0) {
                return;
            }
            // we map to x+1 becuase carrot is after ":" on back space
            if (!dividerRange.map(x => x + 1).includes(carretPos)) {
                this.inputChar('0', carretPos - 1);
            }
            e.target.setSelectionRange(carretPos - 1, carretPos - 1);
            e.preventDefault();
        }
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
            if ([...hourRange, hourRange[1] + 1].includes(carretPos)) {
                this.addHour(interval);
                this.elements.input.setSelectionRange(hourRange[0], hourRange[1] + 1);
            }
            if ([...minuteRange, minuteRange[1] + 1].includes(carretPos)) {
                this.addMinute(interval);
                this.elements.input.setSelectionRange(minuteRange[0], minuteRange[1] + 1);
            }
            if ([...secondRange, secondRange[1] + 1].includes(carretPos)) {
                this.addSecond(interval);
                this.elements.input.setSelectionRange(secondRange[0], secondRange[1] + 1);
            }

            e.preventDefault();

        }
        this.callOnKeyDownEvent(e);
    }
    callOnKeyDownEvent(e) {
        const keyDownnInitObj = {
            key: e.key,
            keyCode: e.keyCode,
            code: e.code,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            charCode: e.charCode,
            which: e.which
        };
        const event = new KeyboardEvent("keydown", keyDownnInitObj);
        this.dispatchEvent(event);
    }
    onInputKeyPress(e) {
        let carretPos = e.target.selectionStart;
        let inputedChar = e.key;
        const { dividerRange, hourRange, minuteRange, secondRange, maxCarretPos } = this._inputRanges;
        if (isNaN(inputedChar)) ; else {
            if (dividerRange.includes(carretPos)) {
                carretPos++;
                e.target.setSelectionRange(carretPos, carretPos);
            }
            if (carretPos > maxCarretPos) {
                carretPos = maxCarretPos;
            }
            //first we must see what is the inputed char hour or  minute or second 
            //handle hour
            if (hourRange.includes(carretPos)) {
                if (carretPos == hourRange[0]) {
                    if (inputedChar > "2") {
                        this.hour = parseInt(inputedChar);
                        carretPos++;
                    } else {
                        const tailNum = isNaN(this.elements.input.value[hourRange[1]]) ? '0' : this.elements.input.value[hourRange[1]];
                        this.hour = parseInt(inputedChar + tailNum);
                    }
                } else {
                    if (inputedChar > "4" && this.elements.input.value[hourRange[0]] == "2") {
                        inputedChar = "4";
                    }
                    const headChar = isNaN(this.elements.input.value[hourRange[0]]) ? '0' : this.elements.input.value[hourRange[0]];
                    this.hour = parseInt(headChar + inputedChar);
                }
            }
            //handle minute
            if (minuteRange.includes(carretPos)) {
                if (carretPos == minuteRange[0]) {
                    if (inputedChar > "5") {
                        this.inputChar("0", carretPos);
                        carretPos++;
                    }
                }
                this.inputChar(inputedChar, carretPos);
            }
            //handle second
            if (secondRange.includes(carretPos)) {
                if (carretPos == secondRange[0]) {
                    if (inputedChar > "5") {
                        this.inputChar("0", carretPos);
                        carretPos++;
                    }
                }
                this.inputChar(inputedChar, carretPos);
            }
            e.target.setSelectionRange(carretPos + 1, carretPos + 1);
        }
        e.preventDefault();
        this.callOnKeyPressEvent(e);
    }
    callOnKeyPressEvent(e) {
        const event = new CustomEvent('keypress');
        this.dispatchEvent(event);
    }
    onInputKeyup(e) {
        //this.triggerInputValidation(false);
        const keyUpInitObj = {
            key: e.key,
            keyCode: e.keyCode,
            code: e.code,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            charCode: e.charCode,
            which: e.which,
        };
        const event = new KeyboardEvent('keyup', keyUpInitObj);
        this.dispatchEvent(event);
        if (e.keyCode == 13) {
            this.onInputEnter();
        }
    }
    onInputEnter() {
        const event = new CustomEvent('enter');
        this.dispatchEvent(event);
    }
    onInputChange(e) {

        const inputText = e.target.value;
        const isTimeValid = this.checkTimeFormatValidation(inputText);
        //TODO: add on paste so component handle paste more smartly
        if (!isTimeValid) {
            if (this._valueOnInputFocus) {
                this._inputValue = this._valueOnInputFocus;
            } else {
                this.resetInputValue();
            }
        }
        // to prevent onChange call twice
        this._valueOnInputFocus = this.value;
        //TODO add min max value and enable validation function 
        //this.triggerInputValidation(true);
        //const validationObject = this.checkInputValidation(inputText);
        const event = new CustomEvent('change', {
            // detail: {
            //     isValid: validationObject.isAllValid,
            //     validationObject:validationObject,
            // },
        });
        this.dispatchEvent(event);
    }
    onInputFocus(e) {
        this._valueOnInputFocus = this.value;
        const event = new FocusEvent('focus');
        this.dispatchEvent(event);
    }
    onInputBlur(e) {

        if (this._valueOnInputFocus !== this.value) {
            this.onInputChange(e);
        }
        const event = new FocusEvent('blur');
        this.dispatchEvent(event);
    }
    /**
     *
     * @return {Boolean} if given text is a proper time string format
     * @param {String} text text you want to validate and analyse if its time or not
     * @memberof JBTimeInputWebComponent
     */
    checkTimeFormatValidation(text) {
        const validationRegex = /^(?<hour>[01]\d|[2][01234]):(?<minute>[012345]\d):(?<second>[012345]\d)$/g;
        const result = validationRegex.test(text);
        return result;
    }
    triggerInputValidation(showError = true) {
        // // this method is for use out of component  for example if user click on submit button and developer want to check if all fields are valid
        // //takeAction determine if we want to show user error in web component difualtManner or developer will handle it by himself
        // const inputText = this._shadowRoot.querySelector('.input-box input').value;

        // const validationResult = this.checkInputValidation(inputText);
        // this.validation = {
        //     isValid: validationResult.isAllValid,
        //     message: null
        // };
        // if(!validationResult.isAllValid){
        //     const firstFault = validationResult.validationList.find(x => !x.isValid);
        //     this.validation.message = firstFault.message;
        //     if (showError == true) {
        //         this.showValidationError(firstFault.message);
        //     }
        // }else{
        //     this.clearValidationError();
        // }
        // return validationResult;
    }
    checkInputValidation(value) {
        // const validationResult = {
        //     validationList: [],
        //     isAllValid: true
        // };
        // this.validationList.forEach((validation) => {
        //     const res = this.checkValidation(value, validation);
        //     validationResult.validationList.push(res);
        //     if (!res.isValid) {
        //         validationResult.isAllValid = false;
        //     }
        // });
        // return validationResult;
    }
    checkValidation(text, validation) {
        // var testRes;
        // if(validation.validator instanceof RegExp){
        //     testRes = validation.validator.test(text);
        //     validation.validator.lastIndex = 0;
        // }

        // if(typeof validation.validator == "function"){
        //     testRes = validation.validator(text);
        // }

        // if (!testRes) {
        //     return {
        //         isValid: false,
        //         message: validation.message,
        //         validation: validation
        //     };
        // }
        // return {
        //     isValid: true,
        //     message: '',
        //     validation: validation
        // };
    }
    showValidationError(error) {
        // this._shadowRoot.querySelector('.message-box').innerHTML = error;
        // this._shadowRoot.querySelector('.message-box').classList.add('error');
    }
    clearValidationError() {
        // const text = this.getAttribute('message') || '';
        // this._shadowRoot.querySelector('.message-box').innerHTML = text;
        // this._shadowRoot.querySelector('.message-box').classList.remove('error');
    }
    /**
     * @public
     */
    focus() {
        //public method
        this.inputElement.focus();
    }
}
const myElementNotExists = !customElements.get('jb-time-input');
if (myElementNotExists) {
    window.customElements.define('jb-time-input', JBTimeInputWebComponent);
}
//# sourceMappingURL=JBTimeInput.js.map
