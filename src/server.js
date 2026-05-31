import http from "node:http";
import { createApp } from "./app.js";

const PORT = Number(process.env.PORT) || 3000;
const app = createApp();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
