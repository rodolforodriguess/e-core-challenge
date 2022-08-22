# WebdriverIO-Mocha-Selenium-Standalone - e-Core Coding Challenge

## Based On

WebdriverIO v7 - Mobile and Web testing framework that allows automation of web and android/IOS native applications 

Mocha - Testing library for unit and end-to-end tests

Nodejs@latest - JavaScript runtime environment.

Selenium Standalone - Plugin to manage different browsers

## Requeriments:

[Node JS](https://nodejs.org/en/download/)

[NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Installing allure-reporter in your machine in order to generate and see reports generated
[To install allure, click here](https://docs.qameta.io/allure)

## After installing tools and drivers above, follow the instructions right below:

#### 1º: Git clone the project 
```
git clone git@bitbucket.org:dasa_desenv_atendimento/qa_tracking_mobile.git
```

#### 2º Install the dependencies 

```
npm i
```

 
#### 3º Run a script of any feature

```
npm run script name
```

To run scenarios of a specific spec, here is some of scripts which are in package.json file


login scenarios: ``` npm run login ```

invoice scenarios ``` npm run invoice ```

all scenarios ``` npm run all ```


> You can pass USERNAME and PASSWORD variables with your own user before the script such as

> USERNAME="userExample" PASSWORD="passwordExample" npm run login

> This way, the test script will log in with your authentication data


#### 4º Generate and open test report

Make sure you have allure installed in your machine and then:
```
npm run allure:report

```

> This will open allure report on your default browser by starting a server