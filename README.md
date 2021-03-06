# Fake-map

### Тестовое задание
Сделать одностраничное приложение со списком пользователей в колонке (sidebar) и в виде объектов на карте. В списке надо показывать аватарку, имя и почту пользователя (посмотри структуру данных в ответе сервера). На карте пользователей отображать в виде точек, цвет точки брать из данных с сервера (поле color). При клике на точку на карте показывать Pop-up, с именем и почтой пользователя. Для карты использовать [openlayers](http://openlayers.org/).
Для интерфейса - [React](https://reactjs.org/), для управления состоянием - [Redux](https://redux.js.org/) в приоретете. Стиливое оформление не важно.

#### Дополнительные пункты (необязательно)
* При клике на пользователя в колонке (sidebar), зумировать карту на этого пользователя и отображать Pop-up.
* Так же плюсом будет написание тестов.

## Технологии

* create-react-app
* React.js
* redux
* redux-saga
* redux-actions
* styled-components
* axios
* lodash
* Jest
* Enzyme

### Установите модули локально

```shell
git clone git@github.com:zahar517/fake-map.git
cd fake-map
npm i | yarn
```

### Сервер фэйковых данных
Сервер отдает массив рандомных geoJson features пользователей, используя [json-server](https://github.com/typicode/json-server)

#### Запуск сервера

```shell
npm run server | yarn server
```
Open [http://localhost:3033/](http://localhost:3033/)

#### Получение пользователей

GET [http://localhost:3033/features](http://localhost:3000/features)

### Запуск приложения

```shell
npm start | yarn start
```
