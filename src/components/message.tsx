import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const P = styled.p`
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
  return <P>{children}</P>;
};

export { Message, MessageContainer, TimeStamp }