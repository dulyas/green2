import "module-alias/register";
import * as app from "@/express";
import initRabbitService from "./services/rabbitSerivce";

app.startApp();
initRabbitService();
