# jb-time-input React component

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-time-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-time-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-time-input-react)](https://www.npmjs.com/package/jb-time-input-react)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-time-input)

React wrapper for [`jb-time-input`](https://github.com/javadbat/jb-time-input). The wrapper imports and registers the underlying web component.

## Demo

- [CodeSandbox preview](https://3f63dj.csb.app/samples/jb-time-input)
- [CodeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBTimeInput.tsx)
- [Storybook](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbtimeinput)

## Installation

```sh
npm i jb-time-input
```

```jsx
import { JBTimeInput } from 'jb-time-input/react';

<JBTimeInput label="Time" />;
```

## Props

| prop | type | description |
| --- | --- | --- |
| `value` | `string` | Canonical time value. Use `HH:mm:ss` with seconds and `HH:mm` when `secondEnabled={false}`. |
| `label` | `string` | Label forwarded to the web component. |
| `message` | `string` | Helper message forwarded to the web component. |
| `placeholder` | `string` | Placeholder forwarded to the inner input. |
| `closeButtonText` | `string` | Text inside the picker popover close button. |
| `validationList` | `ValidationItem<ValidationValue>[]` | Custom validators from `jb-validation`. |
| `secondEnabled` | `boolean` | Enables or disables the second unit. |
| `frontalZero` | `boolean` | Displays picker numbers below 10 with a leading zero. |
| `optionalUnits` | `Array<'hour' \| 'minute' \| 'second'>` | Picker units displayed as optional/muted. |
| `showPersianNumber` | `boolean` | Displays Persian digits while keeping `.value` in English digits. |

## Controlled value

```jsx
const [value, setValue] = useState('14:34:13');

<JBTimeInput
  value={value}
  onChange={(event) => setValue(event.target.value)}
/>;
```

For hour/minute-only input:

```jsx
<JBTimeInput secondEnabled={false} value="14:34" />;
```

## Validation

```jsx
const validationList = [
  {
    validator: ({ valueObject }) => valueObject.hour >= 9 && valueObject.hour <= 17,
    message: 'Time must be during working hours',
  },
];

<JBTimeInput validationList={validationList} />;
```

## Events

| prop | description |
| --- | --- |
| `onLoad` | Called when the web component dispatches `load`. |
| `onInit` | Called when the web component dispatches `init`. |
| `onInput` | Called after user input changes the value. |
| `onBeforeInput` | Called before user input is applied. |
| `onChange` | Called when the committed value changes. |
| `onFocus` | Called when the inner input receives focus. |
| `onBlur` | Called when the inner input loses focus. |
| `onKeyDown` | Keyboard event from the inner input. |
| `onKeyUp` | Keyboard event from the inner input. |
| `onKeyPress` | Keyboard event from the inner input. |
| `onEnter` | Called when Enter is pressed. |

## Styling

The React component uses the same CSS variables and CSS parts as the web component. For styling details, see [`jb-time-input`](https://github.com/javadbat/jb-time-input).

## Shared Documentation

For web-component behavior, methods, validation, and CSS variables, see [`jb-time-input`](https://github.com/javadbat/jb-time-input).

## Related Docs

- See [`jb-time-input`](https://github.com/javadbat/jb-time-input) if you want to use this component as a pure JavaScript web component.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `JBTimeInput` from `jb-time-input/react`; the wrapper imports and registers the web component.
- Use React prop names such as `secondEnabled`, `frontalZero`, `optionalUnits`, and `showPersianNumber`.
- Use `event.target.value` in `onChange` for the canonical English-digit value.
- Set `secondEnabled={false}` before using `HH:mm` values.
- Use `validationList`, not `validation.list`, in React props.
