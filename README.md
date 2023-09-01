<!-- README.md -->
## Friendly Chat
[中文README](README-zh.md)

A simple open source chat app develeped by react for casual conversations.

## Purpose
This chat software is intended for non-commercial personal use only. It does not support or enable any online organization activities.

## Features
- One-to-one and public group chats.
- Lightweight and easy to use interface.
- olny support text.
- protect private communications.

## Limitations
- This software should only be used and accessed outside of mainland China due to regulatory constraints. We cannot provide downloads, deployment or support within China.
- No political, illegal or harmful content is allowed in conversations.
- However, use of this software in China is at your own risk.



## Disclaimer
The authors and contributors disclaim any direct or indirect liability for any damage or loss resulting from the use of this software. By using this software, you understand and agree there are legal risks.

This is a draft translation focusing on minimizing legal risks when the chat software is opened in China. Please modify as needed for your actual project details and compliance with local laws.


## Installation
Friendly Chat is created with React and requires Node.js to run.

#### Clone the repo
#### Install dependencies: `npm install`
#### Set environment variables in .env file   
This application uses a key-value database to store data. If you are using a RESTful API, please add the environment variables introduced in keyvalueimplementwithrestfulapi.js to your .env file. If you are using Redis, please add the environment variables introduced in keyvalueimplementwithredis.js to your .env file.
##### example .env
```
REACT_APP_METHON="redis"
REACT_APP_REDIS_URL="redis://haha1234@localhost"`
```
or
```
REACT_APP_METHON="restfulapi"
REACT_APP_PUSH_URL="https://xxx.net"
REACT_APP_TOKEN="xxxxx"
```
#### Start the app: `npm start`

## Licensing
Friendly Chat is licensed under the Apache-2.0 license to allow for open collaboration while avoiding mandatory source code disclosure requirements.

