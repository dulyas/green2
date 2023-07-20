import { config } from "dotenv";
config();

export default {
  port: process.env.PORT,
  rabbit: {
    user: process.env.RABBIT_USER,
    password: process.env.RABBIT_PWD,
    host: process.env.RABBIT_HOST,
    my_service_queue_req: process.env.RABBIT_MY_SERVICE_QUEUE_REQ,
    my_service_queue_res: process.env.RABBIT_MY_SERVICE_QUEUE_RES,
  },
};
