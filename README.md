# BruinPool Frontend

This is the frontend code repository for Bruinpool: made with ReactJS.<br>
For additional guidance/help, email justinhan1997@gmail.com or your current Engineering Manager.

## Local Environment Setup

1. Install nodeJS by following installation guides from https://nodejs.org/en/download/
2. Clone the repository to your local environment using `git clone https://github.com/bruinpool-devs/bruinpool_frontend.git`
3. `cd` into the clone repository, and install all used packages & dependencies using:
   `npm install`

## Local Development Setup

1. Within the root directory, run `npm start` to get the React app running on your local environment
2. `npm start` should automatically direct your browser to `localhost:3000`, where you can view the app.
3. Make sure to also have the [backend repository](https://github.com/bruinpool-devs/BruinPool_backEnd) running locally.
4. Open the codebase with an IDE (i.e. VS Code, Sublime Text), and then get coding! :)

## Additional Tools

1. Having [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
   installed in Chrome will help with debugging during development.

## Directory Structure

    .
    ├── node_modules
    ├── src
    │   ├── components
    |   |   └── pages
    │   ├── context
    |   |   └── state / reducer / context
    │   ├── App.css
    │   ├── App.js
    |   └── index.js
    ├── package-lock.json
    └── package.json
