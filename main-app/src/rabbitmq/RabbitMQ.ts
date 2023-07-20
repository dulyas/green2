import amqp, { Channel, ConsumeMessage } from "amqplib";
import config from "@/config";

export default class RabbitMQ {
  private channel: Channel | undefined;
  private static instance: RabbitMQ;
  constructor() {
    // защитим от лишних коннектов с помощью паттерна синглтон
    if (RabbitMQ.instance) {
      return RabbitMQ.instance;
    }
    RabbitMQ.instance = this;
  }

  public async connect() {
    // подключение к брокеру
    try {
      const connect = await amqp.connect(
        `amqp://${config.rabbit.user}:${config.rabbit.password}@${config.rabbit.host}`
      );
      this.channel = await connect.createChannel();
      console.log(`RabbitMQ succefull connected to ${config.rabbit.host}`);
    } catch (error) {
      console.log("connect error:", error);
    }
  }

  public async assertQueue(queue: string) {
    // метод для создания очереди если ее нет
    try {
      if (!this.channel) return this.noChannelError();
      await this.channel.assertQueue(queue);
      console.log(`asserted query ${queue}`);
    } catch (error) {
      console.log("assert queue error:", error);
    }
  }

  public async sendToQueue(queue: string, data: string) {
    // метод отправки сообщения
    try {
      if (!this.channel) return this.noChannelError();
      this.channel.sendToQueue(queue, Buffer.from(data));
    } catch (error) {
      console.log("send error:", error);
    }
  }

  public subscribeToQueue(
    queue: string,
    callback: (msg: ConsumeMessage) => Promise<void>
  ) {
    // метод подписки на очередь
    try {
      if (!this.channel) return this.noChannelError();
      this.channel.consume(queue, async (msg) => {
        if (msg) {
          await callback(msg);
          this.channel!.ack(msg);
        }
      });
    } catch (error) {
      console.log("subscribe error:", error);
    }
  }

  private noChannelError(): void {
    // DRY
    console.log("wait for connection");
  }

  private async close() {
    // метод закрытия соединения, в этом приложении не будет использован
    try {
      if (!this.channel) return this.noChannelError();
      await this.channel.close();
      await this.channel.close();
    } catch (error) {
      console.log("close error:", error);
    }
  }
}
