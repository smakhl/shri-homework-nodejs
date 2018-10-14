# shri-homework-nodejs

```
npm i
npm start
```
* Аптайм сервера: http://localhost:8000/status
* Все события: http://localhost:8000/api/events
* Отфильтрованные по типу события: 
  1. http://localhost:8000/api/events?type=info
  2. http://localhost:8000/api/events?type=critical
  3. http://localhost:8000/api/events?type=info:critical
* Ошибка при фильтрации по несуществующему типу: http://localhost:8000/api/events?type=info1
* Пагинация: http://localhost:8000/api/events?limit=3&skip=5
* Пагинация + фильтрация: http://localhost:8000/api/events?limit=3&skip=1&type=critical

* Все реквесты поддерживаются через методы GET и POST
* Включен CORS, страница первого задания работает с этим эндпоинтом
