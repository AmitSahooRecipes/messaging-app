const tools = require ("./tools");
var channel, connection;
tools.consumeData(process.argv[2],readData);

function readData(data) {
        console.log (`${Buffer.from(data.content)}`);
}
