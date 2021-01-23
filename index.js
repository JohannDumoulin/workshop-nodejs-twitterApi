require("dotenv").config()
const { pipeline } = require("stream")
const WebSocket = require("ws")
const server = require("./server")
const {connectToTwitter, tweetStream} = require("./twitter")

// Http Server
server.listen(3000)
const wsServer = new WebSocket.Server({ server })

wsServer.on("connection", (client) => {
    console.log("new connection: ")

    client.on("message", (message) => {
        console.log("message from client: ", message)

        client.send("Hello from server")
    })

    // Send data to the client via websocket
    const socketStream = WebSocket.createWebSocketStream(client);
    pipeline(
        tweetStream,
        socketStream,
        (err) => {
            if (err) {
                console.error("pipeline error: ", err)
            } else {
                console.log("pipeline success")
            }
        }
    )
})

// Connection to Twitter API
connectToTwitter()