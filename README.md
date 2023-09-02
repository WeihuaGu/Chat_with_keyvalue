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
- To use this application, you will need a key-value database for storage. You can implement your own keyvalueimplementrestfulapi.js file based on the interface definition in keyvalue.js.
- Alternatively, you can use my project, which already provides the necessary functionality for converting Redis to a RESTful API.The project [redis-retfulapi](https://github.com/WeihuaGu/redis-restfulapi) supports easy deployment on Vercel with just one click.
- the REACT_APP_PUSH_URL is the redis-retfulapi url;the REACT_APP_TOKEN is the base64 value of the TOKEN variable that has been set in redis-retfulapi TOKEN 

##### example .env
```
REACT_APP_PUSH_URL="https://xxx.net"
REACT_APP_TOKEN="xxxxx"
```
#### Start the app: `npm start`

## Licensing
Friendly Chat is licensed under the Apache-2.0 license to allow for open collaboration while avoiding mandatory source code disclosure requirements.

