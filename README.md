# jb-time-input

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-time-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-time-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-time-input)](https://www.npmjs.com/package/jb-time-input)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-time-input)

`jb-time-input` is a form-associated time input web component with a typed input surface and a touch-friendly `jb-time-picker` popover.

- Accepts and submits 24-hour time strings.
- Supports `HH:mm:ss` and hour/minute-only `HH:mm` mode.
- Opens a visual time picker on focus.
- Supports ArrowUp and ArrowDown to increase or decrease the focused time unit.
- Accepts Persian digits and stores English digits.
- Supports custom validation through `jb-validation`.
- Uses `jb-input`, `jb-popover`, and `jb-time-picker` internally.

## When to use

Use `jb-time-input` when users should type or edit a time value and may also benefit from a visual time picker.

Use [`jb-time-picker`](https://github.com/javadbat/jb-time-picker) when you need only the visual wheel picker without an input field.

## Demo

- [CodePen](https://codepen.io/javadbat/pen/QWdxzKb)
- [Storybook](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbtimeinput)

## Using With JS Frameworks

- [<img src="https://img.shields.io/badge/React.js-jb--time--input%2Freact-000.svg?logo=react&logoColor=%2361DAFB" height="30" />](https://github.com/javadbat/jb-time-input/tree/main/react)

## Installation

```sh
npm i jb-time-input
```

```js
import 'jb-time-input';
```

```html
<jb-time-input label="Time"></jb-time-input>
```

## API reference

`jb-time-input` uses [`jb-input`](https://github.com/javadbat/jb-input), [`jb-popover`](https://github.com/javadbat/jb-popover), and [`jb-time-picker`](https://github.com/javadbat/jb-time-picker) internally. For the full inner input styling and behavior model, see the [`jb-input` API](https://github.com/javadbat/jb-input#api-reference).

### Attributes

| name | type | default | description |
| --- | --- | --- | --- |
| `value` | `string` | `00:00:00` | Time value. Use `HH:mm:ss` when seconds are enabled and `HH:mm` when `second-enabled="false"`. |
| `label` | `string` | `""` | Label forwarded to the inner `jb-input` and host aria label. |
| `message` | `string` | `""` | Helper message forwarded to the inner `jb-input` and host aria description. |
| `name` | `string` | `""` | Form field name forwarded to the inner `jb-input`. |
| `placeholder` | `string` | `""` | Placeholder forwarded to the inner `jb-input`. |
| `close-button-text` | `string` | localized `Close` | Text inside the popover close button. |
| `second-enabled` | `boolean` | `true` | Enables the second unit. Empty attribute and `"true"` mean true; `"false"` means false. |
| `frontal-zero` | `boolean` | `false` | Displays picker numbers below 10 with a leading zero. |
| `optional-units` | `string` | `""` | Comma or space separated picker units shown as optional: `hour`, `minute`, `second`. |
| `show-persian-number` | `boolean` | locale based | Displays Persian digits while `.value` remains English digits. |
| `required` | `boolean \| string` | `false` | Enables required validation. A string value is used as the error message. |
| `error` | `string` | `""` | External validation error message. |
| `disabled` | `boolean` | `false` | Disables the inner input and sets disabled state on the host. |
| `readonly` | `boolean` | `false` | Forwarded to the inner `jb-input`. |
| `autocomplete` | `string` | browser default | Forwarded to the inner `jb-input`. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` style defaults | Forwarded to the inner `jb-input`. |

### Properties

| name | type | readonly | description |
| --- | --- | --- | --- |
| `value` | `string` | no | Canonical time value submitted with forms. |
| `hour` | `number` | no | Hour value from `0` to `24`. |
| `minute` | `number` | no | Minute value from `0` to `59`. |
| `second` | `number \| null` | no | Second value from `0` to `59`, or `null` when seconds are disabled. |
| `secondEnabled` | `boolean` | no | Enables or disables the second unit. |
| `frontalZero` | `boolean` | no | Displays picker numbers below 10 with a leading zero. |
| `optionalUnits` | `Array<'hour' \| 'minute' \| 'second'>` | no | Time picker units shown as optional/muted. |
| `showPersianNumber` | `boolean` | no | Displays Persian digits in the input and picker. |
| `required` | `boolean` | no | Enables required validation. |
| `disabled` | `boolean` | no | Enables or disables the inner input. |
| `validation` | `ValidationHelper<ValidationValue>` | yes | Validation helper from `jb-validation`; set `validation.list` for custom rules. |
| `validationMessage` | `string` | yes | Current validation message from `ElementInternals`. |

### Methods

| name | returns | description |
| --- | --- | --- |
| `checkValidity()` | `boolean` | Runs validation without showing the error message. Dispatches `invalid` when invalid. |
| `reportValidity()` | `boolean` | Runs validation and shows the first error message. Dispatches `invalid` when invalid. |
| `focus()` | `void` | Focuses the inner `jb-input`. |
| `addHour(interval)` | `void` | Adds `interval` to the hour value. Use a negative number to subtract. |
| `addMinute(interval)` | `void` | Adds `interval` to the minute value. Use a negative number to subtract. |
| `addSecond(interval)` | `void` | Adds `interval` to the second value. Use a negative number to subtract. |
| `clearValidationError()` | `void` | Clears the visible validation error. |

### Events

| event | description |
| --- | --- |
| `load` | Dispatched from `connectedCallback` before initialization. |
| `init` | Dispatched from `connectedCallback` after initialization. |
| `input` | Dispatched after user input changes the time value. |
| `beforeinput` | Re-dispatched from the inner input before user input is applied. |
| `change` | Dispatched when the committed time value changes after blur or picker interaction. |
| `focus` | Re-dispatched when the inner input receives focus. |
| `blur` | Re-dispatched when the inner input loses focus. |
| `keydown` | Re-dispatched from the inner input. |
| `keyup` | Re-dispatched from the inner input. |
| `keypress` | Re-dispatched from the inner input. |
| `enter` | Dispatched when Enter is pressed. |
| `invalid` | Dispatched when validation fails. |

## Value

```js
const timeInput = document.querySelector('jb-time-input');

timeInput.value = '14:34:13';
console.log(timeInput.value); // "14:34:13"
console.log(timeInput.hour); // 14
console.log(timeInput.minute); // 34
console.log(timeInput.second); // 13
```

For hour/minute-only input, disable seconds and use `HH:mm`.

```html
<jb-time-input second-enabled="false" value="14:34"></jb-time-input>
```

```js
timeInput.secondEnabled = false;
timeInput.value = '14:34';
```

## Keyboard and picker

When the input is focused, the time picker opens in a popover. Use ArrowUp and ArrowDown to change the time unit at the current caret position.

```js
timeInput.addHour(1);
timeInput.addMinute(-5);
timeInput.addSecond(10);
```

## Validation

`jb-time-input` uses [`jb-validation`](https://github.com/javadbat/jb-validation). Custom validators receive `value`, `displayValue`, and `valueObject`.

```js
const timeInput = document.querySelector('jb-time-input');

timeInput.validation.list = [
  {
    validator: ({ valueObject }) => valueObject.hour >= 9 && valueObject.hour <= 17,
    message: 'Time must be during working hours',
  },
  {
    validator: ({ valueObject }) => valueObject.minute >= 30,
    message: 'Minute must be 30 or later',
  },
];
```

## Display options

```html
<jb-time-input
  frontal-zero
  optional-units="second"
  show-persian-number
></jb-time-input>
```

```js
timeInput.frontalZero = true;
timeInput.optionalUnits = ['second'];
timeInput.showPersianNumber = true;
```

`optionalUnits` only makes picker units visually muted. It does not remove a unit or change `.value`.

## CSS parts and variables

| part | description |
| --- | --- |
| `wrapper` | Root wrapper inside the shadow DOM. |
| `input` | Internal `jb-input`. |
| `popover` | Internal `jb-popover`. |
| `time-picker` | Internal `jb-time-picker`. |
| `close-button` | Popover close button. |

| CSS variable name | description |
| --- | --- |
| `--jb-time-input-margin` | Host component margin. |
| `--jb-time-input-close-button-border-radius` | Popover close button border radius. |

Internal `jb-input`, `jb-popover`, and `jb-time-picker` CSS variables also apply.

```css
jb-time-input {
  --jb-time-input-margin: 8px 0;
  --jb-time-input-close-button-border-radius: 8px;
  --jb-time-picker-hour-color: #2563eb;
}
```

## Accessibility notes

- The component is form-associated and submits `.value`.
- `label` maps to host aria label and the inner `jb-input` label.
- `message` maps to host aria description and the inner helper message.
- The inner input uses `inputmode="none"` and `virtualkeyboardpolicy="manual"` to favor the custom time editing UI.

## Related Docs

- See [`jb-time-input/react`](https://github.com/javadbat/jb-time-input/tree/main/react) if you want to use this component in React.
- See [`jb-input`](https://github.com/javadbat/jb-input), [`jb-time-picker`](https://github.com/javadbat/jb-time-picker), and [`jb-popover`](https://github.com/javadbat/jb-popover) for composed component APIs.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `jb-time-input` once before using `<jb-time-input>`.
- Use `.value` for the canonical submitted value: `HH:mm:ss` when seconds are enabled, `HH:mm` when seconds are disabled.
- Use `second-enabled="false"` or `secondEnabled = false` before setting an hour/minute-only value.
- Use `validation.list` for custom validation; validators receive `{ value, displayValue, valueObject }`.
- Use `show-persian-number` only for display. `.value` remains English digits.
- Use `optional-units` only for visual emphasis in the picker.
- This package includes [`custom-elements.json`](./custom-elements.json) and points to it with the package.json `customElements` field. The field is documented by the Custom Elements Manifest project in [Referencing manifests from npm packages](https://github.com/webcomponents/custom-elements-manifest#referencing-manifests-from-npm-packages).
- In `custom-elements.json`, `exports.kind: "js"` describes JavaScript/TypeScript exports and `exports.kind: "custom-element-definition"` maps the `jb-time-input` tag name to `JBTimeInputWebComponent`.
