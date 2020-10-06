
[Leia esta página em português](http....README-pt.md)

## Gobarber

Gobarber is a system to manage barbershops.
Composed by a desktop and mobile front-end and a REST API as back-end.
This project was developed during the course GoStack 11, provided by Rockseat.

## Front-end mobile

![mobile app](./docs/appgogarger.gif)


The mobile interface enables you to make an appointment with the barber.
Just select the professional, the desired date and time.
It is also possible to make changes to registration such as profile image, name, email and password.

![mobile app](./docs/app_cadastro.png)


### Technologies
This project was developed in React-native and typescript.

Libraries and packages:
<strong>async-storage:</strong> Employed to store information locally, as credentials.
datetimepicker: Standard date forms of mobile systems.
toolbar-android: Enables the creation of a toolbar on android.
unform: Library for handling forms in react.
axios: Making external calls to APIs.
react-native-gesture-handler: Used to capture the user's gestures.
react-native-image-picker: Allows you to choose an image from the gallery or activate the camera independent of the mobile system.
react-native-vector-icons: Icon pack for react.
styled-components: Styling library.
yup: Library for data validation.

## Front-end web

![mobile app](./docs/gogargerWEB.gif)

The web front-end was designed for the barber to follow their schedules.

### Technologies
This project was developed in React and typescript.

jest: Used for tests.
axios: Making external calls to APIs
polished: Used to cause changes in styles in response to user interactions.
react-day-picker: Date form.
react-icons: Icon pack for react.
react-router-dom: Routing in react.
react-spring: Animation library.
styled-components: Styling library.
uuidv4: Unique key generator.
yup: Library for data validation.

## REST API

The back-end is composed of a REST API developed in node and typescript.

### Technologies
express: Framework for creating web services.
aws-sdk: SDK for integrating AWS services.
multer: Library to develop midwares.
nodemailer: Library to integrate email sending services.
tsyringe: Dependency injection library.
typeorm: ORM for typescript
bcryptjs: Used To make hashed passwords.
celebrate: Request validation midware.
cors: Used to handle API access permissions.
jsonwebtoken: Token generator.
uuidv4: Key generator.

Database:
Three different databases were used:
postgres: Relational bank.
redis: Key-value databank. Used to persist the most consulted data making queries faster.
mongo db: Document-based database.

This infrastructure runs on independent containers in the docker, making the project highly scalable and performance-oriented.


