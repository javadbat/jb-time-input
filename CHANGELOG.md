# Changelog

## Unreleased

### Added

- Forwarded internal input and popover parts plus time-picker parts using `picker-*` prefixes, including `picker-time-indicators`, `picker-time-text`, and unit text parts.

### Changed

- Removed child class injection from style stories and standardized composed theming on the time-input host and exported parts.
- Refined Aurora popover elevation through the shared popover shadow API.

## 1.7.0

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
