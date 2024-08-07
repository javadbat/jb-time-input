import { type JBTimePickerWebComponent } from "jb-time-picker";
import {type JBPopoverWebComponent} from 'jb-popover';
import {type JBInputWebComponent} from 'jb-input';

export type TimeUnits = "hour" | "minute" | "second";
export type JBTimeInputElements = {
    input:JBInputWebComponent,
    timePicker:{
        wrapper:JBPopoverWebComponent,
        component:JBTimePickerWebComponent,
        closeButton:HTMLButtonElement,
    },
}
export type JBTimeInputValidationValue = string;
declare global {
    interface ElementInternals {
        setFormValue(value: string): void;
    }
}