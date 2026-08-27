# Changelog

## [2.5.0] - 2026-08-27

### Changed

- Made custom-element module evaluation SSR-safe by extending `JBBaseComponent` where needed and registering elements through the shared `defineWebComponent()` helper; raised the minimum `jb-core` version to `0.35.0`.
- update dependency

## [2.4.0] - 2026-07-30

### Added

- Added the standard `formDisabledCallback()` to synchronize the component disabled state with disabled forms and fieldsets.

## [2.3.0] - 2026-07-29

### Added

- add `implements JBFormInputStandards` to web-component
- add name setter to properties


## [2.2.0] - 2026-07-29

### Added

- fix disabled works on react component
- Added Storybook interaction coverage for initial-value initialization, live-value precedence, explicit `null`, and native form reset.

### Changed

- Added `initialValue` as the default and reset time; it seeds `value` only until the live value is explicitly set.
- Updated the React wrapper so an omitted `value` does not overwrite `initialValue`, while explicit `null` remains an explicit live value.

## [2.0.1] - 2026-07-19

### Added

- Forwarded internal input and popover parts plus time-picker parts using `picker-*` prefixes, including `picker-time-indicators`, `picker-time-text`, and unit text parts.

### Changed

- Removed child class injection from style stories and standardized composed theming on the time-input host and exported parts.
- Refined Aurora popover elevation through the shared popover shadow API.
- Replaced the native popover close button with `jb-button` and updated style recipes to use `--jb-button-*` variables on the exported `close-button` part.
- Added complete popover shell styling to every time-input theme recipe.
- Limited the popover close button to mobile viewports at 30rem and below.
- Prevented the internal mobile popover host from widening time inputs beyond their container.
- Kept the embedded time picker synchronized with programmatic input values and browser-provided values when opening.

### Removed

- Removed the legacy `--jb-time-input-close-button-*` variables; use the `JBButton` styling API through `::part(close-button)` instead.

## [1.7.0]

### Added

- Added Storybook styling documentation and reusable style recipes for Carbon, Aurora, Forest, Sunset, Porcelain, Candy, Terminal, Material, Fluent, Bootstrap, Cupertino, and Ant Design themes.
- Added `open`, `invalid`, and `disabled` custom-state documentation for styling.
- Added public close-button and popover stacking CSS variables:
  - `--jb-time-input-popover-z-index`
  - `--jb-time-input-close-button-padding`
  - `--jb-time-input-close-button-color`
  - `--jb-time-input-close-button-bg-color`
  - `--jb-time-input-close-button-bg-color-hover`
  - `--jb-time-input-close-button-border-color`
  - `--jb-time-input-close-button-font-weight`
  - `--jb-time-input-close-button-display`

### Changed

- Updated `jb-time-input` shell styling to use public variables instead of hardcoded close-button colors and spacing.
