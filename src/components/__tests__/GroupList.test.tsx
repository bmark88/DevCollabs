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

import GroupList from "../GroupList"

const testGroups = [{id: 1, name: "Group 1"},
{id: 2, name: "Group 2"},
{id: 3, name: "Group 3"}]
afterEach(cleanup)

describe("GroupList", () => {
  xit("renders correctly", async () => {
    const tree = renderer.create(<GroupList />).toJSON()
    expect(tree).toMatchSnapshot()
  })


  it("properly search for a user", async () => {
    const {queryByLabelText, getByLabelText} = render(<GroupList  groups={testGroups}/>)

    // const { getByLabelText, debug } = render(<GroupList />)
    // render(<GroupList/>)
    const group = queryByLabelText("Test Group 1")

  })
})
