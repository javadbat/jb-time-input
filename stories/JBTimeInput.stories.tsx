import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { JBTimeInput } from 'jb-time-input/react';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import {
  getInnerInput,
  getMessageText,
  getNativeInput,
  getTimeInput,
  getTimePicker,
  getTimeText,
  waitForInputValue,
} from './test-utils';
import { JBButton } from 'jb-button/react';

const meta = {
  title: "Components/form elements/Inputs/JBTimeInput",
  component: JBTimeInput,
} satisfies Meta<typeof JBTimeInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: 'time',
  },
  play: async ({ canvasElement }) => {
    const timeInput = getTimeInput(canvasElement);

    await waitForInputValue(timeInput, '00:00:00');

    await userEvent.click(getNativeInput(timeInput));

    await waitFor(() => {
      expect(timeInput.showTimePicker).toBe(true);
      expect(getTimePicker(timeInput).value).toEqual({ hour: 0, minute: 0, second: 0 });
    });
  }
};

export const PersianNumber: Story = {
  args: {
    label: 'time',
    showPersianNumber: true
  },
  play: async ({ canvasElement }) => {
    const timeInput = getTimeInput(canvasElement);
    const nativeInput = getNativeInput(timeInput);
    const innerInput = getInnerInput(timeInput);

    await userEvent.click(nativeInput);
    nativeInput.setSelectionRange(0, nativeInput.value.length);
    await userEvent.type(nativeInput, '123456');

    await waitFor(() => {
      expect(timeInput.value).toBe('12:34:56');
      expect(innerInput.displayValue).toBe('\u06F1\u06F2:\u06F3\u06F4:\u06F5\u06F6');
      expect(nativeInput.value).toBe('\u06F1\u06F2:\u06F3\u06F4:\u06F5\u06F6');
    });
  }
};

export const withValue: Story = {
  args: {
    label: 'time',
    value: "13:24:48"
  },
  play: async ({ canvasElement }) => {
    const timeInput = getTimeInput(canvasElement);
    const timePicker = getTimePicker(timeInput);

    await waitForInputValue(timeInput, '13:24:48');

    await waitFor(() => {
      expect(timePicker.value).toEqual({ hour: 13, minute: 24, second: 48 });
    });
  }
};


export const RTLSample: Story = {
  args: {
    label: 'زمان',
    closeButtonText: 'بستن'
  },
  parameters: {
    themes: {
      themeOverride: 'rtl'
    }
  },
  play: async ({ canvasElement }) => {
    const timeInput = getTimeInput(canvasElement);

    await waitFor(() => {
      expect(getInnerInput(timeInput).getAttribute('label')).toBe('زمان');
      expect(timeInput.elements.timePicker.closeButton.textContent).toBe('بستن');
    });
  },
};

export const WebComponentEventTestPage:Story = {
  render: () => (
    <div>
      <jb-time-input label="date"></jb-time-input>
      <h3>without second</h3>
      <jb-time-input second-enabled="false"></jb-time-input>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const timeInput = getTimeInput(canvasElement);
    const withoutSecondTimeInput = getTimeInput(canvasElement, 1);
    const events: string[] = [];

    timeInput.addEventListener('focus', () => events.push('focus'));
    timeInput.addEventListener('beforeinput', () => events.push('beforeinput'));
    timeInput.addEventListener('input', () => events.push('input'));
    timeInput.addEventListener('keydown', () => events.push('keydown'));
    timeInput.addEventListener('keypress', () => events.push('keypress'));
    timeInput.addEventListener('keyup', () => events.push('keyup'));
    timeInput.addEventListener('enter', () => events.push('enter'));
    timeInput.addEventListener('change', () => events.push('change'));
    timeInput.addEventListener('blur', () => events.push('blur'));

    const nativeInput = getNativeInput(timeInput);

    await userEvent.click(nativeInput);
    nativeInput.setSelectionRange(0, nativeInput.value.length);
    await userEvent.type(nativeInput, '123456{Enter}');
    nativeInput.blur();

    await waitFor(() => {
      expect(timeInput.value).toBe('12:34:56');
      expect(events).toEqual(expect.arrayContaining([
        'focus',
        'beforeinput',
        'input',
        'keydown',
        'keypress',
        'keyup',
        'enter',
        'change',
        'blur',
      ]));
    });

    await waitFor(() => {
      expect(withoutSecondTimeInput.secondEnabled).toBe(false);
      expect(withoutSecondTimeInput.value).toBe('00:00');
      expect(withoutSecondTimeInput.second).toBeNull();
    });
  }
};

