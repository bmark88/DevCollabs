import React from "react"
import renderer from "react-test-renderer"
// import { act } from "react-dom/test-utils"
import TestRenderer from "react-test-renderer"
const { act } = TestRenderer
// import { render } from "@testing-library/react"

import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
  getByPlaceholderText,
  findByText,
  getByLabelText,
  getByTestId,
  waitForElement
} from "@testing-library/react"

import GithubSearch from "../GithubSearch"

afterEach(cleanup)

describe("GithubSearch", () => {
  xit("renders correctly", async () => {
    const tree = renderer.create(<GithubSearch />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  // xit("renders without crashing", () => {
  //   render(<GithubSearch />)
  // })

  it("properly search for a user", async () => {
      const {
        queryByLabelText,
        getByLabelText,
        getByText,
        getByTestId,
        findByTestId,
        getAllByText,
        debug,
        waitForElement
      } = render(<GithubSearch />)
      // const tree = renderer.create(<GithubSearch />).toJSON()
      // console.log(tree)
      fireEvent.change(getByTestId("username-input"), {
        target: { value: "ej2brown" },
      })
      expect(getByTestId("username-input")).toBeDefined()

      const submitButton = getByTestId("username-submit");
     
      // act(() => {
        fireEvent.click(submitButton)
      // })

      // const results = getByText("User ej2brown");

      // await waitFor(() => expect(results).toBeDefined()
      
      const usernameResults = await waitFor(() => getByText("User ej2brown"))
      
      // const input = screen.find("input")
      // screen.getByTestId(`username-input`)
      // getByLabelText("GitHub Username")
      // expect(queryByLabelText("GitHub Username")).toBeNull();
      // expect(username, { selector: { input: 'value'} })

      expect(usernameResults).toBeDefined()


  })
})
