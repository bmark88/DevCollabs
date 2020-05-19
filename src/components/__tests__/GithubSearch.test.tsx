import React from "react"
import renderer from "react-test-renderer"

// import { render } from "@types/testing-library__react"

import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
  getByPlaceholderText,
  findByText,
  getByLabelText,
} from "@testing-library/react"

import GithubSearch from "../GithubSearch"

afterEach(cleanup)

describe("GithubSearch", () => {
  it("renders correctly", async () => {
    const tree = renderer.create(<GithubSearch />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders without crashing", () => {
    render(<GithubSearch />)
    
  })

  it("properly search for a user", async () => {
    const {queryByLabelText, getByLabelText, getByText} = render(<GithubSearch />)


    expect(queryByLabelText("GitHub Username")).toBeNull();

    // const element = screen.getByTestId(`username-input`)
    // console.log(element)
    fireEvent.change(getByLabelText("GitHub Username"), {
      target: { value: "ej2brown" },
    })
    
    expect(getByText("ej2brown").toBeDefined())

    // debug
    //   value={testName}
    //   onChange={event => setUsername(event.target.value)}
  })
})
