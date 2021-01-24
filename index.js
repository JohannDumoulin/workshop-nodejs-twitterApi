require("dotenv").config()
const { pipeline } = require("stream")
const WebSocket = require("ws")
const server = require("./server")
const { addSearchRules, getSearchRules, deleteSearchRules } = require("./search-rules")
const { connectToTwitter, tweetStream } = require("./twitter")
const { tweetCounter } = require("./process-tweets")

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
        tweetCounter,
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

// Clear and add filters
async function resetRules(firstRule, secondRule) {
    // Get existing filters
    const existingRules = await getSearchRules()
    const ids = existingRules?.data?.map(rule => rule.id)

    // Clear filters
    if (ids) {
        await  deleteSearchRules(ids)
    }

    // Filters rules for tweets
    addSearchRules([
        { value: firstRule, tag: firstRule },
        { value: secondRule, tag: secondRule },
    ])
}

resetRules("Nissan", "Toyota")

module.exports = {
    resetRules
}