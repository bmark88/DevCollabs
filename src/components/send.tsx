import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const Form = styled.form`
  bottom: -62px;
  position: absolute;
  height: 80px;
  width: 100%;
  display: flex;
`;

const Input = styled.input`
  width: 80%;
  height: 45px;
`;

const Button = styled.button`
  width: 20%;
  height: 45px;
`;

const Div = styled.div` 
  width: 100%:
  height: 40px;
  color: white;
`;

const Send = ({ children } :Props) => {
  return (
    <Div>
      <Form>
        <Input name="message" placeholder="Type Your Message Here" required></Input>
            <Button>Send</Button>
      </Form>
    </Div>
  )
};

export default Send;