# jb-time-input React component

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-time-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-time-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-time-input-react)](https://www.npmjs.com/package/jb-time-input-react)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-time-input)

React wrapper for [`jb-time-input`](https://github.com/javadbat/jb-time-input). The wrapper imports and registers the underlying web component.

## Demo

Explore the [basic time input demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--normal), [hour/minute-only mode](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--without-second), [Persian digits](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--persian-number), [display options](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--frontal-zero), and [validation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--validation-sample). For standalone code, use the [CodeSandbox preview](https://3f63dj.csb.app/samples/jb-time-input) or [CodeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBTimeInput.tsx).

## Installation

```sh
npm i jb-time-input
```

```jsx
import { JBTimeInput } from 'jb-time-input/react';

<JBTimeInput label="Time" />;
```

## When to use

Use `JBTimeInput` when a React form needs typed time entry plus picker behavior, validation, optional seconds, Persian digit display, or form value support. See the [normal time input](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--normal).

Use `JBTimePicker` when you need only the inline time picker without the input field.

## Props

| prop | type | description |
| --- | --- | --- |
| `value` | `string` | Canonical time value. Use `HH:mm:ss` with seconds and `HH:mm` when `secondEnabled={false}`; see [controlled value](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--with-value). |
| `label` | `string` | Label forwarded to the web component; see the [normal demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--normal). |
| `message` | `string` | Helper message forwarded to the web component. |
| `placeholder` | `string` | Placeholder forwarded to the inner input; see the [RTL example](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--rtl-sample). |
| `closeButtonText` | `string` | Text inside the picker popover close button. |
| `validationList` | `ValidationItem<ValidationValue>[]` | Custom validators from `jb-validation`; see [validation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--validation-sample). |
| `disabled` | `boolean` | Disables the nested native input and prevents focus, editing, picker opening, and user-generated value changes; see [disabled](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--disabled). |
| `secondEnabled` | `boolean` | Enables or disables the second unit; see [without-second mode](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--without-second). |
| `frontalZero` | `boolean` | Displays picker numbers below 10 with a leading zero; see [frontal zero](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--frontal-zero). |
| `optionalUnits` | `Array<'hour' \| 'minute' \| 'second'>` | Picker units displayed as optional/muted; see [optional units](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--optional-minute). |
| `showPersianNumber` | `boolean` | Displays Persian digits while keeping `.value` in English digits; see [Persian digits](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--persian-number). |

## Controlled value

Use a controlled `value` with `onChange`; see the [controlled value demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--with-value) and [initial value](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--initial-value).

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

## Keyboard and picker

Focus opens the picker and ArrowUp/ArrowDown adjust the active unit; see the [normal picker demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--normal).

The input supports keyboard entry and an attached time picker. Set `secondEnabled={false}` before using `HH:mm` values.

## Disabled state

Use `disabled` to prevent focus, editing, picker opening, and user-generated changes; see the [disabled demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--disabled).

```jsx
<JBTimeInput label="Time" value="12:34:56" disabled />;
```

Setting `disabled={false}` removes the web component's disabled attribute and re-enables the nested native input.

## Validation

Pass `validationList` for custom rules and use required/error props from the underlying component; see the [validation demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--validation-sample).

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

The wrapper forwards input, keyboard, focus, blur, change, and Enter events; see the [event demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page).

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

## Display options

Use `frontalZero`, `optionalUnits`, and `showPersianNumber` to control picker presentation; see [frontal zero](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--frontal-zero), [optional units](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--optional-minute), and [Persian digits](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--persian-number).

Use `frontalZero`, `optionalUnits`, and `showPersianNumber` to control picker display. The canonical value remains English digits.

## Styling

The React component uses the same CSS variables and CSS parts as the web component. See the shared [web-component styling guidance](../README.md#css-parts-and-variables) and [style gallery](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput-style--gallery).

## CSS parts and variables

Use the same CSS parts and variables as the web component. The `Styling` section above shows the React class-based pattern; see the [style gallery](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput-style--gallery).

## Accessibility notes

Set `label` for the field name. Use `message` for time-format hints, especially when seconds are disabled or optional units are shown. The `disabled` prop is forwarded to the web component and its nested native input. See the [normal](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--normal) and [RTL](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--rtl-sample) demos.

## RTL

Use the same time format and labels in right-to-left layouts; see the [RTL demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--rtl-sample).

## Shared Documentation

For web-component behavior, methods, validation, and CSS variables, see [`jb-time-input`](https://github.com/javadbat/jb-time-input).

## Related Docs

- See [`jb-time-input`](https://github.com/javadbat/jb-time-input) if you want to use this component as a pure JavaScript web component.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `JBTimeInput` from `jb-time-input/react`; the wrapper imports and registers the web component.
- Use React prop names such as `secondEnabled`, `frontalZero`, `optionalUnits`, and `showPersianNumber`.
- Use the boolean `disabled` prop; the wrapper adds or removes the web component's `disabled` attribute.
- Use `event.target.value` in `onChange` for the canonical English-digit value.
- Set `secondEnabled={false}` before using `HH:mm` values.
- Use `validationList`, not `validation.list`, in React props.
