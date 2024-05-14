import { JBTimePickerWebComponent } from "jb-time-picker";

export type TimeUnits = "hour" | "minute" | "second";
export type JBTimeInputElements = {
    input:HTMLInputElement,
    timePicker:{
        wrapper:HTMLDivElement,
        component:JBTimePickerWebComponent,
        closeButton:HTMLButtonElement,
    },
    label: {
        wrapper: HTMLLabelElement,
        value: HTMLSpanElement,
    },
    messageBox:HTMLDivElement,
}
declare global {
    interface ElementInternals {
        setFormValue(value: string): void;
    }
}
export declare type ValidationResultSummary = {
    isValid: boolean | null;
    message: string | null;
    detail: object | null;
};
export declare type ValidationResultItem = {
    isValid: boolean | null;
    message: string | null;
    validation: JBTimeInputValidationItem | "REQUIRED";
};
export declare type ValidationResult = {
    validationList: ValidationResultItem[];
    isAllValid: boolean;
};
type ValidatorExec = RegExp | ((text: string) => boolean);
export declare type JBTimeInputValidationItem = {
    validator: ValidatorExec
    message: string;
};