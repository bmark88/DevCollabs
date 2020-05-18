import React from "react"
import renderer from "react-test-renderer"
// import { render } from "@types/testing-library__react"

import LoginForm from "../LoginForm"

describe("LoginForm", () => {
  it("renders correctly", async () => {
    
    const tree = renderer
      .create(<LoginForm />)
      .toJSON()
    expect(tree).toMatchSnapshot()
    
  })
})