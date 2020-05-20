import React, { ReactNode, useEffect, useState } from "react"

import styled from "styled-components";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import copy from 'copy-to-clipboard';


import { toast } from "react-toastify";

toast.configure();

const ClipBoard = styled.div`
  bottom: 50px; 
  left: 11em;
  position: absolute;
`;

const AceEditor = (props:any) => {
  if (typeof window !== 'undefined') {
    const Ace = require('react-ace').default;
    require('ace-builds/src-noconflict/mode-javascript');
    require('ace-builds/src-noconflict/theme-twilight');

    return <Ace {...props}/>
  }

  return null;
}


const CodeSnippet = (props : any) => {
  const [snippetValue, setSnippetValue] = useState("")


  function onChange(newValue :string) {
    setSnippetValue(newValue)
    props.function(newValue)
  }

  function copyToClipboard() {
    copy(snippetValue)

    toast(`Copied to clipboard!`, {
      position: "bottom-left",
      autoClose: 2500,
      closeOnClick: false,
      pauseOnHover: false,
      hideProgressBar: true,
    })
  }

  return (
    <>
      <AceEditor
        style={{
          margin:"1em",
          minWidth: "500px"
        }}
        fontSize="16px"
        mode="javascript"
        theme="twilight"
        height="80vh"
        width="520px"
        value={props.snippetValue}
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
      <ClipBoard>
        Copy to Clipboard: 
        <button onClick={copyToClipboard}><FileCopyIcon /></button>
      </ClipBoard>
    </>
    )
};

export default CodeSnippet;
