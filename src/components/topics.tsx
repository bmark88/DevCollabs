import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const Container = styled.div`
  background-color: gray;
  color: white;
  width: 50%;
  margin: 2em;
  min-height: 600px;
  float: left;

  @media (max-width: 1000px) {
    width: 90%;
    min-width: 450px;
  }
`;

const Div = styled.div`
  background-color: black;
  margin: 1em;
  height: 150px;
`;

const Section = styled.section`
  background-color: white;
  color: black;
  // display: none;
  height: 80px;
  margin: 2em;
  width: 80%;
  border-radius: 12px;
  position: relative;
  top: 20px;
`;

const SubTopic = ({ children } :Props) => {
  return <Section>{children}</Section>
};

const Topic = ({ children } :Props) => {
  return <Div>{children}</Div>
};

const Topics = ({ children } :Props) => {
  return <Container>{children}</Container>
};

export { Topics, Topic, SubTopic };