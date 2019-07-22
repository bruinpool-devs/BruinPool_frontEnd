# BruinPool Frontend

This is the frontend code repository for Bruinpool: made with ReactJS.<br>
For additional guidance/help, email justinhan1997@gmail.com or your current Engineering Manager.

## Local Environment Setup

1. Install nodeJS by following installation guides from https://nodejs.org/en/download/.
2. Clone the repository to your local environment using `git clone https://github.com/bruinpool-devs/bruinpool_frontend.git`.
3. `cd` into the clone repository, and install all used packages & dependencies using: `npm install`.

## Local Development Setup

1. Within the root directory, run `npm start` to get the React app running on your local environment.
2. `npm start` should automatically direct your browser to `localhost:3006`, where you can view the app.
3. Make sure to also have the [backend repository](https://github.com/bruinpool-devs/BruinPool_backEnd) running locally.
4. Open the codebase with an IDE (i.e. VS Code, Sublime Text), and then get coding! :)

## How To Use Git Command Line

1. Run `git status` to check that you have modified the correct files.
2. Run `git add .` to mount all modified files that are currently uncommitted.
3. Run `git commit -m ""`, putting your commit message between the quote marks (i.e. update README).
4. Finally, do `git push origin master` to push to master, or `git push origin BRANCH_NAME` to push to your branch.

## Additional Tools

1. Having [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
   installed in Chrome will help with debugging during development.

## Deploy Instructions

1. Frontend is deployed using [Netlify](https://www.netlify.com/). Create Netlify account and request to be added to BruinPool group.
2. Netlify is connected to GitHub, so it automatically keeps track of any new changes that are pushed to the branch.
3. Run `npm install netlify-cli -g` to enable Netlify command line operations. May need to add `sudo` for Mac/Linux.
4. When you are ready to deploy new changes, run `npm run build` to create static package that can be deployed.
5. Finally, run `netlify deploy --prod`, which should deploy your new changes to the live site.
6. Be sure there are NO bugs when deploying, otherwise Netlify will have trouble deploying the site.

## Directory Structure

    .
    ├── node_modules
    ├── src
    │   ├── components
    |   |   ├── modals
    |   |   |   ├── EditModal
    |   |   |   ├── InfoModal
    |   |   |   ├── LocationModal
    |   |   |   ├── PriceModal
    |   |   |   └── SeatsModal
    |   |   ├── modules
    |   |   |   ├── FilterButtons
    |   |   |   ├── LoginForm
    |   |   |   ├── RideFeed
    |   |   |   ├── SignupForm
    |   |   |   └── UpcomingFeed
    |   |   ├── navbar
    |   |   └── pages
    |   |   |   ├── DriverPage
    |   |   |   ├── HelpPage
    |   |   |   ├── LandingPage
    |   |   |   ├── MyAccountPage
    |   |   |   ├── NotificationPage
    |   |   |   ├── RideHistoryPage
    |   |   |   ├── RiderPage
    |   |   |   └── SettingsPage
    │   ├── context
    |   |   ├── mainContext.js
    |   |   ├── mainReducer.js
    |   |   ├── MainState.js
    |   |   └── types.js
    │   ├── App.css
    │   ├── App.js
    |   └── index.js
    ├── package-lock.json
    └── package.json

## React Context API

Instead of using 3rd party libraries such as [Redux](https://redux.js.org/) for state management, we have
decided to incorporate [React Hooks](https://reactjs.org/docs/hooks-intro.html) and
[React Context API](https://reactjs.org/docs/context.html) to globally manage our state.<br>

1. `mainContext.js` is where we initially define the context used for the app.
2. `mainReducer.js` is where we define state mutations for each action type.
3. `MainState.js` is where we initialize our global state and mutation methods.
4. `types.js` is where we define our action types used in `mainReducer.js`.

## Route Information

| Component        | Route          |
| ---------------- | -------------- |
| LandingPage      | /              |
| RiderPage        | /rider         |
| DriverPage       | /driver        |
| RideHistoryPage  | /history       |
| HelpPage         | /help          |
| SettingsPage     | /settings      |
| NotificationPage | /notifications |
| MyAccountPage    | /myaccount     |
