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
        const {
          number1,
          number2,
          senderId,
        }: {
          number1: string;
          number2: string;
          senderId: string;
        } = JSON.parse(msg.content.toString());

        const sum = +number1 + +number2; // тут происходит какая-то громозка операция и длится 5 секунд

        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              rabbitSerivce.sendToQueue(
                // и после того как она заканчивается мы отправляем ответ нашему главному серверу
                config.rabbit.my_service_queue_req!,
                JSON.stringify({
                  sum,
                  senderId,
                })
              )
            );
          }, 5000);
        });
      }
    );
  } catch (error) {}
};

export default initRabbitService;
