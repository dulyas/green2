import RabbitMQ from "@/rabbitmq/RabbitMQ";
import config from "@/config";

export const rabbitSerivce = new RabbitMQ();

const initRabbitService = async () => {
  // коннектимся, создаем очереди если их нет, сразу подписываемся на все очереди, которые будем слушать
  try {
    await rabbitSerivce.connect();
    await rabbitSerivce.assertQueue(config.rabbit.my_service_queue_res!);
    await rabbitSerivce.assertQueue(config.rabbit.my_service_queue_req!);
    rabbitSerivce.subscribeToQueue(
      config.rabbit.my_service_queue_res!,
      async (msg) => {
        console.log(JSON.parse(msg.content.toString())); // здесь мы возвращаем клиенту если нужно ответ, например по вебсокету
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export default initRabbitService;
