import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.mode === 'dark' ? '#111' : '#EEE'};
    color: ${props => props.theme.mode === 'dark' ? '#EEE' : '#111'}
  }
  
  .dark {
    background-color: ${props => props.theme.mode === 'dark' ? 'gray' : '#EEE'};
    color: ${props => props.theme.mode === 'dark' ? '#EEE' : '#111'}
  }

  .dark-rating {
    color: ${props => props.theme.mode === 'dark' ? 'red' : 'ffb400'}
    background-color: red;
  }
`;

export default GlobalStyle