import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-time-input",
    path: "./lib/jb-time-input.ts",
    outputPath: "./dist/jb-time-input.js",
    external: ["jb-time-picker", "jb-input", "jb-popover", "jb-validation", "jb-core"],
    umdName: "JBTimeInput",
    globals: {
      "jb-time-picker": "JBTimePicker",
      "jb-input": "JBInput",
      "jb-popover": "JBPopover",
      "jb-validation": "JBValidation",
      "jb-core":"JBCore",
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-time-input-react",
    path: "./react/lib/JBTimeInput.tsx",
    outputPath: "./react/dist/JBTimeInput.js",
    external: ["react", "jb-time-input", "jb-core", "jb-core/react"],
    globals: {
      react: "React",
      "prop-types": "PropTypes",
      "jb-time-input": "JBTimeInput",
      "jb-core":"JBCore",
      "jb-core/react":"JBCoreReact",
    },
    umdName: "JBTimeInputReact",
    dir: "./react"
  },
];