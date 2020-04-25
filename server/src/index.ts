import { httpServer } from "./server";

const port = process.env.PORT;

httpServer.listen(port, () => {
  console.log(`\nServer listening on port ${port}\n`);
});
