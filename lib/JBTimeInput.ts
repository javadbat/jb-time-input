import HTML from './JBTimeInput.html';
import CSS from './JBTimeInput.scss';
import 'jb-time-picker';
import { JBTimeInputElements, JBTimeInputValidationItem, ValidationResult, ValidationResultItem, ValidationResultSummary } from './Types';
import { JBTimePickerValueObject, TimeUnitsString} from 'jb-time-picker/dist/Types';
import { SecondRange } from '../../jb-time-picker/lib/Types';
class JBTimeInputWebComponent extends HTMLElement {
    static get formAssociated() { return true; }
    #elements!:JBTimeInputElements
    get value() {
        return this.#elements.input.value;
    }
    set value(value) {
        const isValid = this.checkTimeFormatValidation(value);
        if (isValid) {
            this.#elements.input.value = value;
            if (this.#internals) {
                this.#internals.setFormValue(value);
            }
        }
    }
    get inputValue() {
        return this.#inputValue;
    }
    get #inputValue():string{
        return this.#elements.input.value;
    }
    /**
     * @private
     * @memberof JBTimeInputWebComponent
     * @param {string} value
     */
    set #inputValue(value:string) {
        this.#elements.input.value = value;
    }
    /**
     * @private
     * @readonly
     * @memberof JBTimeInputWebComponent
     */
    get _inputRanges() {

        let dividerRange = [2];
        const hourRange = [0, 1];
        const minuteRange = [3, 4];
        let secondRange:SecondRange = [null, null];
        let maxCarretPos = 4;
        if (this.secondEnabled) {
            secondRange = [6, 7];
            dividerRange = [2, 5];
            maxCarretPos = 7;
        }
        return { dividerRange, hourRange, minuteRange, secondRange, maxCarretPos };
    }
    /**
     * @return {String} return hour in string base on input value
     * @memberof JBTimeInputWebComponent 
     */
    get hourString():string {
        const val = this.#elements.input.value.slice(this._inputRanges.hourRange[0], this._inputRanges.hourRange[1] + 1);
        return val;
    }
    /**
     *
     * @return {Number} return hour in number base on input value
     * @memberof JBTimeInputWebComponent
     */
    get hour():number{
        let val = this.hourString;
        if (isNaN(Number(val))) {
            val = '0';
        }
        return parseInt(val);
    }

    /**
     * @param {number} value
     * @public
     * @memberof JBTimeInputWebComponent
     */
    set hour(value:number) {
        if (this.hour !== value) {
            let hour = value;
            if (hour < 0) {
                hour = 0;
            }
            if (hour > 24) {
                hour = 24;
            }
            const hourString = hour > 9 ? `${hour}` : `0${hour}`;
            this.#elements.input.value = `${hourString}${this.#elements.input.value.slice(this._inputRanges.hourRange[1] + 1)}`;
            this.updateTimePickerValue(hour, this.minute, this.second);
        }

    }
    /**
 * @return {String} return minute in string base on input value
 * @memberof JBTimeInputWebComponent 
 */
    get minuteString():string{
        const val = this.#elements.input.value.slice(this._inputRanges.minuteRange[0], this._inputRanges.minuteRange[1] + 1);
        return val;
    }
    /**
     *
     * @return {Number} return minute in number. base on input value
     * @memberof JBTimeInputWebComponent
     */
    get minute():number{
        let val = this.minuteString;
        if (isNaN(Number(val))) {
            val = '0';
        }
        return parseInt(val);
    }
    /**
     * @param {number} value
     * @public
     * @memberof JBTimeInputWebComponent
     */
    set minute(value:number) {
        if (this.minute !== value) {
            let minute = value;
            if (minute < 0) {
                minute = 0;
            }
            if (minute > 59) {
                minute = 59;
            }
            const minuteString = minute > 9 ? `${minute}` : `0${minute}`;
            this.#elements.input.value = `${this.#elements.input.value.slice(0, this._inputRanges.minuteRange[0])}${minuteString}${this.#elements.input.value.slice(this._inputRanges.minuteRange[1] + 1)}`;
            this.updateTimePickerValue(this.hour, minute, this.second);
        }

    }
    /**
* @return {String} return minute in string base on input value
* @memberof JBTimeInputWebComponent 
*/
    get secondString():string{

        if(this._inputRanges.secondRange[0] !== null && this._inputRanges.secondRange[1] !== null){
            const val = this.#elements.input.value.slice(this._inputRanges.secondRange[0], this._inputRanges.secondRange[1] + 1);
            return val;
        }
        return '';
    }
    /**
    *
    * @return {Number} return seconf in number. base on input value
    * @memberof JBTimeInputWebComponent
    */
    get second():number| null{
        if (this.secondEnabled) {
            let val = this.secondString;
            if (isNaN(Number(val))) {
                val = '0';
            }
            return parseInt(val);
        }
        return null;
    }
    /**
     * @param {number} value
     * @public
     * @memberof JBTimeInputWebComponent
     */
    set second(value:string | number | null) {
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
                if(this._inputRanges.secondRange[0]){
                    this.#elements.input.value = `${this.#elements.input.value.slice(0, this._inputRanges.secondRange[0])}${secondString}`;
                    this.updateTimePickerValue(this.hour, this.minute, second);
                }
            }
        }
    }
    #validationList = []
    get validationList() {
        return this.#validationList;
    }
    set validationList(value) {
        if (value instanceof (Array)) {
            this.#validationList = value;
            this.triggerInputValidation(false);
        }

    }
    #showTimePicker = false;
    get showTimePicker() {
        return this.#showTimePicker;
    }
    set showTimePicker(value) {
        this.#showTimePicker = value;
        if (value == true) {
            this.#elements.timePicker.wrapper.classList.add('--show');
        } else {
            this.#elements.timePicker.wrapper.classList.remove('--show');
        }
    }
    #secondEnabled = true;
    get secondEnabled() {
        return this.#secondEnabled;
    }
    set secondEnabled(value) {
        if (typeof value == "boolean") {
            this.#secondEnabled = value;
            this.#elements.timePicker.component.secondEnabled = value;
            if (value == false) {
                this.disableSecond();
            } else {
                this.enableSecond();
            }
        }
    }
    #internals:ElementInternals| null = null;
    #valueOnInputFocus:string|null = null;
    validation:ValidationResultSummary = {
        isValid: true,
        message: null,
        detail: null,
    }
    set optionalUnits(value: TimeUnitsString[]) {
        debugger;
        this.#elements.timePicker.component.optionalUnits = value;
    }
    get optionalUnits() {
        return this.#elements.timePicker.component.optionalUnits;
    }
    set frontalZero(value: boolean) {
        this.#elements.timePicker.component.frontalZero = value;
    }
    get frontalZero() {
        return this.#elements.timePicker.component.frontalZero;
    }
    constructor() {
        super();
        if (typeof this.attachInternals == "function") {
            //some browser dont support attachInternals
            this.#internals = this.attachInternals();
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
        const event = new CustomEvent('load', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    callOnInitEvent() {
        const event = new CustomEvent('init', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    initWebComponent() {
        const shadowRoot = this.attachShadow({
            mode: 'open',
            delegatesFocus: true
        });
        const html = `<style>${CSS}</style>` + '\n' + HTML;
        const element = document.createElement('template');
        element.innerHTML = html;
        shadowRoot.appendChild(element.content.cloneNode(true));
        this.#elements = {
            input: shadowRoot.querySelector('.time-input')!,
            label: {
                wrapper: shadowRoot.querySelector('label')!,
                value: shadowRoot.querySelector('label .label-value')!
            },
            messageBox: shadowRoot.querySelector('.message-box')!,
            timePicker: {
                wrapper: shadowRoot.querySelector('.time-picker-wrapper')!,
                component: shadowRoot.querySelector('jb-time-picker')!,
                closeButton: shadowRoot.querySelector('.close-time-picker-button')!
            },
        };
        this.registerEventListener();
    }
    registerEventListener() {
        this.#elements.input.addEventListener('keydown', this.onInputKeyDown.bind(this));
        this.#elements.input.addEventListener('keyup', this.onInputKeyup.bind(this));
        this.#elements.input.addEventListener('change', this.onInputChange.bind(this));
        this.#elements.input.addEventListener('keypress', this.onInputKeyPress.bind(this));
        this.#elements.input.addEventListener('focus', this.onInputFocus.bind(this));
        this.#elements.input.addEventListener('blur', this.onInputBlur.bind(this));
        this.#elements.timePicker.component.addEventListener('change', this.onTimePickerChange.bind(this));
        this.#elements.timePicker.closeButton.addEventListener('click', () => { this.showTimePicker = false; });
        this.#elements.timePicker.component.addEventListener('blur', this.onTimePickerBlur.bind(this));
    }
    initProp() {
        //enable second input by defualt
        this.#secondEnabled = true;
        //set initial value to input
        this.resetInputValue();
        //set validation list if its not setted yet
        this.#validationList = this.#validationList ? this.#validationList : [];
    }
    resetInputValue() {
        if (this.secondEnabled) {
            this.#inputValue = '00:00:00';
        } else {
            this.#inputValue = '00:00';
        }
    }
    static get observedAttributes() {
        return ['label', 'message', 'value', 'name', 'close-button-text', 'frontal-zero'];
    }
    attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name:string, value:string) {
        switch (name) {
            case 'label':
                this.#elements.label.value.innerHTML = value;
                if (value == null || value == undefined || value == "") {
                    this.#elements.label.wrapper.classList.add('--hide');
                } else {
                    this.#elements.label.wrapper.classList.remove('--hide');
                }
                break;
            case 'message':
                this.#elements.messageBox.innerHTML = value;
                break;
            case 'value':
                this.value = value;
                break;
            case 'name':
                this.#elements.input.setAttribute('name', value);
                break;
            case 'close-button-text':
                this.#elements.timePicker.closeButton.innerHTML = value;
                break;
            case 'frontal-zero':
                this.frontalZero = Boolean(value);
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
            const tailChar = isNaN(Number(this.#elements.input.value[hourRange[1]])) ? '0' : this.#elements.input.value[hourRange[1]];
            this.hour = parseInt(char + tailChar);
            return;
        }
        if (hourRange[1] == pos) {
            const headChar = isNaN(Number(this.#elements.input.value[hourRange[0]])) ? '0' : this.#elements.input.value[hourRange[0]];
            this.hour = parseInt(headChar + char);
        }
        if (minuteRange[0] == pos) {
            const tailChar = isNaN(Number(this.#elements.input.value[minuteRange[1]])) ? '0' : this.#elements.input.value[minuteRange[1]];
            this.minute = parseInt(char + tailChar);
            return;
        }
        if (minuteRange[1] == pos) {
            const headChar = isNaN(Number(this.#elements.input.value[minuteRange[0]])) ? '0' : this.#elements.input.value[minuteRange[0]];
            this.minute = parseInt(headChar + char);
        }
        if (this.secondEnabled) {
            if (secondRange[0] == pos && secondRange[1] !== null) {
                const tailChar = isNaN(Number(this.#elements.input.value[secondRange[1]])) ? '0' : this.#elements.input.value[secondRange[1]];
                this.second = parseInt(char + tailChar);
                return;
            }
            if (secondRange[1] == pos && secondRange[0] !== null) {
                const headChar = isNaN(Number(this.#elements.input.value[secondRange[0]])) ? '0' : this.#elements.input.value[secondRange[0]];
                this.second = parseInt(headChar + char);
            }
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
                this.#elements.timePicker.component.setTimeUnitFocus('hour');
                this.addHour(interval);
                this.#elements.input.setSelectionRange(hourRange[0], hourRange[1] + 1);
            }
            if ([...minuteRange, minuteRange[1] + 1].includes(carretPos)) {
                this.#elements.timePicker.component.setTimeUnitFocus('minute');
                this.addMinute(interval);
                this.#elements.input.setSelectionRange(minuteRange[0], minuteRange[1] + 1);
            }
            if (this.secondEnabled && secondRange[1] !== null && [...secondRange, secondRange[1] + 1].includes(carretPos)) {
                this.#elements.timePicker.component.setTimeUnitFocus('second');
                this.addSecond(interval);
                this.#elements.input.setSelectionRange(secondRange[0], secondRange[1] + 1);
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
    onInputKeyPress(e:KeyboardEvent) {
        const target:HTMLInputElement = e.target as HTMLInputElement;
        let carretPos = target.selectionStart || 0;
        let inputedChar = e.key;
        const { dividerRange, hourRange, minuteRange, secondRange, maxCarretPos } = this._inputRanges;
        if (!isNaN(Number(inputedChar))) {
            if (dividerRange.includes(carretPos)) {
                carretPos++;
                target.setSelectionRange(carretPos, carretPos);
            }
            if (carretPos > maxCarretPos) {
                carretPos = maxCarretPos;
            }
            //first we must see what is the inputed char hour or  minute or second 
            //handle hour
            if (hourRange.includes(carretPos)) {
                this.#elements.timePicker.component.setTimeUnitFocus('hour');
                if (carretPos == hourRange[0]) {
                    if (inputedChar > "2") {
                        this.hour = parseInt(inputedChar);
                        carretPos++;
                    } else {
                        const tailNum:string = isNaN(Number(this.#elements.input.value[hourRange[1]])) ? '0' : this.#elements.input.value[hourRange[1]];
                        this.hour = parseInt(inputedChar + tailNum);
                    }
                } else {
                    if (inputedChar > "4" && this.#elements.input.value[hourRange[0]] == "2") {
                        inputedChar = "4";
                    }
                    const headChar:string = isNaN(Number(this.#elements.input.value[hourRange[0]])) ? '0' : this.#elements.input.value[hourRange[0]];
                    this.hour = parseInt(headChar + inputedChar);
                }
            }
            //handle minute
            if (minuteRange.includes(carretPos)) {
                this.#elements.timePicker.component.setTimeUnitFocus('minute');
                if (carretPos == minuteRange[0]) {
                    if (inputedChar > "5") {
                        this.inputChar("0", carretPos);
                        carretPos++;
                    }
                }
                this.inputChar(inputedChar, carretPos);
            }
            //handle second
            if (this.secondEnabled && secondRange.includes(carretPos)) {
                this.#elements.timePicker.component.setTimeUnitFocus('second');
                if (carretPos == secondRange[0]) {
                    if (inputedChar > "5") {
                        this.inputChar("0", carretPos);
                        carretPos++;
                    }
                }
                this.inputChar(inputedChar, carretPos);
            }
            target.setSelectionRange(carretPos + 1, carretPos + 1);
        } 
        e.preventDefault();
        this.callOnKeyPressEvent(e);
    }
    callOnKeyPressEvent(e:KeyboardEvent) {
        const keyPressInitObj:KeyboardEventInit = {
            altKey:e.altKey,
            bubbles:e.bubbles,
            cancelable:e.cancelable,
            charCode:e.charCode,
            code:e.code,
            ctrlKey:e.ctrlKey,
            detail:e.detail,
            key:e.key,
            keyCode:e.keyCode,
            location:e.location,
            metaKey:e.metaKey,
            repeat:e.repeat,
            shiftKey:e.shiftKey,
            which:e.which,
        };
        const event = new KeyboardEvent('keypress',keyPressInitObj);
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
    onInputChange() {

        const inputText = this.value;
        const isTimeValid = this.checkTimeFormatValidation(inputText);
        //TODO: add on paste so component handle paste more smartly
        if (!isTimeValid) {
            if (this.#valueOnInputFocus) {
                this.#inputValue = this.#valueOnInputFocus;
            } else {
                this.resetInputValue();
            }
        }
        // to prevent onChange call twice
        this.#valueOnInputFocus = this.value;
        const validationResult = this.triggerInputValidation(true);
        const event = new CustomEvent('change', {
            detail: {
                isValid: validationResult.isAllValid,
                validationObject: validationResult,
            },
        });
        this.dispatchEvent(event);
    }
    onInputFocus(e:FocusEvent) {
        this.#valueOnInputFocus = this.value;
        this.showTimePicker = true;
        const event = new FocusEvent('focus');
        this.dispatchEvent(event);
    }
    onInputBlur(e:FocusEvent) {
        const focusedElement = e.relatedTarget;
        if (focusedElement !== this.#elements.timePicker.component) {
            this.showTimePicker = false;
        }
        this.triggerInputValidation(true);
        if (this.#valueOnInputFocus !== this.value) {
            this.onInputChange();
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
        let validationRegex:RegExp|null;
        if (this.secondEnabled) {
            validationRegex = /^(?<hour>[01]\d|[2][01234]):(?<minute>[012345]\d):(?<second>[012345]\d)$/g;
        } else {
            validationRegex = /^(?<hour>[01]\d|[2][01234]):(?<minute>[012345]\d)$/g;
        }
        const result = validationRegex.test(text);
        return result;
    }
    triggerInputValidation(showError = true):ValidationResult{
        // // this method is for use out of component  for example if user click on submit button and developer want to check if all fields are valid
        // //takeAction determine if we want to show user error in web component difualtManner or developer will handle it by himself
        const inputText = this.#elements.input.value;

        const validationResult = this.checkInputValidation(inputText);
        this.validation = {
            isValid: validationResult.isAllValid,
            message: null,
            detail: validationResult
        };
        if (!validationResult.isAllValid) {
            const firstFault = validationResult.validationList.find(x => !x.isValid);
            if(firstFault){
                this.validation.message = firstFault.message;
                if (showError == true) {
                    this.showValidationError(firstFault.message);
                }
            }
        } else {
            this.clearValidationError();
        }
        return validationResult;
    }
    checkInputValidation(value:string):ValidationResult{
        const validationResult:ValidationResult = {
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
    checkValidation(text:string, validation:JBTimeInputValidationItem):ValidationResultItem{
        let testRes = false;
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
        this.#elements.messageBox.innerHTML = error;
        this.#elements.messageBox.classList.add('--error');
    }
    clearValidationError() {
        const text = this.getAttribute('message') || '';
        this.#elements.messageBox.innerHTML = text;
        this.#elements.messageBox.classList.remove('--error');
    }
    /**
     * @public
     */
    focus() {
        //public method
        this.#elements.input.focus();
    }
    onTimePickerChange(e) {
        const { hour, minute, second } = e.target.value;
        this.hour = hour;
        this.minute = minute;
        if (this.secondEnabled) {
            this.second = second;
        }

    }
    onTimePickerBlur(e:FocusEvent) {
        const newFocusedElement = e.relatedTarget;
        if (newFocusedElement !== this.#elements.input) {
            this.showTimePicker = false;
            if (this.#valueOnInputFocus !== this.value) {
                this.onInputChange();
            }
            // call onchnage event
        }
    }
    updateTimePickerValue(hour:number, minute:number, second:number|null|undefined) {
        const valueObj:JBTimePickerValueObject = {
            hour,
            minute,
        };
        if (this.secondEnabled && second !== undefined && second !== null) {
            valueObj.second = second;
        }
        this.#elements.timePicker.component.value = valueObj;
    }
    disableSecond() {
        //when user dont want second in time
        this.#inputValue = `${this.hourString}:${this.minuteString}`;
    }
    enableSecond() {
        this.#inputValue = `${this.hourString}:${this.minuteString}:${this.secondString}`;
    }
}
const myElementNotExists = !customElements.get('jb-time-input');
if (myElementNotExists) {
    window.customElements.define('jb-time-input', JBTimeInputWebComponent);
}
