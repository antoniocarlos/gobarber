## 🪒💈 Gobarber

Gobarber is a system to manage barbershops.
Composed by a desktop and mobile front-end and a REST API as back-end.
This project was developed during the course GoStack 11, provided by [Rockseat 🚀](https://rocketseat.com.br/) .

## 📱 Front-end mobile

![mobile app](./docs/appgogarger.gif)


The mobile interface enables you to make an appointment with the barber.
Just select the professional, the desired date and time.
It is also possible to make changes to registration such as profile image, name, email and password.

![mobile app](./docs/app_user.png)


### Technologies
This project was developed in React-native and typescript.

**Libraries and packages:**<br>
**async-storage:** Employed to store information locally, as credentials.<br>
**datetimepicker:** Standard date forms of mobile systems.<br>
**toolbar-android:** Enables the creation of a toolbar on android.<br>
**unform:** Library for handling forms in react.<br>
**axios:** Making external calls to APIs.<br>
**react-native-gesture-handler:** Used to capture the user's gestures.<br>
**react-native-image-picker:** Allows you to choose an image from the gallery or activate the camera independent of the mobile system.<br>
**react-native-vector-icons:** Icon pack for react.<br>
**styled-components:** Styling library.<br>
**yup:** Library for data validation.<br>

## 💻 Front-end web

![mobile app](./docs/gogargerWEB.gif)

The web front-end was designed for the barber to follow their schedules.

### Technologies
This project was developed in React and typescript.

**Libraries and packages:**<br>
**jest:** Used for tests.<br>
**axios:** Making external calls to APIs.<br>
**polished:** Used to cause changes in styles in response to user interactions.<br>
**react-day-picker:** Date form.<br>
**react-icons:** Icon pack for react.<br>
**react-router-dom:** Routing in react.<br>
**react-spring:** Animation library.<br>
**styled-components:** Styling library.<br>
**uuidv4:** Unique key generator.<br>
**yup:** Library for data validation.<br>

## 🤖 REST API

The back-end is composed of a REST API developed in node and typescript.

### Technologies<br>
**Libraries and packages:**<br>
**express:** Framework for creating web services.<br>
**aws-sdk:** SDK for integrating AWS services.<br>
**multer:** Library to develop midwares.<br>
**nodemailer:** Library to integrate email sending services.<br>
**tsyringe:** Dependency injection library.<br>
**typeorm:** ORM for typescript.<br>
**bcryptjs:** Used To make hashed passwords.<br>
**celebrate:** Request validation midware.<br>
**cors:** Used to handle API access permissions.<br>
**jsonwebtoken:** Token generator.<br>
**uuidv4:** Key generator.<br>

**Database:**
Three different databases were used:
postgres: Relational bank.
redis: Key-value databank. Used to persist the most consulted data making queries faster.
mongo db: Document-based database.

This infrastructure runs on independent containers in the docker, making the project highly scalable and performance-oriented.

### ⚖ LICENSE

The project can be copied and modified, as long as due credit is given.
