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
- Uses `jb-input`, `jb-popover`, `jb-time-picker`, and `jb-button` internally.
- Framework friendly: use it in pure JavaScript or in frameworks such as React, Vue, and Angular.

## When to use

Use `jb-time-input` when users should type or edit a time value and may also benefit from a visual time picker. See the [basic time input demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--normal) for the default interaction.

Use [`jb-time-picker`](https://github.com/javadbat/jb-time-picker) when you need only the visual wheel picker without an input field.

## Demo

- Explore the [time input examples](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--normal), including [hour/minute-only mode](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--without-second), [Persian digits](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--persian-number), [display options](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--leading-zero), and [validation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--validation-sample).
- Try the standalone [CodePen example](https://codepen.io/javadbat/pen/QWdxzKb).

## Using With JS Frameworks

<a href="https://github.com/javadbat/jb-time-input/tree/main/react" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/React.js-jb--time--input%2Freact-000.svg?logo=react&logoColor=%2361DAFB" height="30" /></a>

Other integrations: <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#angular" target="_blank" rel="noopener noreferrer">Angular</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#vue" target="_blank" rel="noopener noreferrer">Vue</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#nuxt" target="_blank" rel="noopener noreferrer">Nuxt</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#svelte" target="_blank" rel="noopener noreferrer">Svelte</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#sveltekit" target="_blank" rel="noopener noreferrer">SvelteKit</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#solidjs" target="_blank" rel="noopener noreferrer">SolidJS</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#lit" target="_blank" rel="noopener noreferrer">Lit</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#nextjs" target="_blank" rel="noopener noreferrer">Next.js</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#astro" target="_blank" rel="noopener noreferrer">Astro</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#blazor" target="_blank" rel="noopener noreferrer">Blazor</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#server-rendered-templates" target="_blank" rel="noopener noreferrer">Server-rendered templates</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#wordpress" target="_blank" rel="noopener noreferrer">WordPress</a> Â· <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#alpinejs-and-htmx" target="_blank" rel="noopener noreferrer">Alpine.js and HTMX</a>

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

`jb-time-input` uses [`jb-input`](https://github.com/javadbat/jb-input), [`jb-popover`](https://github.com/javadbat/jb-popover), [`jb-time-picker`](https://github.com/javadbat/jb-time-picker), and [`jb-button`](https://github.com/javadbat/jb-button) internally. For the full inner input styling and behavior model, see the [`jb-input` API](https://github.com/javadbat/jb-input#api-reference).

### Attributes

| name | type | default | description |
| --- | --- | --- | --- |
| `value` | `string` | `00:00:00` | Time value. Use `HH:mm:ss` when seconds are enabled and `HH:mm` when `second-enabled="false"`; see the [value demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--with-value). |
| `label` | `string` | `""` | Label forwarded to the inner `jb-input` and host aria label; see the [normal demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--normal). |
| `message` | `string` | `""` | Helper message forwarded to the inner `jb-input` and host aria description. |
| `name` | `string` | `""` | Form field name forwarded to the inner `jb-input`. |
| `placeholder` | `string` | `""` | Placeholder forwarded to the inner `jb-input`; see the [RTL example](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--rtl-sample). |
| `close-button-text` | `string` | localized `Close` | Text inside the popover close button. |
| `second-enabled` | `boolean` | `true` | Enables the second unit. Empty attribute and `"true"` mean true; `"false"` means false; see [without-second mode](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--without-second). |
| `leading-zero` | `boolean` | `false` | Displays picker numbers below 10 with a leading zero; see [leading zero](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--leading-zero). |
| `optional-units` | `string` | `""` | Comma or space separated picker units shown as optional: `hour`, `minute`, `second`; see [optional minute](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--optional-minute). |
| `show-persian-number` | `boolean` | locale based | Displays Persian digits while `.value` remains English digits; see [Persian number](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--persian-number). |
| `required` | `boolean \| string` | `false` | Enables required validation. A string value is used as the error message; see [validation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--validation-sample). |
| `error` | `string` | `""` | External validation error message; see [validation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--validation-sample). |
| `disabled` | `boolean` | `false` | Disables the inner input, prevents input interaction from opening the picker, and sets the disabled state on the host. Empty attribute and `"true"` mean true; `"false"` or a removed attribute means false; see [disabled](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--disabled). |
| `readonly` | `boolean` | `false` | Forwarded to the inner `jb-input`. |
| `autocomplete` | `string` | browser default | Forwarded to the inner `jb-input`. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` style defaults | Forwarded to the inner `jb-input`. |

### Properties

| name | type | readonly | description |
| --- | --- | --- | --- |
| `value` | `string` | no | Canonical time value submitted with forms; see [controlled value](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--with-value). |
| `displayValue` | `string` | yes | Formatted time text shown by the inner input, including localized digits. |
| `initialValue` | `string` | no | Default and reset value. It initializes `value` until the live value is explicitly set; see [initial value](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--initial-value). |
| `isDirty` | `boolean` | yes | `true` when current `value` differs from `initialValue`. |
| `hour` | `number` | no | Hour value from `0` to `24`. |
| `minute` | `number` | no | Minute value from `0` to `59`. |
| `second` | `number \| null` | no | Second value from `0` to `59`, or `null` when seconds are disabled. |
| `secondEnabled` | `boolean` | no | Enables or disables the second unit; see [without-second mode](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--without-second). |
| `leadingZero` | `boolean` | no | Displays picker numbers below 10 with a leading zero; see [leading zero](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--leading-zero). |
| `optionalUnits` | `Array<'hour' \| 'minute' \| 'second'>` | no | Time picker units shown as optional/muted; see [optional minute](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--optional-minute). |
| `showPersianNumber` | `boolean` | no | Displays Persian digits in the input and picker; see [Persian number](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--persian-number). |
| `isOpen` | `boolean` | no | Opens or closes the internal time picker popover. |
| `required` | `boolean` | no | Enables required validation; see [validation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--validation-sample). |
| `disabled` | `boolean` | no | Enables or disables the inner input and host disabled state; see [disabled](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--disabled). |
| `validation` | `ValidationHelper<ValidationValue>` | yes | Validation helper from `jb-validation`; set `validation.list` for custom rules. |
| `validationMessage` | `string` | yes | Current validation message from `ElementInternals`. |

### Methods

| name | returns | description |
| --- | --- | --- |
| `checkValidity()` | `boolean` | Runs validation without showing the error message. Dispatches `invalid` when invalid; see [validation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--validation-sample). |
| `reportValidity()` | `boolean` | Runs validation and shows the first error message. Dispatches `invalid` when invalid; see [validation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--validation-sample). |
| `reset()` | `void` | Restores `initialValue` and clears displayed validation. |
| `open()` | `void` | Opens the internal time picker popover. |
| `close()` | `void` | Closes the internal time picker popover. |
| `focus()` | `void` | Focuses the inner `jb-input`; see [keyboard and picker](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--normal). |
| `addHour(interval)` | `void` | Adds `interval` to the hour value. Use a negative number to subtract; see [time editing](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--with-value). |
| `addMinute(interval)` | `void` | Adds `interval` to the minute value. Use a negative number to subtract; see [time editing](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--with-value). |
| `addSecond(interval)` | `void` | Adds `interval` to the second value. Use a negative number to subtract; see [time editing](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--with-value). |
| `clearValidationError()` | `void` | Clears the visible validation error. |

### Events

| event | description |
| --- | --- |
| `load` | Dispatched from `connectedCallback` before initialization; see the [event demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page). |
| `init` | Dispatched from `connectedCallback` after initialization; see the [event demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page). |
| `input` | Dispatched after user input changes the time value; see [events](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page). |
| `beforeinput` | Re-dispatched from the inner input before user input is applied; see [events](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page). |
| `change` | Dispatched when the committed time value changes after blur or picker interaction; see [events](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page). |
| `focus` | Re-dispatched when the inner input receives focus; see [events](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page). |
| `blur` | Re-dispatched when the inner input loses focus; see [events](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page). |
| `keydown` | Re-dispatched from the inner input; see [events](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page). |
| `keyup` | Re-dispatched from the inner input; see [events](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page). |
| `keypress` | Re-dispatched from the inner input; see [events](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page). |
| `enter` | Dispatched when Enter is pressed; see the [Enter event demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--event-test-page). |
| `invalid` | Dispatched when validation fails; see [validation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--validation-sample). |

## Value

Use `.value` for the canonical English-digit time; see the [value demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--with-value) and [hour/minute-only demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--without-second).

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

Focus opens the picker, while ArrowUp/ArrowDown and the `addHour`/`addMinute`/`addSecond` methods adjust the active unit; see the [normal picker demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--normal).

When the input is focused, the time picker opens in a popover. Use ArrowUp and ArrowDown to change the time unit at the current caret position.

```js
timeInput.addHour(1);
timeInput.addMinute(-5);
timeInput.addSecond(10);
```

## Disabled state

Use `disabled` to prevent focus, editing, picker opening, and user-generated value changes; see the [disabled demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--disabled).

Use the `disabled` attribute or property to prevent focus, editing, picker opening, and user-generated value changes.

```html
<jb-time-input label="Time" value="12:34:56" disabled></jb-time-input>
```

```js
timeInput.disabled = true;
```

## Validation

Use `required`, `error`, and `validation.list` for validation; see the [validation demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--validation-sample).

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

Use `leadingZero`, `optionalUnits`, and `showPersianNumber` to control picker presentation; see [leading zero](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--leading-zero), [optional units](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--optional-minute), and [Persian digits](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput--persian-number).

```html
<jb-time-input
  leading-zero
  optional-units="second"
  show-persian-number
></jb-time-input>
```

```js
timeInput.leadingZero = true;
timeInput.optionalUnits = ['second'];
timeInput.showPersianNumber = true;
```

`optionalUnits` only makes picker units visually muted. It does not remove a unit or change `.value`.

## CSS parts and variables

For complete styling guidance, live examples, CSS parts, custom states, and copyable style recipes, see [Styling](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbtimeinput-styling) and the [style gallery](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbtimeinput-style--gallery).

`jb-time-input` composes `jb-input`, `jb-popover`, `jb-time-picker`, and `jb-button`. Style the exported `close-button` part with `--jb-button-*` variables instead of the removed `--jb-time-input-close-button-*` variables.

## Accessibility notes

- The component is form-associated and submits `.value`.
- `label` maps to host aria label and the inner `jb-input` label.
- `message` maps to host aria description and the inner helper message.
- `disabled` disables the nested native input and exposes the host `disabled` custom state.
- The inner input uses `inputmode="none"` and `virtualkeyboardpolicy="manual"` to favor the custom time editing UI.

## Related Docs

- See [`jb-time-input/react`](https://github.com/javadbat/jb-time-input/tree/main/react) if you want to use this component in React.
- See [`jb-input`](https://github.com/javadbat/jb-input), [`jb-time-picker`](https://github.com/javadbat/jb-time-picker), [`jb-popover`](https://github.com/javadbat/jb-popover), and [`jb-button`](https://github.com/javadbat/jb-button) for composed component APIs.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `jb-time-input` once before using `<jb-time-input>`.
- Use `.value` for the canonical submitted value: `HH:mm:ss` when seconds are enabled, `HH:mm` when seconds are disabled.
- Use `second-enabled="false"` or `secondEnabled = false` before setting an hour/minute-only value.
- Use `validation.list` for custom validation; validators receive `{ value, displayValue, valueObject }`.
- Use `show-persian-number` only for display. `.value` remains English digits.
- Use `optional-units` only for visual emphasis in the picker.
- Use `disabled` as a boolean property in JavaScript; in markup, use `disabled`, `disabled="true"`, or remove the attribute to enable the input.
- This package includes [`custom-elements.json`](./custom-elements.json) and points to it with the package.json `customElements` field. The field is documented by the Custom Elements Manifest project in [Referencing manifests from npm packages](https://github.com/webcomponents/custom-elements-manifest#referencing-manifests-from-npm-packages).
- In `custom-elements.json`, `exports.kind: "js"` describes JavaScript/TypeScript exports and `exports.kind: "custom-element-definition"` maps the `jb-time-input` tag name to `JBTimeInputWebComponent`.
