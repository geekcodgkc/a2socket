import { createClient } from "redis";

const client = createClient();

client.on("error", (error) => console.log("redis client error", error));

export { client };
