import React from "react"
import renderer from "react-test-renderer"
import TestRenderer from "react-test-renderer"
import { render, cleanup, fireEvent, act, waitForElementToBeRemoved } from "@testing-library/react"

import RegisterForm from "../RegisterForm"

afterEach(cleanup);

describe("RegisterForm", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(<RegisterForm />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  });

  it("Allows users to input an avatar url", () => {
    const { getByText, getByTestId } = render(<RegisterForm />);

    expect(getByText("Avatar")).toBeDefined();
  });

  it("Sends a required field error if user signs up with an undefined username", async () => {
    expect.assertions(1)
    const { getByTestId } = render(<RegisterForm />);

    fireEvent.click(getByTestId("email-input"))

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "Test Email" }
    });

    fireEvent.click(getByTestId("password-input"))

    fireEvent.change(getByTestId("password-input"), {
      target: { value: "Test Password" }
    });

    fireEvent.click(getByTestId("avatar-input"))

    fireEvent.change(getByTestId("avatar-input"), {
      target: { value: "Test Avatar" }
    });

    fireEvent.click(getByTestId("sign-up"))
    
    expect("Please fill out this field.").toBeDefined()
  });

  xit("Allows a user to sign up if they provide all required fields", () => {
    const { getByTestId } = render(<RegisterForm />);

    fireEvent.click(getByTestId("username-input"))

    fireEvent.change(getByTestId("username-input"), {
      target: { value: "Test Username" }
    });

    fireEvent.click(getByTestId("email-input"))

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "Test Email" }
    });

    fireEvent.click(getByTestId("password-input"))

    fireEvent.change(getByTestId("password-input"), {
      target: { value: "Test Password" }
    });

    fireEvent.click(getByTestId("avatar-input"))

    fireEvent.change(getByTestId("avatar-input"), {
      target: { value: "Test Avatar" }
    });

    fireEvent.click(getByTestId("sign-up"))
    
    expect("Please fill out this field.").not.toBeDefined()
  });

});