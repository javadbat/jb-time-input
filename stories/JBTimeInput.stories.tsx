import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
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

export const Disabled: Story = {
  args: {
    label: 'disabled time',
    value: '12:34:56',
    disabled: true,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const timeInput = getTimeInput(canvasElement);
    const innerInput = getInnerInput(timeInput);
    const nativeInput = getNativeInput(timeInput);

    await waitForInputValue(timeInput, '12:34:56');

    expect(timeInput.disabled).toBe(true);
    expect(innerInput.disabled).toBe(true);
    expect(nativeInput.disabled).toBe(true);

    await userEvent.click(nativeInput);
    await userEvent.type(nativeInput, '23:59:59');

    await waitFor(() => {
      expect(timeInput.value).toBe('12:34:56');
      expect(timeInput.showTimePicker).toBe(false);
      expect(args.onChange).not.toHaveBeenCalled();
    });
  },
};

export const InitialValue: Story = {
  render: (args) => {
    const formRef = useRef<HTMLFormElement>(null);
    return (
      <form ref={formRef}>
        <JBTimeInput {...args} />
        <JBButton onClick={() => formRef.current?.reset()}>Reset</JBButton>
      </form>
    );
  },
  args: {
    label: 'initial value',
    initialValue: '08:30:45',
  },
  play: async ({ canvasElement, args }) => {
    const timeInput = getTimeInput(canvasElement);
    const resetButton = canvasElement.querySelector('jb-button')?.shadowRoot?.querySelector<HTMLButtonElement>('button');

    expect(resetButton).toBeTruthy();

    await waitFor(() => {
      expect(timeInput.initialValue).toBe(args.initialValue);
      expect(timeInput.value).toBe(args.initialValue);
      expect(timeInput.isDirty).toBe(false);
    });

    timeInput.secondEnabled = false;

    await waitFor(() => {
      // Changing time precision is configuration, so the reset baseline must
      // be converted with the live value without making the input dirty.
      expect(timeInput.initialValue).toBe('08:30');
      expect(timeInput.value).toBe('08:30');
      expect(timeInput.isDirty).toBe(false);
    });

    timeInput.secondEnabled = true;

    await waitFor(() => {
      expect(timeInput.initialValue).toBe('08:30:00');
      expect(timeInput.value).toBe('08:30:00');
      expect(timeInput.isDirty).toBe(false);
    });

    // A rejected live value must not prevent a later baseline from initializing
    // a component whose accepted value has never changed.
    timeInput.value = 'invalid-time';
    timeInput.initialValue = '09:15:30';

    await waitFor(() => {
      expect(timeInput.initialValue).toBe('09:15:30');
      expect(timeInput.value).toBe('09:15:30');
      expect(timeInput.isDirty).toBe(false);
    });

    // This story verifies setter precedence and reset behavior. Input editing
    // itself is exercised by the Normal story.
    timeInput.value = '12:34:56';

    await waitFor(() => {
      expect(timeInput.value).toBe('12:34:56');
      expect(timeInput.isDirty).toBe(true);
    });

    timeInput.initialValue = '10:15:30';

    expect(timeInput.initialValue).toBe('10:15:30');
    expect(timeInput.value).toBe('12:34:56');
    expect(timeInput.isDirty).toBe(true);

    await userEvent.click(resetButton!);

    await waitFor(() => {
      expect(timeInput.value).toBe('10:15:30');
      expect(timeInput.initialValue).toBe(timeInput.value);
      expect(timeInput.isDirty).toBe(false);
    });

    timeInput.initialValue = '11:20:30';

    await waitFor(() => {
      expect(timeInput.value).toBe('11:20:30');
      expect(timeInput.isDirty).toBe(false);
    });
  },
};

export const InitialValueDoesNotOverrideValue: Story = {
  args: {
    initialValue: '08:30:45',
    value: '12:34:56',
  },
  play: async ({ canvasElement }) => {
    const timeInput = getTimeInput(canvasElement);

    await waitFor(() => {
      expect(timeInput.initialValue).toBe('08:30:45');
      expect(timeInput.value).toBe('12:34:56');
      expect(timeInput.isDirty).toBe(true);
    });
  },
};

export const ExplicitNullValueDoesNotFallBackToInitialValue: Story = {
  args: {
    initialValue: '08:30:45',
    value: null,
  },
  play: async ({ canvasElement }) => {
    const timeInput = getTimeInput(canvasElement);

    await waitFor(() => {
      expect(timeInput.initialValue).toBe('08:30:45');
      expect(timeInput.value).toBe('00:00:00');
      expect(timeInput.isDirty).toBe(true);
    });
  },
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
