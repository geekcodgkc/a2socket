import { createClient } from "redis";

const client = createClient();

client.on("error", (error) => console.log("redis client error", error));

client
	.connect()
	.then(() => console.log("redis conected"))
	.catch((err) => console.log(err));

export { client };
