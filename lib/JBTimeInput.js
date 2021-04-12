import HTML from './JBTimeInput.html';
import CSS from './JBTimeInput.scss';
import 'jb-time-picker';
class JBTimeInputWebComponent extends HTMLElement {
    static get formAssociated() { return true; }
    get value() {
        return this.elements.input.value;
    }
    set value(value) {
        const isValid = this.checkTimeFormatValidation(value);
        if (isValid) {
            this.elements.input.value = value;
            if (this.internals_) {
                this.internals_.setFormValue(value);
            }
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
        if(this.hour !== value){
            let hour = value;
            if (hour < 0) {
                hour = 0;
            }
            if (hour > 24) {
                hour = 24;
            }
            const hourString = hour > 9 ? `${hour}` : `0${hour}`;
            this.elements.input.value = `${hourString}${this.elements.input.value.slice(this._inputRanges.hourRange[1] + 1)}`;
            this.updateTimePickerValue(hour,this.minute,this.second);
        }

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
        if(this.minute !== value){
            let minute = value;
            if (minute < 0) {
                minute = 0;
            }
            if (minute > 59) {
                minute = 59;
            }
            const minuteString = minute > 9 ? `${minute}` : `0${minute}`;
            this.elements.input.value = `${this.elements.input.value.slice(0, this._inputRanges.minuteRange[0])}${minuteString}${this.elements.input.value.slice(this._inputRanges.minuteRange[1] + 1)}`;
            this.updateTimePickerValue(this.hour,minute,this.second);
        }

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
        if(this.second !== value){
            let second = value;
            if (second < 0) {
                second = 0;
            }
            if (second > 59) {
                second = 59;
            }
            const secondString = second > 9 ? `${second}` : `0${second}`;
            this.elements.input.value = `${this.elements.input.value.slice(0, this._inputRanges.secondRange[0])}${secondString}`;
            this.updateTimePickerValue(this.hour,this.minute,second);
        }

    }
    get validationList() {
        return this._validationList;
    }
    set validationList(value) {
        if (value instanceof (Array)) {
            this._validationList = value;
            this.triggerInputValidation(false);
        }

    }
    get showTimePicker() {
        return this._showTimePicker;
    }
    set showTimePicker(value) {
        this._showTimePicker = value;
        if (value == true) {
            this.elements.timePicker.wrapper.classList.add('--show');
        } else {
            this.elements.timePicker.wrapper.classList.remove('--show');
        }
    }
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
        const html = `<style>${CSS}</style>` + '\n' + HTML;
        const element = document.createElement('template');
        element.innerHTML = html;
        this.shadowRoot.appendChild(element.content.cloneNode(true));
        this.elements = {
            input: this.shadowRoot.querySelector('.time-input'),
            label: {
                wrapper: this.shadowRoot.querySelector('label'),
                value: this.shadowRoot.querySelector('label .label-value')
            },
            messageBox: this.shadowRoot.querySelector('.message-box'),
            timePicker: {
                wrapper: this.shadowRoot.querySelector('.time-picker-wrapper'),
                component: this.shadowRoot.querySelector('jb-time-picker'),
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
        this.elements.timePicker.component.addEventListener('change', this.onTimePickerChange.bind(this));
    }
    initProp() {
        //set initial value to input
        this.resetInputValue();
        //set validation list if its not setted yet
        this._validationList = this._validationList ? this._validationList : [];
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
                this.elements.timePicker.component.setTimeUnitFocus('hour');
                this.addHour(interval);
                this.elements.input.setSelectionRange(hourRange[0], hourRange[1] + 1);
            }
            if ([...minuteRange, minuteRange[1] + 1].includes(carretPos)) {
                this.elements.timePicker.component.setTimeUnitFocus('minute');
                this.addMinute(interval);
                this.elements.input.setSelectionRange(minuteRange[0], minuteRange[1] + 1);
            }
            if ([...secondRange, secondRange[1] + 1].includes(carretPos)) {
                this.elements.timePicker.component.setTimeUnitFocus('second');
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
        if (isNaN(inputedChar)) {
            //
        } else {
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
                this.elements.timePicker.component.setTimeUnitFocus('hour');
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
                this.elements.timePicker.component.setTimeUnitFocus('minute');
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
                this.elements.timePicker.component.setTimeUnitFocus('second');
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
        this.triggerInputValidation(false);
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
        const validationResult = this.triggerInputValidation(true);
        const event = new CustomEvent('change', {
            detail: {
                isValid: validationResult.isAllValid,
                validationObject: validationResult,
            },
        });
        this.dispatchEvent(event);
    }
    onInputFocus(e) {
        this._valueOnInputFocus = this.value;
        this.showTimePicker = true;
        const event = new FocusEvent('focus');
        this.dispatchEvent(event);
    }
    onInputBlur(e) {
        let focusedElement = e.relatedTarget;
        if (focusedElement !== this.elements.timePicker.component) {
            this.showTimePicker = false;
        }
        this.triggerInputValidation(true);
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
        const inputText = this.elements.input.value;

        const validationResult = this.checkInputValidation(inputText);
        this.validation = {
            isValid: validationResult.isAllValid,
            message: null,
            detail: validationResult
        };
        if (!validationResult.isAllValid) {
            const firstFault = validationResult.validationList.find(x => !x.isValid);
            this.validation.message = firstFault.message;
            if (showError == true) {
                this.showValidationError(firstFault.message);
            }
        } else {
            this.clearValidationError();
        }
        return validationResult;
    }
    checkInputValidation(value) {
        const validationResult = {
            validationList: [],
            isAllValid: true
        };
        this.validationList.forEach((validation) => {
            const res = this.checkValidation(value, validation);
            validationResult.validationList.push(res);
            if (!res.isValid) {
                validationResult.isAllValid = false;
            }
        });
        return validationResult;
    }
    checkValidation(text, validation) {
        var testRes;
        if (validation.validator instanceof RegExp) {
            testRes = validation.validator.test(text);
            validation.validator.lastIndex = 0;
        }

        if (typeof validation.validator == "function") {
            testRes = validation.validator(text);
        }

        if (!testRes) {
            return {
                isValid: false,
                message: validation.message,
                validation: validation
            };
        }
        return {
            isValid: true,
            message: '',
            validation: validation
        };
    }
    showValidationError(error) {
        this.elements.messageBox.innerHTML = error;
        this.elements.messageBox.classList.add('--error');
    }
    clearValidationError() {
        const text = this.getAttribute('message') || '';
        this.elements.messageBox.innerHTML = text;
        this.elements.messageBox.classList.remove('--error');
    }
    /**
     * @public
     */
    focus() {
        //public method
        this.elements.input.focus();
    }
    onTimePickerChange(e) {
        const { hour, minute, second } = e.target.value;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }
    updateTimePickerValue(hour, minute, second) {
        this.elements.timePicker.component.value = {
            hour,
            minute,
            second
        };
    }
}
const myElementNotExists = !customElements.get('jb-time-input');
if (myElementNotExists) {
    window.customElements.define('jb-time-input', JBTimeInputWebComponent);
}
