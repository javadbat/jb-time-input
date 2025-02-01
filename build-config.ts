import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-time-input",
    path: "./lib/jb-time-input.ts",
    outputPath: "./dist/jb-time-input.js",
    external: ["jb-time-picker", "jb-input", "jb-popover", "jb-validation"],
    umdName: "JBTimeInput",
    globals: {
      "jb-time-picker": "JBTimePicker",
      "jb-input": "JBInput",
      "jb-popover": "JBPopover",
      "jb-validation": "JBValidation"
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-time-input-react",
    path: "./react/lib/JBTimeInput.tsx",
    outputPath: "./react/dist/JBTimeInput.js",
    external: ["react", "prop-types", "jb-time-input"],
    globals: {
      react: "React",
      "prop-types": "PropTypes",
    },
  },
];