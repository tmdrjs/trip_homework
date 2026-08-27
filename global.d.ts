// global.d.ts (위치: 프로젝트 최상단 루트)
declare module "react-quill-new" {
  import { Component } from "react";

  export interface ReactQuillProps {
    theme?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (
      content: string,
      delta: any,
      source: string,
      editor: any,
    ) => void;
    modules?: any;
    formats?: string[];
    placeholder?: string;
    style?: React.CSSProperties;
    readOnly?: boolean;
  }

  export default class ReactQuill extends Component<ReactQuillProps> {}
}
