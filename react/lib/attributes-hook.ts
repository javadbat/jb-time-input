import type { JBTimeInputWebComponent, TimeUnits, ValidationValue } from "jb-time-input";
import type { ValidationItem } from "jb-validation";
import { type RefObject, useEffect } from "react";

export type JBTimeInputAttributes = {
  value?: string | null,
  validationList?: ValidationItem<ValidationValue>[] | null,
  secondEnabled?: boolean,
  frontalZero?: boolean,
  optionalUnits?: TimeUnits[] | null,
  showPersianNumber?: boolean,
}
export function useJBTimeInputAttribute(element: RefObject<JBTimeInputWebComponent>, props: JBTimeInputAttributes) {
  useEffect(() => {
    let value = props.value;
    if (props.value == null || props.value === undefined) {
      value = '00:00:00';
    }
    element.current.value = value;
  }, [props.value, element.current]);
  useEffect(() => {
    if (Array.isArray(props.validationList) && element.current) {
      element.current.validation.list = props.validationList;
    }
  }, [props.validationList, element.current]);
  useEffect(() => {
    if (element.current, props.secondEnabled !== null && props.secondEnabled !== undefined) {
      element.current.secondEnabled = props.secondEnabled;
    }
  }, [props.secondEnabled, element.current]);
  useEffect(() => {
    if (typeof props.frontalZero == "boolean") {
      element.current.frontalZero = props.frontalZero;
    }
  }, [props.frontalZero, element.current]);
  useEffect(() => {
    if (Array.isArray(props.optionalUnits)) {
      element.current.optionalUnits = props.optionalUnits;
    }
  }, [props.optionalUnits, element.current]);
  useEffect(() => {
    if (props.showPersianNumber !== null && props.showPersianNumber !== undefined) {
      element.current.showPersianNumber = props.showPersianNumber;
    }
  }, [props.showPersianNumber, element.current]);
}