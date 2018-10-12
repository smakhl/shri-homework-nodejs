# shri-homework-nodejs

```
npm i
npm start
```
Аптайм сервера: http://localhost:8000
Все события: http://localhost:8000/api/events
Отфильтрованные по типу события: 
http://localhost:8000/api/events?type=info
http://localhost:8000/api/events?type=critical
http://localhost:8000/api/events?type=info:critical
Ошибка при фильтрации по несуществующему типу: http://localhost:8000/api/events?type=info1
Пагинация: http://localhost:8000/api/events?limit=3&skip=5
Пагинация + фильтрация: http://localhost:8000/api/events?limit=3&skip=1&type=critical

Все реквесты поддерживаются через методы GET и POST
В первом задании подгрузка данных изначально реализована через fetch и этот эндпоинт с ним совместим.