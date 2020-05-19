import React from "react"
import renderer from "react-test-renderer"
// import { render } from "@types/testing-library__react"

import { render, cleanup } from "@testing-library/react"

import Dropdown from "../Dropdown"

afterEach(cleanup)

describe("Dropdown", () => {
  xit("renders correctly", async () => {
    const tree = renderer
    .create(<Dropdown />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  xit("shows feature when page is loaded", async () => {})

  xit("shows pages when clicked", async () => {})

  xit("links work", async () => {})
})
