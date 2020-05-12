import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const Span = styled.span`
  // margin: 1em;
`;

const P = styled.p`
  // margin: 0 1em;
  font-size: 18px;
`;

const TimeStamp = styled.p`
  margin: -5px 0 5px 0;
  font-size: 12px;
`;

const MessageContainer = styled.div`
  font-size: 18px;
  margin: 0.5em;
`;

const Message = ({ children } :Props) => {
  return (
  <>
    {/* <Span> */}
      <P>{children}</P>
      <TimeStamp>Created at: Now</TimeStamp>
    {/* </Span> */}
  </>
  )
};

export { Message, MessageContainer, TimeStamp }