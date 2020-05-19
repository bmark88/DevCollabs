import React from "react"
import renderer from "react-test-renderer"
// import { render } from "@types/testing-library__react"

import DropDown from "../DropDown"

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

afterEach(cleanup)

describe("DropDown", () => {
  xit("shows feature when page is loaded", async () => {})

  xit("shows pages when clicked", async () => {})

  xit("links work", async () => {})
})
