import type { JBInputWebComponent } from 'jb-input';
import type { JBTimePickerWebComponent, TimeUnits } from 'jb-time-picker';
import type { JBTimeInputWebComponent } from 'jb-time-input';
import { expect, waitFor } from 'storybook/test';

type TimeStep = 'substitutePrevTime' | 'prevTime' | 'currentTime' | 'nextTime' | 'substituteNextTime';

const timeStepClassMap: Record<TimeStep, string> = {
  substitutePrevTime: 'substitute-prev-time',
  prevTime: 'prev-time',
  currentTime: 'current-time',
  nextTime: 'next-time',
  substituteNextTime: 'substitute-next-time',
};

export function getTimeInput(canvasElement: HTMLElement, index = 0) {
  const timeInput = canvasElement.querySelectorAll<JBTimeInputWebComponent>('jb-time-input')[index];
  expect(timeInput).toBeTruthy();
  expect(timeInput!.shadowRoot).toBeTruthy();
  return timeInput!;
}

export function getInnerInput(timeInput: JBTimeInputWebComponent) {
  const input = timeInput.elements.input as JBInputWebComponent;
  expect(input).toBeTruthy();
  expect(input.shadowRoot).toBeTruthy();
  return input;
}

export function getNativeInput(timeInput: JBTimeInputWebComponent) {
  const nativeInput = getInnerInput(timeInput).shadowRoot?.querySelector<HTMLInputElement>('input');
  expect(nativeInput).toBeTruthy();
  return nativeInput!;
}

export function getMessageText(timeInput: JBTimeInputWebComponent) {
  return getInnerInput(timeInput).shadowRoot?.querySelector<HTMLElement>('.message-box')?.textContent ?? '';
}

export function getTimePicker(timeInput: JBTimeInputWebComponent) {
  const picker = timeInput.elements.timePicker.component as JBTimePickerWebComponent;
  expect(picker).toBeTruthy();
  expect(picker.shadowRoot).toBeTruthy();
  return picker;
}

export function getTimeText(timePicker: JBTimePickerWebComponent, timeUnit: TimeUnits, timeStep: TimeStep) {
  const timeText = timePicker.shadowRoot?.querySelector<SVGTextElement>(
    `.${timeStepClassMap[timeStep]} .${timeUnit}-text`,
  );
  expect(timeText).toBeTruthy();
  return timeText!;
}

export async function waitForInputValue(timeInput: JBTimeInputWebComponent, value: string) {
  await waitFor(() => {
    expect(timeInput.value).toBe(value);
    expect(getNativeInput(timeInput).value).toBe(getInnerInput(timeInput).displayValue);
  });
}
