const { Writable, Transform } = require("stream")

const jsonParser = new Transform({
    readableObjectMode: true,

    transform(chunk, _, callback) {
        let data = {}
        try {
            data = JSON.parse(chunk)
        } catch (error) {

        }
        this.push(data)
        callback()
    }
})

const tweetCounter = new Transform({
    objectMode: true,

    transform(chunk, _, callback) {
        this.counter++
        try {
            chunk = JSON.parse(chunk)
            if (chunk.matching_rules?.[0].tag === 'Nissan') {
                this.counterNissan++
            }
            else if (chunk.matching_rules?.[0].tag === 'Toyota') {
                this.counterToyota++
            }

            this.push(JSON.stringify({
                total: this.counter,
                nissan: this.counterNissan,
                toyota: this.counterToyota
            }))
        } catch (e) {

        }
        callback()
    }
})
tweetCounter.counter = 0
tweetCounter.counterNissan = 0
tweetCounter.counterToyota = 0

const logger = new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
        try {
            console.log(JSON.stringify(chunk))
        } catch (err) {
            //
        }
        callback()
    }
})

module.exports = {
    jsonParser,
    tweetCounter,
    logger
}