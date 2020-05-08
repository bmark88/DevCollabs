import React, { ReactNode, useEffect } from "react"
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";

interface Props {
  children: ReactNode
}

const CodeSnippet = ({ children } :Props) => {
  function onChange(newValue) {
    console.log("change", newValue);
  }

  return (
  <AceEditor
    mode="javascript"
    theme="twilight"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
  />
    )
};

export default CodeSnippet;