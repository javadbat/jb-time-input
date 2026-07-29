import type { JBTimeInputWebComponent, TimeUnits, ValidationValue } from "jb-time-input";
import type { ValidationItem } from "jb-validation";
import { type RefObject, useEffect } from "react";

export type JBTimeInputAttributes = {
  value?: string | null,
  initialValue?: string | null,
  validationList?: ValidationItem<ValidationValue>[] | null,
  disabled?: boolean,
  secondEnabled?: boolean,
  frontalZero?: boolean,
  optionalUnits?: TimeUnits[] | null,
  showPersianNumber?: boolean,
}
export function useJBTimeInputAttribute(element: RefObject<JBTimeInputWebComponent | null>, props: JBTimeInputAttributes) {
  useEffect(() => {
    if (!element.current || typeof props.disabled !== "boolean") {
      return;
    }
    if (props.disabled) {
      element.current.setAttribute("disabled", "");
    } else {
      element.current.removeAttribute("disabled");
    }
  }, [props.disabled, element]);
  useEffect(() => {
    if (element.current && props.secondEnabled !== null && props.secondEnabled !== undefined) {
      element.current.secondEnabled = props.secondEnabled;
    }
  }, [props.secondEnabled, element]);
  useEffect(() => {
    if (element.current && props.initialValue !== undefined) {
      element.current.initialValue = props.initialValue;
    }
  }, [props.initialValue, element]);
  useEffect(() => {
    if (element.current && props.value !== undefined) {
      element.current.value = props.value ?? (element.current.secondEnabled ? '00:00:00' : '00:00');
    }
  }, [props.value, element]);
  useEffect(() => {
    if (Array.isArray(props.validationList) && element.current) {
      element.current.validation.list = props.validationList;
    }
  }, [props.validationList, element]);
  useEffect(() => {
    if (element.current && typeof props.frontalZero == "boolean") {
      element.current.frontalZero = props.frontalZero;
    }
  }, [props.frontalZero, element]);
  useEffect(() => {
    if (element.current && Array.isArray(props.optionalUnits)) {
      element.current.optionalUnits = props.optionalUnits;
    }
  }, [props.optionalUnits, element]);
  useEffect(() => {
    if (element.current && props.showPersianNumber !== null && props.showPersianNumber !== undefined) {
      element.current.showPersianNumber = props.showPersianNumber;
    }
  }, [props.showPersianNumber, element]);
}
