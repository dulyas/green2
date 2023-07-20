import { Request, Response } from "express";
import { rabbitSerivce } from "@/services/rabbitSerivce";
import config from "@/config";

export const postRequest = async (req: Request, res: Response) => {
  try {
    const body: {
      number1: string;
      number2: string;
      senderId: string;
    } = req.body;

    if (!+body.number1 || !+body.number2)
      throw Error("number 1 and number 2 must be correct numbers");

    if (!body.senderId) throw Error("senderId обязательное поле для body");

    await rabbitSerivce.sendToQueue(
      config.rabbit.my_service_queue_req!,
      JSON.stringify(body)
    );
    res.json({
      message: "Ваша задача поставлена в очередь",
    });
  } catch (error) {
    res.json({
      message: error instanceof Error ? error.message : error,
    });
  }
};
