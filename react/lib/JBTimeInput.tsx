'use client'
import React, {useRef, useImperativeHandle} from 'react';
import 'jb-time-input';
// eslint-disable-next-line no-duplicate-imports
import type {JBTimeInputWebComponent } from 'jb-time-input';
import {type EventProps,useEvents} from './events-hook.js';
import { useJBTimeInputAttribute, type JBTimeInputAttributes } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';
import './module-declaration.js';

// eslint-disable-next-line react/display-name
const JBTimeInput = React.forwardRef((props:Props, ref)=>{
  const element = useRef<JBTimeInputWebComponent>(null);
  useImperativeHandle(
    ref,
    () => (element?element.current:undefined),
    [element],
  );
  // placeholder label message are in other Props
  const {onBeforeInput,onBlur,onChange,onEnter,onFocus,onInit,onInput,onKeyDown,onKeyPress,onKeyUp,onLoad, frontalZero,optionalUnits,secondEnabled,showPersianNumber,value,validationList,closeButtonText,error,label,message,placeholder, children, ...otherProps} = props;
  useEvents(element, {onBeforeInput,onBlur,onChange,onEnter,onFocus,onInit,onInput,onKeyDown,onKeyPress,onKeyUp,onLoad});
  useJBTimeInputAttribute(element,{frontalZero,optionalUnits,secondEnabled,showPersianNumber,value,validationList});
  return (
    <jb-time-input
      ref={element}
      close-button-text={closeButtonText ?? undefined}
      error={error ?? undefined}
      label={label ?? undefined}
      message={message ?? undefined}
      placeholder={placeholder ?? undefined}
      {...otherProps}
    >
      {children}
    </jb-time-input>
  );
});

JBTimeInput.displayName = "JBTimeInput";
type TimeInputProps = EventProps & JBTimeInputAttributes &{
  label?: string | null,
  closeButtonText?: string | null,
  error?: string | null,
  placeholder?: string | null,
  message?:string | null,
}
export type Props= TimeInputProps & JBElementStandardProps<JBTimeInputWebComponent, keyof TimeInputProps>
export {JBTimeInput};

