import React, {useRef, useEffect, useImperativeHandle, useState} from 'react';
import 'jb-time-input';
// eslint-disable-next-line no-duplicate-imports
import {JBTimeInputWebComponent} from 'jb-time-input';
import { type ValidationItem } from 'jb-validation';
import { type ValidationValue, type TimeUnits } from 'jb-time-input/types.js';
import {EventProps,useEvents} from './events-hook.js';
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-time-input': JBTimeInputType;
    }
    interface JBTimeInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBTimeInputWebComponent>, JBTimeInputWebComponent> {
      "class"?: string,
      "type"?: string,
      "label"?:string,
      "message"?:string,
      "placeholder"?:string,
    }
  }
}
// eslint-disable-next-line react/display-name
const JBTimeInput = React.forwardRef((props:Props, ref)=>{
  const element = useRef<JBTimeInputWebComponent>(null);
  const [refChangeCount, refChangeCountSetter] = useState(0);
  useImperativeHandle(
    ref,
    () => (element?element.current:{}),
    [element],
  );
  
  useEffect(() => {
    refChangeCountSetter(refChangeCount + 1);
  }, [element.current]);
  useEffect(() => {
    let value = props.value;
    if(props.value == null || props.value === undefined){
      value = '00:00:00';
    }
    element.current.value = value;
  }, [props.value]);
  useEffect(()=>{
    if(Array.isArray( props.validationList) && element.current){
      element.current.validation.list = props.validationList;
    }
  },[props.validationList]);
  useEffect(()=>{
    if(element.current,props.secondEnabled !== null && props.secondEnabled !== undefined){
      element.current.secondEnabled = props.secondEnabled;
    }
  },[props.secondEnabled]);
  useEffect(() => {
    if(typeof props.frontalZero == "boolean"){
      element.current.frontalZero = props.frontalZero;
    }
  }, [props.frontalZero]);
  useEffect(() => {
    if(Array.isArray(props.optionalUnits)){
      element.current.optionalUnits = props.optionalUnits;
    }
  }, [props.optionalUnits]);
  useEffect(() => {
    if(props.showPersianNumber !== null && props.showPersianNumber !== undefined){
      element.current.showPersianNumber = props.showPersianNumber;
    }
  }, [props.showPersianNumber]);
  useEvents(element, props);
  return (
    <jb-time-input placeholder={props.placeholder} ref={element} class={props.className} label={props.label} message={props.message} close-button-text={props.closeButtonText}></jb-time-input>
  );
});

JBTimeInput.displayName = "JBTimeInput";
export type Props = EventProps &{
  label?: string | null,
  closeButtonText?: string | null,
  value?: string | null,
  className?: string | null,
  placeholder?: string | null,
  message?:string | null,
  validationList?: ValidationItem<ValidationValue>[] | null,
  secondEnabled?: boolean,
  frontalZero?: boolean,
  optionalUnits?: TimeUnits[] | null,
  showPersianNumber?:boolean,
}
export {JBTimeInput};

