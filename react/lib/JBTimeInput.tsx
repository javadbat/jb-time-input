'use client'
import React, {useRef, useImperativeHandle} from 'react';
import 'jb-time-input';
// eslint-disable-next-line no-duplicate-imports
import type {JBTimeInputWebComponent } from 'jb-time-input';
import {type EventProps,useEvents} from './events-hook.js';
import { useJBTimeInputAttribute, type JBTimeInputAttributes } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      'jb-time-input': JBTimeInputType;
    }
    interface JBTimeInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBTimeInputWebComponent>, JBTimeInputWebComponent> {
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
  useImperativeHandle(
    ref,
    () => (element?element.current:undefined),
    [element],
  );
  // placeholder label message are in other Props
  const {onBeforeInput,onBlur,onChange,onEnter,onFocus,onInit,onInput,onKeyDown,onKeyPress,onKeyUp,onLoad, frontalZero,optionalUnits,secondEnabled,showPersianNumber, children, ...otherProps} = props;
  useEvents(element, {onBeforeInput,onBlur,onChange,onEnter,onFocus,onInit,onInput,onKeyDown,onKeyPress,onKeyUp,onLoad});
  useJBTimeInputAttribute(element,{frontalZero,optionalUnits,secondEnabled,showPersianNumber});
  return (
    <jb-time-input ref={element} close-button-text={props.closeButtonText} {...otherProps}>{children}</jb-time-input>
  );
});

JBTimeInput.displayName = "JBTimeInput";
type TimeInputProps = EventProps & JBTimeInputAttributes &{
  label?: string | null,
  closeButtonText?: string | null,
  placeholder?: string | null,
  message?:string | null,
}
export type Props= TimeInputProps & JBElementStandardProps<JBTimeInputWebComponent, keyof TimeInputProps>
export {JBTimeInput};

