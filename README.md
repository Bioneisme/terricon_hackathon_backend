# DamuDoc Platform BackEnd

- [Navigation](#navigation)
    - [Features](#features)
    - [Installation](#prerequisites)

## Features:
* JWT Authentication
* Definition of entities and relationships using AI (Azure Cognitive Service)
* Cloud storage of pdf files (Cloudinary)
* Auto translation of Russian texts for AI (Google Translate)

## Getting Started
### Prerequisites
* NodeJS, NPM (https://www.npmjs.com/get-npm)
* PostgreSQL (https://www.postgresql.org)
* Cloudinary API (https://cloudinary.com)
* Azure Cognitive Service (https://learn.microsoft.com/ru-ru/azure/cognitive-services/language-service/text-analytics-for-health/overview)

### Installing
```bash
# Get the latest snapshot
git clone https://github.com/Bioneisme/terricon_hackathon_backend.git
```
``` bash
# Change directory
cd terricon_hackathon_backend
```
``` bash
# Install dependencies
npm install
```
Create an .env file locally. You can duplicate .env.example and name the new copy .env. Adapt the variables to your needs.
``` bash
# After setting up .env start app
npm run start
```
