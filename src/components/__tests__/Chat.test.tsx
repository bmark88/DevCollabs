import React from "react"
import renderer from "react-test-renderer"
// import { render } from "@types/testing-library__react"

import { render, cleanup } from "@testing-library/react"

import Chat from "../Chat"

const users = ["aliceLand1", "johnDoe2"]
const messages = ["hi", "hello"]

afterEach(cleanup)

describe("Chat", () => {
  xit("renders correctly", async () => {
    const tree = renderer
      .create(<Chat users={users} messages={messages} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
