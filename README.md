# React cloud-based online Image Editor

This project is based on REACT HOOKS, MATERIAL UI, CONTEXT API, FIREBASE AUTHENTICATION, API (cloud functions) INTEGRATION USING AXIOS, FIREBASE STORAGE and FILEROBOT-IMAGE-EDITOR (CDN version).

The backend codes uses NODE JS and EXPRESS JS for API scripting which is deployed as GOOGLE CLOUD FUNCTIONS. It is completely agnostic to the frontend code; making the web application a super scalable and extendable one.

## How to run this project

Firstly, create a firebase project from firebase console: initialize Authentication, storage, firestore and cloud functions.

Next, clone this repository, then replace the config object in firebase.js with your custom configuration for web from firebase.

Then, follow the instructions at "https://github.com/mike-obas/inbranded-design-functions" to deploy the APIs (cloud functions) for this project. After deployment, the URL to the deployed APIs will be provided. Copy it and use it as your baseURL in the axiosConfig.js file in this repo.

Finally, run the following command in your project's root directory's terminal.

### `npm install` To install all dependencies
### `npm run build` To build your project for production
### `firebase init` Then select hosting, use build/index.js as your entry file, remember to select "configure as a single page application".
### `firebase deploy` To host your single page application

Upon a successful deployment, the default url to this web app will be provided.

If everything went well. You should have a live cloud-based image editor.

Happy hacking!
