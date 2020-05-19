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
  //   color: ${props => props.theme.mode === 'dark' ? 'red' : 'ffb400'}
  //   background-color: red;
  // }
  
  .dark {
    background-color: ${props => props.theme.mode === 'dark' ? 'gray' : '#EEE'};
    color: ${props => props.theme.mode === 'dark' ? '#EEE' : '#111'}
  }

  .dark-rating {
    color: ${props => props.theme.mode === 'dark' ? 'red' : 'ffb400'}
    background-color: red;
  }

  // .dark2 {
  //   background-color: ${props => props.theme.mode === 'dark' ? '#111' : '#EEE'};
  //   color: ${props => props.theme.mode === 'dark' ? '#EEE' : '#111'}
  // }

  p {
    // background-color: gray;
    // opacity: 70%;
    // color: white;
    // backgroundcolor: red;
  }

  // input {
  //   background-color: white;
  //   color: white;
  // }
  
`;

export default GlobalStyle