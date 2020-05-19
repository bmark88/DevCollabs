import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const P = styled.p`
  font-size: 18px;
`;

const TimeStamp = styled.p`
  font-size: 12px;
  margin: 0;
`;

const MessageContainer = styled.div`
  font-size: 18px;
  margin: 0.5em;
  overflow: hidden;
  overflow-y: scroll;
  max-height: 543px;
  // background-color: gray;
  // z-index: 5;
`;

const Message = ({ children } :Props) => {
  return <P>{children}</P>;
};

export { Message, MessageContainer, TimeStamp }
