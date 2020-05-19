import React, { useEffect, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.mode === 'dark' ? '#111' : '#EEE'};
    color: ${props => props.theme.mode === 'dark' ? '#EEE' : '#111'}
  }

  // div {
  //   background-color: ${props => props.theme.mode === 'dark' ? '#111' : '#EEE'};
  //   color: ${props => props.theme.mode === 'dark' ? '#EEE' : '#111'}
  // }

  // span {
  //   // background-color: gray;
  //   // color: red;
  // }

  // p {
  //   // background-color: gray;
  //   // opacity: 70%;
  // }

  // input {
  //   background-color: white;
  //   color: white;
  // }
  
`;

export default GlobalStyle