export const EventTestPage:Story = {
  render: (args) => {
    const [value, setValue] = useState('00:00:00');
    return (
      <div>
        <JBTimeInput
          {...args}
          label="event test"
          value={value}
          onChange={(event) => {
            args.onChange?.(event);
            setValue(event.target.value);
          }}
        />
        <span>value:{value}</span>
        <JBButton onClick={() => setValue('12:48:00')}>set value to 12:48</JBButton>
      </div>
    );
  },
  args: {
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const timeInput = getTimeInput(canvasElement);
    const setValueButton = Array.from(canvasElement.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('12:48')
    );

    expect(setValueButton).toBeTruthy();

    await userEvent.click(setValueButton!);

    await waitFor(() => {
      expect(timeInput.value).toBe('12:48:00');
      expect(canvasElement.textContent).toContain('value:12:48:00');
    });

    const nativeInput = getNativeInput(timeInput);

    await userEvent.click(nativeInput);
    nativeInput.setSelectionRange(0, nativeInput.value.length);
    await userEvent.type(nativeInput, '132500');
    nativeInput.blur();

    await waitFor(() => {
      expect(timeInput.value).toBe('13:25:00');
      expect(args.onChange).toHaveBeenCalled();
      expect(canvasElement.textContent).toContain('value:13:25:00');
    });
  },
};

export const ValidationSample:Story = {
  args:{
    label:'time:',
    validationList:[
      {
        validator:/^[1][1234].*$/g,
        message:"hour  must be between 11 and 14"
      },{
        validator:({displayValue,value,valueObject})=>{
          if(valueObject.minute && valueObject.minute<30){
            return false;
          }
          return true;
        },
        message:'minute must be 30 to 60'
      }
    ]
  },
  play: async ({ canvasElement }) => {
    const timeInput = getTimeInput(canvasElement);

    await waitFor(() => {
      expect(timeInput.validation.list.length).toBe(2);
    });

    timeInput.value = '12:20:00';
    expect(timeInput.reportValidity()).toBe(false);

    await waitFor(() => {
      expect(getMessageText(timeInput)).toBe('minute must be 30 to 60');
      expect(timeInput.validationMessage).toBe('minute must be 30 to 60');
    });

    timeInput.value = '12:30:00';
    expect(timeInput.reportValidity()).toBe(true);

    await waitFor(() => {
      expect(getMessageText(timeInput)).not.toBe('minute must be 30 to 60');
    });
  }
};
export const withoutSecond:Story = {
  args:{
    label:'time',
    secondEnabled:false
  },
  play: async ({ canvasElement }) => {
    const timeInput = getTimeInput(canvasElement);
    const nativeInput = getNativeInput(timeInput);

    await waitForInputValue(timeInput, '00:00');

    expect(timeInput.secondEnabled).toBe(false);
    expect(timeInput.second).toBeNull();
    expect(getTimePicker(timeInput).secondEnabled).toBe(false);

    await userEvent.click(nativeInput);
    nativeInput.setSelectionRange(0, nativeInput.value.length);
    await userEvent.type(nativeInput, '123456');

    await waitFor(() => {
      expect(timeInput.value).toBe('12:34');
      expect(timeInput.value.split(':')).toHaveLength(2);
      expect(timeInput.second).toBeNull();
    });
  }
};

export const FrontalZero:Story = {
  args:{
    label:'time',
    closeButtonText:'بستن',
    frontalZero:true
  },
  play: async ({ canvasElement }) => {
    const timeInput = getTimeInput(canvasElement);
    const timePicker = getTimePicker(timeInput);

    await waitFor(() => {
      expect(timeInput.frontalZero).toBe(true);
      expect(getTimeText(timePicker, 'hour', 'currentTime').textContent).toBe('00');
      expect(getTimeText(timePicker, 'minute', 'currentTime').textContent).toBe('00');
      expect(getTimeText(timePicker, 'second', 'currentTime').textContent).toBe('00');
    });
  }
};

export const OptionalMinute:Story = {
  args:{
    label:'زمان',
    closeButtonText:'بستن',
    optionalUnits:['minute']
  },
  play: async ({ canvasElement }) => {
    const timeInput = getTimeInput(canvasElement);
    const timePicker = getTimePicker(timeInput);

    await waitFor(() => {
      expect(timeInput.optionalUnits).toEqual(['minute']);
      expect(getTimeText(timePicker, 'minute', 'currentTime').classList.contains('--optional')).toBe(true);
      expect(getTimeText(timePicker, 'hour', 'currentTime').classList.contains('--optional')).toBe(false);
    });
  }
};
