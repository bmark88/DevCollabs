import React, { ReactNode, useEffect, useState } from "react"
import AceEditor from "react-ace";
import styled from "styled-components";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";

const Div = styled.div`
  position: absolute;  
  left: 2em;
  top: 5.5em;
`;

const CodeSnippet = () => {
  const [value, setValue] = useState("")

  function onChange(newValue :string) {
    setValue(newValue)
  }

  return (
    <Div>
      <AceEditor
        mode="javascript"
        theme="twilight"
        height="84.7vh"
        width="50vw"
        value={value}
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: Infinity }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          }}
      />
    </Div>
    )
};

export default CodeSnippet;