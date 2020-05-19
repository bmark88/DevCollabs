import React from "react"
import renderer from "react-test-renderer"
import { render } from "@testing-library/react"

import { RoomCard } from "../rooms"

describe("LoginForm", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
      <RoomCard               
        image="https://sociorocketnewsen.files.wordpress.com/2014/01/anonymous.jpg?w=580&h=350"
        title="Create A Group">
      </RoomCard>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  });

  it("should contain a room card title", () => {
    const { getByText } = render(
      <RoomCard               
        image="https://sociorocketnewsen.files.wordpress.com/2014/01/anonymous.jpg?w=580&h=350"
        title="Create A Group">
      </RoomCard>)

      expect(getByText("Create A Group")).toBeDefined();
  });
});