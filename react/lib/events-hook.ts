import { useEvent } from "jb-core/react";
import { RefObject } from "react";
import type { JBTimeInputWebComponent, JBTimeInputEventType } from 'jb-time-input';

export type EventProps = {
  /**
   * when component loaded, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
   */
  onLoad?: (e: JBTimeInputEventType<CustomEvent>) => void,
  /**
 * when all property set and ready to use, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
 */
  onInit?: (e: JBTimeInputEventType<CustomEvent>) => void,
  onChange?: (e: JBTimeInputEventType<Event>) => void,
  onFocus?: (e: JBTimeInputEventType<FocusEvent>) => void,
  onBlur?: (e: JBTimeInputEventType<FocusEvent>) => void,
  onKeyDown?: (e: JBTimeInputEventType<KeyboardEvent>) => void,
  onKeyUp?: (e: JBTimeInputEventType<KeyboardEvent>) => void,
  onInput?: (e: JBTimeInputEventType<InputEvent>) => void,
  onBeforeinput?: (e: JBTimeInputEventType<InputEvent>) => void,
  onKeyPress?: (e: JBTimeInputEventType<KeyboardEvent>) => void,
  /**
   * when user press enter key
   */
  onEnter?: (e: JBTimeInputEventType<KeyboardEvent>) => void,
  onBeforeInput?: (e: JBTimeInputEventType<InputEvent>) => void,

}
export function useEvents(element: RefObject<JBTimeInputWebComponent>, props: EventProps) {
  useEvent(element, 'load', props.onLoad, true);
  useEvent(element, 'init', props.onInit, true);
  useEvent(element, 'change', props.onChange);
  useEvent(element, 'keydown', props.onKeyDown);
  useEvent(element, 'input', props.onInput);
  useEvent(element, 'keyup', props.onKeyUp);
  useEvent(element, 'focus', props.onFocus);
  useEvent(element, 'blur', props.onBlur);
  useEvent(element, 'beforeinput', props.onBeforeinput);
  useEvent(element, 'keypress', props.onKeyPress);
  useEvent(element, 'enter', props.onEnter);
}