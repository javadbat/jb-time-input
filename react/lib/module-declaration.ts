import type { JBTimeInputWebComponent } from 'jb-time-input';

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      'jb-time-input': JBTimeInputType;
    }
    interface JBTimeInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBTimeInputWebComponent>, JBTimeInputWebComponent> {
      "type"?: string,
      "error"?: string,
      "label"?:string,
      "message"?:string,
      "placeholder"?:string,
    }
  }
}
