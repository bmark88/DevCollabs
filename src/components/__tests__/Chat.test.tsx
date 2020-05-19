import React from "react"
// import { render, cleanup, fireEvent } from "@testing-library/react"
import Chat from "../Chat"
import renderer from "react-test-renderer"

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
} from "@testing-library/react"

type MessageType = "CONNECTED" | "LOGIN" | "RECORD" | "END"

interface IMessage {
  type: MessageType
  data: any
}
const config: WebSocket<IMessage> = {
  url: "ws://localhost:8000/",
}
const WebSocket = require("ws")
const port = 8000

const users = ["aliceLand1", "johnDoe2"]
const messages = ["hi", "hello"]

afterEach(cleanup)

describe("Chat component", () => {
  //   it("renders without crashing", () => {
  //     render(<Chat />)
  //   })

  it("renders correctly", async () => {
    const tree = renderer
      .create(<Chat users={users} messages={messages} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  xit("connect websockets", done => {
    expect.assertions(1)

    const ws = new WebSocket.Server({ port: 8001 })
      .on("message", msg => {
        expect(JSON.parse(msg).id).toEqual(0)
        ws.close()
      })
      .on("close", () => done())
  })

  it("connect websockets and send a message", done => {
    // expect.assertions(1)

    const wss = new WebSocket.Server({ port: 8000 })
    console.log("=1=")
    wss.on("connection", function connection(ws) {
      const loginReply = JSON.stringify({
        type: "CONNECTED",
      })
      console.log("=2=")
      expect.assertions(1)

      console.log(loginReply)
      ws.send(loginReply)
      ws.on("message", function incoming(m) {
        const message = JSON.parse(m)
        expect(message).to.have.property("type", "CONNECTED")
      })
      console.log("=3=")

    })
  })
})
