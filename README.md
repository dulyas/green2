# RabbitMQ template for microservice queue

# Инструкция по запуску

1. зайти в папки main-app и micro-service и сделать в них npm i, переименовать env.example и .env и подставить там данные для брокера если они отличаются от дефолтных локальных, если дефолтные стоят на пк, то подставлять не нужно (естественно RabbitMQ должен быть запущен)

2. закидываем пост запросами на главное приложение по роуту /post-request

3. смотрим консоль через 5 секунд

### Example `api`

- POST `/post-request`

- модель для body {
  number1: number
  number2: number
  senderId: string
  }
