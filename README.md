# jb-time-input web component

in jb-time-input you can create a input specialy for time the advantage is:

- validation so it only accept time value and not any other invalid format
- support arrow key to increase and decrease time value
- time picker
- support both rtl and ltr direction
- easy to use and can be used in any js framework like React, Vue, Angular,etc
- can be used in purejs without any other dependancy
- responsive

## instruction

### installation and usage

with npm:

```command
    npm i jb-time-input
```

```javascript
    import 'jb-time-input'
```

```HTML
    <div>
        <jb-time-input/>
    <div>
```

### event

like any other javascript DOM element you can bind event to web component with `DOM.addEventListener` the supported event is:

```javascript
    //when defualt property are defined best time for impl your config
    document.querySelector('jb-date-input').addEventListener('init',this.onCalendarElementInitiated);

    //when calendar init all property and function and dom created and bind successully
    document.querySelector('jb-date-input').addEventListener('load',this.onCalendarElementLoaded);

    //keyboard event
    document.querySelector('jb-time-input').addEventListener('keydown',()=>{});
    document.querySelector('jb-time-input').addEventListener('keyup',()=>{});
    document.querySelector('jb-time-input').addEventListener('keypress',()=>{});
    document.querySelector('jb-time-input').addEventListener('change',()=>{});
    // when user press enter on type good for situation you want so submit form or call search function on user press enter. 
    document.querySelector('jb-time-input').addEventListener('enter',()=>{});
    //focus event
    document.querySelector('jb-time-input').addEventListener('focus',()=>{});
    document.querySelector('jb-time-input').addEventListener('blur',()=>{});
```

### set value

to set value of time input you have 2 way:

- by html as a attribute:

```html
<jb-time-input value="14:34:63">
```

- by javascript

```javascript
    document.querySelector('jb-date-input').value = "01:11:12";
```

### set custom style

in some cases in your project you need to change defualt style of web-component for example you need zero margin or different border-radius and etc.
if you want to set a custom style to this web-component all you need is to set this css variable in parent scope of web-component.
| css variable name                       | description                                                                                              |
| -------------                           | -------------                                                                                            |
| --jb-time-input-label-font-size         | change font size of web component label default is `0.8em`                                               |
| --jb-time-input-margin                  | outer margin of web component default is `12px 0`                                                        |
| --jb-time-input-height                  | height of input element default is `40px`                                                                |
| --jb-time-input-border-color            | input box border color default is `f7f6f6`                                                               |
| --jb-time-input-bgcolor                 | background color of input box default is `#f7f6f6`                                                       |
| --jb-time-input-border-botton-width     | border bottom width on input box default is `3px`                                                        |
| --jb-time-input-border-radius           | input box border radius  default is `16px`                                                               |
| --jb-time-input-border-color-focus      | input box border-color when user focus                                                                   |
| --jb-time-input-input-padding           | inner padding of input element default is `2px 12px 0 12px`                                              |
| --jb-time-input-value-font-size         | font size of input value default is `1.1em`                                                              |
| --jb-time-input-value-color             | color of input value default is `#1f1735`                                                                |
| --jb-time-input-placeholder-color       | color of input placeholder                                                                               |
| --jb-time-input-placeholder-font-size   | font size of placeholder                                                                                 |
| --jb-time-input-message-font-size       | message and error message under input box font size defaulyt is `0.7em`                                  |
| --jb-time-input-message-box-display     | if you want to hide a error message under the inputbox and show message in your own way set it to `none` |
| --jb-time-input-message-error-color     | color of message error default is `red` but you can change it to what you want                           |
