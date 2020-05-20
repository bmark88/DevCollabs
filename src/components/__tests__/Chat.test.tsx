import React from "react"
import renderer from "react-test-renderer"
// import { render } from "@types/testing-library__react"

import { render, cleanup } from "@testing-library/react"

import Chat from "../Chat"
import socketIOClient from "socket.io-client"

const ENDPOINT = "http://localhost:8080/"

const ws = socketIOClient(ENDPOINT)
const users = ["aliceLand1", "johnDoe2"]
const messages = [
  {
    user: "aliceLand1",
    message: "hi",
    roomId: "public",
    date: "May 19, 2020 8:56 PM",
  },
]

afterEach(cleanup)

describe("Chat", () => {
  xit("renders correctly", async () => {
    const tree = renderer
      .create(<Chat users={users} messages={messages} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly", async () => {
    const { queryByLabelText, debug } = render(
      <Chat users={users} messages={messages} />
    )
    ws.on("message", (data: any) => {
      console.log("From Server:" + e.data)
    })

    ws.on("connection", function connection(ws) {
      const loginReply = JSON.stringify({
        type: "CONNECTED",
      })

      ws.send(loginReply)

      ws.on("message", function incoming(m) {
        const message = JSON.parse(m)
      })
    })
    // debug()
    const online = queryByLabelText("AliceLand1")
    expect(online).toBeDefined()

    ws.close()
  })
})
