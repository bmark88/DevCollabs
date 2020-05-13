import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const Span = styled.span`
  margin: 2em;
`;

const P = styled.p`
  margin: 0 1em;
  font-size: 22px;
`;

const TimeStamp = styled.p`
  margin: 0 1.8em;
  font-size: 12px;
`;

const Message = ({ children } :Props) => {
  return (
  <>
    <Span>
      <P>{children}</P>
      <TimeStamp>Created at: Now</TimeStamp>
    </Span>
  </>
  )
};

export default Message;