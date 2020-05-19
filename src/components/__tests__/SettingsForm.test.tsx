import React from "react"
import renderer from "react-test-renderer"
import { render } from "@testing-library/react"

import SettingsForm from "../SettingsForm"

describe("SettingsForm", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<SettingsForm />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  });

  it("should contain the word Settings", () => {
    const { getByText } = render(<SettingsForm/>)

      expect(getByText("Settings")).toBeDefined();
  });
});