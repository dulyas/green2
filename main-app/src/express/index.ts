import express from "express";
import router from "@/routes";
import { createServer } from "http";
import config from "@/config";

const app = express();

app.use(express.text({ type: "text/*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

const server = createServer(app);

export const startApp = () => {
  return server.listen(config.port, async (err?: Error) => {
    if (err) {
      console.error(`Error : ${err}`);
      process.exit(-1);
    }

    console.log(`App is running on ${config.port}`);
  });
};

export default app;
