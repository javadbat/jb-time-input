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
export type ValidationValue = {
    value:string,
    displayValue:string,
    valueObject:{[key in TimeUnits]:number|null}
};
declare global {
    interface ElementInternals {
        setFormValue(value: string): void;
    }
}