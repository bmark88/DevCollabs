import React from "react"
import renderer from "react-test-renderer"
// import { render } from "@types/testing-library__react"

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


import CodeSnippet from "../CodeSnippet"

afterEach(cleanup)

describe("CodeSnippet", () => {
  xit("renders correctly", async () => {
    
    const tree = renderer
      .create(<CodeSnippet />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })




})