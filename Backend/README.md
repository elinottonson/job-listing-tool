# Backend Readme

## Getting Started
1. Make sure you have node/git installed (go to [this link](https://nodejs.org/en/download/) to install it)
2. Run `npm install` to install/setup dependencies
    - Run `npm install --production` to install/setup in production mode (not installing the dev dependencies) if the server will not be run in development mode (saves time and makes application smaller)
3. Run `npm start` to run in production mode
#### Notes:
 - Run `npm run start:dev` to run in development mode, in this mode changes saved to the local server will automatically be redeployed when their files are saved (this does not occur when `npm start` is ran)
 - If you want to run the server on a specific port, it can be done by running either `$env:PORT=####` on windows or `export PORT=####` on mac/linux (replace #### with number). To unset the variable use either `$env:PORT=$null` on windows or `unset PORT` on linux/mac

## Public Folder
- Specify where the public folder is in the `index.js` file so the files can be served 
    (currently set to the public forlder in backend, likely will have to change based on frontend's public folder)

## sequelizeSetup Folder
- Contains the files that setup the sequelize ORM in the backend. A copy of the structure of the database is stored here split into tables in the `Models` folder. This is neccessary for queries so as the database structure is updated these models also need to be updated.
- Also contains the `sequalizeConstructor.js` file which is the file that will be imported when you want to make a call to the database. To make a call, import the sequalize object, and run `sequalize.models.[the modelName]` and then the sequalize query of choice (go to [link](https://sequelize.org/master/manual/model-querying-basics.html) to read up on possible queries)

## databaseInteraction Folder
- Contains the files that interact with the sequalize ORM, as well as the associated unit tests for them. The tests can be run with the command `npm test` in the Backend folder.

