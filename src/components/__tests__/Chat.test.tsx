import React from "react"
import renderer from "react-test-renderer"
// import { render } from "@types/testing-library__react"

import { render, cleanup } from "@testing-library/react"

import Chat from "../Chat"

const users = ["aliceLand1", "johnDoe2"]
const messages = ["hi", "hello"]

afterEach(cleanup)

describe("Chat", () => {
  xit("renders correctly", async () => {
    const tree = renderer
      .create(<Chat users={users} messages={messages} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})



type MessageType = "CONNECTED" | "LOGIN" | "RECORD" | "END"

interface IMessage {
  type: MessageType
  data: any
}
const config: WebSocketSubjectConfig<IMessage> = {
  url: "ws://localhost:8080/",
}
const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 8080 })


wss.on("connection", function connection(ws) {
  const loginReply = JSON.stringify({
    type: "CONNECTED",
  })

  ws.send(loginReply)

  ws.on("message", function incoming(m) {
    try {
      // Messages are stringified by default by rxjs
      const message = JSON.parse(m)

      const type = message && message.type
      const data = message && message.data

      switch (type) {
        case "LOGIN":
          let reply = JSON.stringify({
            type: "RECORD",
            data: Math.round(Math.random() * 10),
          })
          ws.send(reply)
          reply = JSON.stringify({
            type: "END",
            data: "Bye, " + data + "!",
          })
          ws.send(reply)
          break
        default:
          break
      }
    } catch (error) {}
  })
})

// context("Websocket cy.stream() Command", () => {
//   xit("Simple subscribe with close callback to complete", done => {
//     // Wrap the request in order to bypass the defaultCommandTimeout
//     // Investigating alternative solutions
//     cy.stream<IMessage>(config).then(subject => {
//       subject
//         .pipe(
//           // Conflicts due to old rxjs typings being included with cypress
//           // In real scenarios, extend this command in support/commands and add your custom logic
//           // @ts-ignore
//           takeUntil(timer(1000)),
//           reduce((acc: IMessage[], val: IMessage) => acc.concat([val]), [])
//         )
//         .subscribe({
//           next: (results: IMessage[]) => {
//             const length = (results && results.length) || 0
//             const result = results && results[length - 1]
//             expect(length).to.eq(1)
//             expect(result).to.not.be.undefined
//             expect(result).to.have.property("type", "CONNECTED")
//             expect(result).to.not.have.property("data")
//           },
//           error: (err: any) => {},
//           complete: done,
//         })
//     })
//   })
// })

// context("Websocket cy.streamRequests() Command", () => {
//   before(() => {
//     // If you don't want to wrap the call, change this setting in order to increase timeout
//     // Cypress.config("defaultCommandTimeout", 40000);
//   })

//   xit("Without any options set it will close on first message", () => {
//     options = {}
//     // Wrap the request in order to bypass the defaultCommandTimeout
//     // Investigating alternative solutions
//     cy.wrap(null, { timeout: 10000 }).then(() =>
//       cy.streamRequest<IMessage>(config, options).then(results => {
//         const result = results && results[0]
//         expect(result).to.not.be.undefined
//         expect(result).to.have.property("type", "CONNECTED")
//         expect(result).to.not.have.property("data")
//       })
//     )
//   })
//   xit("With startUpMessage and takeWhileFn", () => {
//     options = {
//       // Finish when the END message is sent
//       takeWhileFn: (message: IMessage) => message && message.type !== "END",
//       startUpMessage: {
//         type: "LOGIN",
//         data: "Developer",
//       },
//     }
//     cy.wrap(null, { timeout: 10000 }).then(() =>
//       cy.streamRequest<IMessage>(config, options).then(results => {
//         const length = (results && results.length) || 0
//         const result = results && results[length - 1]
//         expect(length).to.eq(3)
//         expect(result).to.not.be.undefined
//         expect(result).to.have.property("type", "END")
//         expect(result).to.have.property("data", "Bye, Developer!")
//       })
//     )
//   })
//   xit("With retryUntilFn set", () => {
//     options = {
//       // Finish when the END message is sent
//       takeWhileFn: (message: IMessage) => message && message.type !== "END",
//       streamTimeout: 20000,
//       // Retry connection until the data value is greater than 5
//       // (they are sent at random values by the server)
//       retryUntilFn: (messages: IMessage[]) =>
//         messages.filter(message => message.data > 5).length > 0,
//       startUpMessage: {
//         type: "LOGIN",
//         data: "Developer",
//       },
//     }
//     // Wrap the request in order to bypass the defaultCommandTimeout
//     // Investigating alternative solutions
//     cy.wrap(null, { timeout: options.streamTimeout }).then(() =>
//       cy.streamRequest<IMessage>(config, options).then(results => {
//         const result = results && results[1]
//         const data = result && result.data
//         expect(result).to.not.be.undefined
//         expect(result).to.have.property("type", "RECORD")
//         expect(data > 5).to.be.true
//       })
//     )
//   })
// })